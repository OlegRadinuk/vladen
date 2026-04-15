"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Message = { role: "user" | "assistant"; content: string };
type AvatarState = "idle" | "thinking" | "talking";


function Avatar({ state }: { state: AvatarState }) {
  return (
    <div className="relative flex-shrink-0 w-10 h-10">
      {/* Outer ring — always visible, spins when thinking */}
      <div
        className={`absolute inset-[-3px] rounded-full border-2 transition-all duration-500 ${
          state === "thinking"
            ? "border-accent animate-spin border-t-transparent"
            : state === "talking"
            ? "border-accent/60 animate-pulse"
            : "border-accent/30"
        }`}
      />
      {/* Middle glow ring */}
      {(state === "thinking" || state === "talking") && (
        <div className="absolute inset-[-7px] rounded-full bg-accent/10 animate-ping" />
      )}
      {/* Core circle */}
      <div
        className={`absolute inset-0 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
          state === "thinking"
            ? "bg-gradient-to-br from-accent to-amber-600"
            : state === "talking"
            ? "bg-gradient-to-br from-accent to-orange-400"
            : "bg-gradient-to-br from-accent/90 to-amber-700"
        }`}
      >
        {/* Animated bars when talking */}
        {state === "talking" ? (
          <div className="flex items-center gap-[3px]">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-[3px] bg-white rounded-full"
                style={{
                  height: 14,
                  animation: `chatbar 0.8s ease-in-out ${i * 0.15}s infinite`,
                }}
              />
            ))}
          </div>
        ) : state === "thinking" ? (
          <div className="w-4 h-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
        ) : (
          <span className="text-white font-oswald font-bold text-base leading-none">В</span>
        )}
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
  content: "Привет! Я Влад, ИИ-консультант компании Владен. Помогу рассчитать стоимость ремонта или строительства, отвечу на вопросы. Что вас интересует?",
};

const BUBBLE_TEXT = "Привет! 👋 Я ИИ-консультант Владен. Помогу рассчитать стоимость ремонта или строительства — спросите, это бесплатно!";
const SUGGEST_AFTER = 2; // предлагать номер после N ответов ассистента

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [avatarState, setAvatarState] = useState<AvatarState>("idle");
  const [assistantCount, setAssistantCount] = useState(1);
  const [showPhonePrompt, setShowPhonePrompt] = useState(false);
  const [phoneSent, setPhoneSent] = useState(false);
  const [phoneInput, setPhoneInput] = useState("");
  const [nameInput, setNameInput] = useState("");

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const bubbleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Показываем bubble через 3с, скрываем через 10с
  useEffect(() => {
    const show = setTimeout(() => setShowBubble(true), 3000);
    const hide = setTimeout(() => setShowBubble(false), 13000);
    return () => { clearTimeout(show); clearTimeout(hide); };
  }, []);

  const openChat = () => {
    setShowBubble(false);
    if (bubbleTimerRef.current) clearTimeout(bubbleTimerRef.current);
    setIsOpen(true);
  };

  function formatPhone(value: string) {
    const digits = value.replace(/\D/g, "").slice(0, 11);
    if (!digits) return "";
    let result = "+7";
    if (digits.length > 1) result += " (" + digits.slice(1, 4);
    if (digits.length >= 4) result += ") " + digits.slice(4, 7);
    if (digits.length >= 7) result += "-" + digits.slice(7, 9);
    if (digits.length >= 9) result += "-" + digits.slice(9, 11);
    return result;
  }

  function handleWheel(e: React.WheelEvent<HTMLDivElement>) {
    const el = messagesRef.current;
    if (!el) return;
    const { scrollTop, scrollHeight, clientHeight } = el;
    const atTop = scrollTop === 0 && e.deltaY < 0;
    const atBottom = scrollTop + clientHeight >= scrollHeight && e.deltaY > 0;
    if (!atTop && !atBottom) e.stopPropagation();
  }

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
        content: `Отлично, ${name}! Мы перезвоним вам на ${phone} в рабочее время. Если срочно — звоните сами: +7 (978) 717-44-47\n\nЕсть ещё вопросы? С удовольствием отвечу.`,
      },
    ]);
  }

  return (
    <>
      {/* Bubble preview */}
      <AnimatePresence>
        {!isOpen && showBubble && (
          <motion.div
            key="bubble"
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
            className="fixed bottom-24 right-6 z-50 max-w-[260px] sm:max-w-[300px]"
          >
            <div
              onClick={openChat}
              className="relative w-full text-left bg-white rounded-2xl rounded-br-sm shadow-xl border border-gray-100 px-4 py-3 group cursor-pointer"
            >
              {/* Close */}
              <span
                role="button"
                onClick={(e) => { e.stopPropagation(); setShowBubble(false); }}
                className="absolute top-2 right-2 text-gray-300 hover:text-gray-500 transition-colors"
                aria-label="Закрыть"
              >
                <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5">
                  <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </span>
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-6 h-6 rounded-full bg-accent flex-shrink-0 flex items-center justify-center">
                  <span className="text-white font-oswald font-bold text-xs">В</span>
                </div>
                <span className="text-xs font-semibold text-gray-700">Влад · ИИ-консультант</span>
                <span className="w-2 h-2 rounded-full bg-green-500 ml-auto flex-shrink-0" />
              </div>
              <p className="text-sm text-gray-600 leading-relaxed pr-4">{BUBBLE_TEXT}</p>
              <p className="text-xs text-accent font-medium mt-2 group-hover:underline">Написать →</p>
            </div>
            {/* Arrow pointing to FAB */}
            <div className="absolute -bottom-2 right-5 w-4 h-4 bg-white border-r border-b border-gray-100 rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            key="fab"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            onClick={openChat}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-accent shadow-lg hover:bg-accent/90 transition-colors flex items-center justify-center group"
            aria-label="Открыть чат с консультантом"
          >
            <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-white">
              <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
                    : "ИИ-консультант Владен · онлайн"}
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
            <div ref={messagesRef} onWheel={handleWheel} className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-gray-50 min-h-0">
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
                      onChange={(e) => setPhoneInput(formatPhone(e.target.value))}
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
        @keyframes chatbar {
          0%, 100% { transform: scaleY(0.4); opacity: 0.5; }
          50% { transform: scaleY(1); opacity: 1; }
        }
      `}</style>
    </>
  );
}
