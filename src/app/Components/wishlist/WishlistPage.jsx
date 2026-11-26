
// import { Link } from 'react-router-dom'
// import {
//   Heart,
//   Trash2,
//   ArrowRight,
//   ArrowLeft,
//   Factory,
//   UserRound,
//   Package,
// } from 'lucide-react'
// import { SiInstagram, SiFacebook } from "@icons-pack/react-simple-icons";

// import { useStore, actions } from '../../../lib/store'

// // Replace these with your actual social media URLs
// const SOCIAL_LINKS = {
//   instagram: 'https://www.instagram.com/YOUR_INSTAGRAM_USERNAME/',
//   facebook: 'https://www.facebook.com/YOUR_FACEBOOK_PAGE/',
// }

// export default function WishlistPage() {
//   const wishlist = useStore((s) => s.wishlist)
//   const products = useStore((s) => s.products)

//   const savedProducts = products.filter((product) =>
//     wishlist.includes(product.id)
//   )

//   return (
//     <main className="min-h-screen bg-[#17110f] text-[#ead5b5]">

//       {/* PAGE HEADER */}
//       <section className="border-b border-[#b78a4c]/20 px-5 py-12 md:px-10 md:py-16">
//         <div className="mx-auto max-w-[1450px]">

//           <Link
//             to="/shop"
//             className="mb-10 inline-flex items-center gap-2 text-xs tracking-widest text-[#b9a895] transition hover:text-[#ead5b5]"
//           >
//             <ArrowLeft size={15} />
//             CONTINUE SHOPPING
//           </Link>

//           <div className="flex flex-wrap items-end justify-between gap-6">

//             <div>
//               <p className="mb-3 text-xs font-semibold tracking-[0.25em] text-[#b78a4c]">
//                 BROTHERS CLUB CLOTHING
//               </p>

//               <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
//                 My Wishlist
//               </h1>

//               <p className="mt-4 max-w-lg text-sm leading-7 text-[#b9a895]">
//                 Your selected styles, saved in one place.
//                 Explore your favourite menswear collections
//                 and prepare your wholesale enquiry.
//               </p>
//             </div>

//             <div className="flex items-center gap-3 border border-[#b78a4c]/30 px-5 py-4">
//               <Heart size={20} className="text-[#c69b60]" />

//               <div>
//                 <p className="text-xl font-bold">
//                   {savedProducts.length}
//                 </p>
//                 <p className="text-[10px] tracking-widest text-[#b9a895]">
//                   SAVED STYLES
//                 </p>
//               </div>
//             </div>

//           </div>
//         </div>
//       </section>

//       {/* WISHLIST PRODUCTS */}
//       <section className="px-5 py-12 md:px-10 md:py-16">
//         <div className="mx-auto max-w-[1450px]">

//           <div className="mb-9 flex items-center justify-between border-b border-[#b78a4c]/20 pb-5">
//             <h2 className="text-sm font-bold tracking-[0.18em]">
//               SAVED COLLECTION
//             </h2>

//             <span className="text-xs text-[#b9a895]">
//               {savedProducts.length} PRODUCTS
//             </span>
//           </div>

//           {savedProducts.length === 0 ? (

//             <div className="flex min-h-[430px] flex-col items-center justify-center text-center">

//               <div className="mb-7 flex size-24 items-center justify-center rounded-full border border-[#b78a4c]/30 bg-[#241a16]">
//                 <Heart size={36} strokeWidth={1.2} />
//               </div>

//               <p className="mb-3 text-[10px] font-semibold tracking-[0.25em] text-[#b78a4c]">
//                 YOUR PERSONAL COLLECTION
//               </p>

//               <h2 className="text-3xl font-bold md:text-4xl">
//                 Your wishlist is empty.
//               </h2>

//               <p className="mt-4 max-w-md text-sm leading-7 text-[#b9a895]">
//                 Discover our premium menswear styles.
//                 Save your favourite products and find them
//                 here whenever you return.
//               </p>

//               <Link
//                 to="/shop"
//                 className="mt-9 inline-flex h-14 items-center gap-4 bg-[#ead5b5] px-9 text-xs font-bold tracking-widest text-[#54120e] transition hover:bg-white"
//               >
//                 EXPLORE COLLECTION
//                 <ArrowRight size={17} />
//               </Link>

//             </div>

//           ) : (

//             <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 lg:gap-x-7">

//               {savedProducts.map((product) => {

//                 const image =
//                   product.colours?.[0]?.image ||
//                   product.gallery?.[0] ||
//                   '/placeholder.svg'

