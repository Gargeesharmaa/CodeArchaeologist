import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { ReactFlow, Background, Controls, MiniMap, useNodesState, useEdgesState, Panel } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { motion, AnimatePresence } from 'framer-motion';
import { Map, FileText, BookOpen, Layers, ChevronRight, X } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import FileTree from '../components/dashboard/FileTree.jsx';
import AIChat from '../components/dashboard/AIChat.jsx';
import ChallengePanel from '../components/dashboard/ChallengePanel.jsx';
import ArchOverview from '../components/dashboard/ArchOverview.jsx';
import CodeViewerDialog from '../components/dashboard/CodeViewerDialog.jsx';
import { MOCK_PROJECT, MOCK_GRAPH_NODES, MOCK_GRAPH_EDGES, MOCK_FILE_CONTENTS, MOCK_AI_EXPLANATIONS } from '../data/mockData';
import { GraphNode } from '../components/dashboard/GraphNode.jsx';
import styles from './Dashboard.module.css';

const nodeTypes = {
  entryNode:  (props) => <GraphNode {...props} variant="entry" />,
  moduleNode: (props) => <GraphNode {...props} variant="module" />,
  fileNode:   (props) => <GraphNode {...props} variant="file" />,
  dbNode:     (props) => <GraphNode {...props} variant="db" />,
};

const TABS = [
  { id: 'graph',     label: 'Dependency Graph',    icon: <Map size={14} /> },
  { id: 'arch',      label: 'Architecture',         icon: <Layers size={14} /> },
  { id: 'challenges',label: 'Learning Challenges',  icon: <BookOpen size={14} /> },
];

