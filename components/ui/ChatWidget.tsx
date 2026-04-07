"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Message = { role: "user" | "assistant"; content: string };
type AvatarState = "idle" | "thinking" | "talking";

function HardhatIcon() {
  return (
    <svg viewBox="0 0 40 40" fill="none" className="w-7 h-7">
      {/* Hat brim */}
      <rect x="6" y="24" width="28" height="4" rx="2" fill="white" />
      {/* Hat dome */}
      <path d="M10 24 C10 14 30 14 30 24" fill="white" />
      {/* Stripe */}
      <rect x="17" y="14" width="6" height="10" rx="1" fill="#D97706" />
      {/* Face */}
      <circle cx="20" cy="32" r="5" fill="#FBBF24" />
      <circle cx="18" cy="31" r="1" fill="#1A1A1A" />
      <circle cx="22" cy="31" r="1" fill="#1A1A1A" />
      <path d="M17.5 34 Q20 36 22.5 34" stroke="#1A1A1A" strokeWidth="1.2" strokeLinecap="round" fill="none" />
    </svg>
  );
}

function Avatar({ state }: { state: AvatarState }) {
  return (
    <div className="relative flex-shrink-0">
      {/* Pulse ring when thinking */}
      {state === "thinking" && (
        <>
          <div className="absolute inset-0 rounded-full bg-accent/30 animate-ping" />
          <div className="absolute inset-[-4px] rounded-full bg-accent/15 animate-pulse" />
        </>
      )}
      {/* Talking glow */}
      {state === "talking" && (
        <div className="absolute inset-[-3px] rounded-full bg-accent/25 animate-pulse" />
      )}
      <div className="relative w-10 h-10 rounded-full bg-accent flex items-center justify-center shadow-lg">
        <HardhatIcon />
      </div>
    </div>
  );
}

