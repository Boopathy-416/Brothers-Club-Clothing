import { Link } from 'react-router-dom'
import { Container, Eyebrow } from '../site/section'

export function ManufacturerStory() {
  return (
    <section className="py-20 lg:py-28">
      <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
        <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-muted">
          <img
            src="/images/factory.png"
            alt="Garment production floor at Winstar Tex, Tiruppur"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>

        <div className="flex flex-col gap-6">
          <Eyebrow>Manufacturer direct</Eyebrow>

          <h2 className="text-balance text-3xl font-bold tracking-tight md:text-4xl">
            Made in Tiruppur by Winstar Tex
          </h2>

          <p className="leading-relaxed text-muted-foreground">
            Brothers Club Clothing is the menswear label of Winstar Tex, a garment manufacturer based in Karuvampalayam,
            Tiruppur. Every piece is cut, stitched, finished and quality-checked in-house — so retailers get consistent
            fits, dependable fabric and factory-direct supply.
          </p>

          <dl className="grid grid-cols-2 gap-6 border-t border-border pt-6">
            {[
              ['In-house', 'Cutting to packing'],
              ['Pan-India', 'Dispatch network'],
              ['Size sets', 'Packed per your order'],
              ['Direct', 'Sales desk support'],
            ].map(([v, l]) => (
              <div key={l}>
                <dt className="text-sm text-muted-foreground">{l}</dt>
                <dd className="text-lg font-semibold tracking-tight">{v}</dd>
              </div>
            ))}
          </dl>

          <Link
            to="/about"
            className="text-xs font-semibold tracking-[0.14em] uppercase underline underline-offset-4"
          >
            Read our story
          </Link>
        </div>
      </Container>
    </section>
  )
}