import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SlidersHorizontal, X } from 'lucide-react'
import { ProductCard } from './product-card'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '../../components/ui/sheet'
import { CATEGORIES } from '../../lib/site'
import { useStore } from '../../lib/store'
import { ALL_SIZES } from '../../lib/types'
import { AVAILABILITY_LABEL } from '../../lib/wholesale'
import { cn } from '../../lib/utils'

const empty = {
  categories: [],
  colours: [],
  sizes: [],
  fabrics: [],
  availability: [],
}

function toggle(list, v) {
  return list.includes(v) ? list.filter((x) => x !== v) : [...list, v]
}

export function ProductBrowser({ category }) {
  const [params] = useSearchParams()
  const products = useStore((s) => s.products)

  const [query, setQuery] = useState(params.get('q') ?? '')
  const [sort, setSort] = useState(params.get('sort') || 'featured')
  const [filters, setFilters] = useState(empty)

  const base = useMemo(
    () => products.filter((p) => p.published && (!category || p.category === category)),
    [products, category],
  )

  const options = useMemo(
    () => ({
      colours: [...new Map(base.flatMap((p) => p.colours).map((c) => [c.name, c])).values()],
      fabrics: [...new Set(base.map((p) => p.fabric))],
      sizes: ALL_SIZES.filter((s) => base.some((p) => p.sizes.includes(s))),
    }),
    [base],
  )

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()

    const list = base.filter((p) => {
      if (q && ![p.name, p.code, p.fabric, p.styleType].some((f) => f.toLowerCase().includes(q))) return false
      if (filters.categories.length && !filters.categories.includes(p.category)) return false
      if (filters.colours.length && !p.colours.some((c) => filters.colours.includes(c.name))) return false
      if (filters.sizes.length && !p.sizes.some((s) => filters.sizes.includes(s))) return false
      if (filters.fabrics.length && !filters.fabrics.includes(p.fabric)) return false
      if (filters.availability.length && !filters.availability.includes(p.availability)) return false
      return true
    })

    const sorters = {
      featured: (a, b) => Number(b.featured) - Number(a.featured),
      new: (a, b) => b.createdAt.localeCompare(a.createdAt),
      name: (a, b) => a.name.localeCompare(b.name),
      moq: (a, b) => a.moq - b.moq,
    }

    return [...list].sort(sorters[sort] || sorters.featured)
  }, [base, query, filters, sort])

  const activeCount =
    Object.values(filters).reduce((a, l) => a + l.length, 0) + (query ? 1 : 0)

  const panel = (
    <FilterPanel
      filters={filters}
      setFilters={setFilters}
      options={options}
      showCategories={!category}
    />
  )

  return (
    <div className="mx-auto w-full max-w-[1440px] px-4 py-10 md:px-8 lg:py-14">
      <div className="flex flex-col gap-4 border-b border-border pb-6 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-1 items-center gap-3">
          <Sheet>
            <SheetTrigger className="inline-flex h-11 items-center gap-2 rounded-md border border-border px-4 text-xs font-semibold tracking-wider uppercase lg:hidden">
              <SlidersHorizontal className="size-4" /> Filters {activeCount > 0 && `(${activeCount})`}
            </SheetTrigger>

            <SheetContent side="left" className="w-[88vw] max-w-sm overflow-y-auto p-6">
              <SheetTitle className="mb-4 text-sm font-semibold tracking-wider uppercase">
                Filters
              </SheetTitle>
              {panel}
            </SheetContent>
          </Sheet>

          <label htmlFor="shop-search" className="sr-only">
            Search products
          </label>

          <input
            id="shop-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search name, code or fabric"
            className="h-11 w-full max-w-md rounded-md border border-border bg-background px-4 text-sm outline-none focus-visible:border-ring"
          />
        </div>

        <div className="flex items-center justify-between gap-4 md:justify-end">
          <p className="text-sm text-muted-foreground" aria-live="polite">
            {results.length} {results.length === 1 ? 'style' : 'styles'}
          </p>

          <label className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">Sort</span>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="h-11 rounded-md border border-border bg-background px-3 text-sm outline-none focus-visible:border-ring"
            >
              <option value="featured">Featured</option>
              <option value="new">Newest</option>
              <option value="name">Name A–Z</option>
              <option value="moq">Lowest MOQ</option>
            </select>
          </label>
        </div>
      </div>

      <div className="grid gap-10 pt-8 lg:grid-cols-[240px_1fr]">
        <aside className="hidden lg:block" aria-label="Filters">
          <div className="sticky top-36">{panel}</div>
        </aside>

        <div>
          {activeCount > 0 && (
            <button
              type="button"
              onClick={() => {
                setFilters(empty)
                setQuery('')
              }}
              className="mb-6 inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase underline underline-offset-4"
            >
              <X className="size-3.5" /> Clear all filters
            </button>
          )}

          {results.length === 0 ? (
            <div className="flex flex-col items-center gap-3 rounded-lg border border-dashed border-border py-24 text-center">
              <p className="font-semibold">No styles match these filters</p>
              <p className="text-sm text-muted-foreground">
                Try removing a filter or searching a different term.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:gap-x-6">
              {results.map((p, i) => (
                <ProductCard key={p.id} product={p} priority={i < 3} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function FilterPanel({ filters, setFilters, options, showCategories }) {
  return (
    <div className="flex flex-col gap-8">
      {showCategories && (
        <FilterGroup title="Category">
          {CATEGORIES.map((c) => (
            <Check
              key={c.slug}
              label={c.name}
              checked={filters.categories.includes(c.slug)}
              onChange={() =>
                setFilters((f) => ({
                  ...f,
                  categories: toggle(f.categories, c.slug),
                }))
              }
            />
          ))}
        </FilterGroup>
      )}

      <FilterGroup title="Colour">
        <div className="flex flex-wrap gap-2">
          {options.colours.map((c) => {
            const on = filters.colours.includes(c.name)

            return (
              <button
                key={c.name}
                type="button"
                aria-pressed={on}
                onClick={() =>
                  setFilters((f) => ({
                    ...f,
                    colours: toggle(f.colours, c.name),
                  }))
                }
                className={cn(
                  'inline-flex h-9 items-center gap-2 rounded-md border px-3 text-xs transition-colors',
                  on
                    ? 'border-foreground bg-foreground text-background'
                    : 'border-border hover:border-foreground',
                )}
              >
                <span
                  className="size-3 rounded-full border border-border"
                  style={{ backgroundColor: c.hex }}
                  aria-hidden
                />
                {c.name}
              </button>
            )
          })}
        </div>
      </FilterGroup>

      <FilterGroup title="Size">
        <div className="grid grid-cols-4 gap-2">
          {options.sizes.map((s) => {
            const on = filters.sizes.includes(s)

            return (
              <button
                key={s}
                type="button"
                aria-pressed={on}
                onClick={() =>
                  setFilters((f) => ({
                    ...f,
                    sizes: toggle(f.sizes, s),
                  }))
                }
                className={cn(
                  'h-9 rounded-md border text-xs font-medium transition-colors',
                  on
                    ? 'border-foreground bg-foreground text-background'
                    : 'border-border hover:border-foreground',
                )}
              >
                {s}
              </button>
            )
          })}
        </div>
      </FilterGroup>

      <FilterGroup title="Fabric">
        {options.fabrics.map((fab) => (
          <Check
            key={fab}
            label={fab}
            checked={filters.fabrics.includes(fab)}
            onChange={() =>
              setFilters((f) => ({
                ...f,
                fabrics: toggle(f.fabrics, fab),
              }))
            }
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Availability">
        {Object.keys(AVAILABILITY_LABEL).map((a) => (
          <Check
            key={a}
            label={AVAILABILITY_LABEL[a]}
            checked={filters.availability.includes(a)}
            onChange={() =>
              setFilters((f) => ({
                ...f,
                availability: toggle(f.availability, a),
              }))
            }
          />
        ))}
      </FilterGroup>
    </div>
  )
}

function FilterGroup({ title, children }) {
  return (
    <fieldset className="flex flex-col gap-3">
      <legend className="mb-3 text-[0.7rem] font-semibold tracking-[0.18em] uppercase">
        {title}
      </legend>
      {children}
    </fieldset>
  )
}

function Check({ label, checked, onChange }) {
  return (
    <label className="flex cursor-pointer items-center gap-3 text-sm">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="size-4 accent-foreground"
      />
      {label}
    </label>
  )
}