//                 return (
//                   <article
//                     key={product.id}
//                     className="group min-w-0"
//                   >

//                     {/* IMAGE */}
//                     <div className="relative aspect-[3/4] overflow-hidden bg-[#241a16]">

//                       <Link
//                         to={`/product/${product.slug}`}
//                         aria-label={`View ${product.name}`}
//                       >
//                         <img
//                           src={image}
//                           alt={product.name}
//                           loading="lazy"
//                           className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
//                         />
//                       </Link>

//                       <button
//                         type="button"
//                         onClick={() => actions.toggleWishlist(product.id)}
//                         aria-label={`Remove ${product.name} from wishlist`}
//                         className="absolute right-3 top-3 flex size-10 items-center justify-center rounded-full bg-[#ead5b5] text-[#54120e] shadow-lg transition hover:bg-white"
//                       >
//                         <Trash2 size={16} />
//                       </button>

//                       {product.isNew && (
//                         <span className="absolute bottom-3 left-3 bg-[#ead5b5] px-3 py-1.5 text-[9px] font-bold tracking-widest text-[#54120e]">
//                           NEW ARRIVAL
//                         </span>
//                       )}

//                     </div>

//                     {/* PRODUCT DETAILS */}
//                     <div className="pt-4">

//                       <div className="flex items-center justify-between gap-2">
//                         <p className="text-[9px] font-semibold tracking-widest text-[#b78a4c]">
//                           {product.styleType}
//                         </p>

//                         <p className="text-[9px] text-[#9d8b7c]">
//                           {product.code}
//                         </p>
//                       </div>

//                       <Link to={`/product/${product.slug}`}>
//                         <h3 className="mt-2 text-sm font-semibold leading-6 text-[#ead5b5] transition hover:text-white">
//                           {product.name}
//                         </h3>
//                       </Link>

//                       <p className="mt-1 text-xs text-[#a99582]">
//                         {product.fabric} · {product.gsm} GSM
//                       </p>

//                       {/* COLOUR OPTIONS */}
//                       <div className="mt-4 flex items-center gap-2">
//                         {product.colours?.slice(0, 6).map((colour) => (
//                           <span
//                             key={colour.name}
//                             title={colour.name}
//                             className="size-4 rounded-full border border-[#b78a4c]/40"
//                             style={{
//                               backgroundColor: colour.hex,
//                             }}
//                           />
//                         ))}
//                       </div>

//                       <div className="mt-4 flex items-center justify-between gap-2 border-t border-[#b78a4c]/20 pt-4">

//                         <p className="text-[10px] text-[#b9a895]">
//                           MOQ {product.moq} PCS
//                         </p>

//                         <Link
//                           to={`/product/${product.slug}`}
//                           className="inline-flex items-center gap-1 text-[10px] font-bold tracking-wider text-[#d4ad77] transition hover:text-white"
//                         >
//                           SELECT OPTIONS
//                           <ArrowRight size={13} />
//                         </Link>

//                       </div>

//                     </div>
//                   </article>
//                 )
//               })}

//             </div>
//           )}

//         </div>
//       </section>

//       {/* BRAND CONNECTION */}
//       <section className="border-t border-[#b78a4c]/20 bg-[#211612] px-5 py-16 md:px-10">
//         <div className="mx-auto max-w-[1450px]">

//           <div className="mb-10 text-center">
//             <p className="text-[10px] font-bold tracking-[0.25em] text-[#b78a4c]">
//               BEYOND THE COLLECTION
//             </p>

//             <h2 className="mt-3 text-3xl font-bold md:text-4xl">
//               Discover Brothers Club
//             </h2>

//             <p className="mx-auto mt-3 max-w-lg text-sm leading-7 text-[#b9a895]">
//               Connect with our brand, explore our leadership
//               and discover our manufacturing journey.
//             </p>
//           </div>

//           {/* SOCIAL BUTTONS */}
//           <div className="grid gap-4 sm:grid-cols-2">

//             <a
//               href={SOCIAL_LINKS.instagram}
//               target="_blank"
//               rel="noreferrer"
//               className="flex items-center justify-between border border-[#b78a4c]/30 p-6 transition hover:bg-[#35241b]"
//             >
//               <div className="flex items-center gap-4">
//                 <SiInstagram size={20} />
//                 <div>
//                   <h3 className="text-sm font-bold">Instagram</h3>
//                   <p className="mt-1 text-xs text-[#b9a895]">
//                     Follow our latest collections
//                   </p>
//                 </div>
//               </div>
//               <ArrowRight size={19} />
//             </a>

