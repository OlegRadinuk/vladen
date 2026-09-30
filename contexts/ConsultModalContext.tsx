"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import ConsultModal from "@/components/ui/ConsultModal";

interface ConsultModalContextType {
  /**
   * Открыть модалку «Получить консультацию».
   * returnFocusTo — куда вернуть фокус после закрытия (по умолчанию — элемент,
   * который был в фокусе в момент открытия).
   */
  openConsult: (returnFocusTo?: HTMLElement | null) => void;
  closeConsult: () => void;
}

const ConsultModalContext = createContext<ConsultModalContextType>({
  openConsult: () => {},
  closeConsult: () => {},
});

export function ConsultModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  const openConsult = useCallback((returnFocusTo?: HTMLElement | null) => {
    returnFocusRef.current =
      returnFocusTo ?? (document.activeElement instanceof HTMLElement ? document.activeElement : null);
    setIsOpen(true);
    if (typeof ym !== "undefined") ym(109280535, "reachGoal", "consult_open");
  }, []);

  const closeConsult = useCallback(() => {
    setIsOpen(false);
    const el = returnFocusRef.current;
    returnFocusRef.current = null;
    // Возвращаем фокус после размонтирования диалога
    if (el) requestAnimationFrame(() => el.focus({ preventScroll: true }));
  }, []);

  // Смена маршрута (кнопка «Назад», ссылка) при открытой модалке — закрываем,
  // фокус не возвращаем: старый элемент мог уйти вместе со страницей.
  const pathname = usePathname();
  useEffect(() => {
    returnFocusRef.current = null;
    setIsOpen(false);
  }, [pathname]);

  const value = useMemo(() => ({ openConsult, closeConsult }), [openConsult, closeConsult]);

  return (
    <ConsultModalContext.Provider value={value}>
      {children}
      <ConsultModal open={isOpen} onClose={closeConsult} />
    </ConsultModalContext.Provider>
  );
}

export const useConsultModal = () => useContext(ConsultModalContext);
