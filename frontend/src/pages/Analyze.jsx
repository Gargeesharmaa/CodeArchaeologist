import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GitBranch, ArrowRight, AlertCircle, Loader2 } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import { EXAMPLE_REPOS } from '../data/mockData';
import styles from './Analyze.module.css';

function isValidGithubUrl(url) {
  try {
    const u = new URL(url);
    const parts = u.pathname.split('/').filter(Boolean);
    return (u.hostname === 'github.com' || u.hostname === 'www.github.com') && parts.length >= 2;
  } catch { return false; }
}

export default function Analyze() {
  const navigate = useNavigate();
  const location = useLocation();
  const [url, setUrl] = useState(location.state?.prefill || '');
  const [touched, setTouched] = useState(false);
  const [loading, setLoading] = useState(false);

  const isValid = isValidGithubUrl(url.trim());
  const showError = touched && url.trim() !== '' && !isValid;

  async function handleSubmit(e) {
    e.preventDefault();
    setTouched(true);
    if (!isValid) return;
    setLoading(true);
    // TODO: swap for real API call:
    // const { jobId } = await analyzeRepo(url.trim());
    // navigate(`/loading/${jobId}`, { state: { repoUrl: url.trim() } });
    await new Promise(r => setTimeout(r, 900));
    navigate('/loading/demo-job-001', { state: { repoUrl: url.trim() } });
  }

  return (
    <div className="page-wrapper">
      <div className="bg-orbs" aria-hidden="true">
        <div className="bg-orb bg-orb-1" /><div className="bg-orb bg-orb-2" />
      </div>
      <Navbar />
      <main className={styles.main} id="main">
        <motion.article className={styles.card} initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.38 }}>
          <div className={styles.cardHeader}>
            <div className={styles.iconWrap} aria-hidden="true"><GitBranch size={22} /></div>
            <div>
              <h1 className={styles.title}>Analyze a Repository</h1>
              <p className={styles.subtitle}>Paste any public GitHub repository URL to begin</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} noValidate aria-label="Repository analysis form">
            <div className={styles.fieldGroup}>
              <label htmlFor="repo-url" className={styles.label}>GitHub Repository URL</label>
              {/* Hint ABOVE input — per web guidance: place hints above so mobile keyboards don't hide them */}
              <span id="repo-hint" className={styles.hint}>Format: https://github.com/owner/repository</span>
              <div className={styles.inputWrap}>
                <GitBranch size={16} className={styles.inputIcon} aria-hidden="true" />
                <input
                  id="repo-url"
                  type="url"
                  className={styles.input}
                  placeholder="https://github.com/fastapi/fastapi"
                  value={url}
                  onChange={e => { setUrl(e.target.value); }}
                  onBlur={() => setTouched(true)}
                  required
                  autoComplete="url"
                  spellCheck="false"
                  aria-describedby="repo-hint repo-error"
                  aria-invalid={showError ? 'true' : undefined}
                />
              </div>
              {/* Error only shown after interaction — mirrors :user-invalid CSS pattern */}
              <div
                id="repo-error"
                className={styles.errorMsg}
                role="alert"
                aria-live="polite"
                style={{ display: showError ? 'flex' : 'none' }}
              >
                <AlertCircle size={14} aria-hidden="true" />
                Please enter a valid GitHub URL (https://github.com/owner/repo)
              </div>
            </div>

            <button
              type="submit"
              id="analyze-btn"
              className={`btn btn-primary btn-lg ${styles.submitBtn}`}
              disabled={loading}
              aria-label={loading ? 'Starting analysis, please wait' : 'Start analysis'}
            >
              {loading
                ? <><Loader2 size={18} className={styles.spinning} aria-hidden="true" /> Starting…</>
                : <>Start Analysis <ArrowRight size={15} aria-hidden="true" /></>
              }
            </button>
          </form>

          <hr className={styles.divider} />

          <section aria-labelledby="examples-label">
            <p id="examples-label" className={styles.examplesLabel}>Or try an example:</p>
            <ul className={styles.exampleList} role="list">
              {EXAMPLE_REPOS.map(repo => (
                <li key={repo.url}>
                  <button type="button" className={styles.exampleBtn}
                    onClick={() => { setUrl(repo.url); setTouched(false); }}
                    aria-label={`Use ${repo.label} as example`}>
                    <span className="tag">{repo.lang}</span>
                    <span className={styles.exampleLabel}>{repo.label}</span>
                    <ArrowRight size={13} className={styles.exampleArrow} aria-hidden="true" />
                  </button>
                </li>
              ))}
            </ul>
          </section>

          <p className={styles.note}>Only public repositories are supported. Large repos may take up to 2 minutes.</p>
        </motion.article>
      </main>
    </div>
  );
}
