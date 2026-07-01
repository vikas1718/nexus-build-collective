import { motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-1 origin-left bg-gradient-to-r from-violet via-magenta to-cyan"
    />
  );
}

export function CursorGlow() {
  const [pos, setPos] = useState({ x: -400, y: -400 });
  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;
    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[55] hidden md:block"
      style={{
        background: `radial-gradient(300px circle at ${pos.x}px ${pos.y}px, oklch(0.65 0.24 295 / 0.08), transparent 70%)`,
      }}
    />
  );
}

export function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <motion.button
      initial={false}
      animate={{ opacity: show ? 1 : 0, scale: show ? 1 : 0.8, pointerEvents: show ? "auto" : "none" }}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className="fixed bottom-6 left-6 z-50 grid h-12 w-12 place-items-center rounded-full glass-strong text-foreground shadow-elegant transition-colors hover:text-primary"
    >
      <ArrowUp className="h-5 w-5" />
    </motion.button>
  );
}

export function WhatsAppButton() {
  return (
    <motion.a
      href="https://wa.me/10000000000"
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.94 }}
      className="fixed bottom-6 right-6 z-50 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-black shadow-[0_0_30px_-4px_#25D366]"
    >
      <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor">
        <path d="M17.5 14.4c-.3-.2-1.7-.9-2-1-.3-.1-.5-.2-.7.1-.2.3-.7 1-.9 1.2-.2.2-.3.2-.6.1-1.8-.9-3-1.6-4.2-3.6-.3-.5.3-.5.9-1.6.1-.2 0-.4 0-.6 0-.2-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.2-1.2 2.9s1.2 3.3 1.4 3.6c.2.3 2.4 3.7 5.9 5.2 3.4 1.4 3.4 1 4 .9.6-.1 1.9-.8 2.2-1.6.3-.8.3-1.4.2-1.6-.1-.2-.3-.3-.6-.4zM12 2a10 10 0 0 0-8.6 15l-1.3 4.8 4.9-1.3A10 10 0 1 0 12 2z" />
      </svg>
    </motion.a>
  );
}

export function Loader() {
  const [done, setDone] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setDone(true), 1100);
    return () => clearTimeout(t);
  }, []);
  if (done) return null;
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: done ? 0 : 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] grid place-items-center bg-background"
    >
      <div className="flex flex-col items-center gap-5">
        <div className="relative h-16 w-16">
          <span className="absolute inset-0 animate-spin rounded-full border-2 border-primary/20 border-t-primary" />
          <span className="absolute inset-2 animate-spin rounded-full border-2 border-cyan/20 border-b-cyan [animation-direction:reverse]" />
        </div>
        <span className="text-sm uppercase tracking-[0.4em] text-muted-foreground">Nebula</span>
      </div>
    </motion.div>
  );
}
