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
  Sparkles,
  FolderKanban,
  BookOpen,
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
          "Portfolio of Chirag, a fresher Product Manager based in Pune, India. Case studies, skills and education — open to Associate PM roles.",
      },
      { property: "og:title", content: "Chirag · Aspiring Product Manager" },
      {
        property: "og:description",
        content:
          "I turn messy user problems into clear product decisions using research, PRDs, AI prototypes and metrics.",
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

/* ---------- Theme toggle ---------- */

function useTheme() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);
  return { dark, toggle: () => setDark((d) => !d) };
}

/* ---------- Navbar ---------- */

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

function Navbar() {
  const { dark, toggle } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur-md">
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
            aria-label="Toggle dark mode"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-primary hover:text-primary"
          >
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={toggle}
            aria-label="Toggle dark mode"
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
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 right-0 h-[28rem] w-[28rem] rounded-full opacity-25 blur-3xl"
        style={{ background: "radial-gradient(closest-side, oklch(0.53 0.2 265), transparent)" }}
      />
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 pb-20 pt-16 sm:px-6 md:grid-cols-[1.2fr_1fr] md:pt-24">
        <Reveal>
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-accent px-4 py-1.5 text-sm font-medium text-accent-foreground">
              <Sparkles className="h-4 w-4" />
              Open to Associate PM roles
            </span>
            <h1 className="mt-6 font-heading text-4xl font-semibold leading-[1.15] tracking-tight sm:text-5xl lg:text-6xl">
              Hi, I'm Chirag.{" "}
              <span className="text-primary">Aspiring Product Manager.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              I turn messy user problems into clear product decisions using
              research, PRDs, AI prototypes and metrics.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#projects"
                className="inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-soft)] transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)]"
              >
                View Projects
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-xl border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition-all hover:-translate-y-0.5 hover:border-primary hover:text-primary"
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
  { icon: Sparkles, label: "AI + PM focus" },
  { icon: MapPin, label: "Pune, India" },
];

function About() {
  return (
    <section id="about" className="py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
            About Me
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
                I'm based in Pune, India, and currently enrolled in the Product
                Management with Applied AI program (IIT Roorkee iHub
                DivyaSampark x Masai School). I hold a B.Tech degree and I'm
                aiming for my first PM role by early 2027. I build case studies
                end to end: research, personas, PRD, no-code AI prototype and
                success metrics.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {STATS.map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="lift flex items-center gap-3 rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-soft)]"
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

/* ---------- Projects ---------- */

type ProjectLink = { label: string; href: string };

const PROJECTS: {
  title: string;
  tag: string;
  description: string;
  links?: ProjectLink[];
}[] = [
  {
    title: "MakeMyTrip AI Trip Assistant",
    tag: "AI Case Study · Capstone",
    description:
      "Capstone case for an AI itinerary feature. Research, personas (Rhea, Arjun), RICE-prioritised PRD, no-code AI prototype with evals, pricing, GTM and a growth funnel diagnostic.",
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
  },
  {
    title: "LocoPick",
    tag: "Product Case Study",
    description:
      "Hyperlocal discovery and reserve app connecting city buyers with local shops' real stock. Reserve & Inspect token flow, in-app billing, delivery slabs, return policy, search ranking rules and trend alerts for shopkeepers.",
  },
  {
    title: "HireMate",
    tag: "Product Case Study",
    description:
      "AI mock interview platform for Indian job seekers (PM, SWE, Analyst). Freemium pricing at ₹0 / ₹499 / ₹699 per month, with a business plan built on a 7-level success matrix.",
  },
  {
    title: "Smart Attendance System",
    tag: "Academic Paper",
    description:
      "Co-authored academic paper on a geofencing-based attendance system, D.N. Patel College of Engineering, Shahada.",
  },
];

function Projects() {
  return (
    <section id="projects" className="bg-secondary/50 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
            Projects
          </h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Case studies built end to end — research, personas, PRD, prototype
            and metrics.
          </p>
        </Reveal>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {PROJECTS.map((project, i) => (
            <Reveal key={project.title} delay={(i % 2) * 120}>
              <article className="lift flex h-full flex-col rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-soft)] sm:p-7">
                <span className="w-fit rounded-full bg-accent px-3 py-1 text-xs font-semibold tracking-wide text-accent-foreground">
                  {project.tag}
                </span>
                <h3 className="mt-4 font-heading text-xl font-semibold tracking-tight">
                  {project.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {project.description}
                </p>
                {project.links && (
                  <div className="mt-5 flex flex-wrap gap-3">
                    {project.links.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-3.5 py-2 text-xs font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
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

const SKILLS = [
  "Product Research",
  "Personas",
  "PRD Writing",
  "RICE Prioritisation",
  "Metrics & Funnels",
  "GTM Basics",
  "Prompting & AI Evals",
  "Lovable",
  "Airtable",
  "Make.com",
  "Basic UI/UX",
];

function Skills() {
  return (
    <section id="skills" className="py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
            Skills
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <div className="mt-8 flex flex-wrap gap-3">
            {SKILLS.map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium shadow-[var(--shadow-soft)] transition-colors hover:border-primary hover:text-primary"
              >
                {skill}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Education ---------- */

const EDUCATION = [
  {
    title: "Product Management with Applied AI",
    org: "IIT Roorkee iHub DivyaSampark x Masai School",
  },
  {
    title: "B.Tech · CGPA 7.5",
    org: "D.N. Patel College of Engineering, Shahada",
  },
];

function Education() {
  return (
    <section id="education" className="bg-secondary/50 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
            Education
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
    <section id="contact" className="py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <div className="rounded-4xl border border-border bg-card p-8 text-center shadow-[var(--shadow-soft)] sm:p-14">
            <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
              Let's talk
            </h2>
            <p className="mx-auto mt-4 max-w-md text-muted-foreground">
              Open to APM roles, internships and feedback on my case studies.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
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
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-6 py-3 text-sm font-semibold text-foreground transition-all hover:-translate-y-0.5 hover:border-primary hover:text-primary"
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
        <Projects />
        <Skills />
        <Education />
        <Contact />
      </main>
      <footer className="border-t border-border py-8">
        <p className="text-center text-sm text-muted-foreground">
          © 2026 Chirag · Pune, India
        </p>
      </footer>
    </div>
  );
}
