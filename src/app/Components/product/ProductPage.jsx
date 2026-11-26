
// import { useEffect, useState } from 'react'
// import { Link, Navigate, useParams } from 'react-router-dom'

// import { useStore } from '../../../lib/store'

// import { ProductGallery } from '../../../components/product/product-gallery'
// import { ProductSpecs } from '../../../components/product/product-specs'
// import { QuantityMatrix } from '../../../components/product/quantity-matrix'
// import { RetailerCta } from '../../../components/product/product-detail'

// const AVAILABILITY = {
//   'in-stock': 'In Stock',
//   'low-stock': 'Low Stock',
//   'made-to-order': 'Made to Order',
//   'out-of-stock': 'Out of Stock',
// }

// export default function ProductPage() {
//   const { slug } = useParams()

//   // Get product from the existing store
//   const product = useStore((s) =>
//     s.products.find((p) => p.slug === slug)
//   )

//   const [activeColour, setActiveColour] = useState(0)

//   // Reset selected colour when navigating between products
//   useEffect(() => {
//     setActiveColour(0)
//   }, [slug])

//   if (!product) {
//     return <Navigate to="/shop" replace />
//   }

//   // Convert catalogue image strings into gallery objects
//   const imageSources = [
//     ...(product.colours || []).map((colour) => colour.image),
//     ...(product.gallery || []),
//   ].filter(Boolean)

//   const images = [
//     ...new Set(imageSources),
//   ].map((src, index) => ({
//     src,
//     alt: `${product.name} - Product view ${index + 1}`,
//   }))

//   // Selected colour image
//   const activeSrc =
//     product.colours?.[activeColour]?.image ||
//     images[0]?.src ||
//     '/placeholder.svg'

//   const sizes = product.sizes || []

//   return (
//     <main className="dark min-h-screen bg-[#090909] text-white">

//       {/* Breadcrumb */}
//       <div className="mx-auto max-w-[1600px] px-5 pt-8 md:px-10 lg:px-14">

//         <nav
//           aria-label="Breadcrumb"
//           className="mb-8 flex flex-wrap items-center gap-3 text-sm text-white/50"
//         >
//           <Link to="/" className="transition-colors hover:text-white">
//             Home
//           </Link>

//           <span>›</span>

//           <Link to="/shop" className="transition-colors hover:text-white">
//             Shop
//           </Link>

//           <span>›</span>

//           <Link
//             to={`/shop?q=${encodeURIComponent(product.category)}`}
//             className="capitalize transition-colors hover:text-white"
//           >
//             {product.category.replaceAll('-', ' ')}
//           </Link>

//           <span>›</span>

//           <span className="font-medium text-white">
//             {product.name}
//           </span>
//         </nav>

//         {/* Product Layout */}
//         <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16 xl:gap-20">

//           {/* LEFT - Product Gallery */}
//           <div className="min-w-0">

//             <ProductGallery
//               images={images}
//               activeSrc={activeSrc}
//             />

//           </div>

//           {/* RIGHT - Product Information */}
//           <div className="flex min-w-0 flex-col gap-7">

//             {/* Product Heading */}
//             <div className="flex flex-col gap-4">

//               <div className="flex flex-wrap items-center gap-3">

//                 <p className="text-xs font-semibold tracking-[0.22em] text-white/60 uppercase">
//                   {product.styleType}
//                 </p>

//                 <span
//                   className={`rounded-md px-3 py-1.5 text-[0.65rem] font-semibold tracking-wider uppercase ${
//                     product.availability === 'in-stock'
//                       ? 'bg-emerald-500/10 text-emerald-400'
//                       : product.availability === 'out-of-stock'
//                         ? 'bg-red-500/10 text-red-400'
//                         : 'bg-amber-500/10 text-amber-400'
//                   }`}
//                 >
//                   ● {AVAILABILITY[product.availability] || 'Available'}
//                 </span>

//               </div>

//               <h1 className="text-3xl leading-tight font-bold tracking-tight md:text-4xl xl:text-5xl">
//                 {product.name}
//               </h1>

//               <p className="text-sm text-white/60">
//                 Product code{' '}
//                 <span className="font-semibold text-white">
//                   {product.code}
//                 </span>
//               </p>

//               <p className="max-w-2xl text-base leading-8 text-white/65">
//                 {product.description}
//               </p>

//             </div>

//             {/* Product Specifications */}
//             <div className="grid grid-cols-2 overflow-hidden rounded-lg border border-white/15 sm:grid-cols-4">

