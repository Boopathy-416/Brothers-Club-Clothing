// import { Link } from 'react-router-dom'
// import { Mail, MapPin, MessageCircle } from 'lucide-react'
// import { Logo } from '../brand/logo'
// import { CATEGORIES, SITE } from '../../lib/site'
// import { waLink } from '../../lib/wholesale'

// export function SiteFooter() {
//   return (
//     <footer className="bg-white boder-t border-1  border-gray/50 ">
//       <div className="mx-auto grid max-w-[1440px] gap-12 px-4 py-16 md:grid-cols-2 md:px-8 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:py-20">
//         <div className="flex flex-col gap-5">
//           <Logo inverted />
//           <p className="max-w-sm text-sm leading-relaxed text-black/60">
//             Premium men&apos;s wear manufacturing, wholesale collections, bulk supply and retailer partnerships direct from
//             our factory in Tiruppur.
//           </p>
//         </div>
//         <div>
//           <h2 className="text-[0.7rem] font-semibold tracking-[0.2em] text-blue-800  uppercase">Collections</h2>
//           <ul className="mt-5 flex flex-col gap-3 text-sm">
//             {CATEGORIES.map((c) => (
//               <li key={c.slug}>
//                 <Link to={`/collections/${c.slug}`} className="text-black/80 transition-colors hover:text-black">
//                   {c.name}
//                 </Link>
//               </li>
//             ))}
//             <li>
//               <Link to="/shop" className="text-black/80 transition-colors hover:text-black">
//                 Shop all
//               </Link>
//             </li>
//           </ul>
//         </div>
//         <div>
//           <h2 className="text-[0.7rem] font-semibold tracking-[0.2em] text-blue-800 uppercase">Retailers</h2>
//           <ul className="mt-5 flex flex-col gap-3 text-sm">
//             {[
//               ['/register', 'Become a retailer'],
//               ['/login', 'Retailer login'],
//               ['/account/enquiries', 'My enquiries'],
//               ['/cart', 'Enquiry cart'],
//               ['/about', 'About Winstar Tex'],
//               ['/admin', 'Staff login'],
//             ].map(([href, label]) => (
//               <li key={href}>
//                 <Link to={href} className="text-black/80 transition-colors hover:text-black">
//                   {label}
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         </div>
//         <div>
//           <h2 className="text-[0.7rem] font-semibold tracking-[0.2em] text-blue-800 uppercase">Contact</h2>
//           <ul className="mt-5 flex flex-col gap-4 text-sm text-black/80">
//             <li className="flex gap-3">
//               <MapPin className="mt-0.5 size-4 shrink-0 text-black/50" aria-hidden />
//               <span>
//                 {SITE.manufacturer}
//                 <br />
//                 {SITE.address}
//               </span>
//             </li>
//             <li>
//               <a href={waLink(SITE.whatsappNumber)} target="_blank" rel="noreferrer" className="flex gap-3 hover:text-black">
//                 <MessageCircle className="size-4 shrink-0 text-black/50" aria-hidden />
//                 WhatsApp {SITE.whatsappDisplay}
//               </a>
//             </li>
//             <li>
//               <a href={`mailto:${SITE.email}`} className="flex gap-3 hover:text-black">
//                 <Mail className="size-4 shrink-0 text-black/50" aria-hidden />
//                 {SITE.email}
//               </a>
//             </li>
//           </ul>
//         </div>
//       </div>
//       <div className="border-t border-white/10">
//         <div className="mx-auto flex max-w-[1440px] flex-col gap-2 px-4 py-6 text-xs text-white/50 md:flex-row md:items-center md:justify-between md:px-8">
//           <p>© 2026 Brothers Club Clothing. Manufactured by Winstar Tex, Tiruppur.</p>
//           <p>Wholesale enquiries only · Prices shared on quotation</p>
//         </div>
//       </div>
//     </footer>
//   )
// }



import { Link } from 'react-router-dom'
import { Mail, MapPin, MessageCircle } from 'lucide-react'
import { Logo } from '../brand/logo'
import { CATEGORIES, SITE } from '../../lib/site'
import { waLink } from '../../lib/wholesale'

export function SiteFooter() {
  return (
    <footer className="border-t border-cream/15 bg-burgundy text-cream">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-4 py-16 md:grid-cols-2 md:px-8 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:py-20">
        <div className="flex flex-col gap-5">
          <Logo inverted />
          <p className="max-w-sm text-sm leading-relaxed text-cream/75">
            Premium men's wear manufacturing, wholesale collections, bulk supply and retailer partnerships direct from
            our factory in Tiruppur.
          </p>
        </div>

        <div>
          <h2 className="text-[0.7rem] font-semibold tracking-[0.2em] text-sage uppercase">Collections</h2>
          <ul className="mt-5 flex flex-col gap-3 text-sm">
            {CATEGORIES.map((c) => (
              <li key={c.slug}>
                <Link to={`/collections/${c.slug}`} className="text-cream/85 transition-colors hover:text-white">
                  {c.name}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/shop" className="text-cream/85 transition-colors hover:text-white">
                Shop all
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-[0.7rem] font-semibold tracking-[0.2em] text-sage uppercase">Retailers</h2>
          <ul className="mt-5 flex flex-col gap-3 text-sm">
            {[
              // ['/register', 'Become a retailer'],
              // ['/login', 'Retailer login'],
              // ['/account/enquiries', 'My enquiries'],
              ['/cart', 'Enquiry cart'],
              ['/about', 'About Winstar Tex'],
              // ['/admin', 'Staff login'],
            ].map(([href, label]) => (
              <li key={href}>
                <Link to={href} className="text-cream/85 transition-colors hover:text-white">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-[0.7rem] font-semibold tracking-[0.2em] text-sage uppercase">Contact</h2>
          <ul className="mt-5 flex flex-col gap-4 text-sm text-cream/85">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-sage" aria-hidden />
              <span>
                {SITE.manufacturer}
                <br />
                {SITE.address}
              </span>
            </li>
            <li>
              <a
                href={waLink(SITE.whatsappNumber)}
                target="_blank"
                rel="noreferrer"
                className="flex gap-3 transition-colors hover:text-white"
              >
                <MessageCircle className="size-4 shrink-0 text-sage" aria-hidden />
                WhatsApp {SITE.whatsappDisplay}
              </a>
            </li>
            <li>
              <a href={`mailto:${SITE.email}`} className="flex gap-3 transition-colors hover:text-white">
                <Mail className="size-4 shrink-0 text-sage" aria-hidden />
                {SITE.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-cream/15">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-2 px-4 py-6 text-xs text-cream/60 md:flex-row md:items-center md:justify-between md:px-8">
          <p>© 2026 Brothers Club Clothing. Manufactured by Winstar Tex, Tiruppur.</p>
          <p>Wholesale enquiries only · Prices shared on quotation</p>
        </div>
      </div>
    </footer>
  )
}