import { useState, useEffect, useRef, CSSProperties } from "react";

// ── Types ────────────────────────────────────────────────────────────────────

interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  year: string;
  github: string;
  live?: string;
  featured?: boolean;
}

interface Skill {
  category: string;
  items: string[];
}

// ── Data ─────────────────────────────────────────────────────────────────────

const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Allianz Business System (ABS)",
    description:
      "Engineered Spring Boot microservices for Digit Insurance's ABS platform, boosting CRUD performance by 40% and reducing system downtime by 30% through production reliability improvements.",
    tags: ["Java", "Spring Boot", "Microservices", "REST APIs", "MySQL"],
    year: "2024",
    github: "#",
    live: "#",
    featured: true,
  },
  {
    id: 2,
    title: "AI-Enabled Invoice Management",
    description:
      "Built end-to-end AI-powered invoice management system for B2B enterprises, automating workflows and reducing processing time by 40% with 99.9% uptime.",
    tags: ["Java", "JDBC", "SQL", "React.js", "REST APIs"],
    year: "2023",
    github: "#",
    live: "#",
    featured: true,
  },
  {
    id: 3,
    title: "Production Monitoring & Support",
    description:
      "Implemented comprehensive production support using Dynatrace APM, resolving 10-15 critical issues weekly and maintaining 95%+ stakeholder satisfaction.",
    tags: ["Dynatrace", "Jenkins", "CI/CD", "Agile", "Production Support"],
    year: "2024",
    github: "#",
    featured: false,
  },
  {
    id: 4,
    title: "API Testing & Quality Assurance",
    description:
      "Developed systematic API testing frameworks reducing integration defects by 25% and ensuring 95% data accuracy across service boundaries.",
    tags: ["Postman", "JUnit", "Swagger", "API Testing", "Quality Assurance"],
    year: "2023",
    github: "#",
    live: "#",
    featured: false,
  },
];

const SKILLS: Skill[] = [
  { category: "Languages", items: ["Java", "SQL", "JavaScript"] },
  { category: "Frameworks", items: ["Spring Boot", "Spring MVC", "Microservices", "REST APIs"] },
  { category: "Databases", items: ["MySQL", "JDBC", "SQL Optimization"] },
  { category: "Tools & DevOps", items: ["Git", "GitHub", "Jenkins", "Maven", "Jira", "Dynatrace", "Postman"] },
  { category: "Testing", items: ["JUnit", "API Testing", "Swagger", "Quality Assurance"] },
  { category: "Practices", items: ["CI/CD", "Agile/Scrum", "Code Reviews", "Production Support"] },
];

const ROLES = ["Java Backend Developer", "Spring Boot Engineer", "Microservices Architect", "Production Problem Solver"];

// ── Tokens ───────────────────────────────────────────────────────────────────

const T = {
  bg: "#f7f5f0",
  bg2: "#efecea",
  surface: "#ffffff",
  ink: "#1a1814",
  ink2: "#4a4640",
  ink3: "#9a958e",
  accent: "#c84b2f",
  accent2: "#e05a3a",
  accentBg: "rgba(200,75,47,0.06)",
  accentBorder: "rgba(200,75,47,0.2)",
  border: "rgba(26,24,20,0.1)",
  border2: "rgba(26,24,20,0.06)",
  mono: "'JetBrains Mono', 'Fira Code', monospace",
  serif: "'Playfair Display', Georgia, serif",
  sans: "'DM Sans', system-ui, sans-serif",
};

// ── Hooks ────────────────────────────────────────────────────────────────────

function useTypewriter(strings: string[], speed = 70, pause = 1800) {
  const [display, setDisplay] = useState("");
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [charIdx, setCharIdx] = useState(0);

  useEffect(() => {
    const current = strings[index];
    const timeout = setTimeout(() => {
      if (!deleting) {
        setDisplay(current.slice(0, charIdx + 1));
        setCharIdx((c) => c + 1);
        if (charIdx + 1 === current.length) {
          setTimeout(() => setDeleting(true), pause);
        }
      } else {
        setDisplay(current.slice(0, charIdx - 1));
        setCharIdx((c) => c - 1);
        if (charIdx - 1 === 0) {
          setDeleting(false);
          setIndex((i) => (i + 1) % strings.length);
        }
      }
    }, deleting ? speed / 2 : speed);
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, index, strings, speed, pause]);

  return display;
}

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

// ── Sub-components ────────────────────────────────────────────────────────────

