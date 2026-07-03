import { Link, createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Wrench,
  Snowflake,
  Wind,
  ShieldCheck,
  Zap,
  Home,
  CheckCircle2,
  Menu,
  X,
  Star,
} from "lucide-react";
import heroImage from "@/assets/hero.png";
import { MobileCarousel } from "@/components/MobileCarousel";
import { StickyCallBar } from "@/components/StickyCallBar";
import { HowItWorks } from "@/components/HowItWorks";
import { GoogleReviewsSection } from "@/components/GoogleReviewsSection";
import { Reveal } from "@/components/Reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useReveal } from "@/hooks/use-reveal";

import {
  SITE_TITLE,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_CITY,
  PHONE_DISPLAY,
  PHONE_HREF,
  EMAIL,
  EMAIL_HREF,
  ADDRESS,
  HOURS,
  MAPS_URL,
  NIP,
  GALLERY,
  GOOGLE_REVIEWS_URL,
} from "@/lib/site";

export const Route = createFileRoute("/")({
  loader: async () => {
    const { getGoogleReviews } = await import("@/lib/google-reviews.server");
    return { googleReviews: await getGoogleReviews() };
  },
  component: Index,
  head: () => ({
    meta: [
      { title: SITE_TITLE },
      { name: "description", content: SITE_DESCRIPTION },
      { property: "og:title", content: SITE_TITLE },
      { property: "og:description", content: SITE_DESCRIPTION },
    ],
  }),
});

const NAV_LINKS = [
  { href: "#uslugi", label: "Usługi" },
  { href: "#jak-dzialamy", label: "Jak to działa" },
  { href: "#opinie", label: "Opinie" },
  { href: "#realizacje", label: "Realizacje" },
  { href: "#faq", label: "FAQ" },
  { href: "#wycena", label: "Wycena" },
  { href: "#kontakt", label: "Kontakt" },
] as const;

const services = [
  { icon: Snowflake, title: "Montaż klimatyzacji", desc: "Profesjonalny montaż split i multi-split w domach i mieszkaniach." },
  { icon: Wrench, title: "Serwis i przeglądy", desc: "Coroczne przeglądy, czyszczenie i ozonowanie urządzeń." },
  { icon: Wind, title: "Rekuperacja", desc: "Dobór i montaż systemów wentylacji mechanicznej z odzyskiem ciepła." },
  { icon: Zap, title: "Pompy ciepła", desc: "Dobór i instalacja pomp powietrze-woda dla domów jednorodzinnych." },
  { icon: Home, title: "Klima do biura", desc: "Systemy klimatyzacji dla lokali usługowych i biur." },
  { icon: ShieldCheck, title: "Naprawa awaryjna", desc: "Szybka reakcja w przypadku awarii – dojazd nawet tego samego dnia." },
];

const SERVICE_OPTION_GROUPS = [
  {
    label: "Montaż",
    options: [
      "Klimatyzacja — dom lub mieszkanie",
      "Klimatyzacja — biuro lub lokal",
      "Rekuperacja",
      "Pompa ciepła",
    ],
  },
  {
    label: "Serwis i naprawa",
    options: ["Przegląd i konserwacja", "Naprawa awaryjna"],
  },
  {
    label: "Inne",
    options: ["Potrzebuję doradztwa"],
  },
] as const;

const gallery = GALLERY;

const faqs = [
  { q: "Ile kosztuje montaż klimatyzacji?", a: "Standardowy montaż split 2,5–3,5 kW to koszt od 1800 zł brutto. Cena zależy od długości instalacji i typu urządzenia." },
  { q: "Jak szybko możecie zamontować klimatyzację?", a: "W sezonie zazwyczaj 3–7 dni od akceptacji wyceny. Poza sezonem nawet w 48h." },
  { q: "Czy oferujecie darmową wycenę?", a: "Tak. Wycena na miejscu lub zdalnie (na podstawie zdjęć) jest całkowicie bezpłatna i niezobowiązująca." },
  { q: "Jaką gwarancję dostanę?", a: "5 lat gwarancji na urządzenie (przy corocznym przeglądzie) oraz 2 lata na sam montaż." },
  { q: "Czy serwisujecie urządzenia kupione gdzie indziej?", a: "Tak, serwisujemy wszystkie popularne marki klimatyzatorów – niezależnie od miejsca zakupu." },
];

