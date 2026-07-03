import { ExternalLink, Star } from "lucide-react";
import { format } from "date-fns";
import { pl } from "date-fns/locale";

import { GoogleIcon } from "@/components/GoogleIcon";
import { MobileCarousel } from "@/components/MobileCarousel";
import { Reveal } from "@/components/Reveal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useReveal } from "@/hooks/use-reveal";
import type { GoogleReviewDisplay, GoogleReviewsPayload } from "@/lib/google-reviews-shared";
import { GOOGLE_WRITE_REVIEW_URL } from "@/lib/site";
import { cn } from "@/lib/utils";

type GoogleReviewsSectionProps = {
  data: GoogleReviewsPayload;
};

function formatReviewDate(review: GoogleReviewDisplay): string | null {
  if (review.relativeTime) {
    return review.relativeTime;
  }
  if (!review.publishedAt) {
    return null;
  }
  try {
    return format(new Date(review.publishedAt), "LLLL yyyy", { locale: pl });
  } catch {
    return null;
  }
}

function authorInitials(name: string): string {
  const parts = name.split(/\s+/).filter(Boolean);
  if (parts.length === 0) {
    return "G";
  }
  if (parts.length === 1) {
    return parts[0]!.slice(0, 1).toUpperCase();
  }
  return `${parts[0]!.slice(0, 1)}${parts[1]!.slice(0, 1)}`.toUpperCase();
}

function GoogleReviewCard({
  review,
  profileUrl,
  index = 0,
}: {
  review: GoogleReviewDisplay;
  profileUrl: string;
  index?: number;
}) {
  const verifyUrl = review.authorProfileUrl ?? profileUrl;
  const dateLabel = formatReviewDate(review);
  const isNamedUser = review.authorName !== "Użytkownik Google Maps";
  const { ref, className: revealClass } = useReveal<HTMLElement>();

  return (
    <article
      ref={ref}
      className={cn(
        "card-glass flex h-full flex-col rounded-xl p-6 text-left transition-smooth md:hover:-translate-y-0.5 md:hover:border-brand-cyan/25 md:hover:shadow-glow",
        revealClass,
      )}
      style={{ transitionDelay: `${index * 90}ms` }}
    >
      <div className="flex items-center gap-3">
        <Avatar className="h-11 w-11 ring-1 ring-white/15">
          {review.authorPhotoUrl ? <AvatarImage src={review.authorPhotoUrl} alt="" /> : null}
          <AvatarFallback className="bg-white/10 text-sm font-semibold text-foreground">
            {isNamedUser ? authorInitials(review.authorName) : <GoogleIcon className="h-5 w-5" />}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <p className="font-semibold text-foreground">{review.authorName}</p>
          <div className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-1">
            <div className="flex">
              {Array.from({ length: review.rating }).map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
              <GoogleIcon className="h-3.5 w-3.5" />
              Google Maps
            </span>
            {dateLabel ? <span className="text-xs text-muted-foreground">· {dateLabel}</span> : null}
          </div>
        </div>
      </div>

      <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">&ldquo;{review.text}&rdquo;</p>

      <a
        href={verifyUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-brand-cyan transition-smooth hover:text-foreground"
      >
        Zobacz na Google Maps
        <ExternalLink className="h-3.5 w-3.5" />
      </a>
    </article>
  );
}

export function GoogleReviewsSection({ data }: GoogleReviewsSectionProps) {
  const { rating, reviewCount, profileUrl, reviews } = data;
  return (
    <>
      <Reveal className="mb-8 flex justify-center">
        <a
          href={profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="card-glass inline-flex items-center gap-2.5 rounded-full px-4 py-2 transition-smooth md:hover:-translate-y-0.5 md:hover:border-brand-cyan/25 md:hover:shadow-glow"
        >
          <div className="flex items-center gap-0.5" aria-hidden>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <span className="text-lg font-bold text-foreground">{rating.toFixed(1)} / 5</span>
        </a>
      </Reveal>

      <MobileCarousel
        dark
        items={reviews}
        renderItem={(review, idx) => (
          <GoogleReviewCard key={review.id} review={review} profileUrl={profileUrl} index={idx} />
        )}
      />
      <div className="hidden gap-5 md:grid md:grid-cols-3">
        {reviews.map((review, i) => (
          <GoogleReviewCard key={review.id} review={review} profileUrl={profileUrl} index={i} />
        ))}
      </div>

      <Reveal delay={150} className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <a
          href={profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary px-6 py-3 text-sm"
        >
          <GoogleIcon className="h-4 w-4" />
          Zobacz wszystkie opinie ({reviewCount})
        </a>
        {GOOGLE_WRITE_REVIEW_URL ? (
          <a
            href={GOOGLE_WRITE_REVIEW_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-cta px-6 py-3 text-sm"
          >
            <Star className="h-4 w-4" />
            Dodaj opinię w Google
          </a>
        ) : null}
      </Reveal>
    </>
  );
}
