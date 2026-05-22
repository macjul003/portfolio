'use client';

import { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'motion/react';
import { Info, ArrowCounterClockwise, X, ArrowUp } from '@phosphor-icons/react';
import { useAskPanel } from './AskPanelContext';
import styles from './AskPanel.module.css';

type UserMessage = { role: 'user'; text: string };
type BotMessage  = { role: 'bot';  text: string; followUps: string[] };
type Message = UserMessage | BotMessage;

type ResponseEntry = { keywords: string[]; answer: string; followUps: string[] };
type ResponseMap   = ResponseEntry[];

const responses: Record<string, ResponseMap> = {
  '/about': [
    {
      keywords: ['balance', 'design and engineering', 'designer-engineer', 'intertwined'],
      answer: "I see design and engineering as intertwined rather than separate. Understanding technical constraints helps me design better solutions, and considering user experience informs my coding. It's all about building products that people want to use.",
      followUps: ["What's your design process?", "How do you approach product strategy?", "What technologies do you use?"],
    },
    {
      keywords: ['design process', 'process', 'how do you design'],
      answer: "My design process starts with diving deep into the problem space — understanding users, business goals, and technical constraints. Then I iterate quickly with prototypes, test with users, and refine based on feedback, always keeping feasibility in mind.",
      followUps: ["What makes your design approach unique?", "How do you approach product strategy?", "What are your favorite parts of design?"],
    },
    {
      keywords: ['unique', 'approach', 'philosophy', 'different', 'what makes'],
      answer: "I think what makes my approach unique is sitting at the intersection of design and engineering. I can prototype in code, which means I can test ideas at a much higher fidelity — and the gap between design and production is almost zero.",
      followUps: ["What's your design process?", "What projects are you most proud of?", "How do you approach product strategy?"],
    },
    {
      keywords: ['product strategy', 'strategy', 'product thinking'],
      answer: "I approach product strategy by anchoring every decision to user needs and business goals. I map out the full journey before designing any single screen — understanding the system before zooming into the details.",
      followUps: ["What's your design process?", "What technologies do you use?", "What projects are you most proud of?"],
    },
    {
      keywords: ['technologies', 'tools', 'tech', 'figma', 'skills', 'stack'],
      answer: "My core toolkit is Figma for design systems and prototyping, and React + TypeScript for when prototypes need to feel real. I also work with Next.js, CSS Modules, and Mapbox for data-rich interfaces.",
      followUps: ["How do you balance design and engineering?", "What projects are you most proud of?", "What's your design process?"],
    },
    {
      keywords: ['proud', 'projects', 'favourite', 'favorite', 'best work'],
      answer: "I'm most proud of Symmetry — designing a fintech AI product from scratch as the sole designer. I owned everything from the onboarding flow to the core investment experience and the design system behind it all.",
      followUps: ["What was the biggest challenge on Symmetry?", "How do you approach product strategy?", "What's your design process?"],
    },
    {
      keywords: ['symmetry', 'challenge', 'biggest challenge'],
      answer: "The biggest challenge on Symmetry was making financial complexity feel approachable without oversimplifying. Every interaction had to build trust — especially for users making real financial decisions for the first time.",
      followUps: ["What projects are you most proud of?", "What's your design process?", "How do you approach product strategy?"],
    },
    {
      keywords: ['experience', 'years', 'how long', 'background'],
      answer: "I have 5 years of experience designing products across AI, Fintech, and Travel — often as the first designer at early-stage startups, owning everything from UX to brand identity.",
      followUps: ["What projects are you most proud of?", "How do you balance design and engineering?", "What's your design process?"],
    },
    {
      keywords: ['contact', 'email', 'reach', 'hire', 'available'],
      answer: "You can reach me directly at juliansam003@gmail.com — I'm currently open to new opportunities.",
      followUps: ["What projects are you most proud of?", "What's your design process?", "How do you approach product strategy?"],
    },
    {
      keywords: ['favorite', 'favourite', 'parts of design', 'enjoy'],
      answer: "My favourite part of design is the moment when a complex system suddenly clicks — when you find the abstraction that makes everything simpler. That, and writing the microcopy that turns a frustrating error into a moment of clarity.",
      followUps: ["What's your design process?", "What makes your design approach unique?", "What projects are you most proud of?"],
    },
  ],
  '/': [
    {
      keywords: ['who', 'julian', 'about', 'designer'],
      answer: "Julian is a product designer with 5 years of experience across AI, Fintech, and Travel. He specialises in making complex products feel effortless — and often builds what he designs.",
      followUps: ["What case studies are available?", "How can I get in touch?", "What's Julian's design process?"],
    },
    {
      keywords: ['case study', 'work', 'project', 'portfolio', 'symmetry'],
      answer: "The portfolio currently features Symmetry — an AI-driven fintech product Julian designed from scratch, including onboarding, investment flows, and design system. More case studies are on the way.",
      followUps: ["Who is Julian?", "How can I get in touch?", "What's Julian's design process?"],
    },
    {
      keywords: ['contact', 'email', 'reach', 'hire'],
      answer: "You can reach Julian at juliansam003@gmail.com — he's currently open to new opportunities.",
      followUps: ["Who is Julian?", "What case studies are available?", "What's Julian's design process?"],
    },
    {
      keywords: ['process', 'how does julian'],
      answer: "Julian starts by mapping where things break before designing the happy path. He works across the full stack — from user research to production-quality components.",
      followUps: ["Who is Julian?", "What case studies are available?", "How can I get in touch?"],
    },
  ],
  '/work/symmetry': [
    {
      keywords: ['symmetry', 'what is', 'about', 'project', 'overview'],
      answer: "Symmetry is an AI-driven fintech product. Julian designed the full experience — from onboarding to core investment flows — with a focus on making financial decisions feel trustworthy and intuitive.",
      followUps: ["What was the biggest challenge?", "What was the outcome?", "What did Julian's role include?"],
    },
    {
      keywords: ['challenge', 'problem', 'goal', 'biggest challenge'],
      answer: "The core challenge was simplifying how people invest without dumbing it down. The design had to build trust while making complex financial concepts feel approachable — especially for first-time investors.",
      followUps: ["What was the outcome?", "What was Julian's role?", "What's the design system like?"],
    },
    {
      keywords: ['outcome', 'result', 'impact'],
      answer: "The redesigned onboarding and core flows significantly reduced drop-off and increased activation. The design system built for Symmetry became the foundation for all future product work.",
      followUps: ["What was the biggest challenge?", "What did Julian's role include?", "What's the design system like?"],
    },
    {
      keywords: ['role', 'julian', 'responsibility', 'include'],
      answer: "Julian was the sole designer — responsible for UX research, information architecture, visual design, prototyping, and the end-to-end design system. He also collaborated closely with engineering on implementation.",
      followUps: ["What was the biggest challenge?", "What was the outcome?", "What's the design system like?"],
    },
  ],
};

const FALLBACK_FOLLOW_UPS: Record<string, string[]> = {
  '/about':          ["What's your design process?", "What projects are you most proud of?", "How can I reach you?"],
  '/':               ["Who is Julian?", "What case studies are available?", "How can I get in touch?"],
  '/work/symmetry':  ["What was the biggest challenge?", "What was the outcome?", "What did Julian's role include?"],
};

const FALLBACK_ANSWER = "I don't have a specific answer for that — feel free to reach Julian directly at juliansam003@gmail.com.";

const WELCOME_SUGGESTIONS: Record<string, string[]> = {
  '/about':         ["How do you balance design and engineering?", "What skills do you bring as a designer-engineer?", "What projects are you most proud of?"],
  '/':              ["Who is Julian?", "What case studies are available?", "How can I get in touch?"],
  '/work/symmetry': ["What is Symmetry?", "What was the biggest challenge?", "What was Julian's role?"],
};

function getResponse(text: string, pathname: string): { answer: string; followUps: string[] } {
  const lower = text.toLowerCase();
  const map = responses[pathname] ?? responses['/'];
  for (const { keywords, answer, followUps } of map) {
    if (keywords.some((k) => lower.includes(k))) return { answer, followUps };
  }
  return { answer: FALLBACK_ANSWER, followUps: FALLBACK_FOLLOW_UPS[pathname] ?? FALLBACK_FOLLOW_UPS['/'] };
}

function getSuggestions(pathname: string) {
  return WELCOME_SUGGESTIONS[pathname] ?? WELCOME_SUGGESTIONS['/'];
}

export default function AskPanel() {
  const pathname = usePathname();
  const { open, setOpen } = useAskPanel();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef  = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300);
  }, [open]);

  function reset() {
    setMessages([]);
    setInput('');
    setTyping(false);
  }

  function handleSend(text?: string) {
    const trimmed = (text ?? input).trim();
    if (!trimmed || typing) return;
    setInput('');
    setMessages((m) => [...m, { role: 'user', text: trimmed }]);
    setTyping(true);
    setTimeout(() => {
      const { answer, followUps } = getResponse(trimmed, pathname);
      setMessages((m) => [...m, { role: 'bot', text: answer, followUps }]);
      setTyping(false);
    }, 700);
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
  }

  const showWelcome = messages.length === 0;

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
                      onClick={() => handleSend(q)}
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
                        {m.text}
                      </motion.div>
                    ) : (
                      <motion.div
                        key={i}
                        className={styles.botBlock}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      >
                        <p className={styles.botText}>{m.text}</p>
                        <div className={styles.followUps}>
                          {m.followUps.map((q, fi) => (
                            <motion.button
                              key={fi}
                              className={styles.suggestion}
                              onClick={() => handleSend(q)}
                              initial={{ opacity: 0, x: -4 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.05 + fi * 0.06, duration: 0.2 }}
                              whileHover={{ x: 3 }}
                              whileTap={{ scale: 0.97 }}
                            >
                              <span className={styles.suggestionArrow}>↳</span>
                              {q}
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>
                    )
                  )}
                  {typing && (
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
              disabled={typing}
            />
            <motion.button
              className={styles.sendBtn}
              onClick={() => handleSend()}
              disabled={!input.trim() || typing}
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
