export type GoogleReviewDisplay = {
  id: string;
  authorName: string;
  authorPhotoUrl?: string;
  authorProfileUrl?: string;
  rating: number;
  text: string;
  relativeTime?: string;
  publishedAt?: string;
};

export type GoogleReviewsPayload = {
  rating: number;
  reviewCount: number;
  reviews: GoogleReviewDisplay[];
  profileUrl: string;
  source: "google" | "curated";
  fetchedAt: string;
};

export type CuratedReview = {
  name?: string;
  text: string;
  rating?: number;
  publishedAt?: string;
  relativeTime?: string;
  postedAt?: string;
};

export function buildCuratedPayload(
  reviews: CuratedReview[],
  profileUrl: string,
  rating: number,
  reviewCount: number,
): GoogleReviewsPayload {
  return {
    rating,
    reviewCount,
    profileUrl,
    source: "curated",
    fetchedAt: new Date().toISOString(),
    reviews: reviews.slice(0, 3).map((review, index) => ({
      id: `curated-${index}`,
      authorName: review.name?.trim() || "Użytkownik Google Maps",
      rating: review.rating ?? 5,
      text: review.text,
      relativeTime: review.relativeTime ?? review.postedAt,
      publishedAt: review.publishedAt,
      authorProfileUrl: profileUrl,
    })),
  };
}

export function pickTopReviews(reviews: GoogleReviewDisplay[], limit = 3): GoogleReviewDisplay[] {
  return [...reviews]
    .sort((a, b) => {
      const nameScore = (r: GoogleReviewDisplay) => (r.authorName !== "Użytkownik Google Maps" ? 1 : 0);
      const lengthScore = (r: GoogleReviewDisplay) => r.text.length;
      return nameScore(b) - nameScore(a) || lengthScore(b) - lengthScore(a);
    })
    .slice(0, limit);
}
