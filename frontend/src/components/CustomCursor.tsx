"use client";

import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show custom cursor on non-touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = `${mouseX}px`;
      dot.style.top = `${mouseY}px`;
      if (!isVisible) setIsVisible(true);
    };

    const onMouseEnterLink = () => setIsHovering(true);
    const onMouseLeaveLink = () => setIsHovering(false);

    const addLinkListeners = () => {
      document.querySelectorAll("a, button, [role='button']").forEach((el) => {
        el.addEventListener("mouseenter", onMouseEnterLink);
        el.addEventListener("mouseleave", onMouseLeaveLink);
      });
    };

    const raf = () => {
      // Smooth lag for ring
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      ring.style.left = `${ringX}px`;
      ring.style.top = `${ringY}px`;
      requestAnimationFrame(raf);
    };

    window.addEventListener("mousemove", onMouseMove);
    addLinkListeners();
    requestAnimationFrame(raf);

    // Re-add listeners on route changes
    const observer = new MutationObserver(addLinkListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* Dot - snaps to cursor */}
      <div
        ref={dotRef}
        className={`fixed pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold transition-transform duration-100 ${
          isVisible ? "opacity-100" : "opacity-0"
        } ${isHovering ? "w-2 h-2 scale-150" : "w-2 h-2"}`}
        style={{ top: 0, left: 0 }}
      />
      {/* Ring - lags behind with spring */}
      <div
        ref={ringRef}
        className={`fixed pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/60 transition-all duration-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        } ${isHovering ? "w-10 h-10 border-gold" : "w-7 h-7"}`}
        style={{ top: 0, left: 0 }}
      />
    </>
  );
}
