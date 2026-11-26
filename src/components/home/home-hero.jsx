import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Container, Eyebrow } from '../site/section'
import { useStore } from '../../lib/store'

export function HomeHero() {
  const headline = useStore((s) => s.settings.heroHeadline)
  const sub = useStore((s) => s.settings.heroSubheadline)

  return (
    <section className="border-b border-border">
      <Container className="grid items-stretch gap-0 px-0 md:px-8 lg:grid-cols-[1fr_1.15fr]">
        <div className="order-2 flex flex-col justify-center gap-8 px-4 py-14 md:px-0 md:py-20 lg:order-1 lg:pr-16">
          <Eyebrow>Brothers Club Clothing · Wholesale</Eyebrow>

          <h1 className="text-balance text-4xl leading-[1.05] font-bold tracking-tight md:text-6xl">
            {headline}
          </h1>

          <p className="max-w-lg text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            {sub}
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/shop"
              className="inline-flex h-12 items-center gap-2 rounded-md bg-primary px-7 text-xs font-semibold tracking-[0.14em] text-primary-foreground uppercase transition-colors hover:bg-deep"
            >
              Explore collections
              <ArrowRight className="size-4" aria-hidden />
            </Link>

            <Link
              to="/register"
              className="inline-flex h-12 items-center rounded-md border border-foreground px-7 text-xs font-semibold tracking-[0.14em] uppercase transition-colors hover:bg-foreground hover:text-background"
            >
              Become a retailer
            </Link>
          </div>

          <dl className="grid max-w-lg grid-cols-3 gap-6 border-t border-border pt-8">
            {[
              ['12+', 'Core styles'],
              ['S–6XL', 'Size range'],
              ['24 pcs', 'MOQ from'],
            ].map(([v, l]) => (
              <div key={l}>
                <dt className="text-[0.66rem] font-semibold tracking-[0.16em] text-muted-foreground uppercase">
                  {l}
                </dt>

                <dd className="mt-1 text-xl font-bold tracking-tight md:text-2xl">
                  {v}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative order-1 aspect-[4/5] overflow-hidden sm:aspect-[16/11] lg:order-2 lg:aspect-auto lg:min-h-[640px]">
          <img
            src="/images/hero.png"
            alt="Model wearing Brothers Club charcoal formal trousers and a white shirt"
            fetchPriority="high"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </Container>
    </section>
  )
}