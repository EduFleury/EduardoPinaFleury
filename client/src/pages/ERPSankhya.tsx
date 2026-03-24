import { Button } from "@/components/ui/button";
import { ArrowLeft, Code2, Zap, Database, Layers, Settings, ExternalLink } from "lucide-react";
import { useLocation } from "wouter";
import { useEffect, useRef, useState } from "react";
import DashExpedicao from "../../public/Media/DashSankhyaExpedicao.png";
import DashGrafico from "../../public/Media/DashGraficoExpedicao.png";
import TelaPersonalizada from "../../public/Media/telaPersonalizadaSankhya.png";
import TelaProducao from "../../public/Media/TelaProducaoPersonalizada.png";
import ThumbDash from "../../public/Media/ThumbDash.png";
import ThumbProducao from "../../public/Media/ThumbProducao.png";
import VideoDashSankhya from "../../public/Media/VideoDashSankhya.mp4";
import VideoProducao from "../../public/Media/VideoProcessoProdPersonalizado.mp4";

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

const specializations = [
  {
    icon: Layers,
    title: "Telas Personalizadas",
    description: "Desenvolvimento de interfaces customizadas para processos específicos dos clientes, utilizando Angular para frontend moderno e responsivo.",
    items: [
      "Desenvolvimento em Angular com componentes reutilizáveis",
      "Integração com backend Java do Sankhya",
      "Validações e regras de negócio no frontend",
      "Testes de usabilidade e performance",
    ],
    color: "accent",
  },
  {
    icon: Code2,
    title: "Ações Java",
    description: "Desenvolvimento de ações customizadas em Java para processos de negócio, automações e integrações com sistemas externos.",
    items: [
      "Ações de validação e processamento de dados",
      "Automações de workflows e processos",
      "Integrações com APIs externas",
      "Padrões de projeto e SOLID aplicados",
    ],
    color: "accent",
  },
  {
    icon: Zap,
    title: "Dashboards",
    description: "Criação de dashboards interativos e informativos para análise de dados em tempo real e tomada de decisão estratégica.",
    items: [
      "Dashboards com HTML, JSP e JavaScript",
      "Gráficos e visualizações de dados",
      "Filtros e interatividade avançada",
      "Performance otimizada para grandes volumes",
    ],
    color: "accent",
  },
  {
    icon: Database,
    title: "Relatórios iReport",
    description: "Desenvolvimento de relatórios gerenciais sofisticados utilizando iReport para exportação em múltiplos formatos.",
    items: [
      "Relatórios complexos com múltiplas seções",
      "Exportação em PDF, Excel e outros formatos",
      "Parâmetros dinâmicos e filtros",
      "Agendamento e distribuição automática",
    ],
    color: "accent",
  },
  {
    icon: Settings,
    title: "Integrações",
    description: "Integração do Sankhya com sistemas externos, APIs e ferramentas corporativas para fluxos de dados contínuos.",
    items: [
      "APIs REST e SOAP",
      "Sincronização de dados em tempo real",
      "Tratamento de erros e fallback",
      "Logging e monitoramento",
    ],
    color: "accent",
  },
  {
    icon: Database,
    title: "Oracle & SQL",
    description: "Trabalho avançado com Oracle Database, otimização de queries e modelagem de dados para Sankhya.",
    items: [
      "Queries SQL otimizadas e performance tuning",
      "Stored procedures e triggers",
      "Modelagem de dados para eficiência"
    ],
    color: "accent",
  },
];

const projects = [
  {
    img: DashExpedicao,
    title: "Dashboard Sankhya — Expedição",
    description: "Dashboard interativo para monitoramento de processos de expedição em tempo real, com gráficos e métricas de performance.",
    tags: ["HTML", "JSP", "JavaScript", "Charts"],
    variant: "accent" as const,
  },
  {
    img: DashGrafico,
    title: "Dashboard Gráfico — Expedição",
    description: "Visualização avançada com gráficos e análises de dados de expedição, permitindo insights estratégicos rápidos.",
    tags: ["Gráficos", "Analytics", "Data Viz", "Performance"],
    variant: "accent" as const,
  },
  {
    img: TelaPersonalizada,
    title: "Tela Personalizada Sankhya",
    description: "Interface customizada desenvolvida em Angular para atender necessidades específicas de um processo corporativo.",
    tags: ["Angular", "TypeScript", "Custom UI", "Integração"],
    variant: "secondary" as const,
  },
  {
    img: TelaProducao,
    title: "Tela Produção Personalizada",
    description: "Solução customizada para gerenciamento de processos de produção, com validações e automações avançadas.",
    tags: ["Angular", "Java Actions", "Validações", "Automação"],
    variant: "secondary" as const,
  },
];

