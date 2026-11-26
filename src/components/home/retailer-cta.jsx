import { Link } from 'react-router-dom'
import { Container } from '../site/section'
import { SITE } from '../../lib/site'
import { waLink } from '../../lib/wholesale'

export function RetailerCta() {
  return (
    <section className="bg-primary text-primary-foreground">
      <Container className="flex flex-col items-start gap-8 py-20 md:flex-row md:items-end md:justify-between lg:py-24">
        <div className="flex max-w-2xl flex-col gap-4">
          <p className="text-[0.7rem] font-semibold tracking-[0.22em] text-white/60 uppercase">
            Retail partnerships
          </p>

          <h2 className="text-balance text-3xl font-bold tracking-tight md:text-5xl">
            Stock Brothers Club in your store.
          </h2>

          <p className="max-w-lg leading-relaxed text-white/70">
            Register your shop to save enquiries, reorder in one click and get faster quotations from our sales team.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            to="/register"
            className="inline-flex h-12 items-center rounded-md bg-white px-7 text-xs font-semibold tracking-[0.14em] text-foreground uppercase transition-colors hover:bg-white/90"
          >
            Register your shop
          </Link>

          <a
            href={waLink(
              SITE.whatsappNumber,
              'Hello Brothers Club, I would like to become a retail partner.'
            )}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-12 items-center rounded-md border border-white/40 px-7 text-xs font-semibold tracking-[0.14em] uppercase transition-colors hover:bg-white/10"
          >
            Talk to sales
          </a>
        </div>
      </Container>
    </section>
  )
}