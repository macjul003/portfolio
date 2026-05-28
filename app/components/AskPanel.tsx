'use client';

import { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'motion/react';
import { Info, ArrowCounterClockwise, X, ArrowUp } from '@phosphor-icons/react';
import { useAskPanel } from './AskPanelContext';
import styles from './AskPanel.module.css';

type Message = { role: 'user' | 'assistant'; content: string };

const WELCOME_SUGGESTIONS: Record<string, string[]> = {
  '/about':         ["How do you balance design and engineering?", "What skills do you bring as a designer?", "What projects are you most proud of?"],
  '/':              ["Who is Julian?", "What case studies are available?", "What's Julian working on now?"],
  '/work/symmetry': ["What is Symmetry?", "What was the biggest challenge?", "What was Julian's role?"],
};

function getSuggestions(pathname: string) {
  return WELCOME_SUGGESTIONS[pathname] ?? WELCOME_SUGGESTIONS['/'];
}

export default function AskPanel() {
  const pathname = usePathname();
  const { open, setOpen } = useAskPanel();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [followUps, setFollowUps] = useState<string[]>([]);
  const [isLoadingFollowUps, setIsLoadingFollowUps] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef  = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300);
  }, [open]);

  function reset() {
    setMessages([]);
    setInput('');
    setIsLoading(false);
    setFollowUps([]);
    setIsLoadingFollowUps(false);
  }

  async function fetchFollowUps(msgs: Message[]) {
    setIsLoadingFollowUps(true);
    setFollowUps([]);
    try {
      const res = await fetch('/api/follow-ups', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: msgs }),
      });
      const data = await res.json();
      if (data.followUps?.length) setFollowUps(data.followUps);
    } catch {}
    setIsLoadingFollowUps(false);
  }

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;
    setInput('');
    setFollowUps([]);
    setIsLoadingFollowUps(false);

    const next: Message[] = [...messages, { role: 'user', content: trimmed }];
    setMessages(next);
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next }),
      });

      if (!res.ok || !res.body) throw new Error('Network error');

      // Append an empty assistant message, then stream into it
      setMessages((m) => [...m, { role: 'assistant', content: '' }]);
      setIsLoading(false);

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let assistantContent = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        assistantContent += chunk;
        setMessages((m) => {
          const updated = [...m];
          updated[updated.length - 1] = {
            ...updated[updated.length - 1],
            content: updated[updated.length - 1].content + chunk,
          };
          return updated;
        });
      }

      // Fetch dynamic follow-ups after response is complete
      fetchFollowUps([...next, { role: 'assistant', content: assistantContent }]);
    } catch {
      setIsLoading(false);
      setMessages((m) => [...m, { role: 'assistant', content: "Sorry, I couldn't connect right now. You can reach Julian directly at juliansam003@gmail.com." }]);
    }
  }

  function handleKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(input); }
  }

  const showWelcome = messages.length === 0 && !isLoading;

  return (
    <AnimatePresence>
      {open && (
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
              <span className={styles.brand}>JULIANLM</span>
              <div
                className={styles.infoWrap}
                data-tooltip="JulianLM is an AI chatbot. May contain hallucinations. Responses are logged for research and development purposes."
              >
                <button className={styles.iconBtn} aria-label="Info">
                  <Info size={15} weight="regular" />
                </button>
              </div>
            </div>
            <div className={styles.headerRight}>
              <motion.button
                className={styles.iconBtn}
                onClick={reset}
                aria-label="Reset"
                whileHover={{ rotate: -30 }}
                whileTap={{ rotate: -180 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              >
                <ArrowCounterClockwise size={16} weight="regular" />
              </motion.button>
              <motion.button
                className={styles.iconBtn}
                onClick={() => setOpen(false)}
                aria-label="Close"
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
              >
                <X size={16} weight="regular" />
              </motion.button>
            </div>
          </div>

          {/* Messages */}
          <div className={styles.messages}>
            {showWelcome ? (
              <motion.div
                className={styles.welcome}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.3 }}
              >
                <p className={styles.welcomeTitle}>Welcome to JulianLM.</p>
                <div className={styles.suggestions}>
                  {getSuggestions(pathname).map((q, i) => (
                    <motion.button
                      key={q}
                      className={styles.suggestion}
                      onClick={() => send(q)}
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.18 + i * 0.07, duration: 0.22 }}
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
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      >
                        {m.content}
                      </motion.div>
                    ) : (
                      <motion.div
                        key={i}
                        className={styles.botBlock}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      >
                        <p className={styles.botText}>{m.content}</p>
                        {i === messages.length - 1 && !isLoading && m.content && (
                          <div className={styles.followUps}>
                            {isLoadingFollowUps ? (
                              <>
                                {[0, 1, 2].map(fi => (
                                  <div key={fi} className={styles.suggestionSkeleton} />
                                ))}
                              </>
                            ) : (
                              <AnimatePresence>
                                {followUps.map((q, fi) => (
                                  <motion.button
                                    key={q}
                                    className={styles.suggestion}
                                    onClick={() => send(q)}
                                    initial={{ opacity: 0, x: -4 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: fi * 0.07, duration: 0.22 }}
                                    whileHover={{ x: 3 }}
                                    whileTap={{ scale: 0.97 }}
                                  >
                                    <span className={styles.suggestionArrow}>↳</span>
                                    {q}
                                  </motion.button>
                                ))}
                              </AnimatePresence>
                            )}
                          </div>
                        )}
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
              placeholder="Ask about Julian…"
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
              <ArrowUp size={15} weight="bold" />
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
