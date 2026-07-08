import { motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowUp, Bot, MessageCircle, Send, X } from "lucide-react";

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

type ChatMessage = {
  role: "assistant" | "user";
  text: string;
};

const starterQuestions = [
  "What services do you offer?",
  "Show me portfolio projects",
  "How can I contact TRIA?",
];

function answerWebsiteQuestion(question: string) {
  const q = question.toLowerCase();

  if (q.includes("service") || q.includes("web app") || q.includes("website") || q.includes("e-commerce") || q.includes("ai")) {
    return "TRIA Solutions builds business websites, portfolio websites, startup MVPs, AI integrations, custom web apps, admin dashboards, e-commerce stores, landing pages, redesigns, and maintenance/support. For AI, web apps, and e-commerce, you can jump to the Services section from the footer.";
  }

  if (q.includes("portfolio") || q.includes("project") || q.includes("work") || q.includes("demo")) {
    return "Our featured portfolio includes AI News Editor, Shopping Cloth UMO, Agri Connect, and Coffee Shop Roastery. Each card has a Live Demo button in the Portfolio section.";
  }

  if (q.includes("contact") || q.includes("email" ) || q.includes("phone") || q.includes("book") || q.includes("call")) {
    return "You can book a project from the Book Now button or contact TRIA Solutions at triasolutions14@gmail.com. Phone contacts listed on the site are Chaman Raj: 6360406737, Vikas S.P: 9019559744, and Shashank S.M: 7019058457.";
  }

  if (q.includes("price") || q.includes("budget") || q.includes("cost") || q.includes("quote")) {
    return "The contact form supports budget ranges of $2k - $5k, $5k - $15k, and $15k+. Share your project type, timeline, and requirements there so the team can suggest the right scope.";
  }

  if (q.includes("founder") || q.includes("team") || q.includes("about")) {
    return "TRIA Solutions is led by Vikas S P, Chaman Raj, and Shashank S M. The About section introduces the founders and their engineering, AI/product, cloud, and design strengths.";
  }

  if (q.includes("process") || q.includes("steps") || q.includes("timeline")) {
    return "The process is Discovery, Planning, UI/UX Design, Development, Testing, Deployment, and Maintenance. This keeps projects clear from first idea to launch and ongoing support.";
  }

  if (q.includes("tech") || q.includes("stack") || q.includes("technology")) {
    return "The team works with modern stacks including React, Next.js, Angular, Vue, Node.js, Express, Python, .NET, Flutter, databases, Firebase, Docker, AWS, Azure, OpenAI, TailwindCSS, and TypeScript.";
  }

  if (q.includes("location") || q.includes("remote")) {
    return "TRIA Solutions works remotely and can collaborate with clients worldwide.";
  }

  return "I can help with TRIA Solutions services, portfolio projects, process, tech stack, pricing ranges, and contact details. Try asking about services, portfolio, or how to book a project.";
}

export function WebsiteChatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      text: "Hi, I am TRIA's website assistant. Ask me about services, portfolio projects, process, tech stack, pricing, or contact details.",
    },
  ]);

  const sendMessage = (text = input) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setMessages((current) => [
      ...current,
      { role: "user", text: trimmed },
      { role: "assistant", text: answerWebsiteQuestion(trimmed) },
    ]);
    setInput("");
    setOpen(true);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 18, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="flex h-[min(620px,calc(100vh-7rem))] w-[min(380px,calc(100vw-2rem))] flex-col overflow-hidden rounded-3xl glass-strong shadow-elegant"
        >
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-[image:var(--gradient-primary)] text-primary-foreground">
                <Bot className="h-5 w-5" />
              </span>
              <div>
                <div className="text-sm font-semibold">TRIA Assistant</div>
                <div className="text-xs text-muted-foreground">Website help</div>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="grid h-9 w-9 place-items-center rounded-xl glass transition-colors hover:text-primary"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[86%] rounded-2xl px-4 py-2.5 text-sm leading-6 ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-border p-4">
            <div className="mb-3 flex flex-wrap gap-2">
              {starterQuestions.map((question) => (
                <button
                  key={question}
                  onClick={() => sendMessage(question)}
                  className="rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  {question}
                </button>
              ))}
            </div>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                sendMessage();
              }}
              className="flex gap-2"
            >
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Ask about TRIA Solutions..."
                className="min-w-0 flex-1 rounded-xl border border-input bg-background/60 px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/30"
              />
              <button
                type="submit"
                aria-label="Send message"
                className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground shadow-glow transition-transform hover:scale-105"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </motion.div>
      )}

      <motion.button
        onClick={() => setOpen((value) => !value)}
        aria-label="Open website assistant"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        className="grid h-14 w-14 place-items-center rounded-full bg-[image:var(--gradient-primary)] text-primary-foreground shadow-glow"
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </motion.button>
    </div>
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
        <span className="text-sm uppercase tracking-[0.4em] text-muted-foreground">TRIA</span>
      </div>
    </motion.div>
  );
}
