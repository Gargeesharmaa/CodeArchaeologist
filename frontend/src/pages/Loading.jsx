import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, Circle, Loader2 } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import { PROGRESS_STEPS, MOCK_PROJECT } from '../data/mockData';
import styles from './Loading.module.css';

export default function Loading() {
  const navigate = useNavigate();
  const location = useLocation();
  const { jobId } = useParams();
  const repoUrl = location.state?.repoUrl || 'https://github.com/fastapi/fastapi';
  const repoName = repoUrl.replace('https://github.com/', '');

  const [currentStep, setCurrentStep] = useState(0);
  const [done, setDone] = useState(false);

  // Simulated step-by-step progress — replace with real polling when backend ready:
  // useEffect(() => { const t = setInterval(async () => {
  //   const { step, done } = await getJobStatus(jobId);
  //   setCurrentStep(step); if (done) { clearInterval(t); navigate(`/dashboard/...`); }
  // }, 2000); return () => clearInterval(t); }, [jobId]);
  useEffect(() => {
    let step = 0;
    const advance = () => {
      if (step < PROGRESS_STEPS.length) {
        setCurrentStep(step++);
        setTimeout(advance, PROGRESS_STEPS[step - 1]?.duration ?? 2000);
      } else {
        setDone(true);
        setTimeout(() => navigate(`/dashboard/${MOCK_PROJECT.id}`, { state: { repoUrl } }), 700);
      }
    };
    const t = setTimeout(advance, 300);
    return () => clearTimeout(t);
  }, [navigate, repoUrl]);

  const totalMs = PROGRESS_STEPS.reduce((a, s) => a + s.duration, 0);
  const elapsedMs = PROGRESS_STEPS.slice(0, currentStep).reduce((a, s) => a + s.duration, 0);
  const pct = Math.round(Math.min((elapsedMs / totalMs) * 100, done ? 100 : 92));

  return (
    <div className="page-wrapper">
      <div className="bg-orbs" aria-hidden="true"><div className="bg-orb bg-orb-1" /><div className="bg-orb bg-orb-3" /></div>
      <Navbar />
      <main className={styles.main} id="main">
        <motion.div className={styles.card} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.38 }}>
          <div className={styles.repoTag}>
            <span className="tag">GitHub</span>
            <span className={styles.repoName}>{repoName}</span>
          </div>

          <h1 className={styles.title}>{done ? '✅ Analysis Complete!' : 'Analyzing your codebase…'}</h1>
          <p className={styles.subtitle}>
            {done ? 'Redirecting to your interactive dashboard…' : 'AI is reading every file and mapping all dependencies.'}
          </p>

          {/* Progress bar — value driven via CSS custom property (web guidance pattern) */}
          <div
            className={styles.progressWrap}
            role="progressbar"
            aria-valuenow={pct}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Analysis progress"
          >
            <div className={styles.progressBar} style={{ '--pct': `${pct}%` }} />
          </div>
          <p className={styles.pctLabel} aria-hidden="true">{pct}%</p>

          <ol className={styles.steps} aria-label="Analysis steps">
            {PROGRESS_STEPS.map((step, idx) => {
              const complete = idx < currentStep || done;
              const active   = idx === currentStep && !done;
              return (
                <motion.li key={step.id}
                  className={`${styles.step} ${complete ? styles.complete : ''} ${active ? styles.active : ''}`}
                  initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.07 }}>
                  <div className={styles.stepIcon} aria-hidden="true">
                    {complete ? <CheckCircle2 size={17} className={styles.iconDone} />
                              : active ? <Loader2 size={17} className={styles.iconSpin} />
                              : <Circle size={17} className={styles.iconPending} />}
                  </div>
                  <div>
                    <p className={styles.stepLabel}>{step.icon} {step.label}</p>
                    {active && <p className={styles.stepDesc}>{step.description}</p>}
                  </div>
                </motion.li>
              );
            })}
          </ol>

          {!done && (
            <button type="button" className={`btn btn-ghost btn-sm ${styles.cancelBtn}`}
              onClick={() => navigate('/analyze')} aria-label="Cancel analysis">
              Cancel
            </button>
          )}
        </motion.div>
      </main>
    </div>
  );
}
