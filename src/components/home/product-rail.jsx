import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { ProductCard } from '../shop/product-card'
import { Container, Eyebrow } from '../site/section'
import { useStore } from '../../lib/store'
import { cn } from '../../lib/utils'

export function ProductRail({
  eyebrow,
  title,
  filter,
  href,
  muted = false,
}) {
  const products = useStore((s) => s.products)

  const list = products
    .filter(
      (p) =>
        p.published &&
        (filter === 'featured' ? p.featured : p.isNew)
    )
    .slice(0, 4)

  if (list.length === 0) return null

  return (
    <section className={cn('py-20 lg:py-28', muted && 'bg-muted')}>
      <Container className="flex flex-col gap-10">
        <div className="flex items-end justify-between gap-4">
          <div className="flex flex-col gap-3">
            <Eyebrow>{eyebrow}</Eyebrow>

            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              {title}
            </h2>
          </div>

          <Link
            to={href}
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.14em] uppercase hover:underline hover:underline-offset-4"
          >
            View all
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4 lg:gap-x-6">
          {list.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </Container>
    </section>
  )
}