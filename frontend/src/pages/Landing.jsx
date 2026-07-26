import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GitBranch, Map, Zap, Code2, BookOpen, GitMerge, Terminal, ArrowRight } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import { EXAMPLE_REPOS } from '../data/mockData';
import styles from './Landing.module.css';

const FEATURES = [
  { icon: <Map size={22} aria-hidden="true" />, color: '#6366f1', title: 'Interactive Dependency Graph', desc: 'See how every file, class, and function connects to each other in a beautiful explorable graph.' },
  { icon: <Zap size={22} aria-hidden="true" />, color: '#8b5cf6', title: 'AI Architecture Analysis', desc: 'Gemini 2.5 Flash reads your entire codebase and explains design patterns, entry points, and key data flows.' },
  { icon: <BookOpen size={22} aria-hidden="true" />, color: '#10b981', title: 'Guided Learning Challenges', desc: 'Step-by-step quests like "trace the login flow" make understanding code feel like a game.' },
  { icon: <Code2 size={22} aria-hidden="true" />, color: '#06b6d4', title: 'Instant Code Explanations', desc: 'Click any file or node and get a plain-English AI explanation with context of why it exists.' },
  { icon: <GitMerge size={22} aria-hidden="true" />, color: '#f59e0b', title: 'Data Flow Tracing', desc: 'Follow how a request travels from the API endpoint all the way to the database and back.' },
  { icon: <Terminal size={22} aria-hidden="true" />, color: '#ec4899', title: 'Multi-Language Support', desc: 'Python, JavaScript, TypeScript, Go, Java and more — powered by Tree-sitter AST parsing.' },
];

const HOW_IT_WORKS = [
  { step: '01', title: 'Paste a GitHub URL', desc: 'Drop any public repository link. CodeArchaeologist clones and reads every file automatically.', color: '#6366f1' },
  { step: '02', title: 'AI Builds the Map', desc: 'Gemini 2.5 Flash maps all dependencies, understands the architecture, and identifies key patterns.', color: '#8b5cf6' },
  { step: '03', title: 'Explore Visually', desc: 'Navigate the interactive graph, ask the AI questions, and complete guided learning challenges.', color: '#10b981' },
];

const STATS = [
  { value: '100k+', label: 'Lines analyzed' },
  { value: '10+',   label: 'Languages' },
  { value: '< 5min', label: 'Onboarding time' },
  { value: '95%',   label: 'Faster than manual' },
];

const fadeUp = { hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0 } };

