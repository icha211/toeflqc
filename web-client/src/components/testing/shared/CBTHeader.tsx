import React from 'react';

interface CBTHeaderProps {
    timerText: string;
    progressPartA: number; // Percentage 0-100
    progressPartB: number; // Percentage 0-100
    answeredCount: number;
    totalQuestions: number;
    onToggleFullscreen: () => void;
    onToggleMenu: () => void;
    onSubmitTest: () => void;
}

export const CBTHeader: React.FC<CBTHeaderProps> = ({
    timerText,
    progressPartA,
    progressPartB,
    answeredCount,
    totalQuestions,
    onToggleFullscreen,
    onToggleMenu,
    onSubmitTest
    }) => {
    return (
        <header className="cbt-header figma-header figma-header--listening">
        <div className="logo-test-package-timer">
            <img className="logo-frame-icon" src="/asst/icon/QuickCheckLogo.png" alt="QuickCheck Logo" />
            <div className="test-package-timer">
            <div className="test-package-frame">
                <div className="structure-writing">Structure &amp; Writing</div>
                <div className="package-01-jan" id="header-package-label">Package 01 Jan</div>
            </div>
            </div>
        </div>
        
        <div className="timer">
            <div className="timer-header-parent">
            <i className="ph ph-clock timer-header-icon" aria-hidden="true"></i>
            <div className="div" id="time">{timerText}</div>
            </div>
        </div>
        
        <div className="progressbar-final">
            <div className="progress-bar-question">
            <div className="progress-bar-question-inner">
                <div className="progressbar-wrapper">
                <div className="progressbar">
                    <div 
                    className="progressbar-child" 
                    style={{ width: `${progressPartA}%` }} 
                    />
                </div>
                </div>
            </div>
            <div className="frame-parent">
                <div className="answered-030-wrapper">
                <div className="answered-030">
                    Answered {answeredCount}/{totalQuestions}
                </div>
                </div>
                <div className="progressbar-frame">
                <div className="progressbar">
                    <div 
                    className="progressbar-child" 
                    style={{ width: `${progressPartB}%` }} 
                    />
                </div>
                </div>
            </div>
            </div>
            
            <div className="features">
            <button className="header-feature-btn nav-toggle-btn" type="button" onClick={onToggleFullscreen} aria-label="Enter fullscreen">
                <i className="ph ph-frame-corners icon-regular" aria-hidden="true"></i>
            </button>
            <button className="header-feature-btn nav-toggle-btn" type="button" onClick={onToggleMenu} aria-label="Open test options">
                <i className="ph ph-list icon-regular" aria-hidden="true"></i>
            </button>
            </div>
        </div>
        
        <button className="submit-buttton submit-parent" type="button" onClick={onSubmitTest}>
            <div className="submit">Submit</div>
            <img className="untouch-submiticon submit-icon" src="/asst/icon/untouch-submiticon.svg" alt="Submit" />
        </button>
        </header>
    );
};