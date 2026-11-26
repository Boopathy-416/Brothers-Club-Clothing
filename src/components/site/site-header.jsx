// import { Link, useLocation, useNavigate } from 'react-router-dom'
// import { useState } from 'react'
// import { Heart, Menu, Search, ShoppingBag, User, X } from 'lucide-react'
// import { Logo } from '../brand/logo'
// import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '../ui/sheet'
// import { CATEGORIES } from '../../lib/site'
// import { useHydrated, useStore } from '../../lib/store'
// import { cn } from '../../lib/utils'

// const NAV = [
//   { href: '/shop', label: 'Shop All' },
//   ...CATEGORIES.map((c) => ({ href: `/collections/${c.slug}`, label: c.shortName })),
//   { href: '/about', label: 'About' },
//   { href: '/contact', label: 'Contact' },
// ]

// export function SiteHeader() {
//   const location = useLocation()
//   const pathname = location.pathname
//   const navigate = useNavigate()
//   const hydrated = useHydrated()
//   const cartLines = useStore((s) => s.cart)
//   const wishlistCount = useStore((s) => s.wishlist.length)
//   const announcement = useStore((s) => s.settings.announcement)
//   const pieces = cartLines.reduce((a, l) => a + l.qty, 0)
//   const [searchOpen, setSearchOpen] = useState(false)
//   const [query, setQuery] = useState('')
//   const [menuOpen, setMenuOpen] = useState(false)

//   function submitSearch(e) {
//     e.preventDefault()
//     const q = query.trim()
//     setSearchOpen(false)
//     navigate(q ? `/shop?q=${encodeURIComponent(q)}` : '/shop')
//   }

//   return (
//     <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/85">
//       <div className="bg-deep px-4 py-2 text-center text-[0.7rem] font-medium tracking-[0.18em] text-black/80 uppercase">
//         {announcement}
//       </div>
//       <div className="mx-auto flex h-[76px] max-w-[1440px] items-center gap-4 px-4 md:px-8 lg:h-20">
//         <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
//           <SheetTrigger
//             className="-ml-2 inline-flex size-10 items-center justify-center rounded-md lg:hidden"
//             aria-label="Open menu"
//           >
//             <Menu className="size-5" />
//           </SheetTrigger>
//           <SheetContent side="left" className="w-80 p-0">
//             <SheetTitle className="sr-only">Menu</SheetTitle>
//             <div className="border-b border-border p-6">
//               <Logo />
//             </div>
//             <nav className="flex flex-col p-2" aria-label="Mobile">
//               {NAV.map((item) => (
//                 <Link
//                   key={item.href}
//                   to={item.href}
//                   onClick={() => setMenuOpen(false)}
//                   className={cn(
//                     'rounded-md px-4 py-3 text-sm font-medium tracking-wide uppercase transition-colors hover:bg-muted',
//                     pathname === item.href && 'bg-muted',
//                   )}
//                 >
//                   {item.label}
//                 </Link>
//               ))}
//               <div className="my-2 border-t border-border" />
//               <Link to="/account" onClick={() => setMenuOpen(false)} className="rounded-md px-4 py-3 text-sm hover:bg-muted">
//                 Retailer account
//               </Link>
//               <Link to="/wishlist" onClick={() => setMenuOpen(false)} className="rounded-md px-4 py-3 text-sm hover:bg-muted">
//                 Wishlist
//               </Link>
//               <Link to="/admin" onClick={() => setMenuOpen(false)} className="rounded-md px-4 py-3 text-sm text-muted-foreground hover:bg-muted">
//                 Staff login
//               </Link>
//             </nav>
//           </SheetContent>
//         </Sheet>

//         <Logo />

//         <nav className="ml-10 hidden items-center gap-7 lg:flex" aria-label="Main">
//           {NAV.map((item) => (
//             <Link
//               key={item.href}
//               to={item.href}
//               className={cn(
//                 'relative py-2 text-[0.78rem] font-semibold tracking-[0.12em] uppercase transition-colors hover:text-foreground',
//                 pathname === item.href || pathname.startsWith(item.href + '/') ? 'text-foreground' : 'text-muted-foreground',
//               )}
//             >
//               {item.label}
//             </Link>
//           ))}
//         </nav>

