import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  Menu,
  X,
  Sun,
  Moon,
  MapPin,
  Mail,
  Linkedin,
  ExternalLink,
  GraduationCap,
  FolderKanban,
  Sparkles,
  BookOpen,
  Wand2,
  FlaskConical,
  Workflow,
  ShieldCheck,
  BrainCircuit,
} from "lucide-react";
import { cn } from "@/lib/utils";
import portraitAsset from "@/assets/chirag-portrait.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Chirag · Aspiring Product Manager" },
      {
        name: "description",
        content:
          "Portfolio of Chirag, a fresher Product Manager from Pune, India specialising in Applied AI — case studies, AI workflow, skills and education. Open to Associate PM roles.",
      },
      { property: "og:title", content: "Chirag · Aspiring Product Manager" },
      {
        property: "og:description",
        content:
          "I turn messy user problems into AI-powered product decisions — research, PRDs, no-code AI prototypes, evals and metrics.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

/* ---------- Scroll reveal ---------- */

function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn("reveal", visible && "reveal-visible", className)}
    >
      {children}
    </div>
  );
}

/* ---------- Theme (dark by default, light toggle) ---------- */

function useTheme() {
  const [dark, setDark] = useState(true);
  useEffect(() => {
    document.documentElement.classList.toggle("light", !dark);
  }, [dark]);
  return { dark, toggle: () => setDark((d) => !d) };
}

/* ---------- Navbar ---------- */

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Applied AI", href: "#applied-ai" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

