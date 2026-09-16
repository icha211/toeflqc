import React from 'react';

interface QuestionStatus {
    id: string;
    number: number;
    isAnswered: boolean;
    part: 'A' | 'B';
}

interface QuestionNavigatorProps {
    questions: QuestionStatus[];
    currentQuestionId: string;
    onNavigate: (id: string) => void;
    onNextQuestion: () => void;
    onNextSection: () => void;
    isOpen: boolean;
    onToggleOpen: () => void;
}

export const QuestionNavigator: React.FC<QuestionNavigatorProps> = ({
    questions,
    currentQuestionId,
    onNavigate,
    onNextQuestion,
    onNextSection,
    isOpen,
    onToggleOpen
    }) => {
    const partA = questions.filter(q => q.part === 'A');
    const partB = questions.filter(q => q.part === 'B');

    const renderGrid = (qs: QuestionStatus[]) => (
        <div className="question-grid">
        {qs.map(q => (
            <button
            key={q.id}
            className={`grid-item ${q.isAnswered ? 'answered' : 'unanswered'} ${currentQuestionId === q.id ? 'active' : ''}`}
            onClick={() => onNavigate(q.id)}
            >
            {q.number}
            </button>
        ))}
        </div>
    );

    return (
        <aside className={`question-navigator ${isOpen ? 'open' : 'closed'}`} id="question-navigator">
        <div className="question-navigator__panel">
            <div className="question-navigator__head">
            <button className="navigator-toggle" type="button" onClick={onToggleOpen} aria-label="Toggle navigator">
                <i className="ph ph-squares-four nav-state-icon" aria-hidden="true"></i>
            </button>
            <span className="question-navigator__title">Question Navigator</span>
            </div>
            
            <h4 className="question-navigator__section-title">Part A - Structure</h4>
            {renderGrid(partA)}
            
            <hr className="question-navigator__divider" />
            
            <h4 className="question-navigator__section-title">Part B - Written Expression</h4>
            {renderGrid(partB)}
            
            <hr className="question-navigator__divider" />
            <div className="navigator-legend">
            <div className="legend-item"><span className="legend-dot answered"></span><span>Answered</span></div>
            <div className="legend-item"><span className="legend-dot unanswered"></span><span>Unanswered</span></div>
            </div>
        </div>
        
        <div className="navigator-actions">
            <button className="navigator-action-btn next-question" onClick={onNextQuestion} type="button">Next Question</button>
            <button className="navigator-action-btn next-section" onClick={onNextSection} type="button">Next Section</button>
        </div>
        </aside>
    );
};