const HERO_BULLETS = [
  "Certyfikowani technicy F-gaz",
  "Split, multi-split, pompy ciepła",
  "Dojazd tego samego dnia przy awarii",
] as const;

const HERO_FACTS = [
  { icon: ShieldCheck, text: "Certyfikat F-gaz" },
  { icon: Clock, text: "Montaż w 3–7 dni" },
  { icon: CheckCircle2, text: "5 lat gwarancji" },
] as const;

function HeroGoogleRating({
  rating,
  reviewCount,
  profileUrl,
}: {
  rating: number;
  reviewCount: number;
  profileUrl: string;
}) {
  return (
    <a
      href={profileUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex max-w-full flex-wrap items-center gap-x-2 gap-y-1 rounded-full border border-white/12 bg-white/6 px-3 py-1.5 text-xs text-white/85 backdrop-blur-sm transition-smooth hover:border-white/25 hover:bg-white/10 sm:text-sm"
    >
      <div className="flex shrink-0" aria-hidden>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400 sm:h-3.5 sm:w-3.5" />
        ))}
      </div>
      <span className="font-semibold text-white">{rating.toFixed(1)}</span>
      <span className="text-white/55">· {reviewCount} opinii Google</span>
    </a>
  );
}

function CTAButton({ className = "" }: { className?: string }) {
  return (
    <a
      href={PHONE_HREF}
      className={`inline-flex items-center justify-center gap-2.5 rounded-full bg-brand-teal px-6 py-3.5 text-sm font-semibold text-white shadow-cool hover:bg-brand-teal/90 active:scale-[0.98] transition-smooth md:px-10 md:py-4 md:text-lg ${className}`}
    >
      <Phone className="h-5 w-5 shrink-0 md:h-6 md:w-6" />
      <span>Zadzwoń · {PHONE_DISPLAY}</span>
    </a>
  );
}

function LeadForm({ variant = "light" }: { variant?: "light" | "dark" }) {
  const [service, setService] = useState("");

  const isDark = variant === "dark";

  const inputClass = isDark
    ? "h-11 w-full rounded-lg border border-white/20 bg-white/10 px-3.5 text-sm text-white placeholder:text-white/45 outline-none transition-smooth focus:border-brand-cyan focus:ring-2 focus:ring-brand-cyan/25"
    : "h-11 w-full rounded-lg border border-input bg-background px-3.5 text-sm outline-none transition-smooth focus:border-accent focus:ring-2 focus:ring-accent/20";

  const labelClass = isDark ? "text-xs font-medium text-white/75" : "text-xs font-medium text-foreground/80";

  const selectTriggerClass = cn(
    "h-11 w-full rounded-lg text-sm shadow-none focus:ring-2",
    isDark
      ? "border-white/20 bg-white/10 text-white focus:border-brand-cyan focus:ring-brand-cyan/25 data-[placeholder]:text-white/45"
      : "border-input bg-background focus:border-accent focus:ring-accent/20 data-[placeholder]:text-muted-foreground",
  );

  const consentTextClass = isDark ? "text-white/60" : "text-muted-foreground";
  const consentLinkClass = isDark
    ? "text-brand-cyan underline underline-offset-2 hover:text-white"
    : "text-accent underline underline-offset-2 hover:text-foreground";

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        toast.success("Dziękujemy! Oddzwonimy do Ciebie wkrótce.", {
          description: "Twoje zgłoszenie zostało przyjęte.",
        });
        e.currentTarget.reset();
        setService("");
      }}
      className="grid gap-3.5 text-left"
    >
      <div className="grid gap-1.5">
        <Label htmlFor="lead-phone" className={labelClass}>
          Telefon
        </Label>
        <input required id="lead-phone" type="tel" name="phone" placeholder="np. 600 000 000" className={inputClass} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="lead-name" className={labelClass}>
          Imię
        </Label>
        <input required id="lead-name" type="text" name="name" placeholder="Twoje imię" className={inputClass} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="lead-service" className={labelClass}>
          Rodzaj usługi <span className={isDark ? "text-white/40" : "text-muted-foreground"}>(opcjonalnie)</span>
        </Label>
        <input type="hidden" name="service" value={service} />
        <Select value={service || undefined} onValueChange={setService}>
          <SelectTrigger id="lead-service" className={selectTriggerClass}>
            <SelectValue placeholder="Wybierz z listy" />
          </SelectTrigger>
          <SelectContent className="rounded-lg">
            {SERVICE_OPTION_GROUPS.map((group) => (
              <SelectGroup key={group.label}>
                <SelectLabel>{group.label}</SelectLabel>
                {group.options.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectGroup>
            ))}
          </SelectContent>
        </Select>
      </div>
      <label className={`flex cursor-pointer items-start gap-2.5 text-xs leading-snug ${consentTextClass}`}>
        <input
          required
          type="checkbox"
          name="rodo"
          className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded border-input accent-[var(--brand-teal)]"
        />
        <span>
          Akceptuję{" "}
          <Link to="/polityka-prywatnosci" className={consentLinkClass}>
            Politykę Prywatności
          </Link>{" "}
          i wyrażam zgodę na kontakt w sprawie wyceny (RODO).
        </span>
      </label>
      <button
        type="submit"
        className="h-11 rounded-full bg-brand-teal text-sm font-semibold text-white shadow-cool transition-smooth hover:bg-brand-teal/90 active:scale-[0.98]"
      >
        Wyślij zapytanie
      </button>
    </form>
  );
}

