import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MobileCarouselProps<T> {
  items: T[];
  renderItem: (item: T, idx: number) => ReactNode;
  className?: string;
  dark?: boolean;
}

export function MobileCarousel<T>({ items, renderItem, className, dark = false }: MobileCarouselProps<T>) {
  const N = items.length;
  const extended = [items[N - 1], ...items, items[0]];
  const [index, setIndex] = useState(1);
  const [transition, setTransition] = useState(true);
  const trackRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    if (!transition) {
      const id = requestAnimationFrame(() => setTransition(true));
      return () => cancelAnimationFrame(id);
    }
  }, [transition]);

  const handleTransitionEnd = () => {
    if (index >= N + 1) {
      setTransition(false);
      setIndex(1);
    } else if (index <= 0) {
      setTransition(false);
      setIndex(N);
    }
  };

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 40) {
      setIndex((i) => i + (dx < 0 ? 1 : -1));
    }
    touchStartX.current = null;
  };

  return (
    <div className={cn("block md:hidden", className)}>
      <div className="overflow-hidden touch-pan-y" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        <div
          ref={trackRef}
          className="flex"
          style={{
            transform: `translateX(-${index * 100}%)`,
            transition: transition ? "transform 350ms cubic-bezier(0.25, 0.1, 0.25, 1)" : "none",
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {extended.map((item, idx) => (
              <div key={idx} className="w-full flex-shrink-0 px-1">
                {renderItem(item, idx)}
              </div>
            ))}
        </div>
      </div>
      <div className="mt-4 flex items-center justify-center gap-1.5">
        {items.map((_, idx) => {
          const isActive =
            index === idx + 1 || (index === 0 && idx === N - 1) || (index === N + 1 && idx === 0);
          return (
            <button
              key={idx}
              aria-label={`Slajd ${idx + 1}`}
              onClick={() => setIndex(idx + 1)}
              className={cn(
                isActive
                  ? dark
                    ? "h-1.5 w-8 rounded-full bg-brand-cyan transition-all duration-300"
                    : "h-1.5 w-8 rounded-full bg-accent transition-all duration-300"
                  : dark
                    ? "h-1.5 w-1.5 rounded-full bg-white/25"
                    : "h-1.5 w-1.5 rounded-full bg-muted-foreground/30",
              )}
            />
          );
        })}
      </div>
    </div>
  );
}
