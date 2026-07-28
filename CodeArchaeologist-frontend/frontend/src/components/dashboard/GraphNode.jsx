import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { FileCode, Folder, Database, Terminal, Shield } from 'lucide-react';

const ICONS = {
  entry: <Terminal size={14} color="#a5b4fc" />,
  module: <Folder size={14} color="#c4b5fd" />,
  file: <FileCode size={14} color="#6ee7b7" />,
  db: <Database size={14} color="#fcd34d" />,
  config: <Shield size={14} color="#94a3b8" />,
};

const BORDER_COLORS = {
  entry: '#6366f1',
  module: '#8b5cf6',
  file: '#10b981',
  db: '#f59e0b',
  config: '#64748b',
};

const BG_COLORS = {
  entry: 'rgba(99, 102, 241, 0.15)',
  module: 'rgba(139, 92, 246, 0.15)',
  file: 'rgba(16, 185, 129, 0.15)',
  db: 'rgba(245, 158, 11, 0.15)',
  config: 'rgba(100, 116, 139, 0.15)',
};

export const GraphNode = memo(({ data, variant = 'file' }) => {
  const borderColor = BORDER_COLORS[variant] || BORDER_COLORS.file;
  const bgColor = BG_COLORS[variant] || BG_COLORS.file;

  return (
    <div
      style={{
        padding: '8px 14px',
        borderRadius: '10px',
        background: 'var(--bg-card)',
        border: `1.5px solid ${borderColor}`,
        boxShadow: `0 0 16px ${bgColor}`,
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '12px',
        fontFamily: 'JetBrains Mono, monospace',
        color: 'var(--text-primary)',
        cursor: 'pointer',
        minWidth: '110px',
      }}
    >
      <Handle type="target" position={Position.Top} style={{ background: borderColor }} />
      {ICONS[variant] || ICONS.file}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
        <span style={{ fontWeight: 600 }}>{data.label}</span>
        {data.lines && <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{data.lines} lines</span>}
        {data.files && <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{data.files} files</span>}
      </div>
      <Handle type="source" position={Position.Bottom} style={{ background: borderColor }} />
    </div>
  );
});

GraphNode.displayName = 'GraphNode';
