import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { ArrowUpRight, ExternalLink, FileText, Star, Quote, Plus, Minus } from "lucide-react";
import { Section, SectionHeading, fadeUp, Counter } from "./primitives";
import p1 from "@/assets/proj-1.jpg";
import p2 from "@/assets/proj-2.jpg";
import p3 from "@/assets/proj-3.jpg";
import p4 from "@/assets/proj-4.jpg";
import p5 from "@/assets/proj-5.jpg";
import p6 from "@/assets/proj-6.jpg";

/* ---------------- PORTFOLIO ---------------- */
const filters = ["All", "Business", "Healthcare", "Education", "AI", "Dashboard", "E-Commerce"];
const projects = [
  { img: p1, title: "InsightIQ Analytics", cat: "Dashboard", tech: ["React", "Node", "PostgreSQL"], desc: "Realtime analytics platform for SaaS teams." },
  { img: p2, title: "MediConnect", cat: "Healthcare", tech: ["Next.js", "Firebase"], desc: "Telemedicine booking & video consultations." },
  { img: p3, title: "Vesta Fashion", cat: "E-Commerce", tech: ["React", "Stripe"], desc: "Premium online fashion storefront." },
  { img: p4, title: "LearnSphere", cat: "Education", tech: ["Vue", "Node"], desc: "Interactive online learning platform." },
  { img: p5, title: "Aida AI", cat: "AI", tech: ["Next.js", "OpenAI"], desc: "AI chatbot builder for support teams." },
  { img: p6, title: "Peak Advisory", cat: "Business", tech: ["React", "Tailwind"], desc: "Corporate consulting web presence." },
];

