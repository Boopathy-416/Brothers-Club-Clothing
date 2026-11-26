import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { Container, Eyebrow } from '../site/section'
import { CATEGORIES } from '../../lib/site'

export function CategoryGrid() {
  return (
    <section className="py-20 lg:py-28">
      <Container className="flex flex-col gap-10">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-3">
            <Eyebrow>Collections</Eyebrow>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Shop by category
            </h2>
          </div>

          <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
            Four core categories, each available across multiple colours and a full size run — ready for bulk orders.
          </p>
        </div>

        <ul className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
          {CATEGORIES.map((c) => (
            <li key={c.slug}>
              <Link
                to={`/collections/${c.slug}`}
                className="group flex flex-col gap-4"
              >
                <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-muted">
                  <img
                    src={c.image}
                    alt={c.name}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                </div>

                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-base font-semibold tracking-tight md:text-lg">
                      {c.name}
                    </h3>

                    <p className="mt-1 hidden text-sm leading-relaxed text-muted-foreground md:block">
                      {c.description}
                    </p>
                  </div>

                  <ArrowUpRight
                    className="mt-1 size-5 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden
                  />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}