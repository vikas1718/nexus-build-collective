import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useNavigate, useRouterState, Link } from "@tanstack/react-router";
import { ThemeToggle } from "./theme";

const links = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Tech", href: "#tech" },
  { label: "FAQ", href: "#faq" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (href: string) => {
    setOpen(false);
    if (pathname !== "/") {
      navigate({ to: "/", hash: href.replace("#", "") });
      return;
    }
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  const goContact = () => {
    setOpen(false);
    navigate({ to: "/contact" });
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
        <div
          className={`flex flex-1 items-center justify-between gap-4 rounded-2xl px-4 py-3 transition-all duration-300 ${
            scrolled ? "glass-strong shadow-elegant" : ""
          }`}
        >
          <button onClick={() => go("#home")} className="flex items-center gap-2.5">
            <img src="/favicon.ico" alt="TRIA Solutions" className="h-5 w-5" />
            <span className="text-lg font-bold tracking-tight">
              TRIA<span> Solutions</span>
            </span>
          </button>

          <nav className="hidden items-center gap-1 lg:flex">
            {links.map((l) => (
              <button
                key={l.href}
                onClick={() => go(l.href)}
                className="rounded-lg px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {l.label}
              </button>
            ))}

          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={goContact}
              className="hidden rounded-xl bg-[image:var(--gradient-primary)] px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-105 sm:block"
            >
              Book Now
            </button>
            <button
              aria-label="Toggle menu"
              onClick={() => setOpen((o) => !o)}
              className="grid h-10 w-10 place-items-center rounded-xl glass lg:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mx-5 mt-3 overflow-hidden rounded-2xl glass-strong lg:hidden"
          >
            <div className="flex flex-col p-3">
              {links.map((l) => (
                <button
                  key={l.href}
                  onClick={() => go(l.href)}
                  className="rounded-lg px-4 py-3 text-left text-sm font-medium text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
                >
                  {l.label}
                </button>
              ))}

              <button
                onClick={goContact}
                className="mt-2 rounded-xl bg-[image:var(--gradient-primary)] px-4 py-3 text-sm font-semibold text-primary-foreground"
              >
                Book Now
              </button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