//             <a
//               href={SOCIAL_LINKS.facebook}
//               target="_blank"
//               rel="noreferrer"
//               className="flex items-center justify-between border border-[#b78a4c]/30 p-6 transition hover:bg-[#35241b]"
//             >
//               <div className="flex items-center gap-4">
//                 <SiFacebook size={20} />
//                 <div>
//                   <h3 className="text-sm font-bold">Facebook</h3>
//                   <p className="mt-1 text-xs text-[#b9a895]">
//                     Stay connected with our brand
//                   </p>
//                 </div>
//               </div>
//               <ArrowRight size={19} />
//             </a>

//           </div>

//           {/* BRAND GALLERY LINKS */}
//           <div className="mt-12 grid gap-5 md:grid-cols-2">

//             <a
//               href="/about#leadership-gallery"
//               className="group relative flex min-h-52 flex-col justify-end overflow-hidden border border-[#b78a4c]/30 bg-gradient-to-br from-[#39271c] to-[#17110f] p-7 transition hover:border-[#d4ad77]"
//             >
//               <UserRound size={28} className="mb-auto text-[#c69b60]" />
//               <p className="text-[10px] font-bold tracking-[0.2em] text-[#c69b60]">
//                 LEADERSHIP
//               </p>
//               <h3 className="mt-2 text-2xl font-bold">
//                 CEO Gallery
//               </h3>
//               <p className="mt-2 text-xs text-[#b9a895]">
//                 Discover the people and vision behind Brothers Club.
//               </p>
//               <ArrowRight className="absolute bottom-7 right-7 transition group-hover:translate-x-1" />
//             </a>

//             <a
//               href="/about#manufacturing-gallery"
//               className="group relative flex min-h-52 flex-col justify-end overflow-hidden border border-[#b78a4c]/30 bg-gradient-to-br from-[#39271c] to-[#17110f] p-7 transition hover:border-[#d4ad77]"
//             >
//               <Factory size={28} className="mb-auto text-[#c69b60]" />
//               <p className="text-[10px] font-bold tracking-[0.2em] text-[#c69b60]">
//                 OUR PRODUCTION
//               </p>
//               <h3 className="mt-2 text-2xl font-bold">
//                 Manufacturing Gallery
//               </h3>
//               <p className="mt-2 text-xs text-[#b9a895]">
//                 Explore our manufacturing and production journey in Tiruppur.
//               </p>
//               <ArrowRight className="absolute bottom-7 right-7 transition group-hover:translate-x-1" />
//             </a>

//           </div>

//         </div>
//       </section>

//       {/* FOOTER CTA */}
//       <section className="border-t border-[#b78a4c]/20 px-5 py-12 text-center">

//         <Package className="mx-auto mb-4 text-[#c69b60]" size={27} />

//         <h2 className="text-xl font-bold">
//           Manufacturer Direct. Quality Assured.
//         </h2>

//         <p className="mt-3 text-xs text-[#b9a895]">
//           Premium menswear manufacturing from Tiruppur, India.
//         </p>

//         <Link
//           to="/shop"
//           className="mt-7 inline-flex items-center gap-3 border border-[#b78a4c]/50 px-7 py-4 text-[10px] font-bold tracking-widest transition hover:bg-[#ead5b5] hover:text-[#54120e]"
//         >
//           EXPLORE ALL PRODUCTS
//           <ArrowRight size={15} />
//         </Link>

//       </section>

//     </main>
//   )
// }


import { Link } from 'react-router-dom'
import {
  Heart,
  Trash2,
  ArrowRight,
  ArrowLeft,
  Factory,
  UserRound,
  Package,
} from 'lucide-react'
import { SiInstagram, SiFacebook } from '@icons-pack/react-simple-icons'

import { useStore, actions } from '../../../lib/store'

// Replace these with your actual social media URLs
const SOCIAL_LINKS = {
  instagram: 'https://www.instagram.com/YOUR_INSTAGRAM_USERNAME/',
  facebook: 'https://www.facebook.com/YOUR_FACEBOOK_PAGE/',
}