//         <div className="ml-auto flex items-center gap-1">
//           <button
//             type="button"
//             onClick={() => setSearchOpen((v) => !v)}
//             className="inline-flex size-10 items-center justify-center rounded-md transition-colors hover:bg-muted"
//             aria-label={searchOpen ? 'Close search' : 'Search products'}
//             aria-expanded={searchOpen}
//           >
//             {searchOpen ? <X className="size-5" /> : <Search className="size-5" />}
//           </button>
//           <Link
//             to="/wishlist"
//             className="relative hidden size-10 items-center justify-center rounded-md transition-colors hover:bg-muted sm:inline-flex"
//             aria-label={`Wishlist, ${hydrated ? wishlistCount : 0} items`}
//           >
//             <Heart className="size-5" />
//             {hydrated && wishlistCount > 0 && (
//               <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-brand" aria-hidden />
//             )}
//           </Link>
//           <Link
//             to="/account"
//             className="inline-flex size-10 items-center justify-center rounded-md transition-colors hover:bg-muted"
//             aria-label="Retailer account"
//           >
//             <User className="size-5" />
//           </Link>
//           <Link
//             to="/cart"
//             className="ml-1 inline-flex h-10 items-center gap-2 rounded-md bg-primary px-3 text-primary-foreground transition-colors hover:bg-deep md:px-4"
//             aria-label={`Enquiry cart, ${hydrated ? pieces : 0} pieces`}
//           >
//             <ShoppingBag className="size-4" />
//             <span className="hidden text-xs font-semibold tracking-wider uppercase md:inline">Enquiry</span>
//             <span className="min-w-5 rounded-sm bg-white/15 px-1.5 text-center text-xs font-semibold tabular-nums">
//               {hydrated ? pieces : 0}
//             </span>
//           </Link>
//         </div>
//       </div>
//       {searchOpen && (
//         <div className="border-t border-border bg-background">
//           <form onSubmit={submitSearch} className="mx-auto flex max-w-[1440px] items-center gap-3 px-4 py-4 md:px-8" role="search">
//             <Search className="size-5 text-muted-foreground" aria-hidden />
//             <label htmlFor="site-search" className="sr-only">
//               Search products
//             </label>
//             <input
//               id="site-search"
//               autoFocus
//               value={query}
//               onChange={(e) => setQuery(e.target.value)}
//               placeholder="Search by product name, code or fabric — e.g. King Roma"
//               className="h-11 flex-1 bg-transparent text-base outline-none placeholder:text-muted-foreground"
//             />
//             <button type="submit" className="h-10 rounded-md bg-primary px-5 text-xs font-semibold tracking-wider text-primary-foreground uppercase">
//               Search
//             </button>
//           </form>
//         </div>
//       )}
//     </header>
//   )
// }




import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Heart, Menu, Search, ShoppingBag, User, X } from 'lucide-react'
import { Logo } from '../brand/logo'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '../ui/sheet'
import { CATEGORIES } from '../../lib/site'
import { useHydrated, useStore } from '../../lib/store'
import { cn } from '../../lib/utils'

