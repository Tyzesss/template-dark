import {
  buildCuratedPayload,
  pickTopReviews,
  type GoogleReviewDisplay,
  type GoogleReviewsPayload,
} from "@/lib/google-reviews-shared";
import { getActivePreset } from "@/lib/presets";

type PlacesReview = {
  rating?: number;
  text?: { text?: string };
  authorAttribution?: {
    displayName?: string;
    uri?: string;
    photoUri?: string;
  };
  relativePublishTimeDescription?: string;
  publishTime?: string;
};

type PlacesResponse = {
  rating?: number;
  userRatingCount?: number;
  reviews?: PlacesReview[];
};

function normalizeAuthorName(name?: string): string {
  const trimmed = name?.trim();
  if (!trimmed || /^a google user$/i.test(trimmed) || /^google user$/i.test(trimmed)) {
    return "Użytkownik Google Maps";
  }
  return trimmed;
}

function curatedFallback(): GoogleReviewsPayload {
  const preset = getActivePreset();
  const profileUrl =
    preset.googleReviewsUrl ??
    `https://maps.google.com/?q=${encodeURIComponent(preset.mapsQuery)}`;

  return buildCuratedPayload(preset.reviews, profileUrl, 4.9, 48);
}

async function fetchLiveGoogleReviews(
  placeId: string,
  apiKey: string,
  profileUrl: string,
): Promise<GoogleReviewsPayload | null> {
  const response = await fetch(`https://places.googleapis.com/v1/places/${placeId}`, {
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask": "rating,userRatingCount,reviews",
    },
  });

  if (!response.ok) {
    return null;
  }

  const data = (await response.json()) as PlacesResponse;
  const rawReviews = data.reviews ?? [];
  if (rawReviews.length === 0) {
    return null;
  }

  const reviews: GoogleReviewDisplay[] = rawReviews.map((review, index) => ({
    id: `google-${index}-${review.publishTime ?? index}`,
    authorName: normalizeAuthorName(review.authorAttribution?.displayName),
    authorPhotoUrl: review.authorAttribution?.photoUri,
    authorProfileUrl: review.authorAttribution?.uri ?? profileUrl,
    rating: review.rating ?? 5,
    text: review.text?.text?.trim() ?? "",
    relativeTime: review.relativePublishTimeDescription,
    publishedAt: review.publishTime,
  }));

  return {
    rating: data.rating ?? 5,
    reviewCount: data.userRatingCount ?? rawReviews.length,
    profileUrl,
    source: "google",
    fetchedAt: new Date().toISOString(),
    reviews: pickTopReviews(reviews.filter((review) => review.text.length > 0)),
  };
}

export async function getGoogleReviews(): Promise<GoogleReviewsPayload> {
  const preset = getActivePreset();
  const profileUrl =
    preset.googleReviewsUrl ??
    `https://maps.google.com/?q=${encodeURIComponent(preset.mapsQuery)}`;
  const placeId = preset.googlePlaceId;
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;

  if (apiKey && placeId) {
    try {
      const live = await fetchLiveGoogleReviews(placeId, apiKey, profileUrl);
      if (live) {
        return live;
      }
    } catch (error) {
      console.error("Google Places API fetch failed:", error);
    }
  }

  return curatedFallback();
}