function Navbar() {
  const { dark, toggle } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/75 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5 sm:px-6">
        <a href="#" className="font-heading text-lg font-semibold tracking-tight">
          Chirag<span className="text-primary">.</span>
        </a>

        {/* Desktop links */}
        <div className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={toggle}
            aria-label="Toggle light mode"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-primary hover:text-primary"
          >
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={toggle}
            aria-label="Toggle light mode"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground"
          >
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-border/70 bg-background px-4 py-3 md:hidden">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block rounded-md px-2 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}

/* ---------- Hero ---------- */

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div aria-hidden className="hero-mesh" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 pb-24 pt-16 sm:px-6 md:grid-cols-[1.15fr_1fr] md:pt-24">
        <Reveal>
          <div>
            <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-primary">
              Aspiring Product Manager · Applied AI
            </p>
            <h1 className="mt-5 font-heading text-4xl font-semibold leading-[1.15] tracking-tight sm:text-5xl lg:text-[3.4rem]">
              I turn messy user problems into{" "}
              <span className="text-primary">AI-powered product decisions.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Pune, India. Currently completing the Product Management with
              Applied AI program (IIT Roorkee iHub DivyaSampark x Masai School).
              Open to Associate PM roles.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#projects"
                className="inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-soft)] transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)]"
              >
                View Case Studies
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-xl border border-border bg-card/70 px-6 py-3 text-sm font-semibold text-foreground backdrop-blur transition-all hover:-translate-y-0.5 hover:border-primary hover:text-primary"
              >
                Contact Me
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal delay={150} className="mx-auto md:justify-self-end">
          <div className="portrait-ring">
            <img
              src={portraitAsset.url}
              alt="Portrait of Chirag"
              className="h-64 w-64 rounded-[1.5rem] object-cover sm:h-80 sm:w-80"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- About ---------- */

const STATS = [
  { icon: FolderKanban, label: "4 Projects" },
  { icon: Sparkles, label: "AI Prototype + Evals" },
  { icon: MapPin, label: "Pune, India" },
];

function About() {
  return (
    <section id="about" className="py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            About
          </p>
          <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
            A fresher PM who ships the whole loop
          </h2>
        </Reveal>
        <div className="mt-10 grid items-start gap-10 md:grid-cols-[auto_1fr]">
          <Reveal>
            <img
              src={portraitAsset.url}
              alt="Chirag"
              className="h-56 w-56 rounded-3xl object-cover shadow-[var(--shadow-soft)] sm:h-64 sm:w-64"
            />
          </Reveal>
          <Reveal delay={120}>
            <div>
              <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
                I'm a B.Tech graduate (CGPA 7.5) and a fresher PM. I build case
                studies end to end: research, personas, PRD, no-code AI
                prototype, evals, pricing, GTM and growth analytics. No product
                title yet — just honest, working proof of how I think.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {STATS.map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="lift flex items-center gap-3 rounded-2xl border border-border bg-card/70 p-4 shadow-[var(--shadow-soft)] backdrop-blur"
                  >
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent text-accent-foreground">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="min-w-0 text-sm font-semibold">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------- Applied AI (bento) ---------- */

const AI_CARDS = [
  {
    icon: Wand2,
    title: "No-code AI prototyping",
    body: "Built a live itinerary app with Lovable, using an LLM through the Groq API — from prompt to a working product without writing a backend.",
    span: "md:col-span-3",
  },
  {
    icon: FlaskConical,
    title: "Evals, not vibes",
    body: "Tested the prototype on a golden dataset of 8 inputs with varied traveller types, destinations, durations and budgets. Found real bugs — geography clustering, text vs tag mismatch — and fixed them.",
    span: "md:col-span-3",
  },
  {
    icon: Workflow,
    title: "Automation with a human in the loop",
    body: "Make.com flow: trigger, LLM call, Airtable log — with a human review checkpoint before anything ships.",
    span: "md:col-span-2",
  },
  {
    icon: ShieldCheck,
    title: "Responsible AI",
    body: "Working notes on hallucination, geographic and price bias, and what a safe rollout should look like.",
    span: "md:col-span-2",
  },
  {
    icon: BrainCircuit,
    title: "AI as a second mind",
    body: "My concept for a PM copilot that lays out options while the PM decides — a thinking partner, not an autopilot.",
    span: "md:col-span-2",
    badge: "Concept",
  },
];

function AppliedAI() {
  return (
    <section id="applied-ai" className="bg-secondary/40 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Applied AI
          </p>
          <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
            How I work with AI
          </h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Not demos for show — prototypes, evals and guardrails I actually
            ran while building my case studies.
          </p>
        </Reveal>
        <div className="mt-10 grid gap-4 md:grid-cols-6">
          {AI_CARDS.map((card, i) => (
            <Reveal key={card.title} delay={(i % 3) * 100} className={card.span}>
              <article className="lift flex h-full flex-col rounded-[1.25rem] border border-border bg-card/70 p-6 shadow-[var(--shadow-soft)] backdrop-blur">
                <div className="flex items-start justify-between gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent text-accent-foreground">
                    <card.icon className="h-5 w-5" />
                  </span>
                  {card.badge && (
                    <span className="rounded-full border border-primary/40 px-2.5 py-0.5 font-mono text-[0.65rem] font-medium uppercase tracking-wider text-primary">
                      {card.badge}
                    </span>
                  )}
                </div>
                <h3 className="mt-4 font-heading text-lg font-semibold tracking-tight">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {card.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Projects ---------- */

const PROJECTS: {
  title: string;
  tag: string;
  problem: string;
  approach: string;
  built: string;
  links?: { label: string; href: string }[];
  wide?: boolean;
}[] = [
  {
    title: "MakeMyTrip AI Trip Assistant",
    tag: "AI Case Study · Capstone",
    problem:
      "Travellers struggle to build offbeat, personalised itineraries from scattered sources.",
    approach:
      "Personas Rhea (Offbeat Explorer) and Arjun (Time-Starved Planner), then a RICE-prioritised PRD for an AI itinerary feature.",
    built:
      "A working AI prototype with evals, an Airtable dataset, pricing and GTM, and a growth funnel diagnostic.",
    links: [
      { label: "Live Prototype", href: "https://offbeat-planner.lovable.app" },
      {
        label: "Airtable",
        href: "https://airtable.com/appj5W0oZVF76cqiI/shrgTn95m3bJmo6Ba",
      },
      {
        label: "Case Doc",
        href: "https://docs.google.com/document/d/1ay-S6YtYxCAoz2F8vdznxPBHyob1wTRq4G5WT6EHfmU/edit?usp=sharing",
      },
    ],
    wide: true,
  },
  {
    title: "LocoPick",
    tag: "Product Case Study",
    problem:
      "City buyers can't tell what local shops actually have in stock before they shop.",
    approach:
      "A hyperlocal discovery and reserve app with a token-based Reserve & Inspect flow.",
    built:
      "Reserve & Inspect token flow, in-app billing, delivery slabs, return policy, and trend alerts for shopkeepers.",
  },
  {
    title: "HireMate",
    tag: "Business Plan",
    problem:
      "Indian job seekers can't afford enough realistic interview practice.",
    approach:
      "An AI mock-interview platform for PM, SWE and Analyst roles with freemium pricing and a 7-level success matrix.",
    built:
      "Pricing at ₹0 / ₹499 / ₹699 per month, the business plan on the success matrix, and a landing page.",
  },
  {
    title: "Smart Attendance System",
    tag: "Academic Paper",
    problem: "Manual attendance is slow and easy to spoof.",
    approach: "A geofencing-based system that marks presence by location.",
    built:
      "A co-authored academic paper, D.N. Patel College of Engineering, Shahada.",
  },
];

function ProjectMiniBlock({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div>
      <p className="font-mono text-[0.65rem] font-medium uppercase tracking-wider text-primary">
        {label}
      </p>
      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
        {children}
      </p>
    </div>
  );
}

function Projects() {
  return (
    <section id="projects" className="py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Projects
          </p>
          <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
            Case studies, built end to end
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {PROJECTS.map((project, i) => (
            <Reveal
              key={project.title}
              delay={(i % 2) * 120}
              className={cn("h-full", project.wide && "sm:col-span-2")}
            >
              <article
                className={cn(
                  "lift flex h-full flex-col rounded-[1.25rem] border border-border bg-card/70 p-6 shadow-[var(--shadow-soft)] backdrop-blur sm:p-7",
                  project.wide && "sm:p-9"
                )}
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="rounded-full border border-primary/30 bg-accent px-3 py-1 font-mono text-[0.65rem] font-medium uppercase tracking-wider text-accent-foreground">
                    {project.tag}
                  </span>
                </div>
                <h3
                  className={cn(
                    "mt-4 font-heading font-semibold tracking-tight",
                    project.wide ? "text-2xl sm:text-3xl" : "text-xl"
                  )}
                >
                  {project.title}
                </h3>
                <div
                  className={cn(
                    "mt-5 flex-1 grid gap-4",
                    project.wide ? "sm:grid-cols-3" : "grid-cols-1"
                  )}
                >
                  <ProjectMiniBlock label="Problem">{project.problem}</ProjectMiniBlock>
                  <ProjectMiniBlock label="Approach">{project.approach}</ProjectMiniBlock>
                  <ProjectMiniBlock label="What I built">{project.built}</ProjectMiniBlock>
                </div>
                {project.links && (
                  <div className="mt-6 flex flex-wrap gap-3">
                    {project.links.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background/60 px-3.5 py-2 font-mono text-xs font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
                      >
                        {link.label}
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    ))}
                  </div>
                )}
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Skills ---------- */

const SKILL_GROUPS = [
  {
    label: "Product",
    skills: ["Research", "Personas", "PRD", "RICE", "Metrics & Funnels", "GTM"],
  },
  {
    label: "AI",
    skills: ["Prompting", "LLM evals", "Groq", "Responsible AI"],
  },
  {
    label: "Tools",
    skills: ["Lovable", "Airtable", "Make.com", "Figma basics"],
  },
];

function Skills() {
  return (
    <section id="skills" className="bg-secondary/40 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Skills
          </p>
          <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
            What I work with
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-8 sm:grid-cols-3">
          {SKILL_GROUPS.map((group, gi) => (
            <Reveal key={group.label} delay={gi * 120}>
              <p className="font-mono text-[0.65rem] font-medium uppercase tracking-wider text-primary">
                {group.label}
              </p>
              <div className="mt-4 flex flex-wrap gap-2.5">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-border bg-card/70 px-4 py-2 font-mono text-xs font-medium shadow-[var(--shadow-soft)] transition-colors hover:border-primary hover:text-primary"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Education ---------- */

const EDUCATION = [
  {
    title: "Product Management with Applied AI",
    org: "IIT Roorkee iHub DivyaSampark x Masai School · In progress, final assessment pending",
  },
  {
    title: "B.Tech · CGPA 7.5",
    org: "D.N. Patel College of Engineering, Shahada",
  },
];

function Education() {
  return (
    <section id="education" className="py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Education
          </p>
          <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
            Where I'm learning
          </h2>
        </Reveal>
        <div className="relative mt-10 max-w-2xl border-l-2 border-border pl-8">
          {EDUCATION.map((item, i) => (
            <Reveal key={item.title} delay={i * 120}>
              <div className="relative pb-10 last:pb-0">
                <span className="absolute -left-[2.65rem] grid h-10 w-10 place-items-center rounded-full border-2 border-primary/30 bg-background text-primary">
                  <GraduationCap className="h-4.5 w-4.5" />
                </span>
                <h3 className="font-heading text-xl font-semibold tracking-tight">
                  {item.title}
                </h3>
                <p className="mt-1.5 flex items-center gap-2 text-sm text-muted-foreground">
                  <BookOpen className="h-4 w-4 shrink-0" />
                  {item.org}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Contact ---------- */

function Contact() {
  return (
    <section id="contact" className="pb-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-4xl border border-border bg-card/70 p-8 text-center shadow-[var(--shadow-soft)] backdrop-blur sm:p-14">
            <div
              aria-hidden
              className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full opacity-30 blur-3xl"
              style={{
                background:
                  "radial-gradient(closest-side, oklch(0.55 0.2 275 / 0.5), transparent)",
              }}
            />
            <h2 className="relative font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
              Let's build something useful.
            </h2>
            <p className="relative mx-auto mt-4 max-w-md text-muted-foreground">
              Open to APM roles, internships and feedback on my case studies.
            </p>
            <div className="relative mt-8 flex flex-wrap justify-center gap-4">
              <a
                href="mailto:your-email@example.com"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-soft)] transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)]"
              >
                <Mail className="h-4 w-4" />
                Email
              </a>
              <a
                href="https://www.linkedin.com/in/your-profile"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-background/60 px-6 py-3 text-sm font-semibold text-foreground transition-all hover:-translate-y-0.5 hover:border-primary hover:text-primary"
              >
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Page ---------- */

function Index() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <About />
        <AppliedAI />
        <Projects />
        <Skills />
        <Education />
        <Contact />
      </main>
      <footer className="border-t border-border py-8">
        <p className="text-center font-mono text-xs text-muted-foreground">
          © 2026 Chirag · Pune, India
        </p>
      </footer>
    </div>
  );
}
