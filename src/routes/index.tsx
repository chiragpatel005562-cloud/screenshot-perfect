import { createFileRoute } from "@tanstack/react-router";
import {
  useEffect,
  useRef,
  useState,
  type MouseEvent,
  type ReactNode,
} from "react";
import {
  ArrowUpRight,
  BrainCircuit,
  FlaskConical,
  Linkedin,
  Mail,
  Menu,
  Moon,
  ShieldCheck,
  Sun,
  Wand2,
  Workflow,
  X,
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
          "Portfolio of Chirag, a fresher Product Manager from Pune, India with an Applied AI focus — case studies, AI workflow, skills and education. Open to Associate PM roles.",
      },
      { property: "og:title", content: "Chirag · Aspiring Product Manager" },
      {
        property: "og:description",
        content:
          "I turn messy problems into AI-powered product decisions — research, PRDs, no-code AI prototypes, evals and metrics.",
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
    document.documentElement.classList.toggle("dark", dark);
    document.documentElement.classList.toggle("light", !dark);
  }, [dark]);
  return { dark, toggle: () => setDark((d) => !d) };
}

/* ---------- Mouse-follow glow card ---------- */

function GlowCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (event: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    el.style.setProperty("--my", `${event.clientY - rect.top}px`);
  };

  return (
    <div ref={ref} onMouseMove={handleMove} className={cn("glow-card", className)}>
      {children}
    </div>
  );
}

/* ---------- Shared bits ---------- */

function SectionHeading({
  label,
  title,
  lead,
}: {
  label: string;
  title: ReactNode;
  lead?: string;
}) {
  return (
    <Reveal>
      <p className="font-mono text-xs font-medium uppercase tracking-[0.08em] text-muted-foreground">
        {label}
      </p>
      <h2 className="mt-4 max-w-2xl font-heading text-4xl font-normal leading-[1.1] tracking-[-0.03em] sm:text-5xl">
        {title}
      </h2>
      {lead && (
        <p className="mt-4 max-w-xl text-lg text-muted-foreground">{lead}</p>
      )}
    </Reveal>
  );
}

/* ---------- Navbar ---------- */

const NAV_LINKS = [
  { label: "Applied AI", href: "#applied-ai" },
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
];

function Navbar() {
  const { dark, toggle } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/70 backdrop-blur-md">
      <nav className="mx-auto flex max-w-[1120px] items-center justify-between px-6 py-3.5">
        <a href="#" className="font-heading text-xl tracking-[-0.03em]">
          Chirag<span className="text-gradient">.</span>
        </a>

        {/* Desktop links */}
        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={toggle}
            aria-label="Toggle light mode"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-accent-indigo hover:text-accent-indigo"
          >
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <a
            href="#contact"
            className="btn-gradient inline-flex items-center rounded-full px-5 py-2 text-sm font-semibold"
          >
            Let's talk
          </a>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={toggle}
            aria-label="Toggle light mode"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground"
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
        <div className="border-t border-border/70 bg-background px-6 py-3 md:hidden">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block rounded-md px-2 py-2.5 text-sm text-foreground transition-colors hover:bg-accent"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="btn-gradient mt-2 inline-flex items-center rounded-full px-5 py-2 text-sm font-semibold"
          >
            Let's talk
          </a>
        </div>
      )}
    </header>
  );
}

/* ---------- Hero ---------- */

