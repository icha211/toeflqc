import { getApps, initializeApp } from 'firebase-admin/app';
import { FieldValue, getFirestore } from 'firebase-admin/firestore';
import type { DecodedIdToken } from 'firebase-admin/auth';
import type { CreateProblemSetPayload, DashboardSummaryResponse, ModuleName, PracticeItemResponse, PracticeSetResponse, SubmissionPayload, SubmissionReviewResponse } from '../types/api';

type FirestoreRecord = Record<string, unknown>;

function asRecord(value: unknown): FirestoreRecord {
  return value !== null && typeof value === 'object' ? value as FirestoreRecord : {};
}

function asNumber(value: unknown): number | null {
  return typeof value === 'number' && Number.isFinite(value) ? value : null;
}

function asModuleName(value: unknown): ModuleName | null {
  return value === 'listening' || value === 'structure' || value === 'writing' || value === 'reading'
    ? value
    : null;
}

function asOptions(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.filter((option): option is string => typeof option === 'string');
  }

  const options = asRecord(value);
  return ['A', 'B', 'C', 'D']
    .map((key) => options[key])
    .filter((option): option is string => typeof option === 'string');
}

function calculateTrialDay(value: unknown): number | null {
  const startDate = typeof value === 'string' ? new Date(value) : null;

  if (!startDate || Number.isNaN(startDate.getTime())) {
    return null;
  }

  return Math.floor((Date.now() - startDate.getTime()) / 86_400_000) + 1;
}

function getFirestoreDb() {
  if (!getApps().length) {
    initializeApp();
  }

  return getFirestore();
}

export async function getDashboardForUser(token: DecodedIdToken): Promise<DashboardSummaryResponse | null> {
  const userReference = getFirestoreDb().collection('users').doc(token.uid);
  let snapshot = await userReference.get();

  if (!snapshot.exists) {
    await userReference.set({
      displayName: token.name ?? token.email ?? null,
      email: token.email ?? null,
      plan: 'trial',
      trial: {
        startedAt: new Date().toISOString(),
        totalDays: 4,
      },
    });
    snapshot = await userReference.get();
  }

  const userData = asRecord(snapshot.data());
  const trial = asRecord(userData.trial);
  const score = asRecord(userData.score);
  const accuracy = asRecord(userData.accuracy);
  const nextAction = asRecord(userData.nextAction);

  return {
    user: {
      displayName: typeof userData.displayName === 'string'
        ? userData.displayName
        : token.name ?? token.email ?? 'Learner',
      plan: userData.plan === 'pro' ? 'pro' : 'trial',
      trialDay: asNumber(trial.currentDay) ?? calculateTrialDay(trial.startedAt) ?? asNumber(userData.trialDay) ?? 0,
      trialDays: asNumber(trial.totalDays) ?? asNumber(userData.trialDays) ?? 4,
    },
    score: {
      current: asNumber(score.current) ?? asNumber(userData.currentScore),
      target: asNumber(score.target) ?? asNumber(userData.targetScore),
      projected: asNumber(score.projected) ?? asNumber(userData.projectedScore),
    },
    accuracy: {
      listening: asNumber(accuracy.listening),
      structure: asNumber(accuracy.structure),
      writing: asNumber(accuracy.writing),
      reading: asNumber(accuracy.reading),
    },
    nextAction: {
      module: asModuleName(nextAction.module),
      title: typeof nextAction.title === 'string' ? nextAction.title : null,
      questions: asNumber(nextAction.questions),
      minutes: asNumber(nextAction.minutes),
    },
  };
}

export async function getPublishedPracticeItems(): Promise<PracticeItemResponse[]> {
  const snapshot = await getFirestoreDb().collection('problemSets').limit(100).get();

  return snapshot.docs.flatMap((document) => {
    const item = asRecord(document.data());
    const module = asModuleName(item.module ?? item.section);
    const title = typeof item.title === 'string' ? item.title : null;

    if ((item.status !== undefined && item.status !== 'published') || !module || !title) {
      return [];
    }

    return [{
      id: document.id,
      module,
      title,
      description: typeof item.description === 'string' ? item.description : '',
      questions: asNumber(item.questions ?? item.questionCount) ?? 0,
      minutes: asNumber(item.minutes ?? item.durationMinutes) ?? 0,
      accuracy: null,
    }];
  });
}

export async function createProblemSet(payload: CreateProblemSetPayload): Promise<string> {
  const document = await getFirestoreDb().collection('problemSets').add({
    title: payload.title,
    module: payload.module,
    description: payload.description ?? '',
    questions: payload.questions,
    minutes: payload.minutes,
    status: 'published',
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
  });

  return document.id;
}

export async function getPracticeSet(setId: string): Promise<PracticeSetResponse | null> {
  const setReference = getFirestoreDb().collection('problemSets').doc(setId);
  const setSnapshot = await setReference.get();

  if (!setSnapshot.exists) {
    return null;
  }

  const setData = asRecord(setSnapshot.data());
  const module = asModuleName(setData.module ?? setData.section);
  const title = typeof setData.title === 'string' ? setData.title : null;

  if ((setData.status !== undefined && setData.status !== 'published') || !module || !title) {
    return null;
  }

  const questionsSnapshot = await setReference.collection('questions').orderBy('questionNumber').get();
  const questions = questionsSnapshot.docs.flatMap((document) => {
    const question = asRecord(document.data());
    const prompt = typeof question.prompt === 'string' ? question.prompt : null;
    const options = asOptions(question.options);

    return prompt && options.length >= 2
      ? [{ id: document.id, prompt, options, module }]
      : [];
  });

  return { id: setSnapshot.id, title, module, questions };
}

export async function createSubmission(token: DecodedIdToken, payload: SubmissionPayload): Promise<string> {
  const document = await getFirestoreDb().collection('userSubmissions').add({
    userId: token.uid,
    testId: payload.testId,
    answers: payload.answers,
    status: 'submitted',
    submittedAt: FieldValue.serverTimestamp(),
  });

  return document.id;
}

export async function getSubmissionReview(token: DecodedIdToken, submissionId: string): Promise<SubmissionReviewResponse | null> {
  const submissionSnapshot = await getFirestoreDb().collection('userSubmissions').doc(submissionId).get();

  if (!submissionSnapshot.exists) {
    return null;
  }

  const submission = asRecord(submissionSnapshot.data());
  const testId = typeof submission.testId === 'string' ? submission.testId : null;

  if (submission.userId !== token.uid || !testId || !Array.isArray(submission.answers)) {
    return null;
  }

  const selectedAnswers = new Map(
    submission.answers.flatMap((answer) => {
      const item = asRecord(answer);
      return typeof item.questionId === 'string' && typeof item.selectedOption === 'string'
        ? [[item.questionId, item.selectedOption] as const]
        : [];
    }),
  );
  const questionsSnapshot = await getFirestoreDb().collection('problemSets').doc(testId).collection('questions').orderBy('questionNumber').get();
  const questions = questionsSnapshot.docs.map((document) => {
    const question = asRecord(document.data());
    return {
      questionId: document.id,
      prompt: typeof question.prompt === 'string' ? question.prompt : '',
      selectedOption: selectedAnswers.get(document.id) ?? null,
      correctOption: typeof question.correctAnswer === 'string' ? question.correctAnswer : null,
      explanation: typeof question.explanationText === 'string' ? question.explanationText : null,
    };
  });

  return { submissionId, testId, questions };
}
