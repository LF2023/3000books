"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * 滚动渐显容器:进入视口后 fade-up 一次。
 * SSR/无 JS 时内容始终可见(不设初始隐藏),仅当 JS 就位且元素未进过视口才隐藏——
 * 因此只用于首屏以外的区块。prefers-reduced-motion 下直接显示。
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [armed, setArmed] = useState(false);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            io.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );
    setArmed(true);
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${className} ${armed && !shown ? "reveal-hidden" : ""} ${
        shown ? "reveal-shown" : ""
      }`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
