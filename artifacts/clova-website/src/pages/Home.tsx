import { useState, useEffect, useRef } from "react";
import { motion, useInView, useAnimation, AnimatePresence } from "framer-motion";
import ParticleBackground from "@/components/ParticleBackground";

/* ─────────────── DATA ─────────────── */
const NAV_LINKS = ["Hjem", "Tjenester", "Prosjekter", "Om oss", "Kontakt"];

const CLIENT_CARDS = [
  {
    id: "nudera",
    logo: "/logos/nudera.jpeg",
    logoBg: "#d9a8a2",
    name: "Nüdera",
    type: "Shapewear-nettbutikk",
    stat: "+40%",
    statLabel: "flere ordre",
    period: "på 45 dager",
    desc: "Nettbutikk + annonser som skalerte salget i en konkurransepreget nisje.",
  },
  {
    id: "lycke",
    logo: "/logos/lycke.jpeg",
    logoBg: "#e8f0f8",
    name: "Lycke Frisør",
    type: "Salong",
    stat: "+30%",
    statLabel: "flere bookinger",
    period: "på 30 dager",
    desc: "Første kundehenvender hver uke gjennom lokal, målrettede annonser og ny nettside.",
  },
  {
    id: "ynova",
    logo: "/logos/ynova.jpeg",
    logoBg: "#1a3a36",
    name: "YNOVA",
    type: "Klesmerke",
    stat: "+57",
    statLabel: "nye kunder",
    period: "første måned",
    desc: "Lansering av klesmerke med annonser og nettside som skapte rask traction.",
  },
];

const SERVICES = [
  {
    num: "01",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: "Gratis analyse",
    desc: "Vi analyserer bedriften din grundig og viser deg nøyaktig hva du kan forbedre for å få flere kunder.",
  },
  {
    num: "02",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: "Nettsider som konverterer",
    desc: "Moderne, raske nettsider designet for å gjøre besøkende til betalende kunder.",
  },
  {
    num: "03",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
      </svg>
    ),
    title: "Meta annonser",
    desc: "Vi lager og optimaliserer annonser på Facebook og Instagram som gir målbare resultater.",
  },
];

const ADS = [
  { src: "/ads/alfreds.png", alt: "Alfreds annonse" },
  { src: "/ads/circlek.png", alt: "Circle K annonse" },
  { src: "/ads/fratelli.png", alt: "Fratelli annonse" },
];

type ProjectId = "goldencrown" | "fratelli" | "palermo";

const PROJECTS: { id: ProjectId; label: string; before: string; after: string; beforeAlt: string; afterAlt: string }[] = [
  { id: "goldencrown", label: "Golden Crown", before: "/beforeafter/goldencrown-before.jpeg", after: "/beforeafter/goldencrown-after.png", beforeAlt: "Golden Crown – før", afterAlt: "Golden Crown – etter" },
  { id: "fratelli",    label: "Fratelli",    before: "/beforeafter/fratelli-before.jpeg",    after: "/beforeafter/fratelli-after.png",    beforeAlt: "Fratelli – før",    afterAlt: "Fratelli – etter" },
  { id: "palermo",     label: "Palermo",     before: "/beforeafter/palermo-before.jpeg",     after: "/beforeafter/palermo-after.png",     beforeAlt: "Palermo – før",     afterAlt: "Palermo – etter" },
];

/* ─────────────── HELPERS ─────────────── */
function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

function useScrollInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: threshold });
  return { ref, isInView };
}

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

/* ─────────────── SUB-COMPONENTS ─────────────── */

function AnimatedCounter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1400;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * to));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, to]);

  return <span ref={ref}>{count}{suffix}</span>;
}

function BarChart() {
  const { ref, isInView } = useScrollInView(0.5);
  const bars = [
    { h: 32, label: "Uke 1" },
    { h: 48, label: "Uke 2" },
    { h: 40, label: "Uke 3" },
    { h: 72, label: "Uke 4" },
  ];
  return (
    <div ref={ref} className="flex items-end gap-3 h-20 mt-3">
      {bars.map((b, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1">
          <motion.div
            className="w-full rounded-sm"
            style={{
              height: b.h,
              background: "linear-gradient(to top, #b8720a, #e8a520)",
              originY: 1,
            }}
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 0.6, delay: i * 0.12, ease: [0.34, 1.56, 0.64, 1] }}
          />
          <span className="text-[10px] text-white/30">{b.label}</span>
        </div>
      ))}
    </div>
  );
}

