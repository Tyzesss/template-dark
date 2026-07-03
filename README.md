# Klimatyzacja — landing page (demo sprzedażowe)

Responsywny landing page dla firmy HVAC / klimatyzacji. TanStack Start + React + Tailwind.

## Szybki start

```bash
npm install
cp .env.example .env
npm run dev
```

Strona: `http://localhost:5173`

## Personalizacja w ~15 minut

### 1. Zmienne środowiskowe (`.env`)

| Zmienna | Opis |
|---------|------|
| `VITE_SITE_URL` | Domena produkcyjna (canonical, OG, sitemap) |
| `VITE_CITY_PRESET` | Preset miasta: `warszawa`, `krakow`, `wroclaw` |

### 2. Preset miasta (`src/lib/presets/`)

Gotowe presety w plikach:

- `warszawa.ts` — domyślny
- `krakow.ts`
- `wroclaw.ts`

Każdy preset zawiera: nazwę firmy, telefon, e-mail, adres, NIP, REGON, tytuł SEO, galerię (opisy dzielnic), opinie.

**Nowe miasto:** skopiuj `warszawa.ts`, zmień dane, dodaj do `src/lib/presets/index.ts`.

### 3. Checklist przed oddaniem klientowi

- [ ] Ustaw `VITE_SITE_URL` i `VITE_CITY_PRESET` w `.env`
- [ ] Podmień NIP, REGON, telefon, e-mail, adres w presetcie
- [ ] Wgraj **6 zdjęć realizacji** do `public/gallery/` (zaktualizuj ścieżki w presetcie)
- [ ] Podmień **hero** — `src/assets/hero.png`
- [ ] Link do **profilu Google Maps** w `mapsQuery` preseta
- [ ] Uruchom `npm run generate:seo` (lub `npm run build`) — odświeży `robots.txt` i `sitemap.xml`
- [ ] Sprawdź formularz i toast po wysłaniu
- [ ] Sprawdź mobile: sticky bar (telefon + WhatsApp)

### 4. Kolory marki (opcjonalnie)

Edytuj zmienne w `src/styles.css`:

- `--brand-teal`, `--brand-cyan` — akcenty i gradienty
- `--brand-deep` — ciemne sekcje

---

## Presety demo

| Preset | Marka | Domena demo |
|--------|-------|-------------|
| `warszawa` | Klimatyzacja Warszawa | klimatyzacja.pl |
| `krakow` | Klimatyzacja Kraków | klimatyzacja-krakow.pl |
| `wroclaw` | Klimatyzacja Wrocław | klimatyzacja-wroclaw.pl |

Przełączenie: w `.env` ustaw np. `VITE_CITY_PRESET=krakow` i zrestartuj dev server.

---

## SEO (wbudowane)

- Meta title, description, keywords, canonical, Open Graph
- JSON-LD `HVACBusiness` (schema.org)
- `public/favicon.svg`
- `robots.txt` + `sitemap.xml` — generowane skryptem `npm run generate:seo` przed buildem
- Polityka RODO z NIP, REGON, cookies

---

## Materiały sprzedażowe

### Co pokazać klientowi

1. **Desktop** — pełna strona ze scroll (hero → usługi → proces → opinie → realizacje → FAQ → wycena)
2. **Mobile** — sticky bar z dzwonieniem i WhatsApp, oś czasu „Jak to działa”
3. **Presety miast** — przełącz `VITE_CITY_PRESET` na spotkaniu (15 min personalizacji)
4. **Formularz leadów** — toast po wysłaniu (gotowe pod integrację CRM / Formspree)

### Zrzuty ekranu (checklist)

- [ ] Hero + formularz (desktop i mobile)
- [ ] Sekcja „Jak to działa” (mobile — oś czasu w kafelku)
- [ ] Opinie + sticky bar (mobile)
- [ ] Sekcja wyceny + kontakt

Nagranie: krótki scroll 30–45 s (Loom / OBS) — hero → CTA → formularz.

### Pakiet funkcji — co jest / co można dokupić

| Funkcja | W szablonie | Rozszerzenie (dokup) |
|---------|-------------|----------------------|
| Landing one-page | ✅ | — |
| Formularz leadów (toast) | ✅ | Integracja e-mail / CRM / webhook |
| Click-to-call + WhatsApp | ✅ | — |
| Presety miast | ✅ | Dowolne miasto w 15 min |
| SEO + schema.org | ✅ | — |
| Polityka RODO | ✅ | — |
| Mapa Google (embed) | ❌ | Link do mapy jest |
| Blog / aktualności | ❌ | Osobny moduł |
| Cennik PDF | ❌ | FAQ ma widełki cen |
| Wielojęzyczność | ❌ | EN / DE |
| Panel edycji treści | ❌ | CMS headless |

---

## Komendy

```bash
npm run dev           # development
npm run generate:seo  # robots.txt + sitemap.xml z VITE_SITE_URL
npm run build         # produkcja (auto: generate:seo)
npm run preview       # podgląd buildu
npm run lint          # ESLint
```

## Struktura projektu

```
src/lib/site.ts          ← eksport aktywnego presetu (używaj tego w komponentach)
src/lib/presets/         ← dane per miasto
src/lib/schema.ts        ← JSON-LD
src/routes/index.tsx     ← strona główna
public/gallery/          ← zdjęcia realizacji
scripts/generate-seo-files.mjs
```

## Deploy

### Vercel (domyślnie)

Projekt używa **Nitro** z presetem `vercel` (`vite.config.ts`). Vercel wykrywa TanStack Start automatycznie.

**Ustawienia projektu w Vercel:**
- Build Command: `npm run build`
- Output Directory: *(zostaw puste — Nitro generuje `.vercel/output`)*
- Framework Preset: TanStack Start / Nitro (auto)

**Zmienne środowiskowe w Vercel:**
- `VITE_SITE_URL` — np. `https://twoja-domena.vercel.app`
- `VITE_CITY_PRESET` — `warszawa` | `krakow` | `wroclaw`

Po pierwszej zmianie konfiguracji: **Redeploy → Redeploy without Build Cache**.

### Cloudflare (opcjonalnie)

W `vite.config.ts` ustaw `cloudflare: true` (lub usuń `cloudflare: false`) i usuń plugin `nitro()`. Deploy przez `wrangler.jsonc`.

---

© Szablon demo — personalizuj preset i treści przed publikacją u klienta.
