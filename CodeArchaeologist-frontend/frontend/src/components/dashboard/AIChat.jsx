import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, CornerDownLeft } from 'lucide-react';
import { MOCK_CHAT_RESPONSES } from '../../data/mockData';
import styles from './AIChat.module.css';

export default function AIChat({ projectId }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: "👋 Hi! I'm Gemini 2.5 Flash. I've analyzed this entire codebase. Ask me anything like *'Where is authentication handled?'* or *'What is the entry point?'*",
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  function handleSend(e) {
    e.preventDefault();
    const query = input.trim();
    if (!query) return;

    const userMsg = { id: Date.now(), sender: 'user', text: query };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response matching triggers in mock data
    setTimeout(() => {
      const lower = query.toLowerCase();
      let matched = MOCK_CHAT_RESPONSES.find(item =>
        item.triggers.some(t => lower.includes(t))
      );

      const aiText = matched
        ? matched.response
        : `I searched the codebase for "${query}". Based on my analysis, this project relies on FastAPI routers and Pydantic schemas. Let me know if you'd like to trace a specific route or dependency!`;

      setMessages(prev => [
        ...prev,
        { id: Date.now() + 1, sender: 'ai', text: aiText },
      ]);
      setIsTyping(false);
    }, 1000);
  }

  return (
    <div className={styles.chatContainer}>
      <div className={styles.messageList} role="log" aria-label="AI chat message history">
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`${styles.messageBubble} ${
              msg.sender === 'user' ? styles.userBubble : styles.aiBubble
            }`}
          >
            <div className={styles.avatar}>
              {msg.sender === 'user' ? (
                <User size={14} color="#fff" />
              ) : (
                <Bot size={14} color="#a5b4fc" />
              )}
            </div>
            <div className={styles.messageContent}>
              <span className={styles.senderName}>
                {msg.sender === 'user' ? 'You' : 'Gemini AI'}
              </span>
              <div className={styles.messageText}>{msg.text}</div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className={`${styles.messageBubble} ${styles.aiBubble}`}>
            <div className={styles.avatar}>
              <Bot size={14} color="#a5b4fc" />
            </div>
            <div className={styles.typingIndicator}>
              <Sparkles size={14} className={styles.sparkleIcon} />
              <span>Analyzing codebase…</span>
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      <form className={styles.inputForm} onSubmit={handleSend}>
        <input
          type="text"
          className={styles.chatInput}
          placeholder="Ask AI about this codebase..."
          value={input}
          onChange={e => setInput(e.target.value)}
          aria-label="Ask AI assistant about codebase"
        />
        <button type="submit" className={styles.sendBtn} aria-label="Send message">
          <Send size={14} />
        </button>
      </form>
    </div>
  );
}
