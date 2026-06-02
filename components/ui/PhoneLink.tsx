"use client";

export default function PhoneLink({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <a
      href="tel:+79787174447"
      className={className}
      onClick={() => { if (typeof ym !== "undefined") ym(109280535, "reachGoal", "phone_click"); }}
    >
      {children}
    </a>
  );
}