const Reveal = ({
  children,
  delay = 0,
  style,
}: {
  children: React.ReactNode;
  delay?: number;
  style?: CSSProperties;
}) => {
  const { ref, visible } = useScrollReveal();
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

const Tag = ({ label }: { label: string }) => (
  <span
    style={{
      fontFamily: T.mono,
      fontSize: "0.68rem",
      padding: "0.2rem 0.6rem",
      borderRadius: "3px",
      background: T.accentBg,
      color: T.accent,
      border: `1px solid ${T.accentBorder}`,
    }}
  >
    {label}
  </span>
);

const Divider = () => (
  <div style={{ width: "100%", height: "1px", background: T.border, margin: "0 auto" }} />
);

// ── Sections ──────────────────────────────────────────────────────────────────

function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const link = (href: string, label: string) => (
    <a
      href={href}
      style={{
        fontFamily: T.mono,
        fontSize: "0.76rem",
        color: T.ink3,
        textDecoration: "none",
        letterSpacing: "0.03em",
        transition: "color 0.2s",
      }}
      onMouseEnter={(e) => ((e.target as HTMLElement).style.color = T.accent)}
      onMouseLeave={(e) => ((e.target as HTMLElement).style.color = T.ink3)}
    >
      {label}
    </a>
  );

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1.1rem 3rem",
        background: scrolled ? "rgba(247,245,240,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? `1px solid ${T.border}` : "1px solid transparent",
        transition: "all 0.3s",
      }}
    >
      <span style={{ fontFamily: T.serif, fontSize: "1.1rem", color: T.ink, fontWeight: 700 }}>
        YN<span style={{ color: T.accent }}>.</span>
      </span>
      <div style={{ display: "flex", gap: "2rem" }}>
        {link("#about", "about")}
        {link("#skills", "skills")}
        {link("#projects", "projects")}
        {link("#contact", "contact")}
      </div>
    </nav>
  );
}

function Hero() {
  const typed = useTypewriter(ROLES);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(timeout);
  }, []);

  const fade = (delay: number): CSSProperties => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? "translateY(0)" : "translateY(24px)",
    transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
  });

  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "6rem 3rem 4rem",
        maxWidth: "960px",
        margin: "0 auto",
      }}
    >
      <p
        style={{
          ...fade(100),
          fontFamily: T.mono,
          fontSize: "0.75rem",
          color: T.accent,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          marginBottom: "1.25rem",
        }}
      >
        // open to new roles
      </p>

      <h1
        style={{
          ...fade(250),
          fontFamily: T.serif,
          fontSize: "clamp(3rem, 8vw, 6rem)",
          fontWeight: 700,
          lineHeight: 1.0,
          letterSpacing: "-0.02em",
          color: T.ink,
          marginBottom: "0.25rem",
        }}
      >
        Suman
      </h1>
      <h1
        style={{
          ...fade(350),
          fontFamily: T.serif,
          fontSize: "clamp(3rem, 8vw, 6rem)",
          fontWeight: 700,
          lineHeight: 1.0,
          letterSpacing: "-0.02em",
          color: T.accent,
          marginBottom: "1.5rem",
        }}
      >
        Meher.
      </h1>

      <p
        style={{
          ...fade(500),
          fontFamily: T.mono,
          fontSize: "1rem",
          color: T.ink2,
          marginBottom: "1.75rem",
          minHeight: "1.6rem",
        }}
      >
        {typed}
        <span
          style={{
            display: "inline-block",
            width: "2px",
            height: "1rem",
            background: T.accent,
            marginLeft: "2px",
            verticalAlign: "middle",
            animation: "blink 0.9s step-end infinite",
          }}
        />
      </p>

      <p
        style={{
          ...fade(650),
          fontFamily: T.sans,
          fontSize: "1rem",
          color: T.ink2,
          maxWidth: "480px",
          lineHeight: 1.85,
          marginBottom: "2.5rem",
        }}
      >
        Results-driven Software Engineer specializing in Java backend systems, Spring Boot microservices, and high-performance APIs. 3+ years of experience delivering production-ready solutions at fintech scale.
      </p>

      <div style={{ ...fade(800), display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        <a
          href="#projects"
          style={{
            fontFamily: T.mono,
            fontSize: "0.8rem",
            padding: "0.75rem 1.75rem",
            borderRadius: "4px",
            background: T.accent,
            color: "#fff",
            textDecoration: "none",
            letterSpacing: "0.03em",
            transition: "background 0.2s",
          }}
          onMouseEnter={(e) => ((e.target as HTMLElement).style.background = T.accent2)}
          onMouseLeave={(e) => ((e.target as HTMLElement).style.background = T.accent)}
        >
          View Projects →
        </a>
        <a
          href="#contact"
          style={{
            fontFamily: T.mono,
            fontSize: "0.8rem",
            padding: "0.75rem 1.75rem",
            borderRadius: "4px",
            background: "transparent",
            color: T.ink,
            border: `1px solid ${T.border}`,
            textDecoration: "none",
            letterSpacing: "0.03em",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            const el = e.target as HTMLElement;
            el.style.borderColor = T.accent;
            el.style.color = T.accent;
          }}
          onMouseLeave={(e) => {
            const el = e.target as HTMLElement;
            el.style.borderColor = T.border;
            el.style.color = T.ink;
          }}
        >
          Get in Touch
        </a>
      </div>

      {/* Decorative number column */}
      <div
        style={{
          position: "absolute",
          right: "3rem",
          top: "50%",
          transform: "translateY(-50%)",
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
          opacity: 0.18,
        }}
      >
        {["01", "02", "03", "04", "05"].map((n) => (
          <span key={n} style={{ fontFamily: T.mono, fontSize: "0.65rem", color: T.ink, letterSpacing: "0.1em" }}>
            {n}
          </span>
        ))}
      </div>

      <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>
    </section>
  );
}

