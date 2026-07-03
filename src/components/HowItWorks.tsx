import { ClipboardList, Phone, Wrench, type LucideIcon } from "lucide-react";

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

function StepIcons({ step, icon: Icon }: { step: number; icon: LucideIcon }) {
  return (
    <div className="flex items-center gap-2">
      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand-teal text-sm font-bold text-white">
        {step}
      </span>
      <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-brand-cyan transition-smooth group-hover:scale-110 group-hover:bg-white/15">
        <Icon className="h-6 w-6" aria-hidden />
      </div>
    </div>
  );
}

function TimelineSteps() {
  return (
    <ol className="text-left">
      {STEPS.map(({ step, icon: Icon, title, descShort }, i) => (
        <li key={step} className="relative flex gap-3 pb-5 last:pb-0">
          {i < STEPS.length - 1 && (
            <span className="absolute left-[15px] top-8 bottom-0 w-px bg-white/20" aria-hidden />
          )}
          <div className="relative z-10 flex shrink-0 flex-col items-center">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand-teal text-sm font-bold text-white">
              {step}
            </span>
          </div>
          <div className="min-w-0 flex-1 pt-1">
            <div className="flex items-center gap-1.5">
              <Icon className="h-4 w-4 shrink-0 text-brand-cyan md:h-5 md:w-5" aria-hidden />
              <h3 className="text-sm font-semibold text-white md:text-lg">{title}</h3>
            </div>
            <p className="mt-1 text-xs leading-snug text-white/70 md:text-sm md:leading-relaxed">{descShort}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

function DesktopStepCard({ step, icon, title, desc, index }: Step & { index: number }) {
  const Icon = icon;
  const { ref, className: revealClass } = useReveal<HTMLLIElement>();

  return (
    <li
      ref={ref}
      className={cn(
        "group rounded-2xl border border-white/10 bg-white/5 p-6 text-left backdrop-blur-md transition-smooth md:hover:-translate-y-0.5 md:hover:border-white/20 md:hover:bg-white/8",
        revealClass,
      )}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <StepIcons step={step} icon={Icon} />
      <h3 className="mt-3 text-lg font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-white/70">{desc}</p>
    </li>
  );
}

export function HowItWorks() {
  return (
    <section
      id="jak-dzialamy"
      className="scroll-mt-24 bg-brand-deep px-4 py-10 text-primary-foreground md:py-16"
    >
      <div className="mx-auto max-w-6xl text-center">
        <Reveal>
          <p className="section-eyebrow text-brand-cyan">Proces</p>
          <h2 className="mt-1.5 text-xl font-bold text-white md:mt-2 md:text-3xl">
            Jak to działa?
          </h2>
          <p className="mx-auto mt-1.5 max-w-xl text-xs text-white/70 md:mt-2 md:text-base">
            Od pierwszego kontaktu do działającej klimatyzacji.
          </p>
        </Reveal>

        <Reveal delay={120} className="mx-auto mt-5 max-w-md rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-md md:hidden">
          <TimelineSteps />
        </Reveal>

        <ol className="mt-8 hidden gap-6 md:grid md:grid-cols-3 md:text-left">
          {STEPS.map((item, i) => (
            <DesktopStepCard key={item.step} {...item} index={i} />
          ))}
        </ol>
      </div>
    </section>
  );
}
