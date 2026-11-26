// import { LazyLoadImage } from 'react-lazy-load-image-component';
// import 'react-lazy-load-image-component/src/effects/blur.css';
// import { Link } from 'react-router-dom'
// import { useState } from 'react'
// import { Heart } from 'lucide-react'
// import { actions, useHydrated, useStore } from '../../lib/store'
// import { cn } from '../../lib/utils'
// import { AvailabilityBadge } from './availability-badge'

// export function ProductCard({ product, priority = false }) {
//   const [active, setActive] = useState(0)
//   const hydrated = useHydrated()
//   const wished = useStore((s) => s.wishlist.includes(product.id)) && hydrated
//   const image = product.colours[active]?.image ?? product.gallery[0]
//   const hover = product.gallery[0]

//   return (
//     <article className="group flex flex-col">
//       <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-muted">
//         <Link href={`/product/${product.slug}`} className="absolute inset-0" aria-label={product.name}>
//           <LazyLoadImage
//             src={image || '/placeholder.svg'}
//             alt={`${product.name} in ${product.colours[active]?.name ?? ''}`}
//             fill
//             effect="blur" // Gives that nice smooth Next.js style loading
//             priority={priority}
//             sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw"
//             className={cn('object-cover transition-all duration-500 group-hover:scale-[1.03]', hover && 'group-hover:opacity-0')}
//           />
//           {hover && (
//             <LazyLoadImage
//               src={hover}
//               alt=""
//               effect="blur" // Gives that nice smooth Next.js style loading
//               fill
//               sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw"
//               className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
//             />
//           )}
//         </Link>
//         <div className="pointer-events-none absolute top-3 left-3 flex flex-col items-start gap-1.5">
//           {product.isNew && (
//             <span className="rounded-sm bg-background px-2 py-1 text-[0.62rem] font-semibold tracking-[0.14em] uppercase">New</span>
//           )}
//           {product.availability !== 'in-stock' && <AvailabilityBadge availability={product.availability} />}
//         </div>
//         <button
//           type="button"
//           onClick={() => actions.toggleWishlist(product.id)}
//           className="absolute top-3 right-3 inline-flex size-9 items-center justify-center rounded-full bg-background/90 transition-colors hover:bg-background"
//           aria-label={wished ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
//           aria-pressed={wished}
//         >
//           <Heart className={cn('size-4', wished && 'fill-foreground')} />
//         </button>
//       </div>
//       <div className="flex flex-col gap-1.5 pt-4">
//         <div className="flex items-center justify-between gap-2">
//           <p className="text-[0.66rem] font-semibold tracking-[0.16em] text-muted-foreground uppercase">{product.styleType}</p>
//           <p className="text-[0.66rem] font-medium tracking-wider text-muted-foreground tabular-nums">{product.code}</p>
//         </div>
//         <h3 className="text-[0.95rem] leading-snug font-semibold text-foreground">
//           <Link href={`/product/${product.slug}`} className="hover:underline hover:underline-offset-4">
//             {product.name}
//           </Link>
//         </h3>
//         <p className="text-xs text-muted-foreground">
//           {product.fabric} · {product.gsm} GSM
//         </p>
//         <div className="mt-1 flex items-center justify-between gap-3">
//           <div className="flex items-center gap-1.5" role="group" aria-label="Colours">
//             {product.colours.map((c, i) => (
//               <button
//                 key={c.name}
//                 type="button"
//                 onClick={() => setActive(i)}
//                 aria-label={`Show ${c.name}`}
//                 aria-pressed={active === i}
//                 className={cn(
//                   'size-4 rounded-full border border-border ring-offset-2 ring-offset-background transition-shadow',
//                   active === i && 'ring-1 ring-foreground',
//                 )}
//                 style={{ backgroundColor: c.hex }}
//               />
//             ))}
//           </div>
//           <p className="text-xs text-muted-foreground">
//             {product.sizes[0]}–{product.sizes[product.sizes.length - 1]} · MOQ {product.moq}
//           </p>
//         </div>
//       </div>
//     </article>
//   )
// }




import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import 'react-lazy-load-image-component/src/effects/blur.css';

