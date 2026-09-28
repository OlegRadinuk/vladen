"use client";

import { PHONE_HREF } from "@/lib/company";

export default function PhoneLink({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <a
      href={PHONE_HREF}
      className={className}
      onClick={() => { if (typeof ym !== "undefined") ym(109280535, "reachGoal", "phone_click"); }}
    >
      {children}
    </a>
  );
}