export function Portfolio() {
  const [active, setActive] = useState("All");
  const shown = active === "All" ? projects : projects.filter((p) => p.cat === active);
  return (
    <Section id="portfolio">
      <SectionHeading
        eyebrow="Portfolio"
        title={<>Work we're <span className="text-gradient">proud of</span></>}
        subtitle="A selection of products we designed and shipped."
      />
      <div className="mb-10 flex flex-wrap justify-center gap-2">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActive(f)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
              active === f
                ? "bg-[image:var(--gradient-primary)] text-primary-foreground shadow-glow"
                : "glass text-muted-foreground hover:text-foreground"
            }`}
          >
            {f}
          </button>
        ))}
      </div>
      <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {shown.map((p) => (
            <motion.div
              layout
              key={p.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              className="group relative overflow-hidden rounded-3xl glass"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={p.img}
                  alt={p.title}
                  width={900}
                  height={640}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-background via-background/60 to-transparent p-6 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <div className="flex gap-3">
                    <a href="#" className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground">
                      <ExternalLink className="h-3.5 w-3.5" /> Live Demo
                    </a>
                    <a href="#" className="flex items-center gap-1.5 rounded-lg glass px-3 py-2 text-xs font-semibold">
                      <FileText className="h-3.5 w-3.5" /> Case Study
                    </a>
                  </div>
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium uppercase tracking-wide text-primary">{p.cat}</span>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
                <h3 className="mt-1 text-lg font-semibold">{p.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{p.desc}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {p.tech.map((t) => (
                    <span key={t} className="rounded-md bg-secondary px-2 py-0.5 text-[11px] text-muted-foreground">{t}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </Section>
  );
}

/* ---------------- CASE STUDIES ---------------- */
const cases = [
  {
    title: "Scaling MediConnect to 50k patients",
    problem: "Manual bookings caused long wait times and no-shows.",
    solution: "Built an automated scheduling + video platform.",
    tech: ["Next.js", "Firebase", "WebRTC"],
    metrics: [{ v: 68, s: "%", l: "Fewer no-shows" }, { v: 50, s: "k", l: "Patients served" }, { v: 3, s: "x", l: "Faster booking" }],
  },
  {
    title: "InsightIQ cuts reporting time by 90%",
    problem: "Teams spent hours building manual reports.",
    solution: "Delivered realtime dashboards with automated exports.",
    tech: ["React", "Node", "PostgreSQL"],
    metrics: [{ v: 90, s: "%", l: "Time saved" }, { v: 120, s: "+", l: "Data sources" }, { v: 99, s: "%", l: "Uptime" }],
  },
];

export function CaseStudies() {
  return (
    <Section id="cases">
      <SectionHeading
        eyebrow="Case Studies"
        title={<>Results that <span className="text-gradient">speak for themselves</span></>}
      />
      <div className="grid gap-6 md:grid-cols-2">
        {cases.map((c, i) => (
          <motion.div
            key={c.title}
            variants={fadeUp}
            custom={i}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="rounded-3xl glass p-7"
          >
            <h3 className="text-xl font-semibold">{c.title}</h3>
            <div className="mt-5 space-y-3 text-sm">
              <p><span className="font-semibold text-primary">Problem:</span> <span className="text-muted-foreground">{c.problem}</span></p>
              <p><span className="font-semibold text-cyan">Solution:</span> <span className="text-muted-foreground">{c.solution}</span></p>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {c.tech.map((t) => (
                <span key={t} className="rounded-md border border-border px-2 py-0.5 text-[11px] text-muted-foreground">{t}</span>
              ))}
            </div>
            <div className="mt-6 grid grid-cols-3 gap-4 border-t border-border pt-6">
              {c.metrics.map((m) => (
                <div key={m.l} className="text-center">
                  <div className="text-2xl font-bold text-gradient"><Counter to={m.v} suffix={m.s} /></div>
                  <div className="mt-1 text-[11px] text-muted-foreground">{m.l}</div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ---------------- TECH STACK ---------------- */
const stack = ["React","Next.js","Angular","Vue","Node.js","Express","Python",".NET","C#","Java","Flutter","MongoDB","MySQL","PostgreSQL","Firebase","Docker","AWS","Azure","OpenAI","TailwindCSS","TypeScript"];

export function TechStack() {
  return (
    <Section id="tech">
      <SectionHeading
        eyebrow="Tech Stack"
        title={<>Tools we <span className="text-gradient">master</span></>}
        subtitle="We pick the right technology for each project — never the other way around."
      />
      <div className="flex flex-wrap justify-center gap-3">
        {stack.map((t, i) => (
          <motion.span
            key={t}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: (i % 8) * 0.05 }}
            whileHover={{ y: -4 }}
            className="rounded-xl glass px-5 py-3 text-sm font-medium transition-colors hover:text-primary hover:shadow-glow"
          >
            {t}
          </motion.span>
        ))}
      </div>
    </Section>
  );
}

/* ---------------- TESTIMONIALS ---------------- */
const reviews = [
  {
    name: "Building Our First Success Story",
    company: "Your Business Could Be Here",
    text: "We're currently partnering with our first clients to build high-quality, custom websites. We'd love to help bring your idea to life.",
    rating: 5,
  }
];

export function Testimonials() {
  return null;
}

/* ---------------- FAQ ---------------- */
const faqs = [
  {
    q: "What kind of websites do you build?",
    a: "We build custom websites including business websites, portfolio websites, landing pages, e-commerce stores, and web applications tailored to your requirements.",
  },
  {
    q: "How do we get started?",
    a: "Simply contact us with your idea. We'll discuss your requirements, understand your goals, and suggest the best solution before starting the project.",
  },
  {
    q: "Can you build a website based on my idea?",
    a: "Absolutely! Whether you have a clear plan or just an idea, we'll help transform it into a professional website or web application.",
  },
  {
    q: "Will my website work on mobile devices?",
    a: "Yes. Every website we build is fully responsive and optimized to provide a great experience across desktops, tablets, and smartphones.",
  },
  {
    q: "Do you provide support after the website is completed?",
    a: "Yes. We offer post-launch support and can help with updates, maintenance, and future improvements as your business grows.",
  },
];


export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <Section id="faq">
      <SectionHeading eyebrow="FAQ" title={<>Questions? <span className="text-gradient">Answered.</span></>} />
      <div className="mx-auto max-w-3xl space-y-3">
        {faqs.map((f, i) => (
          <div key={f.q} className="overflow-hidden rounded-2xl glass">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="flex w-full items-center justify-between gap-4 p-5 text-left"
            >
              <span className="font-medium">{f.q}</span>
              {open === i ? <Minus className="h-5 w-5 shrink-0 text-primary" /> : <Plus className="h-5 w-5 shrink-0 text-muted-foreground" />}
            </button>
            <AnimatePresence>
              {open === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <p className="px-5 pb-5 text-sm text-muted-foreground">{f.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ---------------- BLOG PREVIEW ---------------- */
