import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GitBranch, Zap } from 'lucide-react';
import styles from './Navbar.module.css';

export default function Navbar({ projectName, showProjectActions }) {
  const location = useLocation();
  const onLanding = location.pathname === '/';

  return (
    <header className={styles.header}>
      <nav className={styles.nav} aria-label="Main navigation">
        <Link to="/" className={styles.logo} aria-label="CodeArchaeologist home">
          <div className={styles.logoIcon} aria-hidden="true">
            <GitBranch size={18} />
          </div>
          <span className={styles.logoText}>CodeArchaeologist</span>
        </Link>

        {projectName && (
          <div className={styles.projectBadge} aria-label={`Analyzing project: ${projectName}`}>
            <div className="pulse-dot" aria-hidden="true" />
            <span>{projectName}</span>
          </div>
        )}

        <div className={styles.actions}>
          {onLanding ? (
            <>
              <a href="#how-it-works" className="btn btn-ghost btn-sm">How it Works</a>
              <Link to="/analyze" className="btn btn-primary btn-sm">
                <Zap size={14} aria-hidden="true" /> Try it Free
              </Link>
            </>
          ) : showProjectActions ? (
            <>
              <button type="button" className="btn btn-ghost btn-sm">Export PDF</button>
              <button type="button" className="btn btn-ghost btn-sm">Share</button>
            </>
          ) : (
            <Link to="/analyze" className="btn btn-primary btn-sm">
              <Zap size={14} aria-hidden="true" /> Analyze Repo
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
