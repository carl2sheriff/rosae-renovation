"use client";

import { useEffect, useRef } from "react";

export function CursorVoir() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (isTouchDevice) return;

    let rafId = 0;
    let targetX = -200;
    let targetY = -200;
    let currentX = -200;
    let currentY = -200;
    let visible = false;

    function updatePosition() {
      currentX += (targetX - currentX) * 0.12;
      currentY += (targetY - currentY) * 0.12;
      cursor!.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)`;
      rafId = requestAnimationFrame(updatePosition);
    }
    rafId = requestAnimationFrame(updatePosition);

    function onMouseMove(e: MouseEvent) {
      targetX = e.clientX;
      targetY = e.clientY;
    }

    function onMouseEnterTarget() {
      if (!visible) {
        visible = true;
        cursor!.style.opacity = "1";
        cursor!.style.pointerEvents = "none";
      }
    }

    function onMouseLeaveTarget() {
      visible = false;
      cursor!.style.opacity = "0";
    }

    function attachListeners() {
      const targets = document.querySelectorAll<HTMLElement>("[data-cursor-voir]");
      targets.forEach((el) => {
        el.addEventListener("mouseenter", onMouseEnterTarget);
        el.addEventListener("mouseleave", onMouseLeaveTarget);
        el.style.cursor = "none";
      });
    }

    window.addEventListener("mousemove", onMouseMove, { passive: true });

    attachListeners();

    const observer = new MutationObserver(attachListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouseMove);
      observer.disconnect();
      const targets = document.querySelectorAll<HTMLElement>("[data-cursor-voir]");
      targets.forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnterTarget);
        el.removeEventListener("mouseleave", onMouseLeaveTarget);
        el.style.cursor = "";
      });
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: 60,
        height: 60,
        borderRadius: "50%",
        background: "var(--text-1)",
        color: "var(--bg)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 10,
        letterSpacing: "0.16em",
        textTransform: "uppercase",
        fontFamily: "var(--font-sans)",
        opacity: 0,
        pointerEvents: "none",
        zIndex: 9999,
        transition: "opacity 200ms ease",
        userSelect: "none",
        willChange: "transform",
      }}
    >
      voir
    </div>
  );
}
