import { motion } from "framer-motion";
import {
  Boxes, Zap, Cpu, MessagesSquare, LifeBuoy, Github, Linkedin,
  Globe, User2, Rocket, Brain, LayoutDashboard, ShoppingCart, Palette,
  RefreshCw, Wrench, Layers, ShieldCheck, Search, Gauge, TrendingUp,
  BadgeDollarSign, Headset, CheckCircle2, Compass, ClipboardList,
  PenTool, Code2, TestTube, CloudUpload,
} from "lucide-react";
import { Section, SectionHeading, fadeUp } from "./primitives";
import team1 from "@/assets/team-1.jpg";
import team2 from "@/assets/team-2.jpg";
import team3 from "@/assets/team-3.jpg";

/* ---------------- TRUST ---------------- */
const trust = [
  { icon: Boxes, title: "Custom Solutions", desc: "Every product tailored to your exact goals." },
  { icon: Zap, title: "Fast Delivery", desc: "Agile sprints that ship on time, every time." },
  { icon: Cpu, title: "Modern Technologies", desc: "Cutting-edge stacks built to last." },
  { icon: MessagesSquare, title: "Transparent Communication", desc: "Clear updates at every step." },
  { icon: LifeBuoy, title: "Long-Term Support", desc: "We stay with you after launch." },
];

