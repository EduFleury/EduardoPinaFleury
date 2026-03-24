import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, Phone, Download, ExternalLink, Code2, Database, Zap } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { useLocation } from "wouter";
import EduFoto from "../../public/Media/Eduardo.jpg";
import EduFormado from "../../public/Media/EduardoFormado.jpg";
import FormacaoAcademica from "../../public/Media/FormacaoAcademica.jpg";
import UTFPR from "../../public/Media/utfpr.png";

// Animated counter hook
function useCounter(target: number, duration = 1500, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

// Intersection observer hook
function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setInView(true);
    }, { threshold });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, inView };
}

export default function Home() {
  const [, setLocation] = useLocation();
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState("sobre");
  const { ref: statsRef, inView: statsInView } = useInView(0.3);

  const yearsCount = useCounter(3, 1200, statsInView);
  const projectsCount = useCounter(20, 1400, statsInView);
  const clientsCount = useCounter(15, 1600, statsInView);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      const sections = ["sobre", "experiencia", "skills", "contato"];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveSection(id);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "sobre", label: "Sobre" },
    { id: "experiencia", label: "Experiência" },
    { id: "skills", label: "Skills" },
    { id: "sankhya", label: "ERP Sankhya", external: true },
    { id: "contato", label: "Contato" },
  ];

  const skills = [
    { name: "Java / Spring Boot", level: 88, category: "backend" },
    { name: "ERP Sankhya", level: 92, category: "erp" },
    { name: "Angular / TypeScript", level: 78, category: "frontend" },
    { name: "Oracle / SQL", level: 82, category: "data" },
    { name: "React", level: 70, category: "frontend" },
    { name: "Docker / Git", level: 74, category: "devops" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* ── NAV ── */}
      <nav className="fixed top-0 w-full z-50 transition-all duration-300"
        style={{ background: scrollY > 40 ? "rgba(10,10,10,0.92)" : "transparent", backdropFilter: scrollY > 40 ? "blur(16px)" : "none", borderBottom: scrollY > 40 ? "1px solid rgba(255,255,255,0.06)" : "none" }}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="relative">
            <span className="text-2xl font-display font-bold text-accent tracking-tight">EP</span>
            <span className="absolute -bottom-1 left-0 w-full h-px bg-accent/60" />
          </div>
          <div className="hidden md:flex gap-1 items-center bg-white/[0.03] border border-white/[0.06] rounded-full px-2 py-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => item.external ? (setLocation("/erp-sankhya"), window.scrollTo(0,0)) : document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" })}
                className={`relative px-4 py-1.5 rounded-full text-sm transition-all duration-200 ${
                  activeSection === item.id && !item.external
                    ? "text-background font-medium"
                    : "text-muted-foreground hover:text-white"
                }`}
              >
                {activeSection === item.id && !item.external && (
                  <span className="absolute inset-0 bg-accent rounded-full" style={{ zIndex: -1 }} />
                )}
                {item.label}
              </button>
            ))}
          </div>
          <a href="../../public/Media/Curriculo-EduardoPina.pdf" download>
            <Button variant="outline" size="sm" className="border-accent/40 text-accent hover:bg-accent/10 rounded-full text-xs gap-1.5">
              <Download size={12} /> CV
            </Button>
          </a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        {/* Parallax bg */}
        <div className="absolute inset-0 opacity-35" style={{
          backgroundImage: "url('https://private-us-east-1.manuscdn.com/sessionFile/2vaZuFV1TIcOO4DzVvp8Ma/sandbox/zdI0Y3cxTXpmp1sNDFUegK-img-1_1772127246000_na1fn_aGVyby1iYWNrZ3JvdW5k.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvMnZhWnVGVjFUSWNPTzREelZ2cDhNYS9zYW5kYm94L3pkSTBZM2N4VFhwbXAxc05ERlVlZ0staW1nLTFfMTc3MjEyNzI0NjAwMF9uYTFmbl9hR1Z5YnkxaVlXTnJaM0p2ZFc1ay5wbmc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=TPYDLe42B1MHMXlSsZtu8qAiD0N7fHD-M-Z0tfaU6juCoYTkmOZ2L0~GY2OdWc2OcQZwTcftHFAVVeSDs0ZulIZ-1M2~vXQnca2qPYtIL9O5TsjDCd9l2bPgWwehio9j6GQ1gBumNjpMFPN7yOode-3V~FKWiYVrrD39zx~CeBlEUWo3DcK470U~DZba9DdCrylwzKvRWGPZBoZuwdsAbfYGlvmJDN5SEIRMhTJM~qwiJBfTCJKTawyyVnOloxGS-IBrHz728~amC2B3Kob-YlYHNhZqYDh3a0907KBRXJ5fK1L8GcXbN877ztqtJNPnFBAK2zOzwvam75-J82LjYg__')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          transform: `translateY(${scrollY * 0.4}px)`,
        }} />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/50 to-background" />
        {/* Subtle grid */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: "linear-gradient(rgba(0,217,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,217,255,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }} />

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          {/* Avatar */}
          <div className="mb-8 flex justify-center" style={{ animation: "fadeInDown 0.7s ease both" }}>
            <div className="relative">
              {/* Spinning ring */}
              <div className="absolute -inset-1 rounded-full border border-accent/30 animate-spin" style={{ animationDuration: "8s" }} />
              <div className="absolute -inset-3 rounded-full border border-accent/10" />
              <div className="w-32 h-32 rounded-full border-2 border-accent/60 overflow-hidden shadow-2xl shadow-accent/20">
                <img src={EduFoto} alt="Eduardo Pina" className="w-full h-full object-cover" />
              </div>
              {/* Online indicator */}
              <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-background shadow-lg shadow-green-400/40" />
            </div>
          </div>

          {/* Badge */}
          <div className="mb-4 flex justify-center" style={{ animation: "fadeIn 0.6s 0.2s ease both", opacity: 0 }}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/25 bg-accent/5 text-accent/80 text-xs font-mono tracking-widest uppercase">
              <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
              Open to Opportunities
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-display font-bold mb-4 text-white tracking-tight leading-none" style={{ animation: "fadeInUp 0.7s 0.3s ease both", opacity: 0 }}>
            Eduardo Pina
          </h1>

          <p className="text-xl md:text-2xl text-accent mb-6 font-light tracking-wide" style={{ animation: "fadeInUp 0.7s 0.45s ease both", opacity: 0 }}>
            Full Stack Developer · Java · Angular · React · ERP Sankhya
          </p>

          <p className="text-base text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed" style={{ animation: "fadeInUp 0.7s 0.6s ease both", opacity: 0 }}>
            Desenvolvedor de software com experiência em backend Java (legado e Spring Boot) e implementação de soluções ERP na plataforma Sankhya. Aplico princípios SOLID, padrões de projeto e testes unitários, com foco em clean code e arquitetura escalável.
          </p>

          <div className="flex flex-wrap gap-3 justify-center" style={{ animation: "fadeInUp 0.7s 0.75s ease both", opacity: 0 }}>
            <Button
              onClick={() => document.getElementById("experiencia")?.scrollIntoView({ behavior: "smooth" })}
              className="bg-accent text-background hover:bg-accent/90 px-7 py-5 text-sm font-semibold rounded-full shadow-lg shadow-accent/25 transition-all hover:shadow-accent/40 hover:scale-[1.02]"
            >
              Ver Experiências
            </Button>
            <a href="https://github.com/EduFleury" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="border-white/15 text-white hover:bg-white/5 hover:border-white/30 px-7 py-5 text-sm rounded-full transition-all">
                <Github className="mr-2" size={16} /> GitHub
              </Button>
            </a>
            <a href="https://linkedin.com/in/eduardo-pina-fleury-fortuna-51a57021b" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="border-white/15 text-white hover:bg-white/5 hover:border-white/30 px-7 py-5 text-sm rounded-full transition-all">
                <Linkedin className="mr-2" size={16} /> LinkedIn
              </Button>
            </a>
            <a href="../../public/Media/Curriculo-EduardoPina.pdf" download>
              <Button variant="outline" className="border-accent/30 text-accent hover:bg-accent/10 px-7 py-5 text-sm rounded-full transition-all">
                <Download className="mr-2" size={16} /> CV
              </Button>
            </a>
          </div>

          {/* Scroll cue */}
          <div className="mt-16 flex flex-col items-center gap-2 opacity-40" style={{ animation: "fadeIn 1s 1.2s ease both", opacity: 0 }}>
            <span className="text-xs tracking-widest uppercase font-mono">scroll</span>
            <div className="w-px h-10 bg-gradient-to-b from-accent to-transparent" />
          </div>
        </div>
      </section>

      {/* ── SOBRE ── */}
      <section id="sobre" className="py-28 px-4 bg-gradient-to-b from-background to-card/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/[0.03] rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-5xl mx-auto">
          {/* Section label */}
          <div className="flex items-center gap-4 mb-4">
            <span className="text-xs font-mono text-accent/60 tracking-[0.3em] uppercase">01 / Sobre</span>
            <div className="h-px flex-1 bg-gradient-to-r from-accent/20 to-transparent max-w-xs" />
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-16 text-white">
            Sobre <span className="text-accent">Mim</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-base text-muted-foreground mb-5 leading-relaxed">
                Desenvolvedor backend com formação em Sistemas de Informação pela Universidade Federal de Goiás (UFG) e atualmente cursando pós-graduação em Especialização Java pela Universidade Tecnológica Federal do Paraná (UTFPR). Possuo experiência sólida em sistemas corporativos legados de grande porte, atuando com foco em qualidade, manutenibilidade e evolução contínua das aplicações.
              </p>
              <p className="text-base text-muted-foreground mb-5 leading-relaxed">
                Atuo com Java (JSP, Struts, Spring Boot, Angular), além de forte experiência com o ERP Sankhya, incluindo customizações, integrações e desenvolvimento de funcionalidades complexas. Tenho prática na aplicação de princípios SOLID, padrões de projeto e testes unitários.
              </p>
              <p className="text-base text-muted-foreground mb-8 leading-relaxed">
                Prezo por código limpo, bem estruturado e orientado a boas práticas, sempre buscando soluções eficientes e sustentáveis.
              </p>

              <div className="flex items-center gap-6">
                <a href="mailto:eduardopinafleury@gmail.com" className="group flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors text-sm">
                  <div className="w-8 h-8 rounded-lg border border-border group-hover:border-accent/40 flex items-center justify-center transition-all">
                    <Mail size={14} className="text-accent" />
                  </div>
                  eduardopinafleury@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-6 mt-3">
                <a href="tel:+5562981731030" className="group flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors text-sm">
                  <div className="w-8 h-8 rounded-lg border border-border group-hover:border-accent/40 flex items-center justify-center transition-all">
                    <Phone size={14} className="text-accent" />
                  </div>
                  (62) 98173-1030
                </a>
              </div>
            </div>

            <div className="relative">
              {/* Decorative frame */}
              <div className="absolute -inset-4 border border-accent/10 rounded-2xl" />
              <div className="absolute -inset-8 border border-accent/5 rounded-3xl" />
              <div className="absolute inset-0 bg-gradient-to-br from-accent/15 to-transparent rounded-xl blur-2xl" />
              <img
                src={EduFormado}
                alt="Graduação UFG"
                className="relative rounded-xl border border-accent/20 shadow-2xl shadow-accent/10 w-full"
              />
              {/* Corner accent */}
              <div className="absolute -top-2 -right-2 w-8 h-8 border-t-2 border-r-2 border-accent/50 rounded-tr-lg" />
              <div className="absolute -bottom-2 -left-2 w-8 h-8 border-b-2 border-l-2 border-accent/50 rounded-bl-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* ── EXPERIÊNCIA ── */}
      <section id="experiencia" className="py-28 px-4 bg-background relative">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-accent/[0.02] rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-xs font-mono text-accent/60 tracking-[0.3em] uppercase">02 / Experiência</span>
            <div className="h-px flex-1 bg-gradient-to-r from-accent/20 to-transparent max-w-xs" />
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-16 text-white">
            Experiência <span className="text-accent">Profissional</span>
          </h2>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-accent/40 via-accent/20 to-transparent hidden md:block" />

            <div className="space-y-10">
              {/* Ebix */}
              <div className="md:pl-20 relative group">
                {/* Timeline dot */}
                <div className="absolute left-[18px] top-8 w-4 h-4 rounded-full border-2 border-accent bg-background group-hover:bg-accent transition-all duration-300 hidden md:block shadow-lg shadow-accent/30" />

                <div className="bg-card border border-border rounded-2xl p-8 hover:border-accent/40 transition-all duration-300 hover:shadow-xl hover:shadow-accent/5 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-3 mb-6">
                    <div>
                      <h3 className="text-xl font-display font-bold text-white">Desenvolvedor Java Backend Júnior</h3>
                      <p className="text-accent font-medium mt-1">Ebix Latin America</p>
                      <p className="text-muted-foreground text-sm mt-0.5">Goiânia, GO</p>
                    </div>
                    <span className="flex-shrink-0 px-3 py-1 bg-accent/10 text-accent text-xs font-mono rounded-full border border-accent/20">
                      2025 – Atual
                    </span>
                  </div>

                  <ul className="space-y-2.5 mb-6">
                    {[
                      "Manutenção, refatoração e evolução de sistema corporativo legado para Bradesco Seguros",
                      "Desenvolvimento e melhoria de funcionalidades utilizando Java, JSP e Struts",
                      "Aplicação de princípios SOLID e boas práticas para aumentar manutenibilidade",
                      "Utilização de padrões arquiteturais: Service, Facade, DAO e Action",
                      "Criação e manutenção de testes unitários com JUnit",
                      "Correções de bugs, ajustes de performance e evolução de regras de negócio",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                        <span className="text-accent mt-0.5 flex-shrink-0">▸</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2">
                    {["Java", "JSP", "Struts", "JUnit", "SOLID", "Arquitetura em Camadas"].map(tech => (
                      <span key={tech} className="px-3 py-1 bg-accent/8 text-accent/90 rounded-full text-xs font-mono border border-accent/15">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Vatec */}
              <div className="md:pl-20 relative group">
                <div className="absolute left-[18px] top-8 w-4 h-4 rounded-full border-2 border-accent/50 bg-background group-hover:bg-accent/80 transition-all duration-300 hidden md:block shadow-lg shadow-accent/20" />

                <div className="bg-card border border-border rounded-2xl p-8 hover:border-accent/40 transition-all duration-300 hover:shadow-xl hover:shadow-accent/5 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="flex flex-col sm:flex-row justify-between items-start gap-3 mb-6">
                    <div>
                      <h3 className="text-xl font-display font-bold text-white">Analista de Sistemas</h3>
                      <p className="text-accent font-medium mt-1">Vatec Tecnologia</p>
                      <p className="text-muted-foreground text-sm mt-0.5">Goiânia, GO</p>
                    </div>
                    <span className="flex-shrink-0 px-3 py-1 bg-card text-muted-foreground text-xs font-mono rounded-full border border-border">
                      2022 – 2025
                    </span>
                  </div>

                  <ul className="space-y-2.5 mb-6">
                    {[
                      "Análise de dados, implantação de soluções e desenvolvimento de melhorias em ERP Sankhya",
                      "Criação de telas personalizadas utilizando Angular",
                      "Desenvolvimento de ações e integrações em Java",
                      "Geração de relatórios gerenciais utilizando iReport",
                      "Criação de dashboards com HTML, JSP e JavaScript",
                      "Experiência com banco de dados Oracle e SQL",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                        <span className="text-accent mt-0.5 flex-shrink-0">▸</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2">
                    {["ERP Sankhya", "Java", "Angular", "iReport", "Oracle", "SQL", "JavaScript"].map(tech => (
                      <span key={tech} className="px-3 py-1 bg-card text-muted-foreground rounded-full text-xs font-mono border border-border hover:border-accent/30 transition-colors">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

{/* ── SKILLS ── */}
<section id="skills" className="py-28 px-4 bg-gradient-to-b from-background to-card/20 relative overflow-hidden">
  <div className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-accent/[0.03] rounded-full blur-3xl pointer-events-none" />
  <div className="max-w-5xl mx-auto">
    <div className="flex items-center gap-4 mb-4">
      <span className="text-xs font-mono text-accent/60 tracking-[0.3em] uppercase">03 / Skills</span>
      <div className="h-px flex-1 bg-gradient-to-r from-accent/20 to-transparent max-w-xs" />
    </div>
    <h2 className="text-4xl md:text-5xl font-display font-bold mb-16 text-white">
      Skills <span className="text-accent">Técnicas</span>
    </h2>

    <div className="space-y-10">
      {[
        {
          icon: Code2,
          category: "Backend",
          color: "accent",
          skills: [
            { name: "Java", icon: "☕" },
            { name: "Spring Boot", icon: "🍃" },
            { name: "Node.js", icon: "🟢" },
            { name: "JSP", icon: "📄" },
            { name: "Struts", icon: "⚙️" },
            { name: "JUnit", icon: "🧪" },
          ],
        },
        {
          icon: Zap,
          category: "Frontend",
          color: "accent",
          skills: [
            { name: "Angular", icon: "🅰️" },
            { name: "React", icon: "⚛️" },
            { name: "TypeScript", icon: "🔷" },
            { name: "JavaScript", icon: "🟡" },
            { name: "HTML", icon: "🌐" },
            { name: "CSS", icon: "🎨" },
          ],
        },
        {
          icon: Database,
          category: "Dados & DevOps",
          color: "accent",
          skills: [
            { name: "Oracle", icon: "🔴" },
            { name: "SQL", icon: "🗄️" },
            { name: "Git", icon: "🔀" },
            { name: "Docker", icon: "🐳" },
            { name: "SOLID", icon: "📐" },
            { name: "Design Patterns", icon: "🧩" },
            { name: "Arquitetura em Camadas", icon: "🏗️" },
          ],
        },
      ].map(({ icon: Icon, category, skills }) => (
        <div key={category}>
          {/* Category header */}
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0">
              <Icon size={15} className="text-accent" />
            </div>
            <span className="text-sm font-display font-bold text-white tracking-wide">{category}</span>
            <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
          </div>

          {/* Badges grid */}
          <div className="flex flex-wrap gap-3">
            {skills.map((skill) => (
              <div
                key={skill.name}
                className="group flex items-center gap-2.5 px-4 py-2.5 bg-card border border-border rounded-xl hover:border-accent/40 hover:bg-accent/[0.04] transition-all duration-200 cursor-default"
              >
                <span className="text-base leading-none">{skill.icon}</span>
                <span className="text-sm text-muted-foreground group-hover:text-white transition-colors font-medium">
                  {skill.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* ── ERP CTA ── */}
      <section className="py-24 px-4 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-transparent to-accent/5 pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: "repeating-linear-gradient(45deg, rgba(0,217,255,1) 0, rgba(0,217,255,1) 1px, transparent 0, transparent 50%)",
          backgroundSize: "20px 20px",
        }} />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="inline-block text-accent/60 text-xs font-mono tracking-widest uppercase mb-6 border border-accent/15 px-4 py-1.5 rounded-full bg-accent/5">
            Especialização
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-white">
            Especialista em <span className="text-accent">ERP Sankhya</span>
          </h2>
          <p className="text-base text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            Experiência prática consolidada em customizações, integrações, dashboards e relatórios. Conheça meu trabalho detalhado com o Sankhya.
          </p>
          <Button
            onClick={() => { setLocation("/erp-sankhya"); window.scrollTo(0, 0); }}
            className="bg-accent text-background hover:bg-accent/90 px-8 py-5 text-sm font-semibold rounded-full shadow-xl shadow-accent/25 hover:shadow-accent/40 transition-all hover:scale-[1.02] gap-2"
          >
            Explorar Especialização <ExternalLink size={16} />
          </Button>
        </div>
      </section>

      {/* ── FORMAÇÃO ── */}
      <section className="py-28 px-4 bg-gradient-to-b from-card/20 to-background relative overflow-hidden">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-xs font-mono text-accent/60 tracking-[0.3em] uppercase">04 / Formação</span>
            <div className="h-px flex-1 bg-gradient-to-r from-accent/20 to-transparent max-w-xs" />
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-16 text-white">
            Formação <span className="text-accent">Acadêmica</span>
          </h2>

          <div className="space-y-6">
            {[
              {
                degree: "Especialização Em Tecnologia Java",
                school: "Universidade Tecnológica Federal do Paraná (UTFPR)",
                location: "Remoto",
                period: "2026 – 2027",
                img: UTFPR,
                current: true,
              },
              {
                degree: "Bacharelado em Sistemas de Informação",
                school: "Universidade Federal de Goiás (UFG)",
                location: "Goiânia, GO",
                period: "2019 – 2025",
                img: FormacaoAcademica,
                current: false,
              },
            ].map((edu) => (
              <div key={edu.degree} className="group bg-card border border-border rounded-2xl p-8 hover:border-accent/40 transition-all duration-300 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                {edu.current && (
                  <div className="absolute top-6 right-6 flex items-center gap-1.5 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-green-400 text-xs font-mono">Em andamento</span>
                  </div>
                )}
                <div className="grid md:grid-cols-3 gap-8 items-center">
                  <div className="md:col-span-2">
                    <h3 className="text-xl font-display font-bold text-white mb-2">{edu.degree}</h3>
                    <p className="text-accent mb-2">{edu.school}</p>
                    <p className="text-muted-foreground text-sm">{edu.location} · {edu.period}</p>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-accent/15 to-transparent rounded-xl blur-xl" />
                    <img src={edu.img} alt={edu.school} className="relative rounded-xl border border-accent/20 shadow-lg" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTATO ── */}
      <section id="contato" className="py-28 px-4 bg-background relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-accent/[0.04] rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-24 bg-gradient-to-r from-transparent to-accent/20" />
            <span className="text-xs font-mono text-accent/60 tracking-[0.3em] uppercase">05 / Contato</span>
            <div className="h-px w-24 bg-gradient-to-l from-transparent to-accent/20" />
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-white">
            Vamos <span className="text-accent">Conversar?</span>
          </h2>
          <p className="text-base text-muted-foreground mb-14 max-w-2xl mx-auto leading-relaxed">
            Estou aberto a oportunidades, projetos interessantes e conversas sobre desenvolvimento backend, arquitetura de sistemas e ERP Sankhya.
          </p>

          <div className="grid md:grid-cols-2 gap-5 mb-12">
            <a href="mailto:eduardopinafleury@gmail.com" className="group bg-card border border-border rounded-2xl p-8 hover:border-accent/40 transition-all duration-300 relative overflow-hidden text-left">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Mail className="text-accent" size={22} />
              </div>
              <h3 className="font-display font-bold text-white mb-1">Email</h3>
              <p className="text-muted-foreground text-sm">eduardopinafleury@gmail.com</p>
            </a>

            <a href="https://wa.me/5562981731030" className="group bg-card border border-border rounded-2xl p-8 hover:border-accent/40 transition-all duration-300 relative overflow-hidden text-left">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current text-accent">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
              </div>
              <h3 className="font-display font-bold text-white mb-1">Telefone</h3>
              <p className="text-muted-foreground text-sm">(62) 98173-1030</p>
            </a>
          </div>

          <div className="flex justify-center gap-4">
            {[
              { href: "https://github.com/EduFleury", icon: Github, label: "GitHub" },
              { href: "https://linkedin.com/in/eduardo-pina-fleury-fortuna-51a57021b", icon: Linkedin, label: "LinkedIn" },
            ].map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 px-5 py-2.5 rounded-full border border-border hover:border-accent/40 text-muted-foreground hover:text-accent transition-all text-sm"
              >
                <Icon size={16} />
                <span>{label}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-card/50 border-t border-border py-8 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-3 text-muted-foreground text-sm">
          <span className="font-display font-bold text-accent">EP</span>
          <p>© 2025 Eduardo Pina Fleury Fortuna. Todos os direitos reservados.</p>
          <div className="flex gap-4">
            <a href="https://github.com/EduFleury" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors"><Github size={16} /></a>
            <a href="https://linkedin.com/in/eduardo-pina-fleury-fortuna-51a57021b" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors"><Linkedin size={16} /></a>
          </div>
        </div>
      </footer>

      {/* Global animations */}
      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px) } to { opacity: 1; transform: translateY(0) } }
        @keyframes fadeInDown { from { opacity: 0; transform: translateY(-20px) } to { opacity: 1; transform: translateY(0) } }
      `}</style>
    </div>
  );
}

// ── Skill Bar Component ──
function SkillBar({ skill, delay }: { skill: { name: string; level: number; category: string }, delay: number }) {
  const { ref, inView } = useInView(0.1);
  return (
    <div ref={ref} className="group">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-white font-medium">{skill.name}</span>
        <span className="text-xs font-mono text-accent/80">{inView ? skill.level : 0}%</span>
      </div>
      <div className="h-1.5 bg-card rounded-full overflow-hidden border border-border">
        <div
          className="h-full bg-gradient-to-r from-accent to-accent/60 rounded-full transition-all duration-1000 ease-out"
          style={{
            width: inView ? `${skill.level}%` : "0%",
            transitionDelay: `${delay}ms`,
            boxShadow: "0 0 8px rgba(0,217,255,0.4)",
          }}
        />
      </div>
    </div>
  );
}