export default function Landing() {
  const navigate = useNavigate();
  const [quickUrl, setQuickUrl] = useState('');

  function handleQuickAnalyze(e) {
    e.preventDefault();
    navigate('/analyze', { state: { prefill: quickUrl.trim() || undefined } });
  }

  return (
    <div className="page-wrapper">
      <div className="bg-orbs" aria-hidden="true">
        <div className="bg-orb bg-orb-1" />
        <div className="bg-orb bg-orb-2" />
        <div className="bg-orb bg-orb-3" />
      </div>
      <Navbar />

      {/* ── Hero ── */}
      <section className={styles.hero} aria-labelledby="hero-heading">
        <div className={styles.heroContent}>
          <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.45 }}>
            <span className="badge badge-purple"><Zap size={11} aria-hidden="true" /> Powered by Gemini 2.5 Flash</span>
          </motion.div>

          <motion.h1 id="hero-heading" className={styles.heroTitle} initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.45, delay: 0.1 }}>
            Understand Any Codebase<br />
            <span className="gradient-text">In Minutes, Not Days</span>
          </motion.h1>

          <motion.p className={styles.heroSubtitle} initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.45, delay: 0.2 }}>
            Paste a GitHub repo. Get an interactive visual map of the architecture, AI-powered explanations, and guided learning challenges — instantly.
          </motion.p>

          <motion.form className={styles.quickBar} onSubmit={handleQuickAnalyze} initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.45, delay: 0.3 }} aria-label="Quick repository analysis">
            <label htmlFor="quick-url" className="sr-only">GitHub repository URL</label>
            <GitBranch size={16} aria-hidden="true" className={styles.quickIcon} />
            <input
              id="quick-url"
              type="url"
              className={styles.quickInput}
              placeholder="https://github.com/owner/repo"
              value={quickUrl}
              onChange={e => setQuickUrl(e.target.value)}
              autoComplete="url"
              spellCheck="false"
            />
            <button type="submit" className="btn btn-primary">Analyze <ArrowRight size={14} aria-hidden="true" /></button>
          </motion.form>

          <motion.div className={styles.examples} initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.45, delay: 0.38 }}>
            <span className={styles.examplesLabel}>Try:</span>
            {EXAMPLE_REPOS.map(r => (
              <button
                key={r.url} type="button"
                className={styles.exampleChip}
                onClick={() => navigate('/analyze', { state: { prefill: r.url } })}
                aria-label={`Analyze example: ${r.label}`}
              >
                <span className="tag">{r.lang}</span>{r.label}
              </button>
            ))}
          </motion.div>

          <motion.dl className={styles.statsRow} initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.45, delay: 0.45 }}>
            {STATS.map(s => (
              <div key={s.label} className={styles.statItem}>
                <dt className={styles.statLabel}>{s.label}</dt>
                <dd className={styles.statValue}>{s.value}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* Hero visual */}
        <motion.div className={styles.heroVisual} initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.3 }} aria-hidden="true">
          <div className={styles.mockDashboard}>
            <div className={styles.mockBar}>
              <span className={styles.dot} style={{ background: '#ef4444' }} />
              <span className={styles.dot} style={{ background: '#f59e0b' }} />
              <span className={styles.dot} style={{ background: '#10b981' }} />
              <span className={styles.mockTitle}>CodeArchaeologist — fastapi/fastapi</span>
            </div>
            <div className={styles.mockBody}>
              <aside className={styles.mockSidebar}>
                {['📄 main.py', '📁 routers/', '📁 models/', '📁 services/', '🗄️ database.py'].map((f, i) => (
                  <div key={f} className={styles.mockFile} style={{ opacity: i === 0 ? 1 : 0.55, background: i === 0 ? 'rgba(99,102,241,0.18)' : 'transparent' }}>
                    <span style={{ fontSize: 11, color: i === 0 ? '#a5b4fc' : 'var(--text-muted)' }}>{f}</span>
                  </div>
                ))}
              </aside>
              <div className={styles.mockGraph}>
                <svg width="100%" height="100%" viewBox="0 0 280 170" role="img" aria-label="Sample dependency graph">
                  <defs><filter id="g"><feGaussianBlur stdDeviation="2.5" result="b"/><feComposite in="SourceGraphic" in2="b" operator="over"/></filter></defs>
                  <line x1="140" y1="32" x2="60" y2="84"  stroke="rgba(99,102,241,0.5)" strokeWidth="1.5" strokeDasharray="5 3"/>
                  <line x1="140" y1="32" x2="140" y2="84" stroke="rgba(99,102,241,0.5)" strokeWidth="1.5" strokeDasharray="5 3"/>
                  <line x1="140" y1="32" x2="220" y2="84" stroke="rgba(99,102,241,0.5)" strokeWidth="1.5" strokeDasharray="5 3"/>
                  <line x1="60"  y1="84" x2="60"  y2="138" stroke="rgba(139,92,246,0.35)" strokeWidth="1"/>
                  <line x1="140" y1="84" x2="140" y2="138" stroke="rgba(139,92,246,0.35)" strokeWidth="1"/>
                  <line x1="220" y1="84" x2="220" y2="138" stroke="rgba(139,92,246,0.35)" strokeWidth="1"/>
                  <circle cx="140" cy="28" r="18" fill="rgba(99,102,241,0.22)" stroke="#6366f1" strokeWidth="2" filter="url(#g)"/>
                  <text x="140" y="32" textAnchor="middle" fontSize="8" fill="#a5b4fc" fontFamily="JetBrains Mono,monospace">main</text>
                  <circle cx="60"  cy="84" r="13" fill="rgba(139,92,246,0.18)" stroke="#8b5cf6" strokeWidth="1.5"/>
                  <text x="60"  y="88" textAnchor="middle" fontSize="7" fill="#c4b5fd" fontFamily="JetBrains Mono,monospace">routers</text>
                  <circle cx="140" cy="84" r="13" fill="rgba(139,92,246,0.18)" stroke="#8b5cf6" strokeWidth="1.5"/>
                  <text x="140" y="88" textAnchor="middle" fontSize="7" fill="#c4b5fd" fontFamily="JetBrains Mono,monospace">models</text>
                  <circle cx="220" cy="84" r="13" fill="rgba(139,92,246,0.18)" stroke="#8b5cf6" strokeWidth="1.5"/>
                  <text x="220" y="88" textAnchor="middle" fontSize="7" fill="#c4b5fd" fontFamily="JetBrains Mono,monospace">services</text>
                  <circle cx="60"  cy="138" r="11" fill="rgba(16,185,129,0.18)" stroke="#10b981" strokeWidth="1.5"/>
                  <text x="60"  y="142" textAnchor="middle" fontSize="6.5" fill="#6ee7b7" fontFamily="JetBrains Mono,monospace">auth</text>
                  <circle cx="140" cy="138" r="11" fill="rgba(16,185,129,0.18)" stroke="#10b981" strokeWidth="1.5"/>
                  <text x="140" y="142" textAnchor="middle" fontSize="6.5" fill="#6ee7b7" fontFamily="JetBrains Mono,monospace">User</text>
                  <circle cx="220" cy="138" r="11" fill="rgba(16,185,129,0.18)" stroke="#10b981" strokeWidth="1.5"/>
                  <text x="220" y="142" textAnchor="middle" fontSize="6.5" fill="#6ee7b7" fontFamily="JetBrains Mono,monospace">db</text>
                </svg>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── How it Works ── */}
      <section id="how-it-works" className={styles.section} aria-labelledby="hiw-heading">
        <div className={styles.inner}>
          <div className={styles.sectionHeader}>
            <span className="badge badge-purple">Simple Process</span>
            <h2 id="hiw-heading" className={styles.sectionTitle}>How It Works</h2>
            <p className={styles.sectionSubtitle}>From repo URL to visual understanding in under 5 minutes</p>
          </div>
          <ol className={styles.stepsGrid} aria-label="How CodeArchaeologist works">
            {HOW_IT_WORKS.map((step, i) => (
              <motion.li key={step.step} className={styles.stepCard} style={{ '--step-color': step.color }}
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.1 }}>
                <span className={styles.stepNum} aria-label={`Step ${step.step}`}>{step.step}</span>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDesc}>{step.desc}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Features ── */}
      <section className={styles.section} aria-labelledby="features-heading">
        <div className={styles.inner}>
          <div className={styles.sectionHeader}>
            <span className="badge badge-emerald">Everything You Need</span>
            <h2 id="features-heading" className={styles.sectionTitle}>Built for Developers</h2>
            <p className={styles.sectionSubtitle}>Every feature designed to cut codebase onboarding from days to hours</p>
          </div>
          <ul className={styles.featuresGrid} role="list">
            {FEATURES.map((f, i) => (
              <motion.li key={f.title} className={styles.featureCard}
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.07 }}>
                <div className={styles.featureIcon} style={{ '--icon-color': f.color }} aria-hidden="true">{f.icon}</div>
                <h3 className={styles.featureTitle}>{f.title}</h3>
                <p className={styles.featureDesc}>{f.desc}</p>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className={styles.ctaSection} aria-labelledby="cta-heading">
        <div className={styles.inner}>
          <motion.div className={styles.ctaBox} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h2 id="cta-heading" className={styles.ctaTitle}>Start Understanding Code Today</h2>
            <p className={styles.ctaSubtitle}>No sign-up required. Just paste a GitHub URL and go.</p>
            <button type="button" className="btn btn-primary btn-lg" onClick={() => navigate('/analyze')}>
              <Zap size={18} aria-hidden="true" /> Analyze a Repository
            </button>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className={styles.footer} role="contentinfo">
        <div className={styles.inner}>
          <div className={styles.footerRow}>
            <div className={styles.footerLogo}>
              <div className={styles.footerLogoIcon} aria-hidden="true"><GitBranch size={14} /></div>
              <span>CodeArchaeologist</span>
            </div>
            <p className={styles.footerNote}>Built with ❤️ at the hackathon · Powered by Gemini 2.5 Flash</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