function ResultsDashboard() {
  const { ref, isInView } = useScrollInView(0.2);
  return (
    <motion.div
      ref={ref}
      className="card-glass rounded-2xl p-5 w-full"
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-semibold text-white/90">Resultater så langt</span>
        <span className="px-2.5 py-1 rounded-lg text-[11px] text-white/60 border border-white/10 bg-white/5">Siste 30 dager ▾</span>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-4">
        {[
          { label: "Flere kunder", val: 126, sub: "Totalt levert" },
          { label: "Annonse-ROAS", val: 4.6, sub: "Gjennomsnitt", suffix: "x" },
          { label: "Avtalte møter", val: 47, sub: "Kvalifiserte leads" },
        ].map((m, i) => (
          <div key={i} className="text-center">
            <div className="text-[10px] text-white/40 mb-0.5">{m.label}</div>
            <div className="text-xl font-bold text-white">
              +<AnimatedCounter to={m.val} suffix={m.suffix} />
            </div>
            <div className="text-[10px] text-white/30">{m.sub}</div>
          </div>
        ))}
      </div>

      <BarChart />
    </motion.div>
  );
}

function ClientResultCard({ c, delay }: { c: (typeof CLIENT_CARDS)[0]; delay: number }) {
  const { ref, isInView } = useScrollInView(0.2);
  return (
    <motion.div
      ref={ref}
      className="card-glass card-glass-hover rounded-2xl p-5"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className="w-12 h-12 rounded-xl overflow-hidden mb-3 flex items-center justify-center"
        style={{ background: c.logoBg }}
      >
        <img src={c.logo} alt={c.name} className="w-full h-full object-cover" />
      </div>
      <div className="font-semibold text-white/90 text-sm mb-0.5">{c.name}</div>
      <div className="text-xs text-white/40 mb-3">{c.type}</div>
      <div className="text-2xl font-bold gold-gradient-text mb-0.5">
        {c.stat} <span className="text-base font-semibold text-white/70">{c.statLabel}</span>
      </div>
      <div className="text-xs text-white/40 mb-3">{c.period}</div>
      <p className="text-xs text-white/40 leading-relaxed">{c.desc}</p>
    </motion.div>
  );
}