export default function ERPSankhya() {
  const [, setLocation] = useLocation();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handler = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ── HEADER ── */}
      <header
        className="fixed top-0 w-full z-50 transition-all duration-300"
        style={{
          background: scrollY > 40 ? "rgba(10,10,10,0.92)" : "transparent",
          backdropFilter: scrollY > 40 ? "blur(16px)" : "none",
          borderBottom: scrollY > 40 ? "1px solid rgba(255,255,255,0.06)" : "none",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <button
            onClick={() => setLocation("/")}
            className="group flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors text-sm"
          >
            <div className="w-7 h-7 rounded-lg border border-border group-hover:border-accent/40 flex items-center justify-center transition-all">
              <ArrowLeft size={14} />
            </div>
            Voltar
          </button>
          <div className="relative">
            <h1 className="text-xl font-display font-bold text-accent">ERP Sankhya</h1>
            <div className="absolute -bottom-1 left-0 w-full h-px bg-accent/50" />
          </div>
          <div className="w-20" />
        </div>
      </header>

      {/* ── HERO ── */}
      <section className="relative min-h-[65vh] flex items-center justify-center pt-20 overflow-hidden">
        <div
          className="absolute inset-0 opacity-35"
          style={{
            backgroundImage: "url('https://private-us-east-1.manuscdn.com/sessionFile/2vaZuFV1TIcOO4DzVvp8Ma/sandbox/zdI0Y3cxTXpmp1sNDFUegK-img-4_1772127245000_na1fn_ZXJwLXNhbmtoeWEtaGVybw.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvMnZhWnVGVjFUSWNPTzREelZ2cDhNYS9zYW5kYm94L3pkSTBZM2N4VFhwbXAxc05ERlVlZ0staW1nLTRfMTc3MjEyNzI0NTAwMF9uYTFmbl9aWEp3TFhOaGJtdG9lV0V0YUdWeWJ3LnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=uCqczC7AQ48baeqh5O839Upk0cimwMcVyvgFuNPSQ0UfWFsVTx97PcK31s5XVuLzkU1jBVGl2NkdMWk~M8kHt5-urCRPA7mVy4xybo1EJ3Cbe7DZSbXgEShvSYdPQ1KXVplqXVZEl1XNNFYSsfQRTVn7MzbEtI2HTH2sdIZxl2nIZA-4lNzRlTqTYQf57wsKg8xTxk1OjOdLGEhMpQiIvijCs8kNaYLHmmbZD1YzwvSqqkrTFUqmlTQwBMUoXpAPCbUjAg2cclW-Dnu9iJdbY4OMHjwoKsAZ4c19okjSFDR1EOFz155PgBPYo6xROsvWTgVn7tgcQQyBsjyHW-Fwkw__')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            transform: `translateY(${scrollY * 0.3}px)`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/50 to-background" />
        {/* Subtle grid */}
        <div className="absolute inset-0 opacity-[0.025]" style={{
          backgroundImage: "linear-gradient(rgba(0,217,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,217,255,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }} />

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-6 text-white tracking-tight leading-none">
            Especialista em<br /><span className="text-accent">ERP Sankhya</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            Experiência prática consolidada em customizações, integrações, dashboards e relatórios avançados
          </p>
        </div>
      </section>

      {/* ── VISÃO GERAL ── */}
      <section className="py-24 px-4 bg-gradient-to-b from-background to-card/20 relative overflow-hidden">
        <div className="absolute top-1/4 left-0 w-72 h-72 bg-accent/[0.04] rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-accent/[0.02] rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-xs font-mono text-accent/60 tracking-[0.3em] uppercase">01 / Visão Geral</span>
            <div className="h-px flex-1 bg-gradient-to-r from-accent/20 to-transparent max-w-xs" />
          </div>
          <h2 className="text-4xl font-display font-bold mb-14 text-white">
            Minha Experiência com <span className="text-accent">Sankhya</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: (
                  <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z" />
                  </svg>
                ),
                title: "Escopo de Trabalho",
                texts: [
                  "Análise completa de dados, implantação de soluções e desenvolvimento de melhorias contínuas.",
                  "Trabalho direto com clientes corporativos para entender necessidades, propor soluções e implementar customizações estratégicas.",
                ],
              },
              {
                icon: (
                  <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                  </svg>
                ),
                title: "Impacto & Resultados",
                texts: [
                  "Entrega de soluções que otimizam processos e aumentam a eficiência operacional dos clientes.",
                  "Foco em resultados mensuráveis, garantindo que cada implantação gere valor real para o negócio.",
                ],
              },
            ].map((card) => (
              <div key={card.title} className="group bg-card border border-border rounded-2xl p-8 hover:border-accent/40 transition-all duration-300 hover:shadow-xl hover:shadow-accent/5 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex items-start gap-4 mb-5">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center group-hover:bg-accent/15 transition-colors">
                    {card.icon}
                  </div>
                  <h3 className="text-lg font-display font-bold text-white mt-1.5">{card.title}</h3>
                </div>
                {card.texts.map((t, i) => (
                  <p key={i} className="text-muted-foreground text-sm leading-relaxed mb-3 last:mb-0">{t}</p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ESPECIALIZAÇÕES ── */}
      <section className="py-24 px-4 bg-background relative">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-xs font-mono text-accent/60 tracking-[0.3em] uppercase">02 / Especialização</span>
            <div className="h-px flex-1 bg-gradient-to-r from-accent/20 to-transparent max-w-xs" />
          </div>
          <h2 className="text-4xl font-display font-bold mb-14 text-white">
            Áreas de <span className="text-accent">Especialização</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {specializations.map(({ icon: Icon, title, description, items }) => (
              <FadeInCard key={title}>
                <div className="group bg-card border border-border rounded-2xl p-8 hover:border-accent/40 transition-all duration-300 hover:shadow-xl hover:shadow-accent/5 relative overflow-hidden h-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center group-hover:bg-accent/15 transition-colors flex-shrink-0">
                      <Icon size={18} className="text-accent" />
                    </div>
                    <h3 className="text-lg font-display font-bold text-white">{title}</h3>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-5">{description}</p>
                  <ul className="space-y-2">
                    {items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                        <span className="text-accent mt-0.5 flex-shrink-0 text-xs">▸</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeInCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── GALERIA ── */}
      <section className="py-24 px-4 bg-gradient-to-b from-background to-card/20 relative overflow-hidden">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-xs font-mono text-accent/60 tracking-[0.3em] uppercase">03 / Projetos</span>
            <div className="h-px flex-1 bg-gradient-to-r from-accent/20 to-transparent max-w-xs" />
          </div>
          <h2 className="text-4xl font-display font-bold mb-14 text-white">
            Trabalhos & <span className="text-accent">Projetos</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((p) => (
              <div key={p.title} className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-accent/40 transition-all duration-300 hover:shadow-xl hover:shadow-accent/5">
                <div className="relative h-56 overflow-hidden bg-muted">
                  <img
                    src={p.img}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="p-6">
                  <h3 className="text-base font-display font-bold text-white mb-2">{p.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">{p.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {p.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`px-2.5 py-1 rounded-full text-xs font-mono border transition-all ${
                          p.variant === "accent"
                            ? "bg-accent/8 text-accent/80 border-accent/15"
                            : "bg-card text-muted-foreground border-border"
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VÍDEOS ── */}
      <section className="py-24 px-4 bg-background">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-xs font-mono text-accent/60 tracking-[0.3em] uppercase">04 / Demos</span>
            <div className="h-px flex-1 bg-gradient-to-r from-accent/20 to-transparent max-w-xs" />
          </div>
          <h2 className="text-4xl font-display font-bold mb-14 text-white">
            Vídeos <span className="text-accent">Demonstrativos</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                src: VideoDashSankhya,
                poster: ThumbDash,
                title: "Dashboard Sankhya em Ação",
                description: "Demonstração do dashboard interativo de expedição com atualização em tempo real e gráficos dinâmicos.",
              },
              {
                src: VideoProducao,
                poster: ThumbProducao,
                title: "Processo de Produção Personalizado",
                description: "Walkthrough da tela customizada de produção com validações, automações e integração com o Sankhya.",
              },
            ].map((v) => (
              <div key={v.title} className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-accent/40 transition-all duration-300 hover:shadow-xl hover:shadow-accent/5">
                <div className="relative bg-background/50">
                  <video
                    controls
                    className="w-full aspect-video object-cover"
                    poster={v.poster}
                  >
                    <source src={v.src} type="video/mp4" />
                    Seu navegador não suporta vídeo HTML5.
                  </video>
                </div>
                <div className="p-6">
                  <h3 className="text-base font-display font-bold text-white mb-2">{v.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{v.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STACK ── */}
      <section className="py-24 px-4 bg-gradient-to-b from-background to-card/20 relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/[0.03] rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-xs font-mono text-accent/60 tracking-[0.3em] uppercase">05 / Stack</span>
            <div className="h-px flex-1 bg-gradient-to-r from-accent/20 to-transparent max-w-xs" />
          </div>
          <h2 className="text-4xl font-display font-bold mb-14 text-white">
            Stack Técnico <span className="text-accent">Sankhya</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Backend",
                icon: Code2,
                items: ["Java (Ações Sankhya)", "JSP (Telas Web)", "Padrões de Projeto", "SOLID Principles"],
              },
              {
                title: "Frontend",
                icon: Zap,
                items: ["Angular", "TypeScript", "HTML/CSS", "JavaScript"],
              },
              {
                title: "Ferramentas",
                icon: Database,
                items: ["iReport (Relatórios)", "Oracle Database", "Git", "Maven/Gradle"],
              },
            ].map(({ title, icon: Icon, items }) => (
              <div key={title} className="group bg-card border border-border rounded-2xl p-6 hover:border-accent/40 transition-all duration-300 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-9 h-9 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center">
                    <Icon size={16} className="text-accent" />
                  </div>
                  <h3 className="font-display font-bold text-white">{title}</h3>
                </div>
                <ul className="space-y-2.5">
                  {items.map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 bg-accent/60 rounded-full flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-4 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-transparent to-accent/5 pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: "repeating-linear-gradient(45deg, rgba(0,217,255,1) 0, rgba(0,217,255,1) 1px, transparent 0, transparent 50%)",
          backgroundSize: "20px 20px",
        }} />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl font-display font-bold mb-6 text-white">
            Pronto para <span className="text-accent">Conversar?</span>
          </h2>
          <p className="text-base text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            Se você precisa de expertise em ERP Sankhya, customizações avançadas ou integração com sistemas corporativos, estou disponível para discutir suas necessidades.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Button
              onClick={() => { document.location.href = "https://wa.me/5562981731030"; }}
              className="bg-accent text-background hover:bg-accent/90 px-8 py-5 text-sm font-semibold rounded-full shadow-xl shadow-accent/25 hover:shadow-accent/40 transition-all hover:scale-[1.02]"
            >
              Entrar em Contato
            </Button>
            <Button
              variant="outline"
              onClick={() => { setLocation("/"); window.scrollTo(0, 0); }}
              className="border-white/15 text-white hover:bg-white/5 px-8 py-5 text-sm rounded-full transition-all gap-2"
            >
              <ArrowLeft size={14} /> Ver Portfólio
            </Button>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-card/50 border-t border-border py-8 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-3 text-muted-foreground text-sm">
          <span className="font-display font-bold text-accent">EP</span>
          <p>© 2025 Eduardo Pina Fleury Fortuna. Especialista em ERP Sankhya.</p>
          <button
            onClick={() => { setLocation("/"); window.scrollTo(0, 0); }}
            className="hover:text-accent transition-colors flex items-center gap-1.5 text-xs"
          >
            <ArrowLeft size={12} /> Voltar ao portfólio
          </button>
        </div>
      </footer>
    </div>
  );
}

// ── Fade-in card wrapper ──
function FadeInCard({ children }: { children: React.ReactNode }) {
  const { ref, inView } = useInView(0.1);
  return (
    <div
      ref={ref}
      className="transition-all duration-700"
      style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(24px)" }}
    >
      {children}
    </div>
  );
}