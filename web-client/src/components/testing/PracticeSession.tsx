import { useEffect, useState } from 'react';
import type { User } from 'firebase/auth';
import { Check, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { api } from '../../services/api';
import type { PracticeItem, PracticeSet, SubmissionReview } from '../../types/test';

interface PracticeSessionProps {
  item: PracticeItem;
  user: User;
  onClose: () => void;
}

export function PracticeSession({ item, user, onClose }: PracticeSessionProps) {
  const [practiceSet, setPracticeSet] = useState<PracticeSet | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [questionIndex, setQuestionIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionId, setSubmissionId] = useState<string | null>(null);
  const [review, setReview] = useState<SubmissionReview | null>(null);
  const [activeTab, setActiveTab] = useState<'question' | 'explanation'>('question');

  useEffect(() => {
    let isMounted = true;

    async function loadPracticeSet() {
      try {
        const idToken = await user.getIdToken();
        const response = await api.practiceSet(idToken, item.id);
        if (isMounted) setPracticeSet(response);
      } catch (loadError) {
        console.error('Practice set load failed:', loadError);
        if (isMounted) setError('This practice set could not be loaded.');
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    void loadPracticeSet();
    return () => { isMounted = false; };
  }, [item.id, user]);

  const question = practiceSet?.questions[questionIndex];
  const isFinalQuestion = practiceSet ? questionIndex === practiceSet.questions.length - 1 : false;
  const answeredCount = Object.keys(answers).length;

  async function submitAnswers() {
    if (!practiceSet) return;

    try {
      setIsSubmitting(true);
      const idToken = await user.getIdToken();
      const response = await api.submit(idToken, {
        testId: practiceSet.id,
        answers: practiceSet.questions
          .filter((itemQuestion) => answers[itemQuestion.id])
          .map((itemQuestion) => ({ questionId: itemQuestion.id, selectedOption: answers[itemQuestion.id] })),
      });
      setSubmissionId(response.submissionId);
      setReview(await api.submissionReview(idToken, response.submissionId));
      setActiveTab('explanation');
    } catch (submissionError) {
      console.error('Submission failed:', submissionError);
      setError('Your answers could not be saved. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="practice-overlay" role="dialog" aria-modal="true" aria-label={`${item.title} practice`}>
      <section className="practice-session">
        <header className="cbt-session-header">
          <div className="cbt-session-title"><span>Quick Check</span><div><strong>{practiceSet?.module ?? item.module} comprehension</strong><small>{practiceSet?.title ?? item.title}</small></div></div>
          <div className="cbt-session-progress">
            <span>Answered {answeredCount}/{practiceSet?.questions.length ?? item.questions}</span>
            <div className="cbt-question-navigator" aria-label="Question navigation">
              {practiceSet?.questions.map((itemQuestion, index) => <button key={itemQuestion.id} className={`${questionIndex === index ? 'is-current ' : ''}${answers[itemQuestion.id] ? 'is-answered' : ''}`} onClick={() => setQuestionIndex(index)}>{index + 1}</button>)}
            </div>
          </div>
          <button className="icon-button" aria-label="Close practice" onClick={onClose}><X size={18} /></button>
        </header>

        {isLoading && <p className="empty-state">Loading your practice questions…</p>}
        {error && <p className="data-state" role="alert">{error}</p>}
        {submissionId && <div className="practice-success"><Check size={20} /><p>Answers saved. Review your question results and explanations below.</p></div>}

        {!isLoading && !error && !submissionId && question && practiceSet && (
          <div className="practice-session__body">
            <p className="question-count">Question {questionIndex + 1} of {practiceSet.questions.length}</p>
            <h3>{question.prompt}</h3>
            <div className="answer-list">
              {question.options.map((option, index) => {
                const optionLabel = String.fromCharCode(65 + index);
                return <button key={option} className={`answer-option ${answers[question.id] === optionLabel ? 'answer-option--selected' : ''}`} onClick={() => setAnswers((current) => ({ ...current, [question.id]: optionLabel }))}>
                  <span>{optionLabel}</span>{option}
                </button>;
              })}
            </div>
            <footer className="practice-session__footer">
              <button className="button button--outline" disabled={questionIndex === 0} onClick={() => setQuestionIndex((index) => index - 1)}><ChevronLeft size={16} /> Back</button>
              {isFinalQuestion
                ? <button className="button button--dark" disabled={Object.keys(answers).length !== practiceSet.questions.length || isSubmitting} onClick={submitAnswers}>{isSubmitting ? 'Saving…' : 'Submit answers'}</button>
                : <button className="button button--dark" onClick={() => setQuestionIndex((index) => index + 1)}>Next <ChevronRight size={16} /></button>}
            </footer>
          </div>
        )}
        {submissionId && review && (
          <div className="review-panel">
            <nav className="review-tabs" aria-label="Practice review navigation">
              <button className={activeTab === 'question' ? 'review-tab review-tab--active' : 'review-tab'} onClick={() => setActiveTab('question')}>Questions</button>
              <button className={activeTab === 'explanation' ? 'review-tab review-tab--active' : 'review-tab'} onClick={() => setActiveTab('explanation')}>Explanations</button>
            </nav>
            {activeTab === 'question' ? <div className="review-list">{review.questions.map((reviewQuestion, index) => <article key={reviewQuestion.questionId}><strong>Question {index + 1}</strong><p>{reviewQuestion.prompt}</p><span>Your answer: {reviewQuestion.selectedOption ?? 'No answer'} · Correct answer: {reviewQuestion.correctOption ?? 'Not available'}</span></article>)}</div>
              : <div className="review-list">{review.questions.map((reviewQuestion, index) => <article key={reviewQuestion.questionId}><strong>Question {index + 1} explanation</strong><p>{reviewQuestion.explanation ?? 'An explanation has not been published for this question.'}</p></article>)}</div>}
            <button className="button button--dark" onClick={onClose}>Back to dashboard</button>
          </div>
        )}
      </section>
    </div>
  );
}
