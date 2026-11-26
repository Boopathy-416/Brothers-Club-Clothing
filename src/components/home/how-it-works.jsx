import {
  ClipboardList,
  Grid3x3,
  MessageCircle,
  Truck,
} from 'lucide-react'

import { Container, Eyebrow } from '../site/section'

const STEPS = [
  {
    icon: Grid3x3,
    title: 'Choose styles',
    text: 'Browse collections and pick colours. Enter quantities for every size you need.',
  },
  {
    icon: ClipboardList,
    title: 'Build your enquiry',
    text: 'Add multiple products to one enquiry cart. MOQ is checked automatically.',
  },
  {
    icon: MessageCircle,
    title: 'Send on WhatsApp',
    text: 'Submit and your complete order list is formatted and sent to our sales desk.',
  },
  {
    icon: Truck,
    title: 'Quote & dispatch',
    text: 'We confirm availability, share a quotation and dispatch from Tiruppur.',
  },
]

export function HowItWorks() {
  return (
    <section className="border-y border-border py-20 lg:py-28">
      <Container className="grid gap-12 lg:grid-cols-[0.8fr_2fr]">
        <div className="flex flex-col gap-3">
          <Eyebrow>Wholesale ordering</Eyebrow>

          <h2 className="text-balance text-3xl font-bold tracking-tight md:text-4xl">
            How it works
          </h2>

          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
            No online payment. Every order is a wholesale enquiry — our team confirms stock and pricing personally.
          </p>
        </div>

        <ol className="grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => {
            const Icon = s.icon

            return (
              <li
                key={s.title}
                className="flex flex-col gap-5 bg-background p-6 lg:p-8"
              >
                <div className="flex items-center justify-between">
                  <Icon className="size-5" aria-hidden />

                  <span className="text-xs font-semibold text-muted-foreground tabular-nums">
                    0{i + 1}
                  </span>
                </div>

                <h3 className="text-base font-semibold">{s.title}</h3>

                <p className="text-sm leading-relaxed text-muted-foreground">
                  {s.text}
                </p>
              </li>
            )
          })}
        </ol>
      </Container>
    </section>
  )
}