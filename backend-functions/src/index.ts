import cors from 'cors';
import express, { type NextFunction, type Request, type Response } from 'express';
import { getApps, initializeApp } from 'firebase-admin/app';
import { getAuth, type DecodedIdToken } from 'firebase-admin/auth';
import type { AiEvaluationPayload, CreateProblemSetPayload, SubmissionPayload } from './types/api';
import { createProblemSet, createSubmission, getDashboardForUser, getPracticeSet, getPublishedPracticeItems, getSubmissionReview } from './services/firestoreDataService';

const app = express();
const port = Number(process.env.PORT ?? 8080);
const requiresLocalAdminCredential = process.env.NODE_ENV !== 'production' && !process.env.GOOGLE_APPLICATION_CREDENTIALS;

if (!getApps().length) {
  initializeApp();
}

type AuthenticatedRequest = Request & { authUser?: DecodedIdToken };

app.use(cors({ origin: process.env.WEB_CLIENT_ORIGIN?.split(',') ?? true }));
app.use(express.json({ limit: '1mb' }));

app.get('/health', (_request, response) => {
  response.json({ status: 'ok', service: 'toeflqc-api', timestamp: new Date().toISOString() });
});

const requireAuth = async (request: AuthenticatedRequest, response: Response, next: NextFunction) => {
  if (requiresLocalAdminCredential) {
    response.status(503).json({ error: 'Firebase Admin credentials are not configured. Set GOOGLE_APPLICATION_CREDENTIALS in backend-functions/.env.' });
    return;
  }

  const authorization = request.headers.authorization;

  if (!authorization?.startsWith('Bearer ')) {
    response.status(401).json({ error: 'Authentication required' });
    return;
  }

  try {
    request.authUser = await getAuth().verifyIdToken(authorization.slice('Bearer '.length));
    next();
  } catch {
    response.status(401).json({ error: 'Invalid or expired authentication token' });
  }
};

app.use('/api/v1', requireAuth);

app.post('/api/v1/account/bootstrap', async (request: AuthenticatedRequest, response) => {
  const configuredAdminEmail = (process.env.DEFAULT_ADMIN_EMAIL ?? 'quickcheck.edu@gmail.com').trim().toLowerCase();
  const authenticatedEmail = request.authUser?.email?.trim().toLowerCase();

  if (authenticatedEmail !== configuredAdminEmail) {
    response.json({ isDeveloper: request.authUser?.role === 'developer' });
    return;
  }

  await getAuth().setCustomUserClaims(request.authUser!.uid, { role: 'developer' });
  response.json({ isDeveloper: true });
});

app.get('/api/v1/dashboard', async (request: AuthenticatedRequest, response) => {
  const dashboard = await getDashboardForUser(request.authUser!);

  if (!dashboard) {
    response.status(404).json({ error: 'User profile not found' });
    return;
  }

  response.json(dashboard);
});

app.get('/api/v1/practice', async (_request, response) => {
  response.json({ items: await getPublishedPracticeItems() });
});

app.post('/api/v1/problem-sets', async (request: AuthenticatedRequest, response) => {
  if (request.authUser?.role !== 'developer') {
    response.status(403).json({ error: 'Developer access is required' });
    return;
  }

  const payload = request.body as Partial<CreateProblemSetPayload>;
  const { title, module, questions, minutes } = payload;
  const isModule = module === 'listening' || module === 'structure' || module === 'writing' || module === 'reading';

  if (typeof title !== 'string' || !title.trim() || !isModule ||
    typeof questions !== 'number' || !Number.isInteger(questions) || questions < 1 ||
    typeof minutes !== 'number' || !Number.isInteger(minutes) || minutes < 1) {
    response.status(400).json({ error: 'title, module, questions, and minutes are required' });
    return;
  }

  const id = await createProblemSet({
    title: title.trim(),
    module,
    description: typeof payload.description === 'string' ? payload.description.trim() : '',
    questions,
    minutes,
  });
  response.status(201).json({ id });
});

app.get('/api/v1/problem-sets/:setId', async (request, response) => {
  const practiceSet = await getPracticeSet(request.params.setId);

  if (!practiceSet) {
    response.status(404).json({ error: 'Published practice set not found' });
    return;
  }

  response.json(practiceSet);
});

app.post('/api/v1/submissions', async (request: AuthenticatedRequest, response) => {
  const { testId, answers } = request.body as Partial<SubmissionPayload>;

  if (typeof testId !== 'string' || !Array.isArray(answers) || !answers.every((answer) =>
    typeof answer?.questionId === 'string' && typeof answer.selectedOption === 'string')) {
    response.status(400).json({ error: 'testId and answers are required' });
    return;
  }

  response.status(201).json({
    submissionId: await createSubmission(request.authUser!, { testId, answers }),
    testId,
    status: 'queued',
    answerCount: answers.length,
  });
});

app.get('/api/v1/submissions/:submissionId/review', async (request: AuthenticatedRequest, response) => {
  const submissionId = Array.isArray(request.params.submissionId)
    ? request.params.submissionId[0]
    : request.params.submissionId;

  if (!submissionId) {
    response.status(400).json({ error: 'submissionId is required' });
    return;
  }

  const review = await getSubmissionReview(request.authUser!, submissionId);

  if (!review) {
    response.status(404).json({ error: 'Submission review not found' });
    return;
  }

  response.json(review);
});

app.post('/api/v1/ai/evaluate', (request, response) => {
  const payload = request.body as Partial<AiEvaluationPayload>;

  if (typeof payload.testId !== 'string' || !Array.isArray(payload.answers)) {
    response.status(400).json({ error: 'testId and answers are required' });
    return;
  }

  const evaluation = {
    submissionId: `eval_${Date.now()}`,
    status: 'completed',
    scoreBreakdown: {
      listening: 74,
      structure: 68,
      writing: 71,
      reading: 79,
    },
    weaknesses: [
      { module: 'listening', label: 'Detail retention', score: 62, reason: 'Details were missed in dialogue inference questions.' },
      { module: 'structure', label: 'Clause logic', score: 68, reason: 'Sentence structure and connector choices were inconsistent.' },
    ],
    recommendations: [
      'Review short dialogue detail questions before your next mock test.',
      'Revisit clause connectors and prepositional phrasing in structure tasks.',
      'Focus on passage inference questions in reading practice.',
    ],
    explanationBlocks: [
      { title: 'Listening weak spot', content: 'You missed the final detail cues in short dialogue questions.', confidence: 0.9 },
      { title: 'Structure correction', content: 'Connector and clause logic caused the largest drop in precision.', confidence: 0.88 },
    ],
    nextPracticePlan: [
      { module: 'listening', title: 'Part 1: short conversations', minutes: 18, focus: 'detail retention' },
      { module: 'structure', title: 'Subject and verb agreement', minutes: 15, focus: 'clause logic' },
      { module: 'reading', title: 'Passage 02: ecology', minutes: 22, focus: 'inference drill' },
    ],
  };

  response.status(200).json(evaluation);
});

app.use((_request, response) => response.status(404).json({ error: 'Route not found' }));
app.use((error: unknown, _request: Request, response: Response, _next: NextFunction) => {
  console.error(error);
  response.status(500).json({ error: 'Internal server error' });
});

if (require.main === module) {
  app.listen(port, () => console.log(`TOEFLQC API listening on port ${port}`));
}

export default app;