function FloatingChip({
  children,
  className,
  delay = "0s",
}: {
  children: ReactNode;
  className?: string;
  delay?: string;
}) {
  return (
    <span
      style={{ animationDelay: delay }}
      className={cn(
        "float-chip absolute z-10 rounded-full border border-border bg-surface/90 px-4 py-2 font-mono text-[0.7rem] uppercase tracking-[0.08em] text-foreground shadow-lg backdrop-blur",
        className
      )}
    >
      {children}
    </span>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div aria-hidden className="hero-blob hero-blob-indigo" />
      <div aria-hidden className="hero-blob hero-blob-magenta" />

      <div className="relative mx-auto grid max-w-[1120px] items-center gap-14 px-6 pb-28 pt-16 md:grid-cols-[1.1fr_0.9fr] md:pt-24">
        {/* Photo first on mobile, right column on desktop */}
        <Reveal className="order-1 md:order-2">
          <div className="relative mx-auto w-fit">
            <div className="relative rounded-[30px] p-[3px]">
              <div
                aria-hidden
                className="absolute inset-0 overflow-hidden rounded-[30px]"
              >
                <div aria-hidden className="conic-ring" />
              </div>
              <img
                src={portraitAsset.url}
                alt="Portrait of Chirag"
                className="relative aspect-[4/5] w-64 rounded-[27px] object-cover sm:w-80"
              />
            </div>
            <FloatingChip className="-left-4 top-10 sm:-left-8">PRD</FloatingChip>
            <FloatingChip
              className="-right-3 top-1/2 sm:-right-7"
              delay="1.5s"
            >
              LLM evals
            </FloatingChip>
            <FloatingChip className="-bottom-5 left-8" delay="3s">
              Growth
            </FloatingChip>
          </div>
        </Reveal>

        <Reveal delay={120} className="order-2 md:order-1">
          <div>
            <span className="inline-flex items-center gap-2.5 rounded-full border border-border bg-card px-4 py-1.5 backdrop-blur">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-live opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-live" />
              </span>
              <span className="font-mono text-[0.7rem] uppercase tracking-[0.08em] text-foreground">
                Open to Associate PM roles
              </span>
            </span>

            <h1 className="mt-6 font-heading text-[2.6rem] font-normal leading-[1.08] tracking-[-0.03em] sm:text-6xl lg:text-[4.1rem]">
              I turn messy problems into{" "}
              <em className="text-gradient">AI-powered</em> product decisions.
            </h1>

            <p className="mt-6 max-w-xl leading-relaxed text-muted-foreground">
              I'm Chirag, a fresher product manager from Pune, completing the
              Product Management with Applied AI program (IIT Roorkee iHub
              DivyaSampark x Masai School). I build case studies end to end:
              research, PRD, working prototype, evals and metrics.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#work"
                className="btn-gradient inline-flex items-center justify-center rounded-full px-7 py-3 text-sm font-semibold"
              >
                See my case studies
              </a>
              <a
                href="#contact"
                className="btn-outline inline-flex items-center justify-center rounded-full px-7 py-3 text-sm font-semibold"
              >
                Contact me
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Skills marquee ---------- */

const SKILLS = [
  "Product research",
  "Personas",
  "PRD writing",
  "RICE",
  "LLM evals",
  "Prompting",
  "Lovable",
  "Airtable",
  "Make.com",
  "Funnels",
  "GTM",
];

function Marquee() {
  return (
    <section aria-label="Skills" className="border-y border-border bg-surface/60 py-5">
      <div className="overflow-hidden">
        <div className="marquee-track">
          {[0, 1].map((copy) => (
            <div
              key={copy}
              aria-hidden={copy === 1}
              className="flex shrink-0 items-center"
            >
              {SKILLS.map((skill) => (
                <span key={skill} className="flex items-center">
                  <span className="mx-7 font-mono text-sm uppercase tracking-[0.08em] text-muted-foreground">
                    {skill}
                  </span>
                  <span aria-hidden className="text-gradient text-sm">
                    ✦
                  </span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Applied AI (bento) ---------- */

function EvalSquares() {
  const dashed = new Set([3, 6]);
  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: 8 }, (_, i) => (
          <span
            key={i}
            aria-hidden
            className={cn(
              "h-8 w-8 rounded-md",
              dashed.has(i)
                ? "border border-dashed border-accent-indigo/70 bg-transparent"
                : "bg-linear-to-br from-accent-indigo to-accent-magenta"
            )}
          />
        ))}
      </div>
      <p className="mt-3 font-mono text-[0.65rem] uppercase tracking-[0.08em] text-muted-foreground">
        8 test cases · dashed = bugs found &amp; fixed
      </p>
    </div>
  );
}

const BENTO_CARDS = [
  {
    icon: Wand2,
    title: "No-code AI prototyping",
    body: "Live itinerary app built in Lovable with an LLM behind it — from prompt to working product without writing a backend.",
    span: "md:col-span-2",
  },
  {
    icon: Workflow,
    title: "Human in the loop",
    body: "Make.com flow: trigger, LLM call, Airtable log, with a review step before anything ships.",
    span: "md:col-span-2",
  },
  {
    icon: ShieldCheck,
    title: "Responsible AI",
    body: "Hallucination, geographic and price bias, safe rollout thinking.",
    span: "md:col-span-2",
  },
  {
    icon: BrainCircuit,
    title: "PM Copilot",
    body: "An AI sidekick that gives PMs options while the PM decides — a thinking partner, not an autopilot.",
    span: "md:col-span-2",
    badge: "Concept",
  },
];

function AppliedAI() {
  return (
    <section id="applied-ai" className="py-24">
      <div className="mx-auto max-w-[1120px] px-6">
        <SectionHeading
          label="/ Applied AI"
          title={
            <>
              How I work with <em className="text-gradient">AI</em>, not just
              talk about it.
            </>
          }
          lead="Every AI feature I propose comes with a prototype and a way to test it."
        />

        <div className="mt-12 grid gap-4 md:grid-cols-6">
          {/* Wide card: Evals, not vibes */}
          <Reveal className="md:col-span-4">
            <GlowCard className="flex h-full flex-col rounded-2xl border border-border bg-card p-7 sm:p-8">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent text-accent-foreground">
                <FlaskConical className="h-5 w-5" />
              </span>
              <h3 className="mt-5 font-heading text-2xl font-normal tracking-[-0.03em]">
                Evals, not vibes
              </h3>
              <p className="mt-3 max-w-xl leading-relaxed text-muted-foreground">
                I tested my trip-planner prototype on a golden dataset of 8
                inputs with different traveller types, destinations, durations
                and budgets. It exposed real bugs, like geography clustering
                and text-versus-tag mismatches, which I then fixed.
              </p>
              <div className="mt-6">
                <EvalSquares />
              </div>
            </GlowCard>
          </Reveal>

          {BENTO_CARDS.map((card, i) => (
            <Reveal key={card.title} delay={((i % 3) + 1) * 90} className={card.span}>
              <GlowCard className="flex h-full flex-col rounded-2xl border border-border bg-card p-7">
                <div className="flex items-start justify-between gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent text-accent-foreground">
                    <card.icon className="h-5 w-5" />
                  </span>
                  {card.badge && (
                    <span className="rounded-full border border-accent-indigo/40 px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.08em] text-accent-indigo">
                      {card.badge}
                    </span>
                  )}
                </div>
                <h3 className="mt-5 font-heading text-xl font-normal tracking-[-0.03em]">
                  {card.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                  {card.body}
                </p>
              </GlowCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Work (numbered rows) ---------- */

const WORK = [
  {
    num: "01",
    title: "MakeMyTrip AI Trip Assistant",
    description:
      "Capstone case on an AI itinerary feature. Personas Rhea (Offbeat Explorer) and Arjun (Time-Starved Planner), RICE-prioritised PRD, a working prototype, pricing and GTM, and a growth funnel diagnostic.",
    tags: ["PRD", "Prototype", "Evals", "GTM"],
    links: [
      { label: "Live prototype", href: "https://offbeat-planner.lovable.app" },
      {
        label: "Airtable",
        href: "https://airtable.com/appj5W0oZVF76cqiI/shrgTn95m3bJmo6Ba",
      },
      {
        label: "Case doc",
        href: "https://docs.google.com/document/d/1ay-S6YtYxCAoz2F8vdznxPBHyob1wTRq4G5WT6EHfmU/edit?usp=sharing",
      },
    ],
  },
  {
    num: "02",
    title: "LocoPick",
    description:
      "Hyperlocal discovery and reserve app that shows city buyers the real stock of nearby shops. Token-based Reserve & Inspect flow, billing, delivery slabs, return policy and trend alerts for shopkeepers.",
    tags: ["PRD", "Marketplace", "Pricing", "Figma"],
    links: [{ label: "Case study on request", href: "#contact" }],
  },
  {
    num: "03",
    title: "HireMate",
    description:
      "AI mock-interview platform for Indian job seekers, with freemium pricing, a business plan and a 7-level success matrix.",
    tags: ["Business plan", "AI product", "Pricing"],
    links: [{ label: "Plan on request", href: "#contact" }],
  },
  {
    num: "04",
    title: "Smart Attendance System",
    description:
      "Co-authored academic paper on a geofencing-based attendance system, D.N. Patel College of Engineering, Shahada.",
    tags: ["Research", "Geofencing"],
    links: [],
  },
];

function Work() {
  return (
    <section id="work" className="py-24">
      <div className="mx-auto max-w-[1120px] px-6">
        <SectionHeading
          label="/ Selected work"
          title="Case studies & projects"
        />

        <div className="mt-12">
          {WORK.map((item, i) => (
            <Reveal key={item.num} delay={i * 70}>
              <article
                className={cn(
                  "work-row -mx-4 grid gap-6 rounded-2xl border-t border-border px-4 py-10 last:border-b md:grid-cols-[7rem_1fr_12rem]"
                )}
              >
                <span
                  aria-hidden
                  className="text-gradient font-heading text-5xl font-normal tracking-[-0.03em] sm:text-6xl"
                >
                  {item.num}
                </span>

                <div>
                  <h3 className="font-heading text-2xl font-normal tracking-[-0.03em] sm:text-3xl">
                    {item.title}
                  </h3>
                  <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-border px-3 py-1 font-mono text-[0.65rem] uppercase tracking-[0.08em] text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-row flex-wrap items-start gap-x-5 gap-y-2 md:flex-col md:items-end">
                  {item.links.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      {...(link.href.startsWith("http")
                        ? { target: "_blank", rel: "noreferrer" }
                        : {})}
                      className="inline-flex items-center gap-1 text-sm font-medium underline decoration-accent-indigo/60 underline-offset-4 transition-colors hover:text-accent-magenta"
                    >
                      {link.label}
                      {link.href.startsWith("http") && (
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      )}
                    </a>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- About ---------- */

const STATS = [
  { value: "4", label: "Projects" },
  { value: "8", label: "Eval test cases" },
  { value: "PUN", label: "Pune, India" },
];

const EDUCATION = [
  {
    title: "Product Management with Applied AI",
    sub: "IIT Roorkee iHub DivyaSampark x Masai School",
    note: "In progress",
  },
  {
    title: "B.Tech",
    sub: "CGPA 7.5",
    note: null,
  },
];

function About() {
  return (
    <section id="about" className="py-24">
      <div className="mx-auto grid max-w-[1120px] gap-16 px-6 md:grid-cols-2">
        <Reveal>
          <p className="font-mono text-xs font-medium uppercase tracking-[0.08em] text-muted-foreground">
            / About
          </p>
          <h2 className="mt-4 font-heading text-4xl font-normal leading-[1.1] tracking-[-0.03em] sm:text-5xl">
            Curious, honest and{" "}
            <em className="text-gradient">building in public</em>.
          </h2>
          <p className="mt-5 max-w-xl leading-relaxed text-muted-foreground">
            I'm a B.Tech graduate (CGPA 7.5) aiming for my first PM role by
            early 2027. I don't have a PM title yet, so I let my case studies
            do the talking.
          </p>

          <div className="mt-9 grid grid-cols-3 gap-3 sm:gap-4">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-border bg-card p-4 sm:p-5"
              >
                <p className="text-gradient font-heading text-3xl font-normal tracking-[-0.03em] sm:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-1.5 text-xs leading-snug text-muted-foreground sm:text-sm">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={130}>
          <p className="font-mono text-xs font-medium uppercase tracking-[0.08em] text-muted-foreground">
            / Education
          </p>
          <div className="mt-8 space-y-10 border-l border-border pl-7">
            {EDUCATION.map((item) => (
              <div key={item.title} className="relative">
                <span
                  aria-hidden
                  className="absolute -left-[2.1rem] top-1.5 h-3.5 w-3.5 rounded-full bg-linear-to-br from-accent-indigo to-accent-magenta"
                />
                <h3 className="font-heading text-xl font-normal tracking-[-0.03em]">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-sm text-muted-foreground">
                  {item.sub}
                </p>
                {item.note && (
                  <span className="mt-3 inline-block rounded-full border border-accent-indigo/40 px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.08em] text-accent-indigo">
                    {item.note}
                  </span>
                )}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Contact ---------- */

function Contact() {
  return (
    <section id="contact" className="pb-24 pt-6">
      <div className="mx-auto max-w-[1120px] px-6">
        <Reveal>
          <div className="contact-glow relative overflow-hidden rounded-[36px] border border-border bg-surface px-6 py-14 text-center sm:px-16 sm:py-20">
            <p className="font-mono text-xs font-medium uppercase tracking-[0.08em] text-muted-foreground">
              / Contact
            </p>
            <h2 className="mx-auto mt-4 max-w-xl font-heading text-4xl font-normal leading-[1.1] tracking-[-0.03em] sm:text-5xl">
              Let's build something{" "}
              <em className="text-gradient">useful</em>.
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
              Open to APM roles, internships and honest feedback on my case
              studies.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <a
                href="mailto:your-email@example.com"
                className="btn-gradient inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold"
              >
                <Mail className="h-4 w-4" />
                Email
              </a>
              <a
                href="https://www.linkedin.com/in/your-profile"
                target="_blank"
                rel="noreferrer"
                className="btn-outline inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold"
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

/* ---------- Footer ---------- */

function Footer() {
  return (
    <footer className="border-t border-border py-8 text-center">
      <p className="font-mono text-xs uppercase tracking-[0.08em] text-muted-foreground">
        © 2026 Chirag · Pune, India
      </p>
    </footer>
  );
}

/* ---------- Page ---------- */

function Index() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Marquee />
      <AppliedAI />
      <Work />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}
