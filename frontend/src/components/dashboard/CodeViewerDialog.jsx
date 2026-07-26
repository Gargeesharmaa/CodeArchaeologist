import React, { useEffect } from 'react';
import { X, Sparkles, Code2, Copy, Check } from 'lucide-react';
import styles from './CodeViewerDialog.module.css';

export default function CodeViewerDialog({ dialogRef, file, onClose }) {
  const [copied, setCopied] = React.useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    // Fallback light-dismiss for Safari per web guidance (light-dismiss-a-dialog guide)
    if (!('closedBy' in HTMLDialogElement.prototype)) {
      const handleClick = (e) => {
        if (e.target !== dialog) return;
        const rect = dialog.getBoundingClientRect();
        const isContent = (
          rect.top <= e.clientY && e.clientY <= rect.top + rect.height &&
          rect.left <= e.clientX && e.clientX <= rect.left + rect.width
        );
        if (!isContent) {
          dialog.close();
          onClose();
        }
      };
      dialog.addEventListener('click', handleClick);
      return () => dialog.removeEventListener('click', handleClick);
    }
  }, [dialogRef, onClose]);

  if (!file) return null;

  function copyCode() {
    navigator.clipboard.writeText(file.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      closedby="any"
      aria-labelledby="dialog-file-title"
      onClose={onClose}
    >
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <Code2 size={16} color="#6ee7b7" />
            <h2 id="dialog-file-title" className={styles.title}>{file.name}</h2>
            <span className="tag">Python</span>
          </div>

          <div className={styles.headerRight}>
            <button type="button" className="btn btn-ghost btn-sm" onClick={copyCode}>
              {copied ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
              {copied ? 'Copied' : 'Copy'}
            </button>
            <button
              type="button"
              className={styles.closeBtn}
              onClick={() => { dialogRef.current?.close(); onClose(); }}
              aria-label="Close dialog"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* AI Explanation Banner */}
        <div className={styles.aiBanner}>
          <div className={styles.aiHeader}>
            <Sparkles size={14} color="#8b5cf6" />
            <span>AI Code Explanation</span>
          </div>
          <p className={styles.aiText}>{file.explanation}</p>
        </div>

        {/* Code Content — pre + code with tabindex="0" per web guidance */}
        <figure className={styles.codeFigure}>
          <pre className={styles.pre} tabIndex={0}>
            <code className={styles.code}>{file.content}</code>
          </pre>
        </figure>
      </div>
    </dialog>
  );
}
