import { motion } from "framer-motion";
import { useState, type FormEvent } from "react";
import { Mail, Phone, MapPin, Send, Github, Linkedin, Instagram, Rocket, CheckCircle2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Section, SectionHeading } from "./primitives";
import { supabase, type ContactSubmission } from "@/lib/supabase";

const field =
  "w-full rounded-xl border border-input bg-background/40 px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/30";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  company: "",
  project_type: "",
  budget: "",
  timeline: "",
  reference_website: "",
  message: "",
};

export function Contact() {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.project_type || !form.budget || !form.message) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setLoading(true);

    const payload: ContactSubmission = {
      name: form.name,
      email: form.email,
      phone: form.phone || undefined,
      company: form.company || undefined,
      project_type: form.project_type as ContactSubmission["project_type"],
      budget: form.budget as ContactSubmission["budget"],
      timeline: form.timeline || undefined,
      reference_website: form.reference_website || undefined,
      message: form.message,
    };

    const { error } = await supabase.from("contact_submissions").insert([payload]);

    setLoading(false);

    if (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again or email us directly.");
      return;
    }

    setSent(true);
    toast.success("Thanks! We'll be in touch within 24 hours.");
    setForm(initialForm);
    setTimeout(() => setSent(false), 3500);
  };

  return (
    <Section id="contact">
      <SectionHeading
        eyebrow="Contact"
        title={<>Let's build <span className="text-gradient">something great</span></>}
        subtitle="Tell us about your project and we'll get back within 24 hours."
      />
      <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr]">
        <div className="space-y-4">
          {[
            { icon: Mail, label: "Email", value: "hello@triasolutions.com" },
            { icon: Phone, label: "Phone", value: "+1 (000) 123-4567" },
            { icon: MapPin, label: "Location", value: "Remote — Worldwide" },
          ].map((c) => (
            <div key={c.label} className="flex items-center gap-4 rounded-2xl glass p-5">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary/15 text-primary">
                <c.icon className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">{c.label}</div>
                <div className="text-sm font-medium">{c.value}</div>
              </div>
            </div>
          </div>
        </div>

        <motion.form
          onSubmit={onSubmit}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl glass p-6 sm:p-8"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <input
              required
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Name"
              className={field}
            />
            <input
              required
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              className={field}
            />
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone"
              className={field}
            />
            <input
              name="company"
              value={form.company}
              onChange={handleChange}
              placeholder="Company"
              className={field}
            />
            <select
              required
              name="project_type"
              value={form.project_type}
              onChange={handleChange}
              className={field}
            >
              <option value="" disabled>Project Type</option>
              <option>Website</option>
              <option>Web App</option>
              <option>AI Integration</option>
              <option>E-Commerce</option>
            </select>
            <select
              required
              name="budget"
              value={form.budget}
              onChange={handleChange}
              className={field}
            >
              <option value="" disabled>Budget</option>
              <option>$2k - $5k</option>
              <option>$5k - $15k</option>
              <option>$15k+</option>
            </select>
            <input
              name="timeline"
              value={form.timeline}
              onChange={handleChange}
              placeholder="Timeline"
              className={field}
            />
            <input
              name="reference_website"
              value={form.reference_website}
              onChange={handleChange}
              placeholder="Reference Website"
              className={field}
            />
          </div>
          <textarea
            required
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Project Description"
            rows={4}
            className={`${field} mt-4`}
          />
          <button
            type="submit"
            disabled={loading}
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-(image:--gradient-primary) px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.02] disabled:opacity-60 disabled:hover:scale-100"
          >
            {loading ? (
              <><Loader2 className="h-4 w-4 animate-spin" /> Sending...</>
            ) : sent ? (
              <><CheckCircle2 className="h-4 w-4" /> Sent!</>
            ) : (
              <>Let's Build Together <Send className="h-4 w-4" /></>
            )}
          </button>
        </motion.form>
      </div>
    </Section>
  );
}

const footerLinks = {
  Quick: ["About", "Portfolio", "Process", "FAQ"],
  Services: ["Web Apps", "AI Integration", "E-Commerce", "Maintenance"],
};

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border">
      <div className="pointer-events-none absolute inset-x-0 -top-32 -z-10 mx-auto h-64 w-2/3 rounded-full bg-primary/20 blur-[120px]" />
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-(image:--gradient-primary) text-primary-foreground">
              <Rocket className="h-5 w-5" />
            </span>
            <span className="text-lg font-bold">TRIA<span className="text-gradient"> Solutions</span></span>
          </div>
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            A boutique software team turning ideas into powerful digital experiences.
          </p>
          <div className="mt-5 flex gap-3">
            {[Github, Linkedin, Instagram, Mail].map((Icon, i) => (
              <a key={i} href="#" className="grid h-10 w-10 place-items-center rounded-xl glass transition-colors hover:text-primary">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
        {Object.entries(footerLinks).map(([title, items]) => (
          <div key={title}>
            <h4 className="text-sm font-semibold">{title}</h4>
            <ul className="mt-4 space-y-2.5">
              {items.map((it) => (
                <li key={it}>
                  <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-primary">{it}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div>
          <h4 className="text-sm font-semibold">Get in touch</h4>
          <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
            <li>hello@triasolutions.com</li>
            <li>+1 (000) 123-4567</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-6 text-xs text-muted-foreground sm:flex-row sm:px-8">
          <span>© {new Date().getFullYear()} TRIA Solutions. All rights reserved.</span>
          <div className="flex gap-5">
            <a href="#" className="transition-colors hover:text-foreground">Privacy Policy</a>
            <a href="#" className="transition-colors hover:text-foreground">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}