import { actions, useHydrated, useStore } from '../../lib/store';
import { cn } from '../../lib/utils';
import { AvailabilityBadge } from './availability-badge';

export function ProductCard({ product, priority = false }) {
  const [active, setActive] = useState(0);

  const hydrated = useHydrated();

  const wished =
    useStore((s) => s.wishlist.includes(product.id)) && hydrated;

  // Product images
  const activeColour = product.colours?.[active];
  const image =
    activeColour?.image ||
    product.gallery?.[0] ||
    '/placeholder.svg';

  const hover = product.gallery?.[0];

  return (
    <article className="group flex flex-col">
      {/* Product Image */}
      <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-muted">

        <Link
          to={`/product/${product.slug}`}
          className="absolute inset-0"
          aria-label={product.name}
        >
          {/* Main Image */}
          <LazyLoadImage
            src={image}
            alt={`${product.name} in ${activeColour?.name ?? ''}`}
            effect={priority ? undefined : 'blur'}
            visibleByDefault={priority}
            wrapperClassName="absolute inset-0 h-full w-full"
            className={cn(
              'h-full w-full object-cover transition-all duration-500 group-hover:scale-[1.03]',
              hover && 'group-hover:opacity-0'
            )}
          />

          {/* Hover Image */}
          {hover && hover !== image && (
            <LazyLoadImage
              src={hover}
              alt=""
              effect="blur"
              wrapperClassName="absolute inset-0 h-full w-full"
              className="h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />
          )}
        </Link>

        {/* Product Labels */}
        <div className="pointer-events-none absolute top-3 left-3 flex flex-col items-start gap-1.5">
          {product.isNew && (
            <span className="rounded-sm bg-background px-2 py-1 text-[0.62rem] font-semibold tracking-[0.14em] uppercase">
              New
            </span>
          )}

          {product.availability !== 'in-stock' && (
            <AvailabilityBadge availability={product.availability} />
          )}
        </div>

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={() => actions.toggleWishlist(product.id)}
          className="absolute top-3 right-3 inline-flex size-9 items-center justify-center rounded-full bg-background/90 transition-colors hover:bg-background"
          aria-label={
            wished
              ? `Remove ${product.name} from wishlist`
              : `Add ${product.name} to wishlist`
          }
          aria-pressed={wished}
        >
          <Heart
            className={cn(
              'size-4 transition-colors',
              wished && 'fill-foreground'
            )}
          />
        </button>
      </div>

      {/* Product Information */}
      <div className="flex flex-col gap-1.5 pt-4">

        <div className="flex items-center justify-between gap-2">
          <p className="text-[0.66rem] font-semibold tracking-[0.16em] text-muted-foreground uppercase">
            {product.styleType}
          </p>

          <p className="text-[0.66rem] font-medium tracking-wider text-muted-foreground tabular-nums">
            {product.code}
          </p>
        </div>

        {/* Product Name */}
        <h3 className="text-[0.95rem] leading-snug font-semibold text-foreground">
          <Link
            to={`/product/${product.slug}`}
            className="hover:underline hover:underline-offset-4"
          >
            {product.name}
          </Link>
        </h3>

        {/* Fabric Details */}
        <p className="text-xs text-muted-foreground">
          {product.fabric} · {product.gsm} GSM
        </p>

        {/* Colours and Sizes */}
        <div className="mt-1 flex items-center justify-between gap-3">

          <div
            className="flex items-center gap-1.5"
            role="group"
            aria-label="Colours"
          >
            {product.colours?.map((c, i) => (
              <button
                key={c.name}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Show ${c.name}`}
                aria-pressed={active === i}
                className={cn(
                  'size-4 rounded-full border border-border ring-offset-2 ring-offset-background transition-shadow',
                  active === i && 'ring-1 ring-foreground'
                )}
                style={{ backgroundColor: c.hex }}
              />
            ))}
          </div>

          <p className="text-xs text-muted-foreground">
            {product.sizes?.length > 0
              ? `${product.sizes[0]}–${product.sizes[product.sizes.length - 1]}`
              : 'Sizes unavailable'}
            {' · '}MOQ {product.moq}
          </p>

        </div>
      </div>
    </article>
  );
}
