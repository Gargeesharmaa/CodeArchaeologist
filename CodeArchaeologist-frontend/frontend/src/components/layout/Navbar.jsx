import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { GitBranch, Zap, ArrowLeft, Sun, Moon, Home } from 'lucide-react';
import styles from './Navbar.module.css';

export default function Navbar({ projectName, showProjectActions }) {
  const location = useLocation();
  const navigate = useNavigate();
  const onLanding = location.pathname === '/';

  // Initialize theme from localStorage or system preference (per modern-web-guidance)
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    const meta = document.querySelector('meta[name="color-scheme"]');
    if (meta) {
      meta.content = theme;
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  function toggleTheme() {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  }

  return (
    <header className={styles.header}>
      <nav className={styles.nav} aria-label="Main navigation">
        <div className={styles.leftGroup}>
          {/* Back button — navigate(-1) without page reload */}
          {!onLanding && (
            <button
              type="button"
              className={`btn btn-ghost btn-sm ${styles.backBtn}`}
              onClick={() => navigate(-1)}
              aria-label="Go back to previous page"
              title="Go Back"
            >
              <ArrowLeft size={15} aria-hidden="true" />
              <span>Back</span>
            </button>
          )}

          {/* Logo / Home */}
          <Link to="/" className={styles.logo} aria-label="CodeArchaeologist home">
            <div className={styles.logoIcon} aria-hidden="true">
              <GitBranch size={18} />
            </div>
            <span className={styles.logoText}>CodeArchaeologist</span>
          </Link>
        </div>

        {/* Center Project Badge */}
        {projectName && (
          <div className={styles.projectBadge} aria-label={`Analyzing project: ${projectName}`}>
            <div className="pulse-dot" aria-hidden="true" />
            <span>{projectName}</span>
          </div>
        )}

        {/* Right Action Buttons */}
        <div className={styles.actions}>
          {/* Theme Toggle Button */}
          <button
            type="button"
            className={styles.themeToggleBtn}
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? (
              <Sun size={16} color="#f59e0b" />
            ) : (
              <Moon size={16} color="#6366f1" />
            )}
          </button>

          {!onLanding && (
            <Link to="/" className={`btn btn-ghost btn-sm ${styles.homeLink}`} aria-label="Go to Home page">
              <Home size={14} aria-hidden="true" />
              <span>Home</span>
            </Link>
          )}

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
