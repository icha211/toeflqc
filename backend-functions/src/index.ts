import cors from 'cors';
import express, { type NextFunction, type Request, type Response } from 'express';

const app = express();
const port = Number(process.env.PORT ?? 8080);

app.use(cors({ origin: process.env.WEB_CLIENT_ORIGIN?.split(',') ?? true }));
app.use(express.json({ limit: '1mb' }));

app.get('/health', (_request, response) => {
  response.json({ status: 'ok', service: 'toeflqc-api', timestamp: new Date().toISOString() });
});

const requireAuth = (request: Request, response: Response, next: NextFunction) => {
  if (process.env.NODE_ENV !== 'production' && request.headers.authorization === undefined) {
    next();
    return;
  }
  if (!request.headers.authorization?.startsWith('Bearer ')) {
    response.status(401).json({ error: 'Authentication required' });
    return;
  }
  next();
};

app.use('/api/v1', requireAuth);

app.get('/api/v1/dashboard', (_request, response) => {
  response.json({
    user: { displayName: 'Culaccino_', plan: 'trial', trialDay: 2, trialDays: 4 },
    score: { current: 583, target: 677, projected: 625 },
    accuracy: { listening: 62, structure: 70, writing: 75, reading: 76 },
    nextAction: { module: 'listening', title: 'Part 1: short conversations', questions: 20, minutes: 18 },
  });
});

app.get('/api/v1/practice', (_request, response) => {
  response.json({
    items: [
      { id: 'listening-part-1', module: 'listening', title: 'Part 1: short conversations', questions: 20, minutes: 18, accuracy: 62 },
      { id: 'structure-agreement', module: 'structure', title: 'Subject and verb agreement', questions: 20, minutes: 15, accuracy: 70 },
      { id: 'reading-ecology-02', module: 'reading', title: 'Passage 02: ecology', questions: 10, minutes: 22, accuracy: 76 },
    ],
  });
});

app.post('/api/v1/submissions', (request, response) => {
  const { testId, answers } = request.body as { testId?: unknown; answers?: unknown };
  if (typeof testId !== 'string' || !Array.isArray(answers)) {
    response.status(400).json({ error: 'testId and answers are required' });
    return;
  }
  response.status(201).json({ submissionId: `submission_${Date.now()}`, testId, status: 'queued', answerCount: answers.length });
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
