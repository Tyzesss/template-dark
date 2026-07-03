import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, Snowflake } from "lucide-react";

import { SITE_NAME, SITE_TITLE, EMAIL, COMPANY_LEGAL_NAME, NIP, REGON, ADDRESS, PHONE_DISPLAY } from "@/lib/site";

export const Route = createFileRoute("/polityka-prywatnosci")({
  component: PolitykaPrywatnosci,
  head: () => ({
    meta: [
      { title: `Polityka Prywatności (RODO) | ${SITE_NAME}` },
      {
        name: "description",
        content: `Polityka prywatności i informacja o przetwarzaniu danych osobowych — ${SITE_NAME}.`,
      },
    ],
  }),
});

function PolitykaPrywatnosci() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2 font-bold text-foreground">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-teal text-white">
              <Snowflake className="h-5 w-5" />
            </div>
            {SITE_NAME}
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-smooth hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Strona główna
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-10 md:py-14">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Polityka Prywatności (RODO)</h1>
        <p className="mt-2 text-sm text-muted-foreground">Ostatnia aktualizacja: {new Date().getFullYear()}</p>

        <div className="prose-policy mt-8 space-y-6 text-sm leading-relaxed text-muted-foreground">
          <section>
            <h2 className="text-lg font-semibold text-foreground">1. Administrator danych</h2>
            <p className="mt-2">
              Administratorem danych osobowych jest {COMPANY_LEGAL_NAME} (dalej: „Administrator”), prowadząca
              działalność pod marką {SITE_NAME}, z siedzibą: {ADDRESS}, NIP: {NIP}, REGON: {REGON}. W sprawach
              związanych z ochroną danych można kontaktować się pod adresem e-mail:{" "}
              <a href={`mailto:${EMAIL}`} className="text-accent underline hover:text-foreground">
                {EMAIL}
              </a>{" "}
              lub telefonicznie: {PHONE_DISPLAY}.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">2. Zakres i cele przetwarzania</h2>
            <p className="mt-2">
              Przetwarzamy dane podane w formularzu kontaktowym (imię, numer telefonu) wyłącznie w celu:
            </p>
            <ul className="mt-2 list-inside list-disc space-y-1">
              <li>kontaktu zwrotnego i przygotowania wyceny usług klimatyzacji,</li>
              <li>obsługi zapytań oraz realizacji umowy (jeśli dojdzie do jej zawarcia).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">3. Podstawa prawna</h2>
            <p className="mt-2">
              Dane przetwarzamy na podstawie art. 6 ust. 1 lit. b RODO (działania przed zawarciem umowy) oraz
              art. 6 ust. 1 lit. a RODO (zgoda wyrażona poprzez formularz i akceptację niniejszej polityki).
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">4. Okres przechowywania</h2>
            <p className="mt-2">
              Dane przechowujemy przez czas niezbędny do udzielenia odpowiedzi i prowadzenia korespondencji
              handlowej, nie dłużej niż jest to wymagane przepisami prawa lub do momentu wycofania zgody —
              jeśli przetwarzanie opiera się wyłącznie na zgodzie.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">5. Prawa osoby, której dane dotyczą</h2>
            <p className="mt-2">Przysługuje Ci prawo do:</p>
            <ul className="mt-2 list-inside list-disc space-y-1">
              <li>dostępu do danych, sprostowania, usunięcia lub ograniczenia przetwarzania,</li>
              <li>przenoszenia danych,</li>
              <li>wniesienia sprzeciwu wobec przetwarzania,</li>
              <li>cofnięcia zgody w dowolnym momencie (bez wpływu na zgodność z prawem przetwarzania przed cofnięciem),</li>
              <li>wniesienia skargi do Prezesa UODO.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">6. Odbiorcy danych</h2>
            <p className="mt-2">
              Dane mogą być powierzane podmiotom świadczącym usługi hostingu, poczty e-mail lub narzędzi
              CRM — wyłącznie na podstawie umów powierzenia i w zakresie niezbędnym do realizacji usług.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">7. Dobrowolność podania danych</h2>
            <p className="mt-2">
              Podanie danych w formularzu jest dobrowolne, lecz niezbędne do kontaktu zwrotnego w sprawie wyceny.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">8. Pliki cookies</h2>
            <p className="mt-2">
              Strona może wykorzystywać pliki cookies niezbędne do prawidłowego działania serwisu (np. sesja,
              preferencje wyświetlania). Nie stosujemy cookies marketingowych ani narzędzi analitycznych wymagających
              dodatkowej zgody. Użytkownik może zarządzać cookies w ustawieniach przeglądarki.
            </p>
          </section>
        </div>

        <p className="mt-10 text-xs text-muted-foreground">{SITE_TITLE}</p>
      </main>
    </div>
  );
}