export default function WishlistPage() {
  const wishlist = useStore((s) => s.wishlist)
  const products = useStore((s) => s.products)

  const savedProducts = products.filter((product) =>
    wishlist.includes(product.id)
  )

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* PAGE HEADER */}
      <section className="border-b border-border px-5 py-12 md:px-10 md:py-16">
        <div className="mx-auto max-w-[1450px]">
          <Link
            to="/shop"
            className="mb-10 inline-flex items-center gap-2 text-xs font-medium tracking-widest text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft size={15} />
            CONTINUE SHOPPING
          </Link>

          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="mb-3 text-xs font-semibold tracking-[0.25em] text-primary uppercase">
                BROTHERS CLUB CLOTHING
              </p>

              <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-6xl">
                My Wishlist
              </h1>

              <p className="mt-4 max-w-lg text-sm leading-7 text-muted-foreground">
                Your selected styles, saved in one place.
                Explore your favourite menswear collections
                and prepare your wholesale enquiry.
              </p>
            </div>

            <div className="flex items-center gap-3 rounded-lg border border-border bg-card px-5 py-4 text-card-foreground">
              <Heart size={20} className="text-primary" />

              <div>
                <p className="text-xl font-bold tabular-nums">
                  {savedProducts.length}
                </p>
                <p className="text-[10px] tracking-widest text-muted-foreground">
                  SAVED STYLES
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WISHLIST PRODUCTS */}
      <section className="px-5 py-12 md:px-10 md:py-16">
        <div className="mx-auto max-w-[1450px]">
          <div className="mb-9 flex items-center justify-between border-b border-border pb-5">
            <h2 className="text-sm font-bold tracking-[0.18em] text-foreground">
              SAVED COLLECTION
            </h2>

            <span className="text-xs text-muted-foreground">
              {savedProducts.length} PRODUCTS
            </span>
          </div>

          {savedProducts.length === 0 ? (
            <div className="flex min-h-[430px] flex-col items-center justify-center text-center">
              <div className="mb-7 flex size-24 items-center justify-center rounded-full bg-accent text-accent-foreground">
                <Heart size={36} strokeWidth={1.2} />
              </div>

              <p className="mb-3 text-[10px] font-semibold tracking-[0.25em] text-primary">
                YOUR PERSONAL COLLECTION
              </p>

              <h2 className="text-3xl font-bold text-foreground md:text-4xl">
                Your wishlist is empty.
              </h2>

              <p className="mt-4 max-w-md text-sm leading-7 text-muted-foreground">
                Discover our premium menswear styles.
                Save your favourite products and find them
                here whenever you return.
              </p>

              <Link
                to="/shop"
                className="mt-9 inline-flex h-14 items-center gap-4 rounded-md bg-primary px-9 text-xs font-bold tracking-widest text-primary-foreground transition-colors hover:bg-primary/90"
              >
                EXPLORE COLLECTION
                <ArrowRight size={17} />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 lg:gap-x-7">
              {savedProducts.map((product) => {
                const image =
                  product.colours?.[0]?.image ||
                  product.gallery?.[0] ||
                  '/placeholder.svg'

                return (
                  <article key={product.id} className="group min-w-0">
                    {/* IMAGE */}
                    <div className="relative aspect-[3/4] overflow-hidden rounded-md bg-muted">
                      <Link
                        to={`/product/${product.slug}`}
                        aria-label={`View ${product.name}`}
                      >
                        <img
                          src={image}
                          alt={product.name}
                          loading="lazy"
                          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                        />
                      </Link>

                      <button
                        type="button"
                        onClick={() => actions.toggleWishlist(product.id)}
                        aria-label={`Remove ${product.name} from wishlist`}
                        className="absolute right-3 top-3 flex size-10 items-center justify-center rounded-full bg-card/90 text-card-foreground shadow-md backdrop-blur transition-colors hover:bg-destructive hover:text-white"
                      >
                        <Trash2 size={16} />
                      </button>

                      {product.isNew && (
                        <span className="absolute bottom-3 left-3 rounded-sm bg-burgundy px-3 py-1.5 text-[9px] font-bold tracking-widest text-cream">
                          NEW ARRIVAL
                        </span>
                      )}
                    </div>

                    {/* PRODUCT DETAILS */}
                    <div className="pt-4">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-[9px] font-semibold tracking-widest text-primary uppercase">
                          {product.styleType}
                        </p>

                        <p className="text-[9px] text-muted-foreground">
                          {product.code}
                        </p>
                      </div>

                      <Link to={`/product/${product.slug}`}>
                        <h3 className="mt-2 text-sm font-semibold leading-6 text-foreground transition-colors hover:text-primary">
                          {product.name}
                        </h3>
                      </Link>

                      <p className="mt-1 text-xs text-muted-foreground">
                        {product.fabric} · {product.gsm} GSM
                      </p>

                      {/* COLOUR OPTIONS */}
                      <div className="mt-4 flex items-center gap-2">
                        {product.colours?.slice(0, 6).map((colour) => (
                          <span
                            key={colour.name}
                            title={colour.name}
                            className="size-4 rounded-full border border-border"
                            style={{
                              backgroundColor: colour.hex,
                            }}
                          />
                        ))}
                      </div>

                      <div className="mt-4 flex items-center justify-between gap-2 border-t border-border pt-4">
                        <p className="text-[10px] text-muted-foreground">
                          MOQ {product.moq} PCS
                        </p>

                        <Link
                          to={`/product/${product.slug}`}
                          className="inline-flex items-center gap-1 text-[10px] font-bold tracking-wider text-primary transition-colors hover:text-primary/80"
                        >
                          SELECT OPTIONS
                          <ArrowRight size={13} />
                        </Link>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* BRAND CONNECTION */}
      <section className="border-t border-border bg-muted/40 px-5 py-16 md:px-10">
        <div className="mx-auto max-w-[1450px]">
          <div className="mb-10 text-center">
            <p className="text-[10px] font-bold tracking-[0.25em] text-primary">
              BEYOND THE COLLECTION
            </p>

            <h2 className="mt-3 text-3xl font-bold text-foreground md:text-4xl">
              Discover Brothers Club
            </h2>

            <p className="mx-auto mt-3 max-w-lg text-sm leading-7 text-muted-foreground">
              Connect with our brand, explore our leadership
              and discover our manufacturing journey.
            </p>
          </div>

          {/* SOCIAL BUTTONS */}
          <div className="grid gap-4 sm:grid-cols-2">
            <a
              href={SOCIAL_LINKS.instagram}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between rounded-lg border border-border bg-card p-6 text-card-foreground transition-colors hover:border-primary hover:bg-accent/50"
            >
              <div className="flex items-center gap-4">
                <SiInstagram size={20} className="text-primary" />
                <div>
                  <h3 className="text-sm font-bold">Instagram</h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Follow our latest collections
                  </p>
                </div>
              </div>
              <ArrowRight size={19} className="text-muted-foreground" />
            </a>

            <a
              href={SOCIAL_LINKS.facebook}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between rounded-lg border border-border bg-card p-6 text-card-foreground transition-colors hover:border-primary hover:bg-accent/50"
            >
              <div className="flex items-center gap-4">
                <SiFacebook size={20} className="text-primary" />
                <div>
                  <h3 className="text-sm font-bold">Facebook</h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Stay connected with our brand
                  </p>
                </div>
              </div>
              <ArrowRight size={19} className="text-muted-foreground" />
            </a>
          </div>

          {/* BRAND GALLERY LINKS */}
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            <a
              href="/about#leadership-gallery"
              className="group relative flex min-h-52 flex-col justify-end overflow-hidden rounded-lg border border-cream/15 bg-burgundy p-7 text-cream transition-colors hover:bg-burgundy/95"
            >
              <UserRound size={28} className="mb-auto text-sage" />
              <p className="text-[10px] font-bold tracking-[0.2em] text-sage">
                LEADERSHIP
              </p>
              <h3 className="mt-2 text-2xl font-bold text-cream">
                CEO Gallery
              </h3>
              <p className="mt-2 text-xs text-cream/75">
                Discover the people and vision behind Brothers Club.
              </p>
              <ArrowRight className="absolute bottom-7 right-7 text-cream transition-transform group-hover:translate-x-1" />
            </a>

            <a
              href="/about#manufacturing-gallery"
              className="group relative flex min-h-52 flex-col justify-end overflow-hidden rounded-lg border border-cream/15 bg-burgundy p-7 text-cream transition-colors hover:bg-burgundy/95"
            >
              <Factory size={28} className="mb-auto text-sage" />
              <p className="text-[10px] font-bold tracking-[0.2em] text-sage">
                OUR PRODUCTION
              </p>
              <h3 className="mt-2 text-2xl font-bold text-cream">
                Manufacturing Gallery
              </h3>
              <p className="mt-2 text-xs text-cream/75">
                Explore our manufacturing and production journey in Tiruppur.
              </p>
              <ArrowRight className="absolute bottom-7 right-7 text-cream transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="border-t border-border bg-background px-5 py-12 text-center">
        <Package className="mx-auto mb-4 text-primary" size={27} />

        <h2 className="text-xl font-bold text-foreground">
          Manufacturer Direct. Quality Assured.
        </h2>

        <p className="mt-3 text-xs text-muted-foreground">
          Premium menswear manufacturing from Tiruppur, India.
        </p>

        <Link
          to="/shop"
          className="mt-7 inline-flex items-center gap-3 rounded-md border border-primary px-7 py-4 text-[10px] font-bold tracking-widest text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
        >
          EXPLORE ALL PRODUCTS
          <ArrowRight size={15} />
        </Link>
      </section>
    </main>
  )
}