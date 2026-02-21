"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import { motion, useMotionValue, useSpring } from "motion/react";

// --- Types ---
interface ModernScrollProps {
  children?: React.ReactNode;
  disableCursor?: boolean;
  disableScroll?: boolean;
}

// --- Context ---
const ScrollContext = createContext<{ lenis: Lenis | null }>({ lenis: null });
export const useScroll = () => useContext(ScrollContext);

// --- Component ---
export default function ModernScroll({
  children,
  disableCursor = false,
  disableScroll = false,
}: ModernScrollProps) {
  // - Clean: No more theme dependency, just pure indigo aesthetic
  const lenisRef = useRef<Lenis | null>(null);
  const [lenis, setLenis] = useState<Lenis | null>(null);

  // Interaction States
  const [isHoveringLink, setIsHoveringLink] = useState(false);

  // --- 1. Industrial Lenis Setup ---
  useEffect(() => {
    if (disableScroll) return;

    // Use easeOutExpo - The gold standard for premium "luxury" feel
    // (t === 1 ? 1 : 1 - Math.pow(2, -10 * t))
    const lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      // Ensure it recalculates when content changes (SPAs)
      autoResize: true,
    });

    lenisRef.current = lenisInstance;

    // Safety: Trigger a resize on mount to ensure height is correct
    requestAnimationFrame(() => lenisInstance.resize());

    // RAF Loop with Performance Optimization
    let rafId: number;
    function raf(time: number) {
      // Lenis raf is highly optimized, but we run it within the browser's RAF
      lenisInstance.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    const timeoutId = setTimeout(() => setLenis(lenisInstance), 0);

    return () => {
      clearTimeout(timeoutId);
      cancelAnimationFrame(rafId);
      lenisInstance.destroy();
      lenisRef.current = null;
      setLenis(null);
    };
  }, [disableScroll]);

  // --- 2. Ultra-Responsive Physics for Cursor ---
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Stiffer spring for the dot (1:1 with hardware)
  const mainX = useSpring(mouseX, { stiffness: 1500, damping: 70, mass: 0.1 });
  const mainY = useSpring(mouseY, { stiffness: 1500, damping: 70, mass: 0.1 });

  // Luxury trailing ring
  const trailX = useSpring(mouseX, { stiffness: 350, damping: 35, mass: 0.6 });
  const trailY = useSpring(mouseY, { stiffness: 350, damping: 35, mass: 0.6 });

  const scale = useMotionValue(1);
  const smoothScale = useSpring(scale, { stiffness: 500, damping: 30 });
  const opacity = useMotionValue(0);

  // --- 3. Optimized Event Handlers ---
  useEffect(() => {
    if (disableCursor) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (opacity.get() === 0) opacity.set(1);
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseDown = () => scale.set(0.7);
    const handleMouseUp = () => scale.set(isHoveringLink ? 1.6 : 1);

    // Optimized Detection: Use native .closest() - highly optimized by browsers
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const interactive = target.closest(
        'a, button, [role="button"], input, .cursor-pointer, .clickable',
      );

      if (interactive) {
        setIsHoveringLink(true);
        scale.set(1.6);
      } else {
        setIsHoveringLink(false);
        scale.set(1);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseover", handleMouseOver);

    // Force hide native cursor
    document.documentElement.style.cursor = "none";
    const style = document.createElement("style");
    style.innerHTML = `
      *, *::before, *::after { cursor: none !important; }
    `;
    style.id = "modern-cursor-style";
    document.head.appendChild(style);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseover", handleMouseOver);
      document.documentElement.style.cursor = "";
      const s = document.getElementById("modern-cursor-style");
      if (s) s.remove();
    };
  }, [disableCursor, isHoveringLink, mouseX, mouseY, opacity, scale]);

  if (disableCursor) return <>{children}</>;

  return (
    <ScrollContext.Provider value={{ lenis }}>
      {children}

      {/* --- Cursor Layer (Indigo Theme) --- */}
      <div
        className="pointer-events-none fixed inset-0 z-2147483647 overflow-hidden"
        aria-hidden="true"
        style={{ pointerEvents: "none" }}
      >
        {/* Ring */}
        <motion.div
          style={{
            x: trailX,
            y: trailY,
            scale: smoothScale,
            opacity: opacity,
            translateX: "-50%",
            translateY: "-50%",
            willChange: "transform",
          }}
          className="absolute top-0 left-0 pointer-events-none"
        >
          <div className="h-12 w-12 rounded-full border-2 border-indigo-500/50 transition-colors duration-300" />
        </motion.div>

        {/* Dot */}
        <motion.div
          style={{
            x: mainX,
            y: mainY,
            scale: smoothScale,
            opacity: opacity,
            translateX: "-50%",
            translateY: "-50%",
            willChange: "transform",
          }}
          className="absolute top-0 left-0 pointer-events-none"
        >
          <div className="h-2.5 w-2.5 rounded-full bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.5)] transition-colors duration-300" />
        </motion.div>
      </div>
    </ScrollContext.Provider>
  );
}
