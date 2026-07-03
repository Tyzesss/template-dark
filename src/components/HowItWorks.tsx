import type { CSSProperties } from "react";
import { ClipboardList, Phone, Wrench } from "lucide-react";

import { Reveal } from "@/components/Reveal";
import { useReveal } from "@/hooks/use-reveal";
import { CITY_LOCATIVE } from "@/lib/site";
import { cn } from "@/lib/utils";

const STEPS = [
  {
    step: 1,
    icon: Phone,
    title: "Kontakt",
    desc: "Zadzwoń, napisz na WhatsApp lub zostaw numer w formularzu — odpowiadamy tego samego dnia.",
    descShort: "Telefon, WhatsApp lub formularz — odpowiadamy tego samego dnia.",
  },
  {
    step: 2,
    icon: ClipboardList,
    title: "Darmowa wycena",
    desc: `Bezpłatny pomiar na miejscu ${CITY_LOCATIVE} lub wycena zdalna na podstawie zdjęć i metrażu.`,
    descShort: `Bezpłatny pomiar ${CITY_LOCATIVE} lub wycena zdalna ze zdjęć.`,
  },
  {
    step: 3,
    icon: Wrench,
    title: "Montaż",
    desc: "Profesjonalny montaż w 3–7 dni w sezonie, poza sezonem często w 48 godzin.",
    descShort: "Montaż w 3–7 dni w sezonie, poza sezonem często w 48 h.",
  },
] as const;

type Step = (typeof STEPS)[number];

function StepContent({
  icon: Icon,
  title,
  desc,
  descShort,
  compact,
}: Pick<Step, "icon" | "title" | "desc" | "descShort"> & { compact?: boolean }) {
  return (
    <>
      <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-brand-cyan">
        <Icon className="h-4 w-4" aria-hidden />
      </div>
      <h3 className="mt-3 text-sm font-semibold text-white">{title}</h3>
      <p className="mt-1.5 text-xs leading-relaxed text-white/75">
        {compact ? descShort : desc}
      </p>
    </>
  );
}

function MobileTimeline() {
  return (
    <ol className="timeline-rail-v mt-6 flex flex-col md:hidden">
      {STEPS.map(({ step, icon, title, desc, descShort }) => (
        <li key={step} className="timeline-step-v">
          <div className="timeline-step-v__track">
            <span className="timeline-marker">{step}</span>
          </div>
          <div className="panel-glass min-w-0 flex-1 rounded-2xl p-4 text-left md:p-5">
            <StepContent icon={icon} title={title} desc={desc} descShort={descShort} compact />
          </div>
        </li>
      ))}
    </ol>
  );
}

function DesktopTimelineCard({
  icon: Icon,
  title,
  desc,
  index,
}: Pick<Step, "icon" | "title" | "desc"> & { index: number }) {
  const { ref, className: revealClass } = useReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={cn(
        "panel-glass group flex w-full flex-1 flex-col rounded-2xl p-5 text-left transition-smooth md:hover:border-white/15",
        revealClass,
      )}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-brand-cyan transition-smooth group-hover:scale-105">
        <Icon className="h-4 w-4" aria-hidden />
      </div>
      <h3 className="mt-3 text-sm font-semibold text-white">{title}</h3>
      <p className="mt-3 flex-1 text-xs leading-relaxed text-white/75">{desc}</p>
    </div>
  );
}

function DesktopTimeline() {
  return (
    <div className="timeline-desktop mt-10 hidden md:grid">
      {STEPS.map(({ step, icon, title, desc }, i) => (
        <div key={step} className="timeline-col-h">
          <span className="timeline-marker">{step}</span>
          <DesktopTimelineCard icon={icon} title={title} desc={desc} index={i} />
        </div>
      ))}
    </div>
  );
}

export function HowItWorks() {
  return (
    <section
      id="jak-dzialamy"
      className="relative scroll-mt-24 overflow-hidden px-4 py-10 text-foreground md:py-16"
    >
      <div
        className="section-glow section-glow--cyan pointer-events-none"
        style={{ "--glow-x": "38%", "--glow-y": "24%" } as CSSProperties}
        aria-hidden
      />
      <div className="relative mx-auto max-w-6xl">
        <div className="panel-glass rounded-2xl p-5 text-center md:p-8 lg:p-10">
          <Reveal>
            <p className="section-eyebrow">Proces</p>
            <h2 className="mt-1.5 text-xl font-bold text-white md:mt-2 md:text-3xl">Jak to działa?</h2>
            <p className="mx-auto mt-1.5 max-w-xl text-xs text-white/75 md:mt-2 md:text-base">
              Od pierwszego kontaktu do działającej klimatyzacji.
            </p>
          </Reveal>

          <Reveal delay={120}>
            <MobileTimeline />
            <DesktopTimeline />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
