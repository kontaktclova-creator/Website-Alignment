import { useState, useEffect } from "react";

const LOGOS = [
  { name: "Nüdera", img: "/logos/nudera.jpeg", bg: "#e8b4b0" },
  { name: "Lycke Frisør", img: "/logos/lycke.jpeg", bg: "#f0f4f8" },
  { name: "YNOVA", img: "/logos/ynova.jpeg", bg: "#1a3a36" },
];

const SERVICES = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: "Gratis analyse",
    desc: "Vi analyserer bedriften din og viser deg nøyaktig hvordan du kan få flere kunder.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: "Nettsider som konverterer",
    desc: "Vi lager moderne nettsider som faktisk får besøkende til å bli kunder.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
      </svg>
    ),
    title: "Meta annonser",
    desc: "Vi lager og optimaliserer annonser som gir flere kunder og salg.",
  },
];

const ADS = [
  { src: "/ads/alfreds.png", alt: "Alfreds – Naturlige Godbiter Fra Havet" },
  { src: "/ads/circlek.png", alt: "Circle K – Nyt Gratis Kaffe" },
  { src: "/ads/fratelli.png", alt: "Fratelli – Bestill Takeaway" },
];

type Project = {
  id: string;
  label: string;
  before: string;
  after: string;
  beforeAlt: string;
  afterAlt: string;
};

const PROJECTS: Project[] = [
  {
    id: "goldencrown",
    label: "Golden Crown",
    before: "/beforeafter/goldencrown-before.jpeg",
    after: "/beforeafter/goldencrown-after.png",
    beforeAlt: "Golden Crown – gammel nettside",
    afterAlt: "Golden Crown – ny nettside",
  },
  {
    id: "fratelli",
    label: "Fratelli",
    before: "/beforeafter/fratelli-before.jpeg",
    after: "/beforeafter/fratelli-after.png",
    beforeAlt: "Fratelli – gammel nettside",
    afterAlt: "Fratelli – ny nettside",
  },
  {
    id: "palermo",
    label: "Palermo",
    before: "/beforeafter/palermo-before.jpeg",
    after: "/beforeafter/palermo-after.png",
    beforeAlt: "Palermo – gammel nettside",
    afterAlt: "Palermo – ny nettside",
  },
];

function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

