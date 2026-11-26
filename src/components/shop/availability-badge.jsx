import { AVAILABILITY_LABEL } from '../../lib/wholesale'
import { cn } from '../../lib/utils'

const tone = {
  'in-stock': 'bg-success/10 text-success',
  'low-stock': 'bg-[#f3ead9] text-[#7a5413]',
  'made-to-order': 'bg-brand/10 text-brand',
  'out-of-stock': 'bg-destructive/10 text-destructive',
}

export function AvailabilityBadge({ availability, className }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-sm px-2 py-1 text-[0.62rem] font-semibold tracking-[0.12em] uppercase',
        tone[availability],
        availability !== 'in-stock' && 'bg-background',
        className,
      )}
    >
      <span className="size-1.5 rounded-full bg-current" aria-hidden />
      {AVAILABILITY_LABEL[availability]}
    </span>
  )
}