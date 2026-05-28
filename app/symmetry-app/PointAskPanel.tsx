'use client';

import { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { X, ArrowUp, CursorClick } from '@phosphor-icons/react';
import { ANNOTATIONS } from './point-ask-annotations';
import styles from './PointAskPanel.module.css';

type Message = { role: 'user' | 'assistant'; content: string };

interface Props {
  elementId: string;
  onClose: () => void;
}

export default function PointAskPanel({ elementId, onClose }: Props) {
  const annotation = ANNOTATIONS[elementId];
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 350);
  }, []);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || isLoading || !annotation) return;
    setInput('');

    const displayMsg: Message = { role: 'user', content: trimmed };
    const displayNext = [...messages, displayMsg];
    setMessages(displayNext);
    setIsLoading(true);

    // Inject element context into the first user message for the API call
    const apiMessages: Message[] = displayNext.map((m, i) => {
      if (m.role === 'user' && i === 0) {
        return {
          role: 'user' as const,
          content: `[The user is viewing the Symmetry dashboard prototype and clicked on "${annotation.label}". Design context: ${annotation.designContext}]\n\n${m.content}`,
        };
      }
      return m;
    });

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages }),
      });

      if (!res.ok || !res.body) throw new Error('Network error');

      setMessages((m) => [...m, { role: 'assistant', content: '' }]);
      setIsLoading(false);

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        setMessages((m) => {
          const updated = [...m];
          updated[updated.length - 1] = {
            ...updated[updated.length - 1],
            content: updated[updated.length - 1].content + chunk,
          };
          return updated;
        });
      }
    } catch {
      setIsLoading(false);
      setMessages((m) => [
        ...m,
        { role: 'assistant', content: "Couldn't connect right now. You can reach Julian at juliansam003@gmail.com." },
      ]);
    }
  }

  function handleKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(input); }
  }

  if (!annotation) return null;

  const showWelcome = messages.length === 0 && !isLoading;

  return (
    <motion.div
      className={styles.panel}
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', stiffness: 340, damping: 34 }}
    >
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <CursorClick size={13} weight="fill" className={styles.headerIcon} />
          <span className={styles.headerLabel}>{annotation.label}</span>
        </div>
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
          <X size={15} weight="regular" />
        </button>
      </div>

      {/* Short description */}
      <div className={styles.desc}>{annotation.shortDescription}</div>

      {/* Messages */}
      <div className={styles.messages}>
        {showWelcome ? (
          <motion.div
            className={styles.welcome}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08, duration: 0.25 }}
          >
            <p className={styles.welcomeHint}>Ask about this element:</p>
            <div className={styles.suggestions}>
              {annotation.suggestedQuestions.map((q, i) => (
                <motion.button
                  key={q}
                  className={styles.suggestion}
                  onClick={() => send(q)}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.07, duration: 0.2 }}
                  whileHover={{ x: 3 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <span className={styles.suggestionArrow}>↳</span>
                  {q}
                </motion.button>
              ))}
            </div>
          </motion.div>
        ) : (
          <div className={styles.thread}>
            <AnimatePresence initial={false}>
              {messages.map((m, i) =>
                m.role === 'user' ? (
                  <motion.div
                    key={i}
                    className={styles.userMsg}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  >
                    {m.content}
                  </motion.div>
                ) : (
                  <motion.div
                    key={i}
                    className={styles.botBlock}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  >
                    <p className={styles.botText}>{m.content}</p>
                  </motion.div>
                )
              )}
              {isLoading && (
                <motion.div
                  key="typing"
                  className={styles.typingRow}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  <span className={styles.dot} />
                  <span className={styles.dot} />
                  <span className={styles.dot} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className={styles.inputRow}>
        <input
          ref={inputRef}
          className={styles.input}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Ask about this design decision…"
          disabled={isLoading}
        />
        <motion.button
          className={styles.sendBtn}
          onClick={() => send(input)}
          disabled={!input.trim() || isLoading}
          aria-label="Send"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.88 }}
        >
          <ArrowUp size={14} weight="bold" />
        </motion.button>
      </div>
    </motion.div>
  );
}
