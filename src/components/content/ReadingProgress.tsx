"use client";

import { useEffect, useRef } from "react";

export function ReadingProgress({ target }: { target: string }) {
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const article = document.getElementById(target);
    if (!article) return;
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const box = article.getBoundingClientRect();
        const total = box.height - window.innerHeight;
        const share =
          total > 0 ? Math.min(1, Math.max(0, -box.top / total)) : 1;
        bar.current?.style.setProperty("transform", `scaleX(${share})`);
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [target]);

  return (
    <div aria-hidden="true" className="fixed inset-x-0 top-16 z-30 h-0.5">
      <div ref={bar} className="h-full origin-left scale-x-0 bg-bay" />
    </div>
  );
}
