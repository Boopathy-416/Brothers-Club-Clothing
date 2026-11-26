import { cn } from '../../lib/utils'

export function Container({ className, ...props }) {
  return <div className={cn('mx-auto w-full max-w-[1440px] px-4 md:px-8', className)} {...props} />
}

export function Eyebrow({ className, ...props }) {
  return <p className={cn('text-[0.7rem] font-semibold tracking-[0.22em] text-primary uppercase', className)} {...props} />
}

export function PageHeader({ eyebrow, title, description, children }) {
  return (
    <div className="border-b border-border bg-muted">
      <Container className="flex flex-col gap-4 py-12 md:py-16">
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h1 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-5xl">{title}</h1>
        {description && <p className="max-w-2xl text-pretty leading-relaxed text-muted-foreground">{description}</p>}
        {children}
      </Container>
    </div>
  )
}