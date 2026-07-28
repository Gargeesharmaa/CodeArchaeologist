import React from 'react';
import { Layers, CheckCircle2, Shield, Code, Cpu, Database, FileText } from 'lucide-react';
import styles from './ArchOverview.module.css';

export default function ArchOverview({ project }) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.titleRow}>
          <Layers size={20} color="#6366f1" />
          <h2 className={styles.title}>Architecture Overview</h2>
        </div>
        <p className={styles.summary}>{project.summary}</p>
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <FileText size={18} color="#6366f1" />
          <div className={styles.statInfo}>
            <span className={styles.statVal}>{project.stats.totalFiles}</span>
            <span className={styles.statLbl}>Total Files</span>
          </div>
        </div>

        <div className={styles.statCard}>
          <Code size={18} color="#10b981" />
          <div className={styles.statInfo}>
            <span className={styles.statVal}>{project.stats.totalLines.toLocaleString()}</span>
            <span className={styles.statLbl}>Lines of Code</span>
          </div>
        </div>

        <div className={styles.statCard}>
          <Cpu size={18} color="#8b5cf6" />
          <div className={styles.statInfo}>
            <span className={styles.statVal}>{project.stats.dependencies}</span>
            <span className={styles.statLbl}>Dependencies</span>
          </div>
        </div>

        <div className={styles.statCard}>
          <Database size={18} color="#f59e0b" />
          <div className={styles.statInfo}>
            <span className={styles.statVal}>{project.stats.entryPoints}</span>
            <span className={styles.statLbl}>Entry Points</span>
          </div>
        </div>
      </div>

      <div className={styles.patternsSection}>
        <h3 className={styles.subTitle}>Design Patterns Detected</h3>
        <div className={styles.patternGrid}>
          {project.patterns.map(p => (
            <div key={p} className={styles.patternCard}>
              <CheckCircle2 size={16} color="#10b981" />
              <span className={styles.patternName}>{p}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.entrySection}>
        <h3 className={styles.subTitle}>Key Entry Points</h3>
        <ul className={styles.entryList}>
          {project.entryPoints.map(ep => (
            <li key={ep} className={styles.entryItem}>
              <span className="tag">Python</span>
              <span className={styles.entryPath}>{ep}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
