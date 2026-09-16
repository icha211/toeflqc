import { useState } from 'react';
import { BookOpen, FileText, Headphones, PenLine, Play, Radio, Settings2 } from 'lucide-react';
import type { CreateProblemSetRequest, ModuleName, PracticeItem } from '../../types/test';

const moduleIcons = {
  listening: Headphones,
  structure: PenLine,
  writing: FileText,
  reading: BookOpen,
};

interface WorkspacePanelsProps {
  activeView: string;
  items: PracticeItem[];
  canManageContent: boolean;
  onStart: (item: PracticeItem) => void;
  onCreateProblemSet: (payload: CreateProblemSetRequest) => Promise<void>;
}

function titleForModule(module: ModuleName) {
  return module.charAt(0).toUpperCase() + module.slice(1);
}

function PracticeCards({ items, onStart }: Pick<WorkspacePanelsProps, 'items' | 'onStart'>) {
  return (
    <div className="workspace-card-grid">
      {items.map((item) => {
        const Icon = moduleIcons[item.module];
        return (
          <article className="workspace-card" key={item.id}>
            <div className="workspace-card__icon"><Icon size={20} /></div>
            <p className="eyebrow">{titleForModule(item.module)}</p>
            <h3>{item.title}</h3>
            <p>{item.description || 'No description has been provided for this set.'}</p>
            <footer><span>{item.questions} questions · {item.minutes} min</span><button className="task-action" aria-label={`Start ${item.title}`} onClick={() => onStart(item)}><Play size={15} /></button></footer>
          </article>
        );
      })}
    </div>
  );
}

export function WorkspacePanels({ activeView, items, canManageContent, onStart, onCreateProblemSet }: WorkspacePanelsProps) {
  const [title, setTitle] = useState('');
  const [selectedModule, setSelectedModule] = useState<ModuleName>('listening');
  const [questions, setQuestions] = useState(20);
  const [minutes, setMinutes] = useState(20);
  const [isCreating, setIsCreating] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  async function createSet() {
    if (!title.trim()) {
      setFormError('Enter a title before publishing this set.');
      return;
    }

    try {
      setIsCreating(true);
      setFormError(null);
      await onCreateProblemSet({ title: title.trim(), module: selectedModule, questions, minutes });
      setTitle('');
    } catch (error) {
      console.error('Problem set creation failed:', error);
      setFormError('The problem set could not be published.');
    } finally {
      setIsCreating(false);
    }
  }

  if (activeView === 'Developer') {
    return (
      <section className="workspace-panel">
        <header className="workspace-panel__header">
          <div><p className="eyebrow">Content operations</p><h2>Developer console</h2><p>Published problem sets available to learners.</p></div>
          <span className="workspace-panel__role"><Settings2 size={16} /> {canManageContent ? 'Developer access' : 'Read-only access'}</span>
        </header>
        {!canManageContent && <p className="data-state">This account is signed in but does not yet have the Firebase developer claim. Configure Firebase Admin credentials locally, then refresh this page.</p>}
        {canManageContent && <form className="developer-form" onSubmit={(event) => { event.preventDefault(); void createSet(); }}>
          <input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Practice set title" aria-label="Practice set title" />
          <select value={selectedModule} onChange={(event) => setSelectedModule(event.target.value as ModuleName)} aria-label="Module">
            <option value="listening">Listening</option><option value="structure">Structure</option><option value="writing">Writing</option><option value="reading">Reading</option>
          </select>
          <input type="number" min="1" value={questions} onChange={(event) => setQuestions(Number(event.target.value))} aria-label="Question count" />
          <input type="number" min="1" value={minutes} onChange={(event) => setMinutes(Number(event.target.value))} aria-label="Duration in minutes" />
          <button className="button button--dark" disabled={isCreating}>{isCreating ? 'Publishing…' : 'Publish set'}</button>
          {formError && <p className="developer-form__error" role="alert">{formError}</p>}
        </form>}
        {items.length ? <PracticeCards items={items} onStart={onStart} /> : <p className="empty-state">No published problem sets are available.</p>}
      </section>
    );
  }

  const module = activeView.toLowerCase() as ModuleName;
  const isModuleView = ['listening', 'structure', 'writing', 'reading'].includes(module);
  const displayedItems = isModuleView ? items.filter((item) => item.module === module) : items;
  const heading = activeView === 'Daily practice' ? 'Daily practice' : isModuleView ? `${titleForModule(module)} practice` : 'Practice library';
  const description = activeView === 'Daily practice'
    ? 'Select a published set to continue your personalized study session.'
    : isModuleView
      ? `Available ${module} sets from the live practice library.`
      : 'All published practice sets available to your account.';

  return (
    <section className="workspace-panel">
      <header className="workspace-panel__header">
        <div><p className="eyebrow">Practice workspace</p><h2>{heading}</h2><p>{description}</p></div>
        <Radio size={21} aria-hidden="true" />
      </header>
      {displayedItems.length ? <PracticeCards items={displayedItems} onStart={onStart} /> : <p className="empty-state">No published {isModuleView ? `${module} ` : ''}practice sets are available yet.</p>}
    </section>
  );
}
