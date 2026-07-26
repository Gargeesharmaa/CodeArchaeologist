import React, { useState } from 'react';
import { Folder, FolderOpen, FileCode, ChevronRight, ChevronDown } from 'lucide-react';
import { MOCK_FILE_TREE } from '../../data/mockData';
import styles from './FileTree.module.css';

function TreeNode({ item, onFileClick, depth = 0 }) {
  const [open, setOpen] = useState(item.expanded || depth === 0);

  if (item.type === 'folder') {
    return (
      <div className={styles.treeFolder}>
        <button
          type="button"
          className={styles.folderRow}
          onClick={() => setOpen(!open)}
          style={{ paddingLeft: `${depth * 14 + 8}px` }}
          aria-expanded={open}
        >
          <span className={styles.chevron}>
            {open ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          </span>
          {open ? <FolderOpen size={14} color="#a5b4fc" /> : <Folder size={14} color="#818cf8" />}
          <span className={styles.folderName}>{item.name}</span>
        </button>
        {open && item.children && (
          <div className={styles.children}>
            {item.children.map(child => (
              <TreeNode key={child.id} item={child} onFileClick={onFileClick} depth={depth + 1} />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <button
      type="button"
      className={styles.fileRow}
      onClick={() => onFileClick(item.id, item.name)}
      style={{ paddingLeft: `${depth * 14 + 22}px` }}
    >
      <FileCode size={13} color="#6ee7b7" />
      <span className={styles.fileName}>{item.name}</span>
      {item.importance && (
        <span className={`${styles.importanceTag} ${styles[item.importance]}`}>
          {item.importance}
        </span>
      )}
    </button>
  );
}

export default function FileTree({ onFileClick }) {
  return (
    <div className={styles.treeContainer} role="tree" aria-label="Repository files">
      {MOCK_FILE_TREE.map(item => (
        <TreeNode key={item.id} item={item} onFileClick={onFileClick} />
      ))}
    </div>
  );
}
