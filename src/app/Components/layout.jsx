import { SiteFooter } from '../../components/site/site-footer'
import { SiteHeader } from '../../components/site/site-header'
import { WhatsAppFloat } from '../../components/site/whatsapp-float'

export default function SiteLayout({ children }) {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main" className="min-h-[60vh]">
        {children}
      </main>
      <SiteFooter />
      <WhatsAppFloat />
    </>
  )
}