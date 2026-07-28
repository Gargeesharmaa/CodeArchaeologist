import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  GitBranch,
  ArrowRight,
  AlertCircle,
  Loader2,
} from "lucide-react";

import Navbar from "../components/layout/Navbar";
import { EXAMPLE_REPOS } from "../data/mockData";
import { analyzeRepo } from "../api/client";

import styles from "./Analyze.module.css";

function isValidGithubUrl(url) {
  try {
    const u = new URL(url);
    const parts = u.pathname.split("/").filter(Boolean);

    return (
      (u.hostname === "github.com" ||
        u.hostname === "www.github.com") &&
      parts.length >= 2
    );
  } catch {
    return false;
  }
}

export default function Analyze() {
  const navigate = useNavigate();
  const location = useLocation();

  const [url, setUrl] = useState(
    location.state?.prefill || ""
  );

  const [touched, setTouched] = useState(false);
  const [loading, setLoading] = useState(false);

  const isValid = isValidGithubUrl(url.trim());

  const showError =
    touched &&
    url.trim() !== "" &&
    !isValid;

 async function handleSubmit(e) {
  e.preventDefault();

  setTouched(true);

  if (!isValid) return;

  try {
    setLoading(true);

    const result = await analyzeRepo(url.trim());

    // Navigate straight to your Dashboard page
    navigate(`/dashboard/${result.analysis_id}`, {
      state: {
        analysis: result.analysis,
        analysisId: result.analysis_id,
        repoUrl: url.trim(),
      },
    });
  } catch (err) {
    alert(err.message || "An error occurred during analysis.");
  } finally {
    setLoading(false);
  }
}

  return (
    <div className="page-wrapper">
      <div className="bg-orbs" aria-hidden="true">
        <div className="bg-orb bg-orb-1" />
        <div className="bg-orb bg-orb-2" />
      </div>

      <Navbar />

      <main className={styles.main} id="main">
        <motion.article
          className={styles.card}
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className={styles.cardHeader}>
            <div
              className={styles.iconWrap}
              aria-hidden="true"
            >
              <GitBranch size={22} />
            </div>

            <div>
              <h1 className={styles.title}>
                Analyze a Repository
              </h1>

              <p className={styles.subtitle}>
                Paste any public GitHub repository URL
                to begin.
              </p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            noValidate
          >
            <div className={styles.fieldGroup}>
              <label
                htmlFor="repo-url"
                className={styles.label}
              >
                GitHub Repository URL
              </label>

              <span
                id="repo-hint"
                className={styles.hint}
              >
                Format:
                https://github.com/owner/repository
              </span>

              <div className={styles.inputWrap}>
                <GitBranch
                  size={16}
                  className={styles.inputIcon}
                />

                <input
                  id="repo-url"
                  type="url"
                  className={styles.input}
                  placeholder="https://github.com/fastapi/fastapi"
                  value={url}
                  onChange={(e) =>
                    setUrl(e.target.value)
                  }
                  onBlur={() =>
                    setTouched(true)
                  }
                  required
                  autoComplete="url"
                  spellCheck={false}
                  aria-describedby="repo-hint repo-error"
                  aria-invalid={
                    showError ? "true" : undefined
                  }
                />
              </div>

              <div
                id="repo-error"
                className={styles.errorMsg}
                role="alert"
                aria-live="polite"
                style={{
                  display: showError
                    ? "flex"
                    : "none",
                }}
              >
                <AlertCircle size={14} />

                Please enter a valid GitHub
                repository URL.
              </div>
            </div>

            <button
              type="submit"
              className={`btn btn-primary btn-lg ${styles.submitBtn}`}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2
                    size={18}
                    className={styles.spinning}
                  />
                  Analyzing...
                </>
              ) : (
                <>
                  Start Analysis
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          <hr className={styles.divider} />

          <section>
            <p className={styles.examplesLabel}>
              Try an example:
            </p>

            <ul
              className={styles.exampleList}
            >
              {EXAMPLE_REPOS.map((repo) => (
                <li key={repo.url}>
                  <button
                    type="button"
                    className={
                      styles.exampleBtn
                    }
                    onClick={() => {
                      setUrl(repo.url);
                      setTouched(false);
                    }}
                  >
                    <span className="tag">
                      {repo.lang}
                    </span>

                    <span
                      className={
                        styles.exampleLabel
                      }
                    >
                      {repo.label}
                    </span>

                    <ArrowRight
                      size={13}
                      className={
                        styles.exampleArrow
                      }
                    />
                  </button>
                </li>
              ))}
            </ul>
          </section>

          <p className={styles.note}>
            Only public repositories are
            supported.
          </p>
        </motion.article>
      </main>
    </div>
  );
}