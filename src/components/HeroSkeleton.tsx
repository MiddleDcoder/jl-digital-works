/**
 * HeroSkeleton – rendered while the hero photo is still loading.
 * Mirrors the exact layout of <Hero /> so the browser reserves space
 * and avoids Cumulative Layout Shift (CLS).
 */
const shimmer =
  'relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-foreground/5 before:to-transparent';

export const HeroSkeleton = () => (
  <section
    className="min-h-screen flex flex-col justify-center relative overflow-hidden bg-background pt-24 pb-8"
    aria-hidden="true"
  >
    <div className="container-custom mx-auto px-4 md:px-8 relative z-10">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left – Text placeholders */}
        <div className="order-2 lg:order-1 flex flex-col items-center lg:items-start gap-6">
          {/* Trust badge */}
          <div className={`h-9 w-64 rounded-full bg-muted ${shimmer}`} />

          {/* Headline lines */}
          <div className="flex flex-col gap-3 w-full max-w-xl">
            <div className={`h-10 md:h-12 lg:h-14 w-full rounded-lg bg-muted ${shimmer}`} />
            <div className={`h-10 md:h-12 lg:h-14 w-4/5 rounded-lg bg-muted ${shimmer}`} />
          </div>

          {/* Subtext */}
          <div className="flex flex-col gap-2 w-full max-w-xl">
            <div className={`h-5 w-full rounded bg-muted ${shimmer}`} />
            <div className={`h-5 w-3/4 rounded bg-muted ${shimmer}`} />
          </div>

          {/* Service pills */}
          <div className="flex flex-wrap gap-3">
            <div className={`h-10 w-40 rounded-full bg-muted ${shimmer}`} />
            <div className={`h-10 w-32 rounded-full bg-muted ${shimmer}`} />
            <div className={`h-10 w-44 rounded-full bg-muted ${shimmer}`} />
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className={`h-14 w-44 rounded-full bg-muted ${shimmer}`} />
            <div className={`h-14 w-44 rounded-full bg-muted ${shimmer}`} />
          </div>
        </div>

        {/* Right – Photo placeholder */}
        <div className="order-1 lg:order-2 relative flex justify-center lg:justify-end">
          {/* Background shapes (match Hero dimensions) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[340px] md:w-[380px] md:h-[430px] lg:w-[420px] lg:h-[480px] bg-muted/40 rounded-[40px] rotate-6" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[340px] md:w-[380px] md:h-[430px] lg:w-[420px] lg:h-[480px] border border-border rounded-[40px] -rotate-3" />

          {/* Photo skeleton */}
          <div className="relative z-10">
            <div
              className={`w-[280px] h-[320px] md:w-[350px] md:h-[400px] lg:w-[400px] lg:h-[460px] rounded-3xl bg-muted shadow-2xl ${shimmer}`}
            />

            {/* Stats badge */}
            <div className="absolute -bottom-4 -left-4 md:bottom-4 md:-left-8 z-20 px-5 py-3 bg-card border border-border rounded-2xl shadow-xl">
              <div className={`h-7 w-10 rounded bg-muted mb-1 ${shimmer}`} />
              <div className={`h-3 w-20 rounded bg-muted ${shimmer}`} />
            </div>
          </div>

          {/* Floating badges */}
          <div className="absolute top-[10%] right-0 lg:right-[-5%] z-20">
            <div className={`h-10 w-36 rounded-xl bg-muted border border-border shadow-lg ${shimmer}`} />
          </div>
          <div className="absolute bottom-[25%] right-0 lg:right-[-10%] z-20">
            <div className={`h-10 w-28 rounded-xl bg-muted border border-border shadow-lg ${shimmer}`} />
          </div>
        </div>
      </div>
    </div>
  </section>
);