export default function Home() {
  const [activeProject, setActiveProject] = useState<string>("goldencrown");
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const currentProject = PROJECTS.find((p) => p.id === activeProject)!;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const { name, email, phone, message } = formData;
    const subject = encodeURIComponent("Ny henvendelse fra Clova-nettside");
    const body = encodeURIComponent(
      `Navn: ${name}\nE-post: ${email}\nTelefon: ${phone}\n\nMelding:\n${message}`
    );
    window.location.href = `mailto:kontakt.clova@gmail.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* NAV */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-background/95 backdrop-blur-md border-b border-border" : ""}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold tracking-widest gold-text">CLOVA</div>
          <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <button onClick={() => scrollTo("tjenester")} className="hover:text-foreground transition-colors">Tjenester</button>
            <button onClick={() => scrollTo("arbeider")} className="hover:text-foreground transition-colors">Resultater</button>
            <button onClick={() => scrollTo("priser")} className="hover:text-foreground transition-colors">Priser</button>
            <button onClick={() => scrollTo("kontakt")} className="hover:text-foreground transition-colors">Kontakt</button>
          </div>
          <button
            onClick={() => scrollTo("kontakt")}
            className="hidden md:inline-flex px-5 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors"
          >
            Kom i gang
          </button>
          <button
            className="md:hidden text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden bg-background/98 border-b border-border px-6 pb-4 flex flex-col gap-4 text-sm">
            <button onClick={() => { scrollTo("tjenester"); setMobileMenuOpen(false); }} className="text-left text-muted-foreground hover:text-foreground py-2">Tjenester</button>
            <button onClick={() => { scrollTo("arbeider"); setMobileMenuOpen(false); }} className="text-left text-muted-foreground hover:text-foreground py-2">Resultater</button>
            <button onClick={() => { scrollTo("priser"); setMobileMenuOpen(false); }} className="text-left text-muted-foreground hover:text-foreground py-2">Priser</button>
            <button onClick={() => { scrollTo("kontakt"); setMobileMenuOpen(false); }} className="text-left text-muted-foreground hover:text-foreground py-2">Kontakt</button>
            <button onClick={() => { scrollTo("kontakt"); setMobileMenuOpen(false); }} className="w-full px-5 py-2.5 bg-primary text-primary-foreground rounded-lg font-semibold">Kom i gang</button>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center pt-24 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-primary/8 rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-medium mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                Markedsføringsbyrå
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Vi hjelper bedrifter med å få{" "}
                <span className="gold-text">flere kunder</span> – raskt.
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-10 max-w-xl">
                Vi er et nyoppstartet markedsføringsbyrå som allerede har hjulpet lokale bedrifter med å få flere kunder, økt synlighet og målbare resultater – på kort tid.
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => scrollTo("kontakt")}
                  className="px-7 py-3.5 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all hover:shadow-lg hover:shadow-primary/20"
                >
                  Få gratis analyse
                </button>
                <button
                  onClick={() => scrollTo("tjenester")}
                  className="px-7 py-3.5 border border-border rounded-xl font-semibold text-foreground hover:border-primary/40 transition-all"
                >
                  Se hva vi tilbyr
                </button>
              </div>

              {/* Logos — desktop only in hero */}
              <div className="hidden md:block mt-14">
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-5">Bedrifter vi har samarbeidet med</p>
                <div className="flex items-center gap-6">
                  {LOGOS.map((logo) => (
                    <div
                      key={logo.name}
                      className="flex items-center justify-center rounded-xl overflow-hidden"
                      style={{ background: logo.bg, width: 90, height: 52 }}
                    >
                      <img src={logo.img} alt={logo.name} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right – dashboard cards */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="gradient-border rounded-2xl p-5 col-span-2">
                  <div className="text-xs text-muted-foreground mb-3 uppercase tracking-wider">Månedlige resultater</div>
                  <div className="flex justify-between items-end gap-2">
                    {[40, 65, 50, 80, 60, 95, 75].map((h, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1">
                        <div className="w-full rounded-t-sm" style={{ height: h * 0.8, background: `linear-gradient(to top, #f59e0b, #fbbf24)`, opacity: 0.6 + i * 0.06 }} />
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 text-2xl font-bold gold-text">+340%</div>
                  <div className="text-xs text-muted-foreground">Økt synlighet på 3 mnd</div>
                </div>

                <div className="gradient-border rounded-2xl p-5">
                  <div className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">Nye kunder</div>
                  <div className="text-3xl font-bold text-foreground mb-1">+28</div>
                  <div className="text-xs text-primary">↑ 12 denne mnd</div>
                </div>

                <div className="gradient-border rounded-2xl p-5">
                  <div className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">Annonse-ROAS</div>
                  <div className="text-3xl font-bold text-foreground mb-1">4.2x</div>
                  <div className="text-xs text-primary">↑ Over snittet</div>
                </div>

                <div className="gradient-border rounded-2xl p-5 col-span-2">
                  <div className="text-xs text-muted-foreground mb-3 uppercase tracking-wider">Kanaler</div>
                  <div className="flex gap-3">
                    {["Meta Ads", "Nettside", "Google"].map((ch, i) => (
                      <div key={ch} className="flex-1 text-center">
                        <div className="w-full h-1.5 rounded-full bg-muted mb-2 overflow-hidden">
                          <div className="h-full rounded-full bg-primary" style={{ width: [70, 55, 40][i] + "%" }} />
                        </div>
                        <div className="text-xs text-muted-foreground">{ch}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LOGOS – mobile */}
      <section id="partnere" className="md:hidden py-12 px-6 border-y border-border">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-xl font-semibold text-center mb-2">Bedrifter vi har samarbeidet med</h2>
          <p className="text-sm text-muted-foreground text-center mb-8">Ekte resultater for ekte bedrifter – selv i oppstartsfasen</p>
          <div className="flex justify-center items-center gap-6 flex-wrap">
            {LOGOS.map((logo) => (
              <div key={logo.name} className="flex items-center justify-center rounded-xl overflow-hidden" style={{ background: logo.bg, width: 100, height: 60 }}>
                <img src={logo.img} alt={logo.name} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="hidden md:block py-10 px-6 border-y border-border">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm text-muted-foreground uppercase tracking-widest mb-2">Ekte resultater for ekte bedrifter – selv i oppstartsfasen</p>
        </div>
      </section>

      {/* SERVICES */}
      <section id="tjenester" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-medium mb-4">
              Hva vi tilbyr
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Tjenester som gir resultater</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Alt du trenger for å vokse, under ett tak.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {SERVICES.map((s) => (
              <div key={s.title} className="gradient-border rounded-2xl p-8 card-hover cursor-default">
                <div className="w-14 h-14 rounded-xl bg-primary/15 flex items-center justify-center text-primary mb-6">
                  {s.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{s.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ADS */}
      <section id="annonser" className="py-24 px-6 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-medium mb-4">
              Annonser vi har laget
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Se vårt arbeid</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Profesjonelle annonser som stopper scrollingen og skaper konverteringer.</p>
          </div>

          {/* Desktop: side by side */}
          <div className="hidden md:flex gap-6 justify-center">
            {ADS.map((ad) => (
              <div key={ad.src} className="flex-1 max-w-[300px] gradient-border rounded-2xl overflow-hidden card-hover">
                <img src={ad.src} alt={ad.alt} className="w-full h-auto object-cover" />
              </div>
            ))}
          </div>

          {/* Mobile: horizontal scroll */}
          <div className="md:hidden flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory">
            {ADS.map((ad) => (
              <div key={ad.src} className="flex-none w-64 gradient-border rounded-2xl overflow-hidden snap-center">
                <img src={ad.src} alt={ad.alt} className="w-full h-auto object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BEFORE / AFTER */}
      <section id="arbeider" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-medium mb-4">
              Før &amp; etter
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Nettsider vi har laget</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Se forskjellen vi gjør – fra utdatert til profesjonell.</p>
          </div>

          {/* Project tabs */}
          <div className="flex justify-center gap-2 mb-10 flex-wrap">
            {PROJECTS.map((p) => (
              <button
                key={p.id}
                onClick={() => setActiveProject(p.id)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  activeProject === p.id
                    ? "bg-primary text-primary-foreground"
                    : "border border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Before/After split */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* BEFORE */}
            <div className="gradient-border rounded-2xl overflow-hidden flex flex-col">
              <div className="px-5 py-3 border-b border-border flex items-center gap-2 flex-shrink-0">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Før</span>
              </div>
              {/* Simulated browser with scrollbar */}
              <div className="relative flex-1 flex" style={{ height: 520 }}>
                {/* Scrollable content area */}
                <div className="flex-1 overflow-y-scroll bg-gray-100" style={{ scrollbarWidth: "thin", scrollbarColor: "#aaa #e5e7eb" }}>
                  <img
                    src={currentProject.before}
                    alt={currentProject.beforeAlt}
                    className="w-full object-top"
                    style={{ display: "block" }}
                  />
                </div>
              </div>
            </div>

            {/* AFTER */}
            <div className="gradient-border rounded-2xl overflow-hidden gold-glow flex flex-col">
              <div className="px-5 py-3 border-b border-primary/30 flex items-center gap-2 flex-shrink-0">
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">Etter</span>
              </div>
              <div className="relative flex-1 overflow-hidden" style={{ height: 520 }}>
                <img
                  src={currentProject.after}
                  alt={currentProject.afterAlt}
                  className="w-full object-cover object-top"
                  style={{ height: "100%" }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="priser" className="py-24 px-6 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-medium mb-4">
              Priser
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Enkel, transparent prising</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Ingen skjulte kostnader. Du vet alltid hva du betaler.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {/* Nettside */}
            <div className="gradient-border rounded-2xl p-8 card-hover">
              <div className="text-primary text-sm font-semibold uppercase tracking-wider mb-4">Nettside</div>
              <div className="flex items-end gap-2 mb-2">
                <span className="text-4xl font-bold">4&nbsp;999</span>
                <span className="text-muted-foreground mb-1">kr</span>
              </div>
              <div className="text-xs text-muted-foreground mb-6">Engangsbeløp</div>
              <div className="border-t border-border pt-5 mb-6">
                <div className="flex items-end gap-2 mb-1">
                  <span className="text-2xl font-semibold">499</span>
                  <span className="text-muted-foreground text-sm mb-0.5">kr / måned</span>
                </div>
                <div className="text-xs text-muted-foreground">Vedlikehold og support</div>
              </div>
              <ul className="space-y-2.5 text-sm text-muted-foreground">
                {["Moderne, konverterende design", "Mobiloptimalisert", "SEO-grunnlag", "Rask levering"].map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <button onClick={() => scrollTo("kontakt")} className="mt-8 w-full py-3 border border-primary/50 text-primary rounded-xl text-sm font-semibold hover:bg-primary/10 transition-all">
                Kom i gang
              </button>
            </div>

            {/* Annonser */}
            <div className="relative gradient-border rounded-2xl p-8 gold-glow card-hover">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-full uppercase tracking-wider">Populær</span>
              </div>
              <div className="text-primary text-sm font-semibold uppercase tracking-wider mb-4">Meta annonser</div>
              <div className="flex items-end gap-2 mb-2">
                <span className="text-4xl font-bold gold-text">1 mnd gratis</span>
              </div>
              <div className="text-xs text-muted-foreground mb-6">Deretter</div>
              <div className="border-t border-border pt-5 mb-6">
                <div className="flex items-end gap-2 mb-1">
                  <span className="text-2xl font-semibold">2&nbsp;499</span>
                  <span className="text-muted-foreground text-sm mb-0.5">kr / måned</span>
                </div>
                <div className="text-xs text-muted-foreground">Annonsebudsjett til Meta betales separat</div>
              </div>
              <ul className="space-y-2.5 text-sm text-muted-foreground">
                {["Profesjonell annonseproduksjon", "Kontinuerlig optimalisering", "Månedlig rapport", "Dedikert kontaktperson"].map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <button onClick={() => scrollTo("kontakt")} className="mt-8 w-full py-3 bg-primary text-primary-foreground rounded-xl text-sm font-semibold hover:bg-primary/90 transition-all">
                Start gratis måned
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="kontakt" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-medium mb-6">
                Ta kontakt
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Klar for å vokse?</h2>
              <p className="text-muted-foreground leading-relaxed mb-10">
                Send oss en melding, og vi tar kontakt innen 24 timer med en gratis analyse av hva vi kan gjøre for din bedrift.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center text-primary">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">E-post</div>
                    <a href="mailto:kontakt.clova@gmail.com" className="text-foreground hover:text-primary transition-colors">kontakt.clova@gmail.com</a>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center text-primary">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Telefon</div>
                    <a href="tel:46535459" className="text-foreground hover:text-primary transition-colors">46 53 54 59</a>
                  </div>
                </div>
              </div>
            </div>

            <div className="gradient-border rounded-2xl p-8">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-primary/15 flex items-center justify-center text-primary mx-auto mb-4">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Takk for din henvendelse!</h3>
                  <p className="text-muted-foreground text-sm">Vi tar kontakt med deg innen 24 timer.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs text-muted-foreground mb-1.5 uppercase tracking-wider">Navn</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-muted rounded-xl border border-border text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary/60 transition-colors"
                      placeholder="Ditt navn"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-muted-foreground mb-1.5 uppercase tracking-wider">E-post</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-muted rounded-xl border border-border text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary/60 transition-colors"
                      placeholder="din@epost.no"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-muted-foreground mb-1.5 uppercase tracking-wider">Telefonnummer <span className="text-primary">*</span></label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 bg-muted rounded-xl border border-border text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary/60 transition-colors"
                      placeholder="+47 123 45 678"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-muted-foreground mb-1.5 uppercase tracking-wider">Hva trenger du hjelp med?</label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 bg-muted rounded-xl border border-border text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary/60 transition-colors resize-none"
                      placeholder="Fortell oss litt om bedriften din og hva du ønsker å oppnå..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3.5 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all hover:shadow-lg hover:shadow-primary/20"
                  >
                    Send melding
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border py-10 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-xl font-bold tracking-widest gold-text">CLOVA</div>
          <p className="text-xs text-muted-foreground">© 2025 Clova Markedsføring. Alle rettigheter forbeholdt.</p>
          <div className="flex gap-4 text-xs text-muted-foreground">
            <a href="mailto:kontakt.clova@gmail.com" className="hover:text-primary transition-colors">kontakt.clova@gmail.com</a>
            <a href="tel:46535459" className="hover:text-primary transition-colors">46 53 54 59</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