function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-4 py-3">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="w-2 h-2 rounded-full bg-accent/60"
          style={{ animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite` }}
        />
      ))}
    </div>
  );
}

const INITIAL_MESSAGE: Message = {
  role: "assistant",
  content: "Привет! Я Влад, консультант компании Владен. Помогу рассчитать стоимость ремонта или строительства, отвечу на вопросы. Что вас интересует?",
};

const SUGGEST_AFTER = 2; // предлагать номер после N ответов ассистента

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [avatarState, setAvatarState] = useState<AvatarState>("idle");
  const [assistantCount, setAssistantCount] = useState(1);
  const [showPhonePrompt, setShowPhonePrompt] = useState(false);
  const [phoneSent, setPhoneSent] = useState(false);
  const [phoneInput, setPhoneInput] = useState("");
  const [nameInput, setNameInput] = useState("");

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, showPhonePrompt]);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 300);
  }, [isOpen]);

  async function sendMessage() {
    const text = input.trim();
    if (!text || avatarState === "thinking") return;

    const newMessages: Message[] = [...messages, { role: "user", content: text }];
    setMessages(newMessages);
    setInput("");
    setAvatarState("thinking");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!res.ok || !res.body) throw new Error("Network error");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let assistantText = "";

      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);
      setAvatarState("talking");

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        assistantText += decoder.decode(value, { stream: true });
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = { role: "assistant", content: assistantText };
          return updated;
        });
      }

      const newCount = assistantCount + 1;
      setAssistantCount(newCount);
      if (newCount >= SUGGEST_AFTER && !showPhonePrompt && !phoneSent) {
        setShowPhonePrompt(true);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Что-то пошло не так. Позвоните нам: +7 (978) 717-44-47" },
      ]);
    } finally {
      setAvatarState("idle");
    }
  }

  async function sendPhone() {
    const name = nameInput.trim();
    const phone = phoneInput.trim();
    if (!name || !phone) return;

    const history = messages
      .map((m) => `${m.role === "user" ? "Клиент" : "Влад"}: ${m.content}`)
      .join("\n");

    try {
      await fetch("/api/telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          calc: undefined,
          chat: history,
        }),
      });
    } catch {
      // fail silently
    }

    setPhoneSent(true);
    setShowPhonePrompt(false);
    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content: `Отлично, ${name}! Мы перезвоним вам на ${phone} в рабочее время. Если срочно — звоните сами: +7 (978) 717-44-47`,
      },
    ]);
  }

  return (
    <>
      {/* Floating button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            key="fab"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-accent shadow-lg hover:bg-accent/90 transition-colors flex items-center justify-center group"
            aria-label="Открыть чат с консультантом"
          >
            {/* Hardhat icon */}
            <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8">
              {/* Dome */}
              <path d="M6 20 C6 10 26 10 26 20" fill="white" />
              {/* Center stripe */}
              <rect x="14" y="10" width="4" height="10" rx="1" fill="#D97706" />
              {/* Brim */}
              <rect x="4" y="20" width="24" height="3.5" rx="1.75" fill="white" />
              {/* Inner shadow line */}
              <path d="M6 20 C6 10 26 10 26 20" stroke="rgba(0,0,0,0.1)" strokeWidth="0.5" fill="none" />
            </svg>
            {/* Badge */}
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-green-500 border-2 border-white" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="fixed bottom-6 right-6 z-50 w-[calc(100vw-3rem)] sm:w-[380px] max-h-[600px] flex flex-col rounded-2xl shadow-2xl overflow-hidden bg-white border border-gray-100"
          >
            {/* Header */}
            <div className="bg-dark px-4 py-3 flex items-center gap-3">
              <Avatar state={avatarState} />
              <div className="flex-1 min-w-0">
                <p className="text-white font-oswald font-semibold text-sm leading-tight">Влад</p>
                <p className="text-text-dark text-xs leading-tight truncate">
                  {avatarState === "thinking"
                    ? "думает..."
                    : avatarState === "talking"
                    ? "печатает..."
                    : "консультант Владен · онлайн"}
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/50 hover:text-white transition-colors flex-shrink-0 p-1"
                aria-label="Закрыть чат"
              >
                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                  <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-gray-50 min-h-0">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                >
                  {msg.role === "assistant" && (
                    <div className="w-7 h-7 rounded-full bg-accent flex-shrink-0 flex items-center justify-center mt-0.5">
                      <svg viewBox="0 0 40 40" fill="none" className="w-4 h-4">
                        <rect x="6" y="24" width="28" height="4" rx="2" fill="white" />
                        <path d="M10 24 C10 14 30 14 30 24" fill="white" />
                        <rect x="17" y="14" width="6" height="10" rx="1" fill="#D97706" />
                      </svg>
                    </div>
                  )}
                  <div
                    className={`max-w-[78%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-accent text-white rounded-tr-sm"
                        : "bg-white text-text-light shadow-sm rounded-tl-sm border border-gray-100"
                    }`}
                  >
                    {msg.content || <TypingDots />}
                  </div>
                </motion.div>
              ))}

              {/* Phone prompt */}
              <AnimatePresence>
                {showPhonePrompt && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="bg-accent/10 border border-accent/30 rounded-xl p-3 space-y-2"
                  >
                    <p className="text-text-light text-xs font-semibold">
                      Хотите получить точный расчёт?
                    </p>
                    <p className="text-text-muted text-xs">
                      Оставьте номер — перезвоним и договоримся о бесплатном замере.
                    </p>
                    <input
                      value={nameInput}
                      onChange={(e) => setNameInput(e.target.value)}
                      placeholder="Ваше имя"
                      className="w-full text-xs border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-accent bg-white"
                    />
                    <input
                      value={phoneInput}
                      onChange={(e) => setPhoneInput(e.target.value)}
                      placeholder="+7 (___) ___-__-__"
                      type="tel"
                      className="w-full text-xs border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-accent bg-white"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={sendPhone}
                        className="flex-1 bg-accent text-white text-xs font-semibold rounded-lg py-2 hover:bg-accent/90 transition-colors"
                      >
                        Отправить
                      </button>
                      <button
                        onClick={() => setShowPhonePrompt(false)}
                        className="text-text-muted text-xs px-3 py-2 hover:text-text-light transition-colors"
                      >
                        Позже
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="px-3 py-3 bg-white border-t border-gray-100">
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
                  placeholder="Напишите вопрос..."
                  disabled={avatarState === "thinking"}
                  className="flex-1 text-sm border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:border-accent transition-colors disabled:opacity-50 bg-gray-50"
                />
                <button
                  onClick={sendMessage}
                  disabled={!input.trim() || avatarState === "thinking"}
                  className="w-10 h-10 rounded-xl bg-accent text-white flex items-center justify-center flex-shrink-0 hover:bg-accent/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  aria-label="Отправить"
                >
                  <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
                    <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-6px); }
        }
      `}</style>
    </>
  );
}