const NAV = [
  { href: '/shop', label: 'Shop All' },
  ...CATEGORIES.map((c) => ({ href: `/collections/${c.slug}`, label: c.shortName })),
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export function SiteHeader() {
  const location = useLocation()
  const pathname = location.pathname
  const navigate = useNavigate()
  const hydrated = useHydrated()
  const cartLines = useStore((s) => s.cart)
  const wishlistCount = useStore((s) => s.wishlist.length)
  const announcement = useStore((s) => s.settings.announcement)
  const pieces = cartLines.reduce((a, l) => a + l.qty, 0)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)

  function submitSearch(e) {
    e.preventDefault()
    const q = query.trim()
    setSearchOpen(false)
    navigate(q ? `/shop?q=${encodeURIComponent(q)}` : '/shop')
  }

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/85">
      {/* Announcement Bar: Deep Burgundy bg + Warm Cream Beige text */}
      <div className="bg-burgundy px-4 py-2 text-center text-[0.7rem] font-medium tracking-[0.18em] text-cream uppercase">
        {announcement}
      </div>

      <div className="mx-auto flex h-[76px] max-w-[1440px] items-center gap-4 px-4 md:px-8 lg:h-20">
        <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
          <SheetTrigger
            className="-ml-2 inline-flex size-10 items-center justify-center rounded-md text-foreground transition-colors hover:bg-accent hover:text-accent-foreground lg:hidden"
            aria-label="Open menu"
          >
            <Menu className="size-5" />
          </SheetTrigger>
          <SheetContent side="left" className="w-80 border-border bg-background p-0">
            <SheetTitle className="sr-only">Menu</SheetTitle>
            <div className="border-b border-border p-6">
              <Logo />
            </div>
            <nav className="flex flex-col p-2" aria-label="Mobile">
              {NAV.map((item) => {
                const active = pathname === item.href || pathname.startsWith(item.href + '/')
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setMenuOpen(false)}
                    className={cn(
                      'rounded-md px-4 py-3 text-sm font-medium tracking-wide uppercase transition-colors hover:bg-accent hover:text-accent-foreground',
                      active ? 'bg-accent text-accent-foreground' : 'text-foreground',
                    )}
                  >
                    {item.label}
                  </Link>
                )
              })}
              <div className="my-2 border-t border-border" />
              <Link
                to="/account"
                onClick={() => setMenuOpen(false)}
                className="rounded-md px-4 py-3 text-sm text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                Retailer account
              </Link>
              <Link
                to="/wishlist"
                onClick={() => setMenuOpen(false)}
                className="rounded-md px-4 py-3 text-sm text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                Wishlist
              </Link>
              <Link
                to="/admin"
                onClick={() => setMenuOpen(false)}
                className="rounded-md px-4 py-3 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                Staff login
              </Link>
            </nav>
          </SheetContent>
        </Sheet>

        <Logo />

        <nav className="ml-10 hidden items-center gap-7 lg:flex" aria-label="Main">
          {NAV.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + '/')
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  'relative py-2 text-[0.78rem] font-semibold tracking-[0.12em] uppercase transition-colors hover:text-primary',
                  active
                    ? 'text-primary after:absolute after:inset-x-0 after:bottom-0 after:h-[2px] after:bg-primary'
                    : 'text-muted-foreground',
                )}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="ml-auto flex items-center gap-1">
          <button
            type="button"
            onClick={() => setSearchOpen((v) => !v)}
            className="inline-flex size-10 items-center justify-center rounded-md text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            aria-label={searchOpen ? 'Close search' : 'Search products'}
            aria-expanded={searchOpen}
          >
            {searchOpen ? <X className="size-5" /> : <Search className="size-5" />}
          </button>

          <Link
            to="/wishlist"
            className="relative hidden size-10 items-center justify-center rounded-md text-foreground transition-colors hover:bg-accent hover:text-accent-foreground sm:inline-flex"
            aria-label={`Wishlist, ${hydrated ? wishlistCount : 0} items`}
          >
            <Heart className="size-5" />
            {hydrated && wishlistCount > 0 && (
              <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-primary" aria-hidden />
            )}
          </Link>

          {/* <Link
            to="/account"
            className="inline-flex size-10 items-center justify-center rounded-md text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            aria-label="Retailer account"
          >
            <User className="size-5" />
          </Link> */}

          <Link
            to="/cart"
            className="ml-1 inline-flex h-10 items-center gap-2 rounded-md bg-primary px-3 text-primary-foreground transition-colors hover:bg-primary/90 md:px-4"
            aria-label={`Enquiry cart, ${hydrated ? pieces : 0} pieces`}
          >
            <ShoppingBag className="size-4" />
            <span className="hidden text-xs font-semibold tracking-wider uppercase md:inline">Enquiry</span>
            <span className="min-w-5 rounded-sm bg-primary-foreground/15 px-1.5 text-center text-xs font-semibold tabular-nums">
              {hydrated ? pieces : 0}
            </span>
          </Link>
        </div>
      </div>

      {searchOpen && (
        <div className="border-t border-border bg-card">
          <form
            onSubmit={submitSearch}
            className="mx-auto flex max-w-[1440px] items-center gap-3 px-4 py-4 md:px-8"
            role="search"
          >
            <Search className="size-5 text-muted-foreground" aria-hidden />
            <label htmlFor="site-search" className="sr-only">
              Search products
            </label>
            <input
              id="site-search"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by product name, code or fabric — e.g. King Roma"
              className="h-11 flex-1 bg-transparent text-base text-foreground outline-none placeholder:text-muted-foreground"
            />
            <button
              type="submit"
              className="h-10 rounded-md bg-primary px-5 text-xs font-semibold tracking-wider text-primary-foreground uppercase transition-colors hover:bg-primary/90"
            >
              Search
            </button>
          </form>
        </div>
      )}
    </header>
  )
}