/* ─────────────── MAIN PAGE ─────────────── */
export default function Home() {
  const [activeProject, setActiveProject] = useState<ProjectId>("goldencrown");
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    setSendError(false);
    const { name, email, phone, message } = formData;
    try {
      const res = await fetch("https://formsubmit.co/ajax/kontakt.clova@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name,
          email,
          Telefon: phone,
          Melding: message,
          _subject: "Ny henvendelse fra Clova-nettside",
          _captcha: "false",
        }),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        setSendError(true);
      }
    } catch {
      setSendError(true);
    } finally {
      setSending(false);
    }
  }

  const currentProject = PROJECTS.find((p) => p.id === activeProject)!;

  return (
    <div className="relative min-h-screen" style={{ background: "#080808" }}>
      <ParticleBackground />

      {/* ── GOLDEN LIGHT RAYS (CSS) ── */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden", willChange: "transform" }}>
        {/* Main golden diagonal ray */}
        <div style={{
          position: "absolute",
          bottom: "-10%",
          left: "-5%",
          width: "70%",
          height: "100%",
          background: "conic-gradient(from 50deg at 20% 90%, transparent 0deg, rgba(180,100,5,0.18) 15deg, rgba(220,140,10,0.28) 22deg, rgba(180,100,5,0.14) 30deg, transparent 45deg)",
          filter: "blur(4px)",
          transform: "rotate(-15deg) translateY(10%)",
        }} />
        {/* Secondary softer ray */}
        <div style={{
          position: "absolute",
          bottom: "-5%",
          left: "5%",
          width: "50%",
          height: "80%",
          background: "conic-gradient(from 48deg at 15% 95%, transparent 0deg, rgba(200,120,5,0.1) 12deg, rgba(240,160,20,0.18) 18deg, rgba(200,120,5,0.08) 28deg, transparent 40deg)",
          filter: "blur(8px)",
          transform: "rotate(-12deg) translateY(5%)",
        }} />
        {/* Ambient glow - bottom left */}
        <div style={{
          position: "absolute",
          bottom: "-20%",
          left: "-10%",
          width: "50%",
          height: "60%",
          background: "radial-gradient(ellipse, rgba(180,90,5,0.15) 0%, transparent 70%)",
          filter: "blur(18px)",
        }} />
        {/* Sparkle line along the ray */}
        <div style={{
          position: "absolute",
          bottom: "30%",
          left: "5%",
          width: "45%",
          height: "2px",
          background: "linear-gradient(90deg, transparent, rgba(255,200,80,0.4), rgba(255,220,120,0.6), rgba(255,200,80,0.3), transparent)",
          filter: "blur(1px)",
          transform: "rotate(-20deg)",
        }} />
      </div>

      {/* ── NAVBAR ── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled ? "rgba(8,8,8,0.92)" : "transparent",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
          backdropFilter: scrolled ? "blur(20px)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <motion.div
            className="text-xl font-bold tracking-[0.25em] text-white"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            CLOVA
          </motion.div>

          <motion.div
            className="hidden md:flex items-center gap-8"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {NAV_LINKS.map((link, i) => {
              const id = link === "Hjem" ? "hero" : link === "Tjenester" ? "tjenester" : link === "Prosjekter" ? "prosjekter" : link === "Om oss" ? "omboss" : "kontakt";
              return (
                <button
                  key={link}
                  onClick={() => scrollTo(id)}
                  className="text-sm transition-colors duration-200"
                  style={{
                    color: i === 0 ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.5)",
                    fontWeight: i === 0 ? 500 : 400,
                  }}
                  onMouseEnter={(e) => { (e.target as HTMLElement).style.color = "rgba(255,255,255,0.95)"; }}
                  onMouseLeave={(e) => { (e.target as HTMLElement).style.color = i === 0 ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.5)"; }}
                >
                  {link}
                </button>
              );
            })}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="hidden md:block"
          >
            <button
              onClick={() => scrollTo("kontakt")}
              className="btn-gold px-5 py-2.5 rounded-xl text-sm transition-all duration-200 flex items-center gap-2"
            >
              Få gratis analyse
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </motion.div>

          {/* Mobile hamburger */}
          <button className="md:hidden text-white/80" onClick={() => setMobileMenu(!mobileMenu)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenu
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>

        <AnimatePresence>
          {mobileMenu && (
            <motion.div
              className="md:hidden border-t border-white/6 px-6 pb-6 flex flex-col gap-4"
              style={{ background: "rgba(8,8,8,0.97)" }}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              {NAV_LINKS.map((link) => {
                const id = link === "Hjem" ? "hero" : link === "Tjenester" ? "tjenester" : link === "Prosjekter" ? "prosjekter" : link === "Om oss" ? "omboss" : "kontakt";
                return (
                  <button key={link} onClick={() => { scrollTo(id); setMobileMenu(false); }} className="text-left text-sm text-white/60 hover:text-white/90 py-2 transition-colors">
                    {link}
                  </button>
                );
              })}
              <button onClick={() => { scrollTo("kontakt"); setMobileMenu(false); }} className="btn-gold px-5 py-3 rounded-xl text-sm flex items-center justify-center gap-2 mt-2">
                Få gratis analyse →
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ── HERO ── */}
      <section id="hero" className="relative z-10 min-h-screen flex items-center pt-24 pb-16 px-6">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            {/* LEFT */}
            <div className="pt-8">
              <motion.h1
                className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight mb-8"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="text-white">Vi hjelper bedrifter med å få </span>
                <span className="gold-gradient-text">flere kunder</span>
                <span className="text-white"> – raskt.</span>
              </motion.h1>

              <motion.p
                className="text-white/50 text-base md:text-lg leading-relaxed mb-10 max-w-md"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              >
                Vi er et nyoppstartet markedsføringsbyrå som allerede har hjulpet lokale bedrifter med å eskalere gjennom målrettede annonser, moderne nettsider og tydelig vekststrategi.
              </motion.p>

              <motion.div
                className="flex flex-wrap gap-4 mb-16"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <button
                  onClick={() => scrollTo("kontakt")}
                  className="btn-gold px-7 py-3.5 rounded-xl text-sm transition-all duration-200 flex items-center gap-2"
                >
                  Få gratis analyse
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
                <button
                  onClick={() => scrollTo("tjenester")}
                  className="btn-outline-white px-7 py-3.5 rounded-xl text-sm"
                >
                  Se hva vi tilbyr
                </button>
              </motion.div>

              {/* Logos */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <div className="text-sm font-medium text-white/80 mb-1">Bedrifter vi har jobbet med</div>
                <div className="text-xs text-white/30 mb-5">I oppstartsfasen – men leverer allerede resultater for lokale bedrifter vi er stolte av å jobbe med.</div>
                <div className="flex items-center gap-6">
                  {[
                    { src: "/logos/nudera.jpeg", alt: "Nüdera", bg: "#d9a8a2" },
                    { src: "/logos/lycke.jpeg", alt: "Lycke Frisør", bg: "#e8f0f8" },
                    { src: "/logos/ynova.jpeg", alt: "YNOVA", bg: "#1a3a36" },
                  ].map((l) => (
                    <div key={l.alt} className="flex items-center gap-2">
                      <div
                        className="rounded-lg overflow-hidden flex-shrink-0"
                        style={{ background: l.bg, width: 48, height: 28 }}
                      >
                        <img src={l.src} alt={l.alt} className="w-full h-full object-cover" />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* RIGHT */}
            <div className="flex flex-col gap-4 pt-4">
              <ResultsDashboard />
              <div className="grid grid-cols-3 gap-4">
                {CLIENT_CARDS.map((c, i) => (
                  <ClientResultCard key={c.id} c={c} delay={0.15 + i * 0.1} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="tjenester" className="relative z-10 py-28 px-6 section-divider">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            tag="Hva vi tilbyr"
            title="Tjenester som gir resultater"
            sub="Alt du trenger for å vokse – under ett tak."
          />
          <motion.div
            className="grid md:grid-cols-3 gap-6 mt-14"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
          >
            {SERVICES.map((s) => (
              <motion.div
                key={s.num}
                className="card-glass card-glass-hover rounded-2xl p-8 cursor-default"
                variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } } }}
              >
                <div className="text-xs text-white/25 font-mono mb-4">{s.num}</div>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: "rgba(180,100,10,0.15)", color: "#d4860a" }}>
                  {s.icon}
                </div>
                <h3 className="text-lg font-semibold text-white/90 mb-3">{s.title}</h3>
                <p className="text-sm text-white/40 leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── ADS SECTION ── */}
      <section id="annonser" className="relative z-10 py-28 px-6 section-divider">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            tag="Annonser vi har laget"
            title="Kreativt som stopper scrollingen"
            sub="Vi produserer annonser som fanger oppmerksomhet og driver konverteringer."
          />
          <motion.div
            className="hidden md:flex gap-6 mt-14 justify-center"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
          >
            {ADS.map((ad) => (
              <motion.div
                key={ad.src}
                className="flex-1 max-w-[300px] card-glass card-glass-hover rounded-2xl overflow-hidden"
                variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } } }}
              >
                <img src={ad.src} alt={ad.alt} className="w-full h-auto block" />
              </motion.div>
            ))}
          </motion.div>
          {/* Mobile scroll */}
          <div className="md:hidden flex gap-4 overflow-x-auto pb-4 mt-10" style={{ scrollbarWidth: "none" }}>
            {ADS.map((ad) => (
              <div key={ad.src} className="flex-none w-64 card-glass rounded-2xl overflow-hidden snap-center">
                <img src={ad.src} alt={ad.alt} className="w-full h-auto block" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BEFORE / AFTER ── */}
      <section id="prosjekter" className="relative z-10 py-28 px-6 section-divider">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            tag="Før &amp; etter"
            title="Nettsider vi har laget"
            sub="Se transformasjonen fra utdatert til profesjonell og konverterende."
          />
          {/* Tabs */}
          <div className="flex justify-center gap-2 mt-10 mb-10 flex-wrap">
            {PROJECTS.map((p) => (
              <motion.button
                key={p.id}
                onClick={() => setActiveProject(p.id)}
                className="px-5 py-2 rounded-full text-sm font-medium transition-all duration-300"
                style={{
                  background: activeProject === p.id ? "linear-gradient(135deg,#b8720a,#d4900c)" : "transparent",
                  color: activeProject === p.id ? "#fff" : "rgba(255,255,255,0.45)",
                  border: activeProject === p.id ? "1px solid transparent" : "1px solid rgba(255,255,255,0.1)",
                }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                {p.label}
              </motion.button>
            ))}
          </div>

          {/* Split panels */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProject}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-2 gap-3 md:gap-6"
            >
              {/* BEFORE */}
              <div className="flex flex-col gap-2">
                <span className="text-xs font-bold uppercase tracking-widest text-center" style={{ color: "#e05555" }}>FØR</span>
                <div className="rounded-xl md:rounded-2xl overflow-hidden" style={{ background: "#fff", border: "1px solid rgba(255,255,255,0.1)", height: 360 }}>
                  <img
                    src={currentProject.before}
                    alt={currentProject.beforeAlt}
                    className="w-full block"
                    style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
                  />
                </div>
              </div>

              {/* AFTER */}
              <div className="flex flex-col gap-2">
                <span className="text-xs font-bold uppercase tracking-widest text-center" style={{ color: "#4caf82" }}>ETTER</span>
                <div className="rounded-xl md:rounded-2xl overflow-hidden glow-border" style={{ background: "#fff", height: 360 }}>
                  <img
                    src={currentProject.after}
                    alt={currentProject.afterAlt}
                    className="w-full block"
                    style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
                  />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="priser" className="relative z-10 py-28 px-6 section-divider">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            tag="Priser"
            title="Enkel, transparent prising"
            sub="Ingen bindingstid, ingen skjulte kostnader. Du vet alltid hva du betaler."
          />
          <motion.div
            className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto mt-14"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            {/* Nettside */}
            <motion.div
              className="card-glass card-glass-hover rounded-2xl p-8"
              variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } } }}
            >
              <div className="text-xs font-semibold uppercase tracking-widest mb-5" style={{ color: "#d4860a" }}>Nettside</div>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-4xl font-bold text-white">4&nbsp;999</span>
                <span className="text-white/40 text-sm">kr</span>
              </div>
              <div className="text-xs text-white/30 mb-5">Engangsbeløp</div>
              <div className="h-px mb-5" style={{ background: "rgba(255,255,255,0.07)" }} />
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-2xl font-semibold text-white">499</span>
                <span className="text-white/40 text-sm">kr / måned</span>
              </div>
              <div className="text-xs text-white/30 mb-7">Vedlikehold og support</div>
              <ul className="space-y-3 mb-8">
                {["Moderne, konverterende design", "Mobiloptimalisert", "SEO-grunnlag", "Rask levering"].map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-white/50">
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="#d4860a" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <button onClick={() => scrollTo("kontakt")} className="w-full py-3 rounded-xl text-sm font-medium transition-all btn-outline-white">
                Kom i gang
              </button>
            </motion.div>

            {/* Annonser */}
            <motion.div
              className="relative rounded-2xl p-8 glow-border"
              style={{ background: "rgba(255,255,255,0.04)" }}
              variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] } } }}
            >
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                <span className="px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-white btn-gold">Populær</span>
              </div>
              <div className="text-xs font-semibold uppercase tracking-widest mb-5" style={{ color: "#d4860a" }}>Meta annonser</div>
              <div className="text-3xl font-bold gold-gradient-text mb-1">1 måned gratis</div>
              <div className="text-xs text-white/30 mb-5">Deretter</div>
              <div className="h-px mb-5" style={{ background: "rgba(255,255,255,0.07)" }} />
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-2xl font-semibold text-white">2&nbsp;499</span>
                <span className="text-white/40 text-sm">kr / måned</span>
              </div>
              <div className="text-xs text-white/30 mb-7">Annonsebudsjett til Meta betales separat</div>
              <ul className="space-y-3 mb-8">
                {["Profesjonell annonseproduksjon", "Kontinuerlig optimalisering", "Månedlig rapport", "Dedikert kontaktperson"].map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-white/50">
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="#d4860a" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <button onClick={() => scrollTo("kontakt")} className="w-full py-3 rounded-xl text-sm font-semibold btn-gold transition-all">
                Start gratis måned
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="kontakt" className="relative z-10 py-28 px-6 section-divider">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-6" style={{ border: "1px solid rgba(212,134,10,0.3)", background: "rgba(180,100,10,0.12)", color: "#d4860a" }}>
                Ta kontakt
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
                Klar for å<br /><span className="gold-gradient-text">vokse?</span>
              </h2>
              <p className="text-white/45 leading-relaxed mb-10 max-w-sm">
                Send oss en melding og vi tar kontakt innen 24 timer med en gratis analyse av hva vi kan gjøre for din bedrift.
              </p>
              <div className="space-y-5">
                <ContactInfo
                  icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>}
                  label="E-post"
                  value="kontakt.clova@gmail.com"
                  href="mailto:kontakt.clova@gmail.com"
                />
                <ContactInfo
                  icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>}
                  label="Telefon"
                  value="46 53 54 59"
                  href="tel:46535459"
                />
              </div>
            </motion.div>

            <motion.div
              className="card-glass rounded-2xl p-8"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              {submitted ? (
                <div className="text-center py-14">
                  <motion.div
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
                    style={{ background: "rgba(180,100,10,0.18)", color: "#d4860a" }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </motion.div>
                  <h3 className="text-xl font-semibold text-white mb-2">Takk for henvendelsen!</h3>
                  <p className="text-white/40 text-sm">Vi tar kontakt med deg innen 24 timer.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <FormField label="Navn" type="text" value={formData.name} onChange={(v) => setFormData({ ...formData, name: v })} placeholder="Ditt navn" required />
                  <FormField label="E-post" type="email" value={formData.email} onChange={(v) => setFormData({ ...formData, email: v })} placeholder="din@epost.no" required />
                  <FormField label="Telefonnummer" type="tel" value={formData.phone} onChange={(v) => setFormData({ ...formData, phone: v })} placeholder="+47 123 45 678" required badge="Påkrevd" />
                  <div>
                    <label className="block text-xs text-white/40 mb-2 uppercase tracking-wider">Hva trenger du hjelp med?</label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl text-sm text-white/85 placeholder:text-white/25 outline-none transition-all resize-none"
                      style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                      onFocus={(e) => { e.target.style.borderColor = "rgba(212,134,10,0.5)"; }}
                      onBlur={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.1)"; }}
                      placeholder="Fortell oss litt om bedriften din og hva du ønsker å oppnå..."
                    />
                  </div>
                  {sendError && (
                    <p className="text-xs text-red-400/80 text-center">Noe gikk galt. Prøv igjen eller send e-post direkte.</p>
                  )}
                  <button
                    type="submit"
                    disabled={sending}
                    className="w-full py-3.5 rounded-xl text-sm font-semibold btn-gold transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-60"
                  >
                    {sending ? "Sender…" : "Send melding"}
                    {!sending && (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="relative z-10 section-divider py-10 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-lg font-bold tracking-[0.25em] text-white">CLOVA</div>
          <p className="text-xs text-white/25">© 2025 Clova Markedsføring. Alle rettigheter forbeholdt.</p>
          <div className="flex gap-6 text-xs text-white/35">
            <a href="mailto:kontakt.clova@gmail.com" className="hover:text-white/70 transition-colors">kontakt.clova@gmail.com</a>
            <a href="tel:46535459" className="hover:text-white/70 transition-colors">46 53 54 59</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ─────────────── SMALL SUB-COMPONENTS ─────────────── */

function SectionHeader({ tag, title, sub }: { tag: string; title: string; sub: string }) {
  const { ref, isInView } = useScrollInView();
  return (
    <div ref={ref} className="text-center">
      <motion.div
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-5"
        style={{ border: "1px solid rgba(212,134,10,0.3)", background: "rgba(180,100,10,0.12)", color: "#d4860a" }}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        dangerouslySetInnerHTML={{ __html: tag }}
      />
      <motion.h2
        className="text-3xl md:text-4xl font-bold text-white mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.08 }}
      >
        {title}
      </motion.h2>
      <motion.p
        className="text-white/40 max-w-xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.16 }}
      >
        {sub}
      </motion.p>
    </div>
  );
}

function ContactInfo({ icon, label, value, href }: { icon: React.ReactNode; label: string; value: string; href: string }) {
  return (
    <div className="flex items-center gap-4">
      <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(180,100,10,0.15)", color: "#d4860a" }}>
        {icon}
      </div>
      <div>
        <div className="text-xs text-white/30 mb-0.5">{label}</div>
        <a href={href} className="text-sm text-white/80 hover:text-white transition-colors">{value}</a>
      </div>
    </div>
  );
}

function FormField({ label, type, value, onChange, placeholder, required, badge }: {
  label: string; type: string; value: string;
  onChange: (v: string) => void; placeholder: string; required?: boolean; badge?: string;
}) {
  return (
    <div>
      <label className="flex items-center gap-2 text-xs text-white/40 mb-2 uppercase tracking-wider">
        {label}
        {badge && <span className="px-1.5 py-0.5 rounded text-[9px]" style={{ background: "rgba(180,100,10,0.2)", color: "#d4860a" }}>{badge}</span>}
      </label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-xl text-sm text-white/85 placeholder:text-white/25 outline-none transition-all"
        style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
        onFocus={(e) => { e.target.style.borderColor = "rgba(212,134,10,0.5)"; }}
        onBlur={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.1)"; }}
      />
    </div>
  );
}
