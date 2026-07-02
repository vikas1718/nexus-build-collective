import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { ArrowRight, Sparkles, ChevronDown } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import heroLaptop from "@/assets/hero-laptop.png";
import { Blobs, Counter } from "./primitives";

const words = ["Digital Experiences", "Web Applications", "AI Solutions", "Startup MVPs"];

function Typing() {
  const [index, setIndex] = useState(0);
  const [sub, setSub] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[index];
    const speed = deleting ? 45 : 90;
    const t = setTimeout(() => {
      if (!deleting) {
        setSub(current.slice(0, sub.length + 1));
        if (sub.length + 1 === current.length) setTimeout(() => setDeleting(true), 1400);
      } else {
        setSub(current.slice(0, sub.length - 1));
        if (sub.length === 0) {
          setDeleting(false);
          setIndex((i) => (i + 1) % words.length);
        }
      }
    }, speed);
    return () => clearTimeout(t);
  }, [sub, deleting, index]);

  return (
    <span className="text-gradient">
      {sub}
      <span className="ml-0.5 inline-block h-[0.9em] w-[3px] translate-y-1 animate-pulse bg-primary" />
    </span>
  );
}

function Particles() {
  const dots = useMemo(
    () =>
      Array.from({ length: 26 }, () => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 3 + 1,
        delay: Math.random() * 5,
        dur: Math.random() * 6 + 6,
      })),
    [],
  );
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      {dots.map((d, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-primary/50"
          style={{ left: `${d.left}%`, top: `${d.top}%`, width: d.size, height: d.size }}
          animate={{ y: [0, -30, 0], opacity: [0.2, 0.9, 0.2] }}
          transition={{ duration: d.dur, delay: d.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

const stats = [
  { to: 120, suffix: "+", label: "Projects Shipped" },
  { to: 45, suffix: "+", label: "Happy Clients" },
  { to: 8, suffix: "yr", label: "Combined Exp." },
  { to: 99, suffix: "%", label: "Satisfaction" },
];

export function Hero() {
  const navigate = useNavigate();
  const scrollTo = (id: string) =>
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });



  return (
    <section id="home" className="relative overflow-hidden pt-36 pb-16 sm:pt-44">
      <Blobs />
      <Particles />
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-5 sm:px-8 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary">
            <Sparkles className="h-3.5 w-3.5" /> A boutique software studio
          </span>
          <h1 className="mt-6 text-4xl font-bold leading-[1.05] sm:text-5xl md:text-6xl">
            Turning Your Ideas Into Powerful <br className="hidden sm:block" />
            <Typing />
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            We design and develop modern websites, web applications, AI-powered solutions, and
            digital products for startups, businesses, and entrepreneurs.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <button
              onClick={() => scrollTo("#contact")}
              className="group inline-flex items-center gap-2 rounded-xl bg-[image:var(--gradient-primary)] px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-105"
            >
              Start Your Project
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => scrollTo("#portfolio")}
              className="rounded-xl glass px-6 py-3.5 text-sm font-semibold transition-colors hover:bg-white/5"
            >
              View Portfolio
            </button>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="text-2xl font-bold text-gradient sm:text-3xl">
                  <Counter to={s.to} suffix={s.suffix} />
                </div>
                <div className="mt-1 text-xs text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="absolute inset-0 -z-10 rounded-full bg-[image:var(--gradient-primary)] opacity-30 blur-[80px]" />
          <motion.img
            src={heroLaptop}
            alt="Laptop showing a modern analytics dashboard we built"
            width={1024}
            height={768}
            className="animate-float w-full drop-shadow-2xl"
          />
        </motion.div>
      </div>

      <motion.button
        onClick={() => scrollTo("#trust")}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.8, repeat: Infinity }}
        className="mx-auto mt-10 flex flex-col items-center gap-1 text-xs text-muted-foreground"
      >
        Scroll to explore
        <ChevronDown className="h-5 w-5" />
      </motion.button>
    </section>
  );
}