export default function Dashboard() {
  const { projectId } = useParams();
  const location = useLocation();
  const project = MOCK_PROJECT; // TODO: replace with getProject(projectId) when backend ready

  const [nodes, , onNodesChange] = useNodesState(MOCK_GRAPH_NODES);
  const [edges, , onEdgesChange] = useEdgesState(MOCK_GRAPH_EDGES);

  const [activeTab, setActiveTab] = useState('graph');
  const [selectedNode, setSelectedNode] = useState(null);
  const [dialogFile, setDialogFile] = useState(null); // { id, name, content, explanation }
  const [rightPanelOpen, setRightPanelOpen] = useState(true);
  const mainRef = useRef(null);
  const dialogRef = useRef(null);

  // Open code viewer dialog — using native <dialog> per web guidance
  function openCodeViewer(fileId, fileName) {
    const content = MOCK_FILE_CONTENTS[fileId] || `# ${fileName}\n# Code content would load from backend`;
    const explanation = MOCK_AI_EXPLANATIONS[fileId] || `This file is part of the ${project.name} codebase.`;
    setDialogFile({ id: fileId, name: fileName, content, explanation });
  }

  useEffect(() => {
    if (dialogFile && dialogRef.current) {
      dialogRef.current.showModal();
    }
  }, [dialogFile]);

  function closeDialog() {
    dialogRef.current?.close();
    setDialogFile(null);
  }

  function onNodeClick(_, node) {
    setSelectedNode(node);
  }

  return (
    <div className="page-wrapper">
      <Navbar projectName={project.name} showProjectActions />

      {/* Apply inert to main content when dialog is open (web guidance) */}
      <div className={styles.shell} ref={mainRef} inert={dialogFile ? '' : undefined}>
        {/* ── LEFT: File Tree ── */}
        <aside className={styles.sidebar} aria-label="File explorer">
          <div className={styles.panelHeader}>
            <FileText size={14} aria-hidden="true" />
            <span>File Explorer</span>
          </div>
          <FileTree onFileClick={openCodeViewer} />
        </aside>

        {/* ── CENTER: Tab panel ── */}
        <main className={styles.centerPanel} id="main" aria-label="Main analysis area">
          {/* Tab navigation */}
          <nav className={styles.tabs} aria-label="Dashboard sections" role="tablist">
            {TABS.map(tab => (
              <button
                key={tab.id}
                role="tab"
                type="button"
                id={`tab-${tab.id}`}
                aria-selected={activeTab === tab.id}
                aria-controls={`panel-${tab.id}`}
                className={`${styles.tab} ${activeTab === tab.id ? styles.tabActive : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </nav>

          {/* Graph panel */}
          <div
            id="panel-graph"
            role="tabpanel"
            aria-labelledby="tab-graph"
            className={styles.graphPanel}
            style={{ display: activeTab === 'graph' ? 'flex' : 'none' }}
          >
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onNodeClick={onNodeClick}
              nodeTypes={nodeTypes}
              fitView
              colorMode="dark"
              proOptions={{ hideAttribution: true }}
            >
              <Background color="rgba(99,102,241,0.08)" gap={24} />
              <Controls />
              <MiniMap nodeColor={() => '#6366f1'} maskColor="rgba(10,10,15,0.7)" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }} />

              {/* Node info panel */}
              {selectedNode && (
                <Panel position="top-left">
                  <motion.div className={styles.nodeInfo} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
                    <div className={styles.nodeInfoHeader}>
                      <span className={styles.nodeInfoName}>{selectedNode.data.label}</span>
                      <button type="button" onClick={() => setSelectedNode(null)} aria-label="Close node info" className={styles.closeBtn}><X size={14} /></button>
                    </div>
                    <div className={styles.nodeInfoMeta}>
                      <span className="tag">{selectedNode.data.type}</span>
                      {selectedNode.data.lines && <span className={styles.metaItem}>{selectedNode.data.lines} lines</span>}
                      {selectedNode.data.files && <span className={styles.metaItem}>{selectedNode.data.files} files</span>}
                    </div>
                    <button type="button" className="btn btn-primary btn-sm"
                      style={{ marginTop: 10 }}
                      onClick={() => openCodeViewer(selectedNode.id, selectedNode.data.label)}>
                      View Code <ChevronRight size={13} aria-hidden="true" />
                    </button>
                  </motion.div>
                </Panel>
              )}
            </ReactFlow>
          </div>

          {/* Architecture panel */}
          <div
            id="panel-arch"
            role="tabpanel"
            aria-labelledby="tab-arch"
            style={{ display: activeTab === 'arch' ? 'flex' : 'none', flex: 1, overflow: 'auto' }}
          >
            <ArchOverview project={project} />
          </div>

          {/* Challenges panel */}
          <div
            id="panel-challenges"
            role="tabpanel"
            aria-labelledby="tab-challenges"
            style={{ display: activeTab === 'challenges' ? 'flex' : 'none', flex: 1, overflow: 'auto' }}
          >
            <ChallengePanel onNodeHighlight={setSelectedNode} />
          </div>
        </main>

        {/* ── RIGHT: AI Chat ── */}
        <AnimatePresence>
          {rightPanelOpen && (
            <motion.aside
              className={styles.rightPanel}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              aria-label="AI assistant"
            >
              <div className={styles.panelHeader}>
                <span>🤖</span>
                <span>AI Chat</span>
                <button type="button" onClick={() => setRightPanelOpen(false)} aria-label="Close AI chat panel" className={`${styles.closeBtn} ${styles.closeBtnRight}`}>
                  <X size={14} />
                </button>
              </div>
              <AIChat projectId={projectId} />
            </motion.aside>
          )}
        </AnimatePresence>

        {!rightPanelOpen && (
          <button type="button" className={styles.openChatBtn} onClick={() => setRightPanelOpen(true)} aria-label="Open AI chat">
            🤖
          </button>
        )}
      </div>

      {/* ── Code Viewer Dialog — native <dialog> per web guidance ── */}
      <CodeViewerDialog dialogRef={dialogRef} file={dialogFile} onClose={closeDialog} />
    </div>
  );
}
