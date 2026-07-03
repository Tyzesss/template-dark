/** Konfiguracja strony — aktywny preset w .env (VITE_CITY_PRESET) lub edycja plików w src/lib/presets/ */

import { getActivePreset, PRESET_IDS, type PresetId } from "@/lib/presets";

const preset = getActivePreset();

export { PRESET_IDS, type PresetId };

export const SITE_PRESET_ID = preset.id;
export const SITE_NAME = preset.siteName;
export const COMPANY_LEGAL_NAME = preset.companyLegalName;
export const SITE_CITY = preset.siteCity;
export const CITY_LOCATIVE = preset.cityLocative;

export const NIP = preset.nip;
export const REGON = preset.regon;

export const PHONE_DISPLAY = preset.phoneDisplay;
export const PHONE_E164 = preset.phoneE164;
export const PHONE_HREF = `tel:${PHONE_E164}`;
export const SMS_HREF = `sms:${PHONE_E164}`;

const WHATSAPP_TEXT = encodeURIComponent("Dzień dobry, proszę o wycenę klimatyzacji.");
export const WHATSAPP_HREF = `https://wa.me/${PHONE_E164.replace("+", "")}?text=${WHATSAPP_TEXT}`;

export const EMAIL = preset.email;
export const EMAIL_HREF = `mailto:${EMAIL}`;

export const ADDRESS = preset.address;
export const ADDRESS_STREET = preset.addressStreet;
export const ADDRESS_CITY = preset.addressCity;
export const ADDRESS_POSTAL = preset.addressPostal;
export const HOURS = "Pn - Sob: 8:00 - 18:00";
export const MAPS_URL = `https://maps.google.com/?q=${encodeURIComponent(preset.mapsQuery)}`;

export const GOOGLE_RATING = 4.9;
export const GOOGLE_REVIEW_COUNT = 48;
export const GOOGLE_REVIEWS_URL = preset.googleReviewsUrl ?? MAPS_URL;
export const GOOGLE_WRITE_REVIEW_URL = preset.googleWriteReviewUrl ?? "";

export const SITE_TITLE = preset.siteTitle;
export const SITE_KEYWORDS = preset.siteKeywords;
export const SITE_DESCRIPTION = `Montaż klimatyzacji ${CITY_LOCATIVE} i okolicach. Darmowa wycena, szybki dojazd, gwarancja. Zadzwoń: ${PHONE_DISPLAY}.`;
export const SITE_OG_IMAGE = preset.ogImage;

export const GALLERY = preset.gallery;
export const REVIEWS = preset.reviews;

export const SITE_DEFAULT_URL = preset.siteDefaultUrl;

/** Nadpisz w .env: VITE_SITE_URL=https://twoja-domena.pl */
export const SITE_URL = import.meta.env.VITE_SITE_URL as string | undefined;

export function siteBaseUrl(): string {
  return SITE_URL ?? SITE_DEFAULT_URL;
}

export function absoluteUrl(path: string): string {
  return new URL(path, siteBaseUrl()).href;
}