export function Trust() {
  return (
    <Section id="trust" className="py-16">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
        {trust.map((t, i) => (
          <motion.div
            key={t.title}
            variants={fadeUp}
            custom={i}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="group rounded-2xl glass p-5 text-center transition-all hover:-translate-y-1.5 hover:shadow-glow"
          >
            <div className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-primary/15 text-primary transition-transform group-hover:scale-110">
              <t.icon className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-sm font-semibold">{t.title}</h3>
            <p className="mt-1.5 text-xs text-muted-foreground">{t.desc}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ---------------- ABOUT ---------------- */
const team = [
  {
    photo: team1, name: "Daniel Reyes", role: "Full-Stack Lead",
    skills: ["React", "Node.js", "AWS"],
    bio: "Turns complex requirements into clean, scalable architectures.",
  },
  {
    photo: team2, name: "Aisha Karim", role: "UI/UX & Frontend",
    skills: ["Figma", "TypeScript", "Motion"],
    bio: "Crafts delightful, accessible interfaces users love.",
  },
  {
    photo: team3, name: "Marco Silva", role: "AI & Backend",
    skills: ["Python", "OpenAI", "PostgreSQL"],
    bio: "Builds intelligent systems and rock-solid APIs.",
  },
];

const timeline = [
  { year: "2019", text: "Three developers met on a freelance project and clicked instantly." },
  { year: "2021", text: "Formed Nebula Studio to build products end-to-end." },
  { year: "2023", text: "Expanded into AI-powered solutions for startups." },
  { year: "2025", text: "120+ products shipped for clients across the globe." },
];

export function About() {
  return (
    <Section id="about">
      <SectionHeading
        eyebrow="About Us"
        title={<>The team behind your <span className="text-gradient">next big thing</span></>}
        subtitle="A small, senior team that treats your product like our own."
      />
      <div className="grid gap-6 md:grid-cols-3">
        {team.map((m, i) => (
          <motion.div
            key={m.name}
            variants={fadeUp}
            custom={i}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="group overflow-hidden rounded-3xl glass transition-all hover:-translate-y-2 hover:shadow-glow"
          >
            <div className="relative aspect-square overflow-hidden">
              <img
                src={m.photo}
                alt={m.name}
                width={512}
                height={512}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
            </div>
            <div className="p-6">
              <h3 className="text-lg font-semibold">{m.name}</h3>
              <p className="text-sm text-primary">{m.role}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {m.skills.map((s) => (
                  <span key={s} className="rounded-full bg-secondary px-2.5 py-1 text-xs text-muted-foreground">
                    {s}
                  </span>
                ))}
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{m.bio}</p>
              <div className="mt-5 flex gap-3">
                <a href="https://github.com" target="_blank" rel="noreferrer" className="flex flex-1 items-center justify-center gap-2 rounded-lg glass px-3 py-2 text-xs font-medium transition-colors hover:text-primary">
                  <Github className="h-4 w-4" /> GitHub
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="flex flex-1 items-center justify-center gap-2 rounded-lg glass px-3 py-2 text-xs font-medium transition-colors hover:text-primary">
                  <Linkedin className="h-4 w-4" /> LinkedIn
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-16">
        <h3 className="mb-8 text-center text-xl font-semibold">How we started</h3>
        <div className="relative mx-auto max-w-3xl">
          <div className="absolute left-4 top-0 h-full w-px bg-border md:left-1/2" />
          {timeline.map((t, i) => (
            <motion.div
              key={t.year}
              variants={fadeUp}
              custom={i}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className={`relative mb-8 pl-12 md:w-1/2 md:pl-0 ${i % 2 ? "md:ml-auto md:pl-12" : "md:pr-12 md:text-right"}`}
            >
              <span className={`absolute top-1 grid h-8 w-8 place-items-center rounded-full bg-[image:var(--gradient-primary)] text-xs font-bold text-primary-foreground left-0 ${i % 2 ? "md:-left-4" : "md:-right-4 md:left-auto"}`}>
                <CheckCircle2 className="h-4 w-4" />
              </span>
              <div className="rounded-2xl glass p-4">
                <div className="text-sm font-bold text-primary">{t.year}</div>
                <p className="mt-1 text-sm text-muted-foreground">{t.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ---------------- SERVICES ---------------- */
const services = [
  { icon: Globe, title: "Business Websites", desc: "Fast, SEO-ready sites that convert.", features: ["CMS", "Analytics", "SEO"] },
  { icon: User2, title: "Portfolio Websites", desc: "Showcase your work beautifully.", features: ["Custom design", "Gallery", "Blog"] },
  { icon: Rocket, title: "Startup MVP", desc: "Validate ideas fast with a lean build.", features: ["Auth", "Payments", "Scalable"] },
  { icon: Brain, title: "AI Integration", desc: "Add intelligence to your product.", features: ["Chatbots", "LLMs", "Automation"] },
  { icon: Code2, title: "Custom Web Apps", desc: "Complex logic, delightful UX.", features: ["Realtime", "APIs", "Cloud"] },
  { icon: LayoutDashboard, title: "Admin Dashboards", desc: "Data at a glance, in control.", features: ["Charts", "Roles", "Exports"] },
  { icon: ShoppingCart, title: "E-Commerce", desc: "Sell online with confidence.", features: ["Cart", "Payments", "Inventory"] },
  { icon: Palette, title: "Landing Pages", desc: "High-converting campaign pages.", features: ["A/B", "Speed", "Forms"] },
  { icon: RefreshCw, title: "Website Redesign", desc: "Modernize your online presence.", features: ["Audit", "Rebrand", "Migrate"] },
  { icon: Wrench, title: "Maintenance & Support", desc: "Keep everything running smoothly.", features: ["Updates", "Monitoring", "Fixes"] },
];

export function Services() {
  return (
    <Section id="services">
      <SectionHeading
        eyebrow="Services"
        title={<>Everything you need to <span className="text-gradient">launch & grow</span></>}
        subtitle="From first sketch to scaling in production — we cover the full journey."
      />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => (
          <motion.div
            key={s.title}
            variants={fadeUp}
            custom={i % 3}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="group relative overflow-hidden rounded-2xl glass p-6 transition-all hover:-translate-y-1.5 hover:shadow-glow"
          >
            <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-primary/10 blur-2xl transition-opacity group-hover:opacity-100 opacity-0" />
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-[image:var(--gradient-subtle)] text-primary">
              <s.icon className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-base font-semibold">{s.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {s.features.map((f) => (
                <span key={f} className="rounded-full border border-border px-2.5 py-1 text-[11px] text-muted-foreground">
                  {f}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ---------------- WHY CHOOSE US ---------------- */
const reasons = [
  { icon: Code2, title: "100% Custom Development" },
  { icon: Layers, title: "Responsive Design" },
  { icon: Palette, title: "Modern UI/UX" },
  { icon: Search, title: "SEO Friendly" },
  { icon: Gauge, title: "Performance Optimized" },
  { icon: TrendingUp, title: "Scalable Architecture" },
  { icon: ShieldCheck, title: "Secure Development" },
  { icon: BadgeDollarSign, title: "Transparent Pricing" },
  { icon: Headset, title: "Dedicated Support" },
];

export function WhyChooseUs() {
  return (
    <Section id="why">
      <SectionHeading
        eyebrow="Why Choose Us"
        title={<>Built different, <span className="text-gradient">on purpose</span></>}
        subtitle="Nine reasons teams trust us with their most important products."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {reasons.map((r, i) => (
          <motion.div
            key={r.title}
            variants={fadeUp}
            custom={i % 3}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex items-center gap-4 rounded-2xl glass p-5 transition-all hover:translate-x-1.5 hover:shadow-glow"
          >
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/15 text-primary">
              <r.icon className="h-5 w-5" />
            </div>
            <span className="text-sm font-medium">{r.title}</span>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ---------------- PROCESS ---------------- */
const steps = [
  { icon: Compass, title: "Discovery", desc: "We learn your goals & users." },
  { icon: ClipboardList, title: "Planning", desc: "Scope, roadmap & estimates." },
  { icon: PenTool, title: "UI/UX Design", desc: "Wireframes to polished UI." },
  { icon: Code2, title: "Development", desc: "Clean, tested, scalable code." },
  { icon: TestTube, title: "Testing", desc: "QA across every device." },
  { icon: CloudUpload, title: "Deployment", desc: "Smooth, reliable launch." },
  { icon: Wrench, title: "Maintenance", desc: "Ongoing care & growth." },
];

export function Process() {
  return (
    <Section id="process">
      <SectionHeading
        eyebrow="Our Process"
        title={<>A clear path from <span className="text-gradient">idea to launch</span></>}
        subtitle="Seven proven steps that keep projects on track and stress-free."
      />
      <div className="relative">
        <div className="absolute left-0 top-8 hidden h-px w-full bg-gradient-to-r from-transparent via-primary/40 to-transparent lg:block" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-7">
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              variants={fadeUp}
              custom={i}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="relative rounded-2xl glass p-5 text-center transition-all hover:-translate-y-1.5"
            >
              <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-[image:var(--gradient-primary)] text-primary-foreground shadow-glow">
                <s.icon className="h-6 w-6" />
              </div>
              <div className="mt-3 text-[11px] font-bold uppercase tracking-widest text-primary">
                Step {i + 1}
              </div>
              <h3 className="mt-1 text-sm font-semibold">{s.title}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