function ServiceCard({ s, index }: { s: (typeof services)[number]; index: number }) {
  const Icon = s.icon;
  const num = String(index + 1).padStart(2, "0");
  const { ref, className: revealClass } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={cn(
        "group relative h-full overflow-hidden rounded-xl border border-border/80 bg-background p-5 text-left transition-smooth md:hover:-translate-y-0.5 md:hover:border-brand-teal/30 md:hover:shadow-card",
        revealClass,
      )}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <span className="absolute right-4 top-4 text-xs font-semibold tabular-nums text-muted-foreground/40">{num}</span>
      <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-muted/50 text-accent transition-smooth group-hover:scale-110 group-hover:border-brand-teal/20 group-hover:bg-accent/5 group-hover:text-brand-teal">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="pr-8 text-base font-semibold text-foreground">{s.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
    </div>
  );
}

function GalleryCard({ g, index = 0 }: { g: (typeof gallery)[number]; index?: number }) {
  const { ref, className: revealClass } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={cn(
        "group relative aspect-[4/3] overflow-hidden rounded-xl border border-white/10 bg-brand-deep shadow-card ring-1 ring-white/5 transition-smooth md:hover:-translate-y-0.5 md:hover:shadow-glow",
        revealClass,
      )}
      style={{ transitionDelay: `${index * 90}ms` }}
    >
      <img
        src={g.image}
        alt={g.alt}
        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        loading="lazy"
        decoding="async"
        width={800}
        height={600}
      />
    </div>
  );
}

const contactCards = [
  { type: "phone", icon: Phone, title: "Zadzwoń", value: PHONE_DISPLAY, href: PHONE_HREF },
  { type: "email", icon: Mail, title: "E-mail", value: EMAIL, href: EMAIL_HREF },
  { type: "address", icon: MapPin, title: "Adres", value: ADDRESS, href: MAPS_URL },
  { type: "hours", icon: Clock, title: "Godziny", value: HOURS, href: null as string | null },
];

function ContactCard({ c, index = 0 }: { c: (typeof contactCards)[number]; index?: number }) {
  const Icon = c.icon;
  const { ref, className: revealClass } = useReveal<HTMLDivElement>();
  const inner = (
    <div
      ref={ref}
      className={cn(
        "flex h-full min-w-0 items-center gap-4 rounded-xl border border-dashed border-border bg-muted/30 p-4 text-left transition-smooth hover:border-accent/30 hover:bg-muted/50 md:hover:-translate-y-0.5 md:hover:shadow-card",
        revealClass,
      )}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-background text-accent shadow-card transition-smooth group-hover:scale-105 group-hover:text-brand-teal">
        <Icon className="h-5 w-5" />
      </div>
      <div className="min-w-0">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{c.title}</p>
        <p
          className={
            c.type === "email"
              ? "mt-0.5 text-sm font-semibold leading-snug text-foreground break-all"
              : "mt-0.5 text-sm font-semibold text-foreground break-words"
          }
        >
          {c.value}
        </p>
      </div>
    </div>
  );
  return c.href ? (
    <a
      href={c.href}
      target={c.type === "address" ? "_blank" : undefined}
      rel="noreferrer"
      className="group block h-full min-w-0"
    >
      {inner}
    </a>
  ) : (
    inner
  );
}