function About() {
  const stats = [
    { num: "3+", label: "Years Experience" },
    { num: "40%", label: "Performance Gain" },
    { num: "30%", label: "Downtime Reduction" },
    { num: "95%+", label: "Stakeholder Satisfaction" },
  ];

  return (
    <section id="about" style={{ padding: "6rem 3rem", maxWidth: "960px", margin: "0 auto" }}>
      <Reveal>
        <p style={{ fontFamily: T.mono, fontSize: "0.72rem", color: T.accent, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
          // about me
        </p>
        <h2 style={{ fontFamily: T.serif, fontSize: "2.4rem", fontWeight: 700, color: T.ink, marginBottom: "2.5rem", letterSpacing: "-0.02em" }}>
          Who I am
        </h2>
      </Reveal>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "start" }}>
        <Reveal delay={100}>
          <p style={{ fontFamily: T.sans, fontSize: "0.95rem", color: T.ink2, lineHeight: 1.85, marginBottom: "1rem" }}>
            I'm a <strong style={{ color: T.ink }}>results-driven Software Engineer</strong> with 3+ years of experience designing and delivering high-performance backend systems using Java, Spring Boot, and Microservices.
          </p>
          <p style={{ fontFamily: T.sans, fontSize: "0.95rem", color: T.ink2, lineHeight: 1.85, marginBottom: "1rem" }}>
            My expertise spans from engineering <strong style={{ color: T.ink }}>production-ready microservices</strong> to optimizing system performance and reducing downtime at fintech scale (Digit Insurance).
          </p>
          <p style={{ fontFamily: T.sans, fontSize: "0.95rem", color: T.ink2, lineHeight: 1.85 }}>
            I excel at translating complex product requirements into clean, testable code while collaborating effectively in Agile cross-functional teams.
          </p>
        </Reveal>

        <Reveal delay={200} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          {stats.map((s) => (
            <div key={s.label} style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: "8px", padding: "1.25rem" }}>
              <div style={{ fontFamily: T.serif, fontSize: "2rem", fontWeight: 700, color: T.accent, lineHeight: 1, marginBottom: "0.3rem" }}>{s.num}</div>
              <div style={{ fontFamily: T.sans, fontSize: "0.78rem", color: T.ink3 }}>{s.label}</div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" style={{ padding: "6rem 3rem", maxWidth: "960px", margin: "0 auto" }}>
      <Reveal>
        <p style={{ fontFamily: T.mono, fontSize: "0.72rem", color: T.accent, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
          // tech stack
        </p>
        <h2 style={{ fontFamily: T.serif, fontSize: "2.4rem", fontWeight: 700, color: T.ink, marginBottom: "2.5rem", letterSpacing: "-0.02em" }}>
          What I work with
        </h2>
      </Reveal>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))", gap: "1.25rem" }}>
        {SKILLS.map((group, i) => (
          <Reveal key={group.category} delay={i * 80}>
            <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: "8px", padding: "1.5rem", height: "100%" }}>
              <p style={{ fontFamily: T.mono, fontSize: "0.72rem", color: T.accent, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "1rem" }}>
                {group.category}
              </p>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {group.items.map((item) => (
                  <li key={item} style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontFamily: T.sans, fontSize: "0.88rem", color: T.ink2 }}>
                    <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: T.accent, flexShrink: 0 }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Projects() {
  const [filter, setFilter] = useState<"all" | "featured">("all");
  const visible = PROJECTS.filter((p) => filter === "all" || p.featured);

  return (
    <section id="projects" style={{ padding: "6rem 3rem", maxWidth: "960px", margin: "0 auto" }}>
      <Reveal style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "2.5rem", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <p style={{ fontFamily: T.mono, fontSize: "0.72rem", color: T.accent, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
            // selected work
          </p>
          <h2 style={{ fontFamily: T.serif, fontSize: "2.4rem", fontWeight: 700, color: T.ink, letterSpacing: "-0.02em" }}>
            Projects
          </h2>
        </div>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          {(["all", "featured"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                fontFamily: T.mono,
                fontSize: "0.74rem",
                padding: "0.4rem 1rem",
                borderRadius: "4px",
                border: `1px solid ${filter === f ? T.accent : T.border}`,
                background: filter === f ? T.accentBg : "transparent",
                color: filter === f ? T.accent : T.ink3,
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </Reveal>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
        {visible.map((project, i) => (
          <ProjectCard key={project.id} project={project} delay={i * 80} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project, delay }: { project: Project; delay: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Reveal delay={delay}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: T.surface,
          border: `1px solid ${hovered ? T.accentBorder : T.border}`,
          borderRadius: "10px",
          padding: "1.75rem",
          transform: hovered ? "translateY(-3px)" : "translateY(0)",
          transition: "all 0.25s",
          position: "relative",
          overflow: "hidden",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* accent top bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "2px",
            background: T.accent,
            transform: `scaleX(${hovered ? 1 : 0})`,
            transformOrigin: "left",
            transition: "transform 0.3s",
          }}
        />

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
          <span style={{ fontFamily: T.mono, fontSize: "0.72rem", color: T.ink3 }}>{project.year}</span>
          <div style={{ display: "flex", gap: "1rem" }}>
            <a href={project.github} style={{ fontFamily: T.mono, fontSize: "0.72rem", color: T.ink3, textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = T.accent)}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = T.ink3)}
            >GitHub ↗</a>
            {project.live && (
              <a href={project.live} style={{ fontFamily: T.mono, fontSize: "0.72rem", color: T.ink3, textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.color = T.accent)}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.color = T.ink3)}
              >Live ↗</a>
            )}
          </div>
        </div>

        <h3 style={{ fontFamily: T.serif, fontSize: "1.2rem", fontWeight: 700, color: T.ink, marginBottom: "0.6rem" }}>
          {project.title}
        </h3>
        <p style={{ fontFamily: T.sans, fontSize: "0.85rem", color: T.ink2, lineHeight: 1.75, marginBottom: "1.5rem", flex: 1 }}>
          {project.description}
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
          {project.tags.map((tag) => <Tag key={tag} label={tag} />)}
        </div>
      </div>
    </Reveal>
  );
}

function Contact() {
  const links = [
    { label: "sumanmeher014@gmail.com", href: "mailto:sumanmeher014@gmail.com", prefix: "@" },
    { label: "github.com/sumanmeher", href: "#github", prefix: "gh" },
    { label: "linkedin.com/in/suman-meher", href: "#linkedin", prefix: "in" },
    { label: "@sumanmeher", href: "#twitter", prefix: "𝕏" },
  ];

  return (
    <section id="contact" style={{ padding: "6rem 3rem", maxWidth: "960px", margin: "0 auto" }}>
      <Reveal>
        <p style={{ fontFamily: T.mono, fontSize: "0.72rem", color: T.accent, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
          // reach out
        </p>
        <h2 style={{ fontFamily: T.serif, fontSize: "2.4rem", fontWeight: 700, color: T.ink, marginBottom: "2.5rem", letterSpacing: "-0.02em" }}>
          Let's build something
        </h2>
      </Reveal>

      <Reveal delay={100}>
        <div style={{ background: T.bg2, border: `1px solid ${T.border}`, borderRadius: "12px", padding: "3rem", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "2rem", flexWrap: "wrap" }}>
          <div>
            <h3 style={{ fontFamily: T.serif, fontSize: "1.5rem", fontWeight: 700, color: T.ink, marginBottom: "0.5rem" }}>
              Got a project in mind?
            </h3>
            <p style={{ fontFamily: T.sans, fontSize: "0.9rem", color: T.ink2, maxWidth: "340px", lineHeight: 1.75 }}>
              I'm open to freelance projects, full-time roles, and interesting collaborations. Let's talk.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
            {links.map((l, idx) => (
              <a key={idx} href={l.href}
                style={{ fontFamily: T.mono, fontSize: "0.82rem", color: T.ink2, textDecoration: "none", display: "flex", alignItems: "center", gap: "0.6rem", transition: "color 0.2s" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = T.accent)}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = T.ink2)}
              >
                <span style={{ color: T.accent, fontWeight: 600, minWidth: "1.2rem" }}>{l.prefix}</span>
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

// ── App ───────────────────────────────────────────────────────────────────────

export default function Portfolio() {
  return (
    <div style={{ background: T.bg, minHeight: "100vh", position: "relative" }}>
      <Nav />
      <Hero />
      <Divider />
      <About />
      <Divider />
      <Skills />
      <Divider />
      <Projects />
      <Divider />
      <Contact />
      <footer style={{ textAlign: "center", padding: "2rem 3rem", fontFamily: T.mono, fontSize: "0.72rem", color: T.ink3, borderTop: `1px solid ${T.border}` }}>
        <p>designed &amp; built by Suman Meher · 2025</p>
      </footer>
    </div>
  );
}