//               <div className="border-r border-b border-white/10 p-4 sm:border-b-0">
//                 <p className="mb-2 text-[0.65rem] font-semibold tracking-[0.15em] text-white/50 uppercase">
//                   Fabric
//                 </p>

//                 <p className="text-sm leading-6 font-semibold">
//                   {product.fabric}
//                 </p>
//               </div>

//               <div className="border-b border-white/10 p-4 sm:border-r sm:border-b-0">
//                 <p className="mb-2 text-[0.65rem] font-semibold tracking-[0.15em] text-white/50 uppercase">
//                   GSM
//                 </p>

//                 <p className="text-sm font-semibold">
//                   {product.gsm}
//                 </p>
//               </div>

//               <div className="border-r border-white/10 p-4">
//                 <p className="mb-2 text-[0.65rem] font-semibold tracking-[0.15em] text-white/50 uppercase">
//                   Sizes
//                 </p>

//                 <p className="text-sm font-semibold">
//                   {sizes.length > 0
//                     ? `${sizes[0]}–${sizes[sizes.length - 1]}`
//                     : 'Contact sales'}
//                 </p>
//               </div>

//               <div className="p-4">
//                 <p className="mb-2 text-[0.65rem] font-semibold tracking-[0.15em] text-white/50 uppercase">
//                   MOQ
//                 </p>

//                 <p className="text-sm font-semibold">
//                   {product.moq} Pieces
//                 </p>
//               </div>

//             </div>

//             {/* Quantity Matrix */}
//             <div className="border-t border-white/10 pt-7">

//               <QuantityMatrix
//                 product={product}
//                 activeColour={activeColour}
//                 onColourChange={setActiveColour}
//               />

//             </div>

//             {/* Product Details */}
//             <div className="border-t border-white/10 pt-5">

//               <ProductSpecs product={product} />

//             </div>

//             {/* Manufacturer Information */}
//             <div className="flex flex-col gap-3 border-t border-white/10 pt-6">

//               <p className="text-xs font-semibold tracking-[0.17em] text-white/70 uppercase">
//                 Manufacturer Information
//               </p>

//               <p className="text-sm leading-7 text-white/55">
//                 Manufactured by Brothers Club Clothing, powered by
//                 Winstar Tex, Tiruppur, Tamil Nadu.
//                 Manufacturer-direct wholesale supply with
//                 pan-India dispatch.
//               </p>

//             </div>

//           </div>

//         </div>

//       </div>

//       {/* Retailer Partnership */}
//       <div className="mt-20 border-t border-white/10">
//         <RetailerCta />
//       </div>

//     </main>
//   )
// }


import { useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'

import { useStore } from '../../../lib/store'

import { ProductGallery } from '../../../components/product/product-gallery'
import { ProductSpecs } from '../../../components/product/product-specs'
import { QuantityMatrix } from '../../../components/product/quantity-matrix'
import { RetailerCta } from '../../../components/product/product-detail'

const AVAILABILITY = {
  'in-stock': 'In Stock',
  'low-stock': 'Low Stock',
  'made-to-order': 'Made to Order',
  'out-of-stock': 'Out of Stock',
}

export default function ProductPage() {
  const { slug } = useParams()

  // Get product from the existing store
  const product = useStore((s) =>
    s.products.find((p) => p.slug === slug)
  )

  const [activeColour, setActiveColour] = useState(0)

  // Reset selected colour when navigating between products
  useEffect(() => {
    setActiveColour(0)
  }, [slug])

  if (!product) {
    return <Navigate to="/shop" replace />
  }

  // Convert catalogue image strings into gallery objects
  const imageSources = [
    ...(product.colours || []).map((colour) => colour.image),
    ...(product.gallery || []),
  ].filter(Boolean)

  const images = [
    ...new Set(imageSources),
  ].map((src, index) => ({
    src,
    alt: `${product.name} - Product view ${index + 1}`,
  }))

  // Selected colour image
  const activeSrc =
    product.colours?.[activeColour]?.image ||
    images[0]?.src ||
    '/placeholder.svg'

  const sizes = product.sizes || []

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Breadcrumb */}
      <div className="mx-auto max-w-[1600px] px-5 pt-8 md:px-10 lg:px-14">
        <nav
          aria-label="Breadcrumb"
          className="mb-8 flex flex-wrap items-center gap-3 text-sm text-muted-foreground"
        >
          <Link to="/" className="transition-colors hover:text-primary">
            Home
          </Link>

          <span>›</span>

          <Link to="/shop" className="transition-colors hover:text-primary">
            Shop
          </Link>

          <span>›</span>

          <Link
            to={`/shop?q=${encodeURIComponent(product.category)}`}
            className="capitalize transition-colors hover:text-primary"
          >
            {product.category.replaceAll('-', ' ')}
          </Link>

          <span>›</span>

          <span className="font-medium text-foreground">
            {product.name}
          </span>
        </nav>

        {/* Product Layout */}
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16 xl:gap-20">
          {/* LEFT - Product Gallery */}
          <div className="min-w-0">
            <ProductGallery
              images={images}
              activeSrc={activeSrc}
            />
          </div>

          {/* RIGHT - Product Information */}
          <div className="flex min-w-0 flex-col gap-7">
            {/* Product Heading */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap items-center gap-3">
                <p className="text-xs font-semibold tracking-[0.22em] text-primary uppercase">
                  {product.styleType}
                </p>

                <span
                  className={`rounded-md px-3 py-1.5 text-[0.65rem] font-semibold tracking-wider uppercase ${
                    product.availability === 'in-stock'
                      ? 'bg-success/15 text-success'
                      : product.availability === 'out-of-stock'
                        ? 'bg-destructive/15 text-destructive'
                        : 'bg-accent text-accent-foreground'
                  }`}
                >
                  ● {AVAILABILITY[product.availability] || 'Available'}
                </span>
              </div>

              <h1 className="text-3xl leading-tight font-bold tracking-tight text-foreground md:text-4xl xl:text-5xl">
                {product.name}
              </h1>

              <p className="text-sm text-muted-foreground">
                Product code{' '}
                <span className="font-semibold text-foreground">
                  {product.code}
                </span>
              </p>

              <p className="max-w-2xl text-base leading-8 text-muted-foreground">
                {product.description}
              </p>
            </div>

            {/* Product Specifications */}
            <div className="grid grid-cols-2 overflow-hidden rounded-lg border border-border bg-card sm:grid-cols-4">
              <div className="border-r border-b border-border p-4 sm:border-b-0">
                <p className="mb-2 text-[0.65rem] font-semibold tracking-[0.15em] text-muted-foreground uppercase">
                  Fabric
                </p>

                <p className="text-sm leading-6 font-semibold text-card-foreground">
                  {product.fabric}
                </p>
              </div>

              <div className="border-b border-border p-4 sm:border-r sm:border-b-0">
                <p className="mb-2 text-[0.65rem] font-semibold tracking-[0.15em] text-muted-foreground uppercase">
                  GSM
                </p>

                <p className="text-sm font-semibold text-card-foreground">
                  {product.gsm}
                </p>
              </div>

              <div className="border-r border-border p-4">
                <p className="mb-2 text-[0.65rem] font-semibold tracking-[0.15em] text-muted-foreground uppercase">
                  Sizes
                </p>

                <p className="text-sm font-semibold text-card-foreground">
                  {sizes.length > 0
                    ? `${sizes[0]}–${sizes[sizes.length - 1]}`
                    : 'Contact sales'}
                </p>
              </div>

              <div className="p-4">
                <p className="mb-2 text-[0.65rem] font-semibold tracking-[0.15em] text-muted-foreground uppercase">
                  MOQ
                </p>

                <p className="text-sm font-semibold text-card-foreground">
                  {product.moq} Pieces
                </p>
              </div>
            </div>

            {/* Quantity Matrix */}
            <div className="border-t border-border pt-7">
              <QuantityMatrix
                product={product}
                activeColour={activeColour}
                onColourChange={setActiveColour}
              />
            </div>

            {/* Product Details */}
            <div className="border-t border-border pt-5">
              <ProductSpecs product={product} />
            </div>

            {/* Manufacturer Information */}
            <div className="flex flex-col gap-3 border-t border-border pt-6">
              <p className="text-xs font-semibold tracking-[0.17em] text-primary uppercase">
                Manufacturer Information
              </p>

              <p className="text-sm leading-7 text-muted-foreground">
                Manufactured by Brothers Club Clothing, powered by
                Winstar Tex, Tiruppur, Tamil Nadu.
                Manufacturer-direct wholesale supply with
                pan-India dispatch.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Retailer Partnership */}
      <div className="mt-20 border-t border-border">
        <RetailerCta />
      </div>
    </main>
  )
}