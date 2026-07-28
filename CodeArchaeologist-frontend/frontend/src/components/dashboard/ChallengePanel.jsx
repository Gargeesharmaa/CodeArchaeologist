import React, { useState } from 'react';
import { Award, CheckCircle2, ChevronRight, HelpCircle, ArrowRight } from 'lucide-react';
import { MOCK_CHALLENGES } from '../../data/mockData';
import styles from './ChallengePanel.module.css';

export default function ChallengePanel({ onNodeHighlight }) {
  const [selectedChallenge, setSelectedChallenge] = useState(MOCK_CHALLENGES[0]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const currentStep = selectedChallenge.steps[currentStepIndex];

  function handleStepClick(step, index) {
    setCurrentStepIndex(index);
    if (step.nodeId && onNodeHighlight) {
      onNodeHighlight({ id: step.nodeId });
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerTitle}>
          <Award size={18} color="#f59e0b" />
          <span>Interactive Codebase Challenges</span>
        </div>
        <p className={styles.headerDesc}>
          Guided step-by-step quests to help you understand architecture, data flow, and entry points.
        </p>
      </div>

      <div className={styles.grid}>
        {/* Challenge selection */}
        <div className={styles.challengeList}>
          {MOCK_CHALLENGES.map(c => (
            <button
              key={c.id}
              type="button"
              className={`${styles.challengeCard} ${
                selectedChallenge.id === c.id ? styles.activeCard : ''
              }`}
              onClick={() => {
                setSelectedChallenge(c);
                setCurrentStepIndex(0);
              }}
            >
              <div className={styles.cardHeader}>
                <span className={styles.cardTitle}>{c.title}</span>
                <span className={`badge ${c.difficulty === 'Beginner' ? 'badge-emerald' : 'badge-purple'}`}>
                  {c.difficulty}
                </span>
              </div>
              <p className={styles.cardDesc}>{c.description}</p>
              <span className={styles.stepCount}>{c.steps.length} guided steps</span>
            </button>
          ))}
        </div>

        {/* Challenge Walkthrough */}
        <div className={styles.walkthroughBox}>
          <div className={styles.boxHeader}>
            <span className={styles.boxTitle}>{selectedChallenge.title}</span>
            <span className={styles.progressBadge}>
              Step {currentStepIndex + 1} of {selectedChallenge.steps.length}
            </span>
          </div>

          <ol className={styles.stepTimeline}>
            {selectedChallenge.steps.map((step, idx) => {
              const isCurrent = idx === currentStepIndex;
              const isPast = idx < currentStepIndex;

              return (
                <li
                  key={step.id}
                  className={`${styles.timelineItem} ${isCurrent ? styles.activeTimeline : ''} ${
                    isPast ? styles.pastTimeline : ''
                  }`}
                  onClick={() => handleStepClick(step, idx)}
                >
                  <div className={styles.timelineIcon}>
                    {isPast ? (
                      <CheckCircle2 size={16} color="#10b981" />
                    ) : (
                      <span className={styles.stepNum}>{idx + 1}</span>
                    )}
                  </div>
                  <div className={styles.timelineContent}>
                    <div className={styles.stepHeader}>
                      <span className={styles.fileHint}>{step.file}</span>
                      {step.nodeId && <span className="tag">Highlights Node</span>}
                    </div>
                    <p className={styles.hintText}>{step.hint}</p>
                  </div>
                </li>
              );
            })}
          </ol>

          <div className={styles.actions}>
            <button
              type="button"
              className="btn btn-ghost btn-sm"
              disabled={currentStepIndex === 0}
              onClick={() => setCurrentStepIndex(prev => Math.max(0, prev - 1))}
            >
              Previous Step
            </button>

            <button
              type="button"
              className="btn btn-primary btn-sm"
              disabled={currentStepIndex === selectedChallenge.steps.length - 1}
              onClick={() => setCurrentStepIndex(prev => Math.min(selectedChallenge.steps.length - 1, prev + 1))}
            >
              Next Step <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