function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b backdrop-blur-xl transition-smooth",
        scrolled
          ? "border-border bg-background/90 shadow-card"
          : "border-border/60 bg-background/70",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4">
        <a
          href="#top"
          className="flex items-center gap-2"
          onClick={() => setMenuOpen(false)}
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-teal text-white">
            <Snowflake className="h-5 w-5" />
          </div>
          <span className="font-bold tracking-tight text-foreground">{SITE_NAME}</span>
        </a>

        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-foreground transition-smooth hover:text-accent hover:underline hover:underline-offset-4"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={PHONE_HREF}
            className="hidden md:inline-flex items-center gap-2 rounded-full bg-brand-teal px-5 py-2.5 text-sm font-semibold text-white shadow-cool transition-smooth hover:bg-brand-teal/90 active:scale-[0.98]"
          >
            <Phone className="h-4 w-4" /> Zadzwoń
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="inline-flex rounded-full p-2 text-foreground transition-smooth hover:bg-muted md:hidden"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Zamknij menu" : "Otwórz menu"}
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="border-b border-border bg-background/95 backdrop-blur-xl animate-fade-in md:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col px-4 py-4 text-left">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="border-b border-border/50 py-3 text-base font-semibold text-foreground transition-smooth last:border-0 hover:text-accent"
              >
                {link.label}
              </a>
            ))}
            <a
              href={PHONE_HREF}
              onClick={() => setMenuOpen(false)}
              className="mt-3 inline-flex items-center justify-center gap-2 rounded-full bg-brand-teal py-3 text-sm font-semibold text-white shadow-cool transition-smooth hover:bg-brand-teal/90"
            >
              <Phone className="h-4 w-4" /> Zadzwoń teraz
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

