import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Check, MessageCircle, Minus, Plus } from 'lucide-react'
import { actions, useHydrated, useStore } from '../../lib/store'
import {
  buildProductMessage,
  nf,
  stockFor,
  validateProductLines,
  waLink,
} from '../../lib/wholesale'
import { cn } from '../../lib/utils'

const key = (c, s) => `${c}|${s}`

export function QuantityMatrix({
  product,
  activeColour,
  onColourChange,
}) {
  const hydrated = useHydrated()
  const cart = useStore((s) => s.cart)
  const whatsapp = useStore((s) => s.settings.whatsappNumber)

  const [qty, setQty] = useState(null)
  const [added, setAdded] = useState(false)

  const fromCart = Object.fromEntries(
    cart
      .filter((l) => l.productId === product.id)
      .map((l) => [key(l.colour, l.size), l.qty]),
  )

  const values = qty ?? (hydrated ? fromCart : {})

  const lines = product.colours.flatMap((c) =>
    product.sizes.map((s) => ({
      colour: c.name,
      size: s,
      qty: values[key(c.name, s)] ?? 0,
    })),
  )

  const filled = lines.filter((l) => l.qty > 0)
  const v = validateProductLines(product, filled)
  const inCart = Object.keys(fromCart).length > 0
  const madeToOrder = product.availability === 'made-to-order'
  const outOfStock = product.availability === 'out-of-stock'
  const colour = product.colours[activeColour] ?? product.colours[0]

  const colourTotal = (name) =>
    lines
      .filter((l) => l.colour === name)
      .reduce((a, l) => a + l.qty, 0)

  function set(c, s, n) {
    const safe = Math.max(
      0,
      Math.min(99999, Math.floor(Number.isFinite(n) ? n : 0)),
    )

    setQty({ ...values, [key(c, s)]: safe })
    setAdded(false)
  }

  function addToCart() {
    actions.setProductLines(product.id, filled)
    setQty(null)
    setAdded(true)
  }

  const progress = Math.min(100, (v.total / product.moq) * 100)

  return (
    <section
      aria-labelledby="order-heading"
      className="flex flex-col gap-6 rounded-lg border border-border p-5 md:p-6"
    >
      <div className="flex items-center justify-between gap-4">
        <h2
          id="order-heading"
          className="text-xs font-semibold tracking-[0.18em] uppercase"
        >
          Enter quantities
        </h2>

        <p className="text-xs text-muted-foreground">
          MOQ {product.moq} pcs per style
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-sm">
          Colour: <span className="font-semibold">{colour.name}</span>
        </p>

        <div
          className="flex flex-wrap gap-2"
          role="tablist"
          aria-label="Colours"
        >
          {product.colours.map((c, i) => {
            const t = colourTotal(c.name)

            return (
              <button
                key={c.name}
                type="button"
                role="tab"
                aria-selected={i === activeColour}
                onClick={() => onColourChange(i)}
                className={cn(
                  'relative inline-flex h-10 items-center gap-2 rounded-md border px-3 text-sm transition-colors',
                  i === activeColour
                    ? 'border-foreground'
                    : 'border-border hover:border-foreground/50',
                )}
              >
                <span
                  className="size-4 rounded-full border border-border"
                  style={{ backgroundColor: c.hex }}
                  aria-hidden
                />

                {c.name}

                {t > 0 && (
                  <span className="rounded-sm bg-foreground px-1.5 text-[0.65rem] font-semibold text-background tabular-nums">
                    {t}
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </div>

      <div
        className="grid grid-cols-2 gap-2 sm:grid-cols-3"
        role="tabpanel"
        aria-label={`${colour.name} quantities`}
      >
        {product.sizes.map((s) => {
          const stock = stockFor(product, colour.name, s)
          const n = values[key(colour.name, s)] ?? 0
          const unavailable = !madeToOrder && stock === 0
          const over = !madeToOrder && n > stock
          const id = `q-${colour.name}-${s}`

          return (
            <div
              key={s}
              className={cn(
                'flex flex-col gap-2 rounded-md border p-3',
                over
                  ? 'border-destructive'
                  : n > 0
                    ? 'border-foreground'
                    : 'border-border',
                unavailable && 'bg-muted',
              )}
            >
              <div className="flex items-baseline justify-between gap-2">
                <label htmlFor={id} className="text-sm font-semibold">
                  {s}
                </label>

                <span
                  className={cn(
                    'text-[0.68rem] tabular-nums',
                    unavailable
                      ? 'text-destructive'
                      : 'text-muted-foreground',
                  )}
                >
                  {madeToOrder
                    ? 'On order'
                    : unavailable
                      ? 'Sold out'
                      : `${nf.format(stock)} avail.`}
                </span>
              </div>

              <div className="flex items-center">
                <button
                  type="button"
                  onClick={() => set(colour.name, s, n - 1)}
                  disabled={n === 0 || outOfStock}
                  className="inline-flex size-8 items-center justify-center rounded-l-md border border-border disabled:opacity-40"
                  aria-label={`Decrease ${s}`}
                >
                  <Minus className="size-3.5" />
                </button>

                <input
                  id={id}
                  type="number"
                  inputMode="numeric"
                  min={0}
                  value={n === 0 ? '' : n}
                  placeholder="0"
                  disabled={unavailable || outOfStock}
                  onChange={(e) =>
                    set(
                      colour.name,
                      s,
                      Number.parseInt(e.target.value || '0', 10),
                    )
                  }
                  className="h-8 w-full min-w-0 border-y border-border bg-background text-center text-sm font-semibold tabular-nums outline-none [appearance:textfield] focus-visible:bg-muted disabled:cursor-not-allowed [&::-webkit-inner-spin-button]:appearance-none"
                />

                <button
                  type="button"
                  onClick={() => set(colour.name, s, n + 1)}
                  disabled={unavailable || outOfStock}
                  className="inline-flex size-8 items-center justify-center rounded-r-md border border-border disabled:opacity-40"
                  aria-label={`Increase ${s}`}
                >
                  <Plus className="size-3.5" />
                </button>
              </div>

              {over && (
                <p className="text-[0.68rem] text-destructive">
                  Exceeds available stock
                </p>
              )}
            </div>
          )
        })}
      </div>

      <div className="flex flex-col gap-3 rounded-md bg-muted p-4">
        <div className="flex items-baseline justify-between">
          <p className="text-sm text-muted-foreground">
            Total for this style
          </p>

          <p className="text-2xl font-bold tabular-nums">
            {nf.format(v.total)}{' '}
            <span className="text-sm font-medium text-muted-foreground">
              pcs
            </span>
          </p>
        </div>

        <div
          className="h-1.5 overflow-hidden rounded-full bg-border"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={product.moq}
          aria-valuenow={Math.min(v.total, product.moq)}
          aria-label="Progress to minimum order quantity"
        >
          <div
            className={cn(
              'h-full transition-all',
              v.meetsMoq ? 'bg-success' : 'bg-foreground',
            )}
            style={{ width: `${progress}%` }}
          />
        </div>

        <p
          className={cn(
            'text-xs',
            v.meetsMoq ? 'text-success' : 'text-muted-foreground',
          )}
          aria-live="polite"
        >
          {v.meetsMoq
            ? 'Minimum order quantity met.'
            : v.total === 0
              ? `Add at least ${product.moq} pieces across any colours and sizes.`
              : `Add ${v.shortfall} more pieces to meet the MOQ of ${product.moq}.`}
        </p>

        {v.overStock.length > 0 && (
          <p className="text-xs text-destructive">
            Some sizes exceed current stock. You can still enquire — our team will confirm production timelines.
          </p>
        )}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={addToCart}
          disabled={outOfStock || (filled.length === 0 && !inCart)}
          className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-md bg-primary px-6 text-xs font-semibold tracking-[0.14em] text-primary-foreground uppercase transition-colors hover:bg-deep disabled:cursor-not-allowed disabled:opacity-40"
        >
          {added ? (
            <>
              <Check className="size-4" /> Saved to enquiry
            </>
          ) : inCart ? (
            'Update enquiry cart'
          ) : (
            'Add to enquiry cart'
          )}
        </button>

        <a
          href={waLink(whatsapp, buildProductMessage(product, filled))}
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-foreground px-6 text-xs font-semibold tracking-[0.14em] uppercase transition-colors hover:bg-foreground hover:text-background"
        >
          <MessageCircle className="size-4" aria-hidden />
          WhatsApp enquiry
        </a>
      </div>

      {added && (
        <p className="text-sm" role="status">
          {v.meetsMoq || inCart ? 'Quantities saved. ' : ''}
          <Link
            to="/cart"
            className="font-semibold underline underline-offset-4"
          >
            View enquiry cart
          </Link>{' '}
          or keep browsing.
        </p>
      )}

      {outOfStock && (
        <p className="text-sm text-destructive">
          This style is currently out of stock. Send a WhatsApp enquiry to be notified.
        </p>
      )}
    </section>
  )
}