function Index() {
  const { googleReviews } = Route.useLoaderData();

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <section
        id="top"
        className="relative scroll-mt-24 overflow-hidden bg-gradient-hero px-4 pt-6 pb-12 text-primary-foreground max-md:min-h-[36rem] md:min-h-[34rem] md:pt-12 md:pb-20"
      >
        <div
          className="hero-photo"
          style={{ backgroundImage: `url(${heroImage})` }}
          role="img"
          aria-label=""
        />
        <div className="hero-photo-scrim" aria-hidden />
        <div className="relative z-10 mx-auto max-w-6xl md:grid md:grid-cols-2 md:gap-12 md:items-center">
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <span className="hero-enter hero-enter-delay-0 inline-flex w-fit max-w-full shrink-0 items-center gap-1.5 rounded-full border border-white/15 bg-white/8 px-3 py-1 text-xs font-medium leading-none text-white/90 backdrop-blur-sm md:px-3.5 md:py-1.5 md:text-sm">
              <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-brand-cyan" aria-hidden />
              <span>Bezpłatna wycena na miejscu</span>
            </span>

            <h1 className="hero-enter hero-enter-delay-1 mt-3 text-[2.5rem] font-bold leading-[1.06] max-md:mx-auto md:mt-4 md:text-[3.25rem] lg:text-[3.5rem]">
              Montaż i serwis
              <br />
              klimatyzacji
            </h1>

            <p className="hero-enter hero-enter-delay-2 mt-2 text-xl font-medium text-white/75 md:mt-2 md:text-2xl">
              {SITE_CITY}
            </p>

            <div className="hero-enter hero-enter-delay-3 mt-4 hidden md:block">
              <HeroGoogleRating
                rating={googleReviews.rating}
                reviewCount={googleReviews.reviewCount}
                profileUrl={googleReviews.profileUrl || GOOGLE_REVIEWS_URL}
              />
            </div>

            <ul className="hero-enter hero-enter-delay-4 mt-4 hidden max-w-md space-y-2 md:block">
              {HERO_BULLETS.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm leading-snug text-white/75 md:text-base">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-cyan" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>

            <div className="hero-enter hero-enter-delay-5 mt-4 flex justify-center md:mt-6 md:justify-start">
              <CTAButton />
            </div>

            <ul className="hero-enter hero-enter-delay-6 mt-6 hidden flex-wrap gap-2 md:flex">
              {HERO_FACTS.map(({ icon: Icon, text }) => (
                <li
                  key={text}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/12 bg-white/6 px-3 py-1.5 text-xs font-medium text-white/80 backdrop-blur-sm"
                >
                  <Icon className="h-3.5 w-3.5 shrink-0 text-brand-cyan" aria-hidden />
                  {text}
                </li>
              ))}
            </ul>
          </div>

          <div className="hero-enter hero-enter-delay-7 mt-5 w-full rounded-2xl border border-white/15 bg-white/10 p-5 text-center shadow-glow ring-1 ring-white/10 backdrop-blur-md max-md:[&_form]:text-left md:mt-0 md:text-left">
            <p className="text-sm font-semibold text-white md:hidden">Bezpłatna wycena — zostaw numer</p>
            <p className="hidden text-sm font-semibold text-white md:block">Oddzwonimy do Ciebie</p>
            <p className="mt-1 hidden text-xs text-white/65 md:block">Zostaw numer — oddzwonimy bez zobowiązań.</p>
            <div className="mt-4">
              <LeadForm variant="dark" />
            </div>
          </div>

          <div className="hero-enter hero-enter-delay-3 mt-3 flex justify-center md:hidden">
            <HeroGoogleRating
              rating={googleReviews.rating}
              reviewCount={googleReviews.reviewCount}
              profileUrl={googleReviews.profileUrl || GOOGLE_REVIEWS_URL}
            />
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <Section
        id="uslugi"
        eyebrow="Usługi"
        title="Nasze usługi"
        subtitle="Montaż split i multi-split w domach, mieszkaniach i biurach."
      >
        <MobileCarousel items={services} renderItem={(s) => <ServiceCard s={s} index={services.indexOf(s)} />} />
        <div className="hidden md:grid grid-cols-3 gap-5">
          {services.map((s, i) => (
            <ServiceCard key={s.title} s={s} index={i} />
          ))}
        </div>
      </Section>

      <HowItWorks />

      {/* REVIEWS */}
      <Section
        id="opinie"
        eyebrow="Opinie Google"
        title="Opinie klientów"
        subtitle="Sprawdzone recenzje z profilu Google Maps — możesz je zweryfikować jednym kliknięciem."
      >
        <GoogleReviewsSection data={googleReviews} />
      </Section>

      {/* GALLERY */}
      <Section
        id="realizacje"
        eyebrow="Portfolio"
        title="Nasze realizacje"
        subtitle="Wybrane montaże w Twojej okolicy."
        dark
      >
        <MobileCarousel dark items={gallery} renderItem={(g) => <GalleryCard g={g} />} />
        <div className="hidden md:grid grid-cols-3 gap-5">
          {gallery.map((g, i) => (
            <GalleryCard key={g.image} g={g} index={i} />
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section
        id="faq"
        eyebrow="FAQ"
        title="Najczęstsze pytania"
        subtitle="Wszystko, co warto wiedzieć przed montażem."
      >
        <Reveal>
          <div className="mx-auto max-w-3xl">
            <Accordion type="single" collapsible className="w-full text-left">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-left text-base font-semibold">{f.q}</AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground md:text-base">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
            </Accordion>
          </div>
        </Reveal>
      </Section>

      {/* FINAL CTA */}
      <section
        id="wycena"
        className="relative scroll-mt-24 overflow-hidden bg-brand-deep px-4 pt-10 pb-14 md:pt-14 md:pb-20"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{ background: "var(--gradient-radial)" }}
        />
        <Reveal className="relative mx-auto max-w-3xl text-center text-primary-foreground">
          <p className="section-eyebrow text-brand-cyan">Darmowa wycena</p>
          <h2 className="mt-1.5 text-2xl font-bold tracking-tight md:text-4xl">Potrzebujesz klimatyzacji?</h2>
          <div className="mx-auto mt-8 max-w-md rounded-2xl border border-white/15 bg-white/10 p-5 shadow-cool backdrop-blur-md max-md:text-center md:text-left max-md:[&_form]:text-left">
            <p className="text-sm font-semibold text-white">Wolisz oddzwonienie?</p>
            <p className="mt-1 text-xs text-white/70">Oddzwonimy do Ciebie.</p>
            <div className="mt-4">
              <LeadForm variant="dark" />
            </div>
          </div>
        </Reveal>
      </section>

      {/* CONTACT */}
      <Section
        id="kontakt"
        eyebrow="Kontakt"
        title="Skontaktuj się z nami"
        subtitle="Zadzwoń, napisz na e-mail lub odwiedź nas — jesteśmy czynni Pn–Sob 8:00–18:00."
      >
        <MobileCarousel items={contactCards} renderItem={(c) => <ContactCard c={c} />} />
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {contactCards.map((c, i) => (
            <ContactCard key={c.title} c={c} index={i} />
          ))}
        </div>
      </Section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-brand-deep px-4 pt-8 pb-24 text-primary-foreground md:pb-8">
        <div className="mx-auto max-w-6xl text-center text-sm text-white/70">
          <p className="font-bold text-white">{SITE_NAME} — Klimatyzacja i Serwis</p>
          <p className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
            <a href={PHONE_HREF} className="inline-flex items-center gap-1.5 transition-smooth hover:text-white">
              <Phone className="h-3.5 w-3.5" /> {PHONE_DISPLAY}
            </a>
            <a
              href={EMAIL_HREF}
              className="inline-flex max-w-full items-center gap-1.5 break-all transition-smooth hover:text-white"
            >
              <Mail className="h-3.5 w-3.5 shrink-0" /> {EMAIL}
            </a>
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 shrink-0" /> {ADDRESS}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 shrink-0" /> {HOURS}
            </span>
          </p>
          <p className="mt-3 text-xs text-white/50">NIP: {NIP}</p>
          <p className="mt-4 text-xs text-white/50">
            <Link
              to="/polityka-prywatnosci"
              className="underline underline-offset-2 transition-smooth hover:text-white"
            >
              Polityka Prywatności (RODO)
            </Link>
            {" · "}© {new Date().getFullYear()} {SITE_NAME}. Wszelkie prawa zastrzeżone.
          </p>
        </div>
      </footer>

      <StickyCallBar />
    </div>
  );
}

function Section({
  id,
  eyebrow,
  title,
  subtitle,
  children,
  muted,
  dark,
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  muted?: boolean;
  dark?: boolean;
}) {
  return (
    <section
      id={id}
      className={`relative scroll-mt-24 overflow-hidden px-4 pt-10 pb-14 md:pt-16 md:pb-20 ${
        dark
          ? "bg-brand-deep text-primary-foreground"
          : muted
            ? "bg-gradient-cool"
            : ""
      }`}
    >
      {dark && (
        <div
          className="pointer-events-none absolute inset-0 opacity-50"
          style={{ background: "var(--gradient-radial)" }}
        />
      )}
      <div className="relative mx-auto max-w-6xl">
        <Reveal className={`text-center ${eyebrow ? "mb-6 md:mb-10" : "mb-8 md:mb-12"}`}>
          {eyebrow && (
            <p className="section-eyebrow">
              {eyebrow}
            </p>
          )}
          <h2
            className={`text-2xl font-bold tracking-tight md:text-4xl ${
              eyebrow ? "mt-1.5" : ""
            } ${dark ? "text-white" : "text-foreground"}`}
          >
            {title}
          </h2>
          {subtitle && (
            <p
              className={`text-sm leading-relaxed md:text-base ${
                eyebrow ? "mt-1.5" : "mt-2"
              } ${dark ? "text-white/70" : "text-muted-foreground"}`}
            >
              {subtitle}
            </p>
          )}
        </Reveal>
        {children}
      </div>
    </section>
  );
}