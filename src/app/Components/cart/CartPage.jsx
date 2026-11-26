
// import { Link } from 'react-router-dom'
// import {
//   ShoppingBag,
//   Trash2,
//   Plus,
//   Minus,
//   MessageCircle,
//   ArrowLeft,
//   Package,
// } from 'lucide-react'

// import { useStore, actions } from '../../../lib/store'
// import { waLink, nf } from '../../../lib/wholesale'

// export default function CartPage() {
//   const cart = useStore((s) => s.cart)
//   const products = useStore((s) => s.products)
//   const whatsapp = useStore((s) => s.settings.whatsappNumber)

//   const items = cart
//     .map((line) => {
//       const product = products.find(
//         (p) => p.id === line.productId
//       )

//       return product ? { ...line, product } : null
//     })
//     .filter(Boolean)

//   const totalPieces = items.reduce(
//     (total, item) => total + item.qty,
//     0
//   )

//   const uniqueProducts = new Set(
//     items.map((item) => item.productId)
//   ).size

//   function updateQuantity(item, amount) {
//     actions.updateLineQty(
//       item,
//       item.qty + amount
//     )
//   }

//   function removeItem(item) {
//     actions.removeLine(item)
//   }

//   function sendWhatsApp() {
//     const message = [
//       'Hello Brothers Club Clothing,',
//       '',
//       'I would like to enquire about the following wholesale products.',
//       '',
//       ...items.map((item, index) => [
//         `${index + 1}. ${item.product.name}`,
//         `Product Code: ${item.product.code}`,
//         `Colour: ${item.colour}`,
//         `Size: ${item.size}`,
//         `Quantity: ${item.qty} pcs`,
//         '',
//       ].join('\n')),
//       `Total Products: ${uniqueProducts}`,
//       `Total Pieces: ${totalPieces}`,
//       '',
//       'Please share your wholesale quotation and availability.',
//       '',
//       'Thank you.',
//     ].join('\n')

//     window.open(
//       waLink(whatsapp, message),
//       '_blank',
//       'noopener,noreferrer'
//     )
//   }

//   // Empty cart
//   if (items.length === 0) {
//     return (
//       <section className="min-h-[75vh] bg-[#f6f5f2] px-4 py-20">
//         <div className="mx-auto flex max-w-xl flex-col items-center text-center">

//           <div className="mb-8 flex size-24 items-center justify-center rounded-full bg-neutral-200">
//             <ShoppingBag size={34} strokeWidth={1.5} />
//           </div>

//           <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-neutral-500">
//             BROTHERS CLUB CLOTHING
//           </p>

//           <h1 className="text-4xl font-bold tracking-tight text-black md:text-5xl">
//             Your bag is empty.
//           </h1>

//           <p className="mt-5 max-w-md text-sm leading-7 text-neutral-500">
//             Discover our premium menswear collection and
//             select your products to create a wholesale enquiry.
//           </p>

//           <Link
//             to="/shop"
//             className="mt-10 inline-flex h-14 items-center gap-4 bg-black px-9 text-xs font-bold tracking-widest text-white transition hover:bg-neutral-800"
//           >
//             EXPLORE COLLECTION
//             <ArrowLeft className="size-4 rotate-180" />
//           </Link>

//         </div>
//       </section>
//     )
//   }

//   return (
//     <section className="min-h-screen bg-[#f6f5f2] px-4 py-12 md:px-8 lg:py-20">

//       <div className="mx-auto max-w-[1350px]">

//         {/* Header */}
//         <div className="mb-10 border-b border-neutral-300 pb-8">

//           <Link
//             to="/shop"
//             className="mb-8 inline-flex items-center gap-2 text-xs font-medium tracking-wider text-neutral-500 hover:text-black"
//           >
//             <ArrowLeft size={15} />
//             CONTINUE SHOPPING
//           </Link>

//           <div className="flex flex-wrap items-end justify-between gap-5">

//             <div>
//               <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-neutral-500">
//                 WHOLESALE ORDER MANAGEMENT
//               </p>

//               <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
//                 Your Enquiry Cart
//               </h1>

//               <p className="mt-3 text-sm text-neutral-500">
//                 Review your selected styles, colours and sizes.
//               </p>
//             </div>

//             <button
//               onClick={() => actions.clearCart()}
//               className="flex items-center gap-2 text-xs font-semibold tracking-wider text-red-600 hover:text-red-800"
//             >
//               <Trash2 size={15} />
//               CLEAR ALL
//             </button>

//           </div>
//         </div>

//         <div className="grid items-start gap-10 lg:grid-cols-[1fr_350px]">

//           {/* Cart Items */}
//           <div className="flex flex-col gap-5">

//             <div className="flex items-center justify-between">
//               <h2 className="text-sm font-bold tracking-wider uppercase">
//                 Selected Products
//               </h2>

//               <span className="text-xs text-neutral-500">
//                 {items.length} selected lines
//               </span>
//             </div>

//             {items.map((item, index) => (
//               <article
//                 key={`${item.productId}-${item.colour}-${item.size}`}
//                 className="border border-neutral-200 bg-white p-4 md:p-6"
//               >

//                 <div className="flex gap-4 md:gap-6">

//                   {/* Product Image */}
//                   <div className="size-24 shrink-0 overflow-hidden bg-neutral-100 md:size-32">
//                     <img
//                       src={
//                         item.product.colours.find(
//                           (c) => c.name === item.colour
//                         )?.image ||
//                         item.product.gallery?.[0] ||
//                         '/placeholder.svg'
//                       }
//                       alt={item.product.name}
//                       className="h-full w-full object-cover"
//                     />
//                   </div>

//                   {/* Product Details */}
//                   <div className="min-w-0 flex-1">

//                     <div className="flex justify-between gap-3">

//                       <div>
//                         <p className="text-[10px] font-semibold tracking-widest text-neutral-400">
//                           {item.product.code}
//                         </p>

//                         <h3 className="mt-2 text-sm font-bold md:text-base">
//                           {item.product.name}
//                         </h3>

//                         <p className="mt-1 text-xs text-neutral-500">
//                           {item.product.fabric}
//                         </p>
//                       </div>

//                       <button
//                         onClick={() => removeItem(item)}
//                         aria-label={`Remove ${item.product.name}`}
//                         className="h-fit text-neutral-400 transition hover:text-red-600"
//                       >
//                         <Trash2 size={18} />
//                       </button>

//                     </div>

//                     <div className="mt-5 flex flex-wrap items-center justify-between gap-4">

//                       <div className="flex flex-wrap gap-2 text-xs">

//                         <span className="border border-neutral-200 px-3 py-2">
//                           {item.colour}
//                         </span>

//                         <span className="border border-neutral-200 px-3 py-2">
//                           Size: {item.size}
//                         </span>

//                       </div>

//                       {/* Quantity Controls */}
//                       <div className="flex h-9 items-center border border-neutral-300">

//                         <button
//                           onClick={() => updateQuantity(item, -1)}
//                           aria-label="Decrease quantity"
//                           className="flex size-9 items-center justify-center hover:bg-neutral-100"
//                         >
//                           <Minus size={14} />
//                         </button>

//                         <span className="min-w-10 text-center text-sm font-semibold tabular-nums">
//                           {item.qty}
//                         </span>

//                         <button
//                           onClick={() => updateQuantity(item, 1)}
//                           aria-label="Increase quantity"
//                           className="flex size-9 items-center justify-center hover:bg-neutral-100"
//                         >
//                           <Plus size={14} />
//                         </button>

//                       </div>

//                     </div>

//                   </div>
//                 </div>
//               </article>
//             ))}

//           </div>

//           {/* Summary */}
//           <aside className="sticky top-28 border border-neutral-200 bg-white p-6 md:p-8">

//             <h2 className="text-lg font-bold">
//               Enquiry Summary
//             </h2>

//             <div className="my-6 space-y-5 border-y border-neutral-200 py-6">

//               <div className="flex justify-between text-sm">
//                 <span className="text-neutral-500">
//                   Unique products
//                 </span>
//                 <span className="font-semibold">
//                   {uniqueProducts}
//                 </span>
//               </div>

//               <div className="flex justify-between text-sm">
//                 <span className="text-neutral-500">
//                   Total selected lines
//                 </span>
//                 <span className="font-semibold">
//                   {items.length}
//                 </span>
//               </div>

//               <div className="flex justify-between text-sm">
//                 <span className="text-neutral-500">
//                   Total quantities
//                 </span>
//                 <span className="font-bold">
//                   {nf.format(totalPieces)} pcs
//                 </span>
//               </div>

//             </div>

//             <div className="mb-6 bg-neutral-100 p-4">

//               <div className="flex items-center gap-2">
//                 <Package size={17} />

//                 <p className="text-xs font-bold tracking-wide">
//                   WHOLESALE ENQUIRY
//                 </p>
//               </div>

//               <p className="mt-3 text-xs leading-6 text-neutral-500">
//                 No online payment required. Our sales team
//                 will confirm MOQ, stock, pricing and delivery.
//               </p>

//             </div>

//             <button
//               onClick={sendWhatsApp}
//               className="flex h-14 w-full items-center justify-center gap-3 bg-black px-5 text-xs font-bold tracking-widest text-white transition hover:bg-neutral-800"
//             >
//               <MessageCircle size={19} />
//               SEND ALL TO WHATSAPP
//             </button>

//             <p className="mt-4 text-center text-[11px] leading-5 text-neutral-400">
//               Your complete product selection will be
//               included in one WhatsApp enquiry.
//             </p>

//           </aside>

//         </div>
//       </div>
//     </section>
//   )
// }


import { Link } from 'react-router-dom'
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  MessageCircle,
  ArrowLeft,
  Package,
} from 'lucide-react'

import { useStore, actions } from '../../../lib/store'
import { waLink, nf } from '../../../lib/wholesale'

export default function CartPage() {
  const cart = useStore((s) => s.cart)
  const products = useStore((s) => s.products)
  const whatsapp = useStore((s) => s.settings.whatsappNumber)

  const items = cart
    .map((line) => {
      const product = products.find(
        (p) => p.id === line.productId
      )

      return product ? { ...line, product } : null
    })
    .filter(Boolean)

  const totalPieces = items.reduce(
    (total, item) => total + item.qty,
    0
  )

  const uniqueProducts = new Set(
    items.map((item) => item.productId)
  ).size

  function updateQuantity(item, amount) {
    actions.updateLineQty(
      item,
      item.qty + amount
    )
  }

  function removeItem(item) {
    actions.removeLine(item)
  }

  function sendWhatsApp() {
    const message = [
      'Hello Brothers Club Clothing,',
      '',
      'I would like to enquire about the following wholesale products.',
      '',
      ...items.map((item, index) => [
        `${index + 1}. ${item.product.name}`,
        `Product Code: ${item.product.code}`,
        `Colour: ${item.colour}`,
        `Size: ${item.size}`,
        `Quantity: ${item.qty} pcs`,
        '',
      ].join('\n')),
      `Total Products: ${uniqueProducts}`,
      `Total Pieces: ${totalPieces}`,
      '',
      'Please share your wholesale quotation and availability.',
      '',
      'Thank you.',
    ].join('\n')

    window.open(
      waLink(whatsapp, message),
      '_blank',
      'noopener,noreferrer'
    )
  }

  // Empty cart
  if (items.length === 0) {
    return (
      <section className="min-h-[75vh] bg-background px-4 py-20 text-foreground">
        <div className="mx-auto flex max-w-xl flex-col items-center text-center">
          <div className="mb-8 flex size-24 items-center justify-center rounded-full bg-accent text-accent-foreground">
            <ShoppingBag size={34} strokeWidth={1.5} />
          </div>

          <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-primary uppercase">
            BROTHERS CLUB CLOTHING
          </p>

          <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            Your bag is empty.
          </h1>

          <p className="mt-5 max-w-md text-sm leading-7 text-muted-foreground">
            Discover our premium menswear collection and
            select your products to create a wholesale enquiry.
          </p>

          <Link
            to="/shop"
            className="mt-10 inline-flex h-14 items-center gap-4 rounded-md bg-primary px-9 text-xs font-bold tracking-widest text-primary-foreground transition-colors hover:bg-primary/90"
          >
            EXPLORE COLLECTION
            <ArrowLeft className="size-4 rotate-180" />
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="min-h-screen bg-background px-4 py-12 text-foreground md:px-8 lg:py-20">
      <div className="mx-auto max-w-[1350px]">
        {/* Header */}
        <div className="mb-10 border-b border-border pb-8">
          <Link
            to="/shop"
            className="mb-8 inline-flex items-center gap-2 text-xs font-medium tracking-wider text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft size={15} />
            CONTINUE SHOPPING
          </Link>

          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-primary uppercase">
                WHOLESALE ORDER MANAGEMENT
              </p>

              <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                Your Enquiry Cart
              </h1>

              <p className="mt-3 text-sm text-muted-foreground">
                Review your selected styles, colours and sizes.
              </p>
            </div>

            <button
              onClick={() => actions.clearCart()}
              className="flex items-center gap-2 text-xs font-semibold tracking-wider text-destructive transition-colors hover:text-destructive/80"
            >
              <Trash2 size={15} />
              CLEAR ALL
            </button>
          </div>
        </div>

        <div className="grid items-start gap-10 lg:grid-cols-[1fr_350px]">
          {/* Cart Items */}
          <div className="flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold tracking-wider text-foreground uppercase">
                Selected Products
              </h2>

              <span className="text-xs text-muted-foreground">
                {items.length} selected lines
              </span>
            </div>

            {items.map((item) => (
              <article
                key={`${item.productId}-${item.colour}-${item.size}`}
                className="rounded-lg border border-border bg-card p-4 text-card-foreground md:p-6"
              >
                <div className="flex gap-4 md:gap-6">
                  {/* Product Image */}
                  <div className="size-24 shrink-0 overflow-hidden rounded-md bg-muted md:size-32">
                    <img
                      src={
                        item.product.colours?.find(
                          (c) => c.name === item.colour
                        )?.image ||
                        item.product.gallery?.[0] ||
                        '/placeholder.svg'
                      }
                      alt={item.product.name}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="min-w-0 flex-1">
                    <div className="flex justify-between gap-3">
                      <div>
                        <p className="text-[10px] font-semibold tracking-widest text-muted-foreground uppercase">
                          {item.product.code}
                        </p>

                        <h3 className="mt-2 text-sm font-bold text-card-foreground md:text-base">
                          {item.product.name}
                        </h3>

                        <p className="mt-1 text-xs text-muted-foreground">
                          {item.product.fabric}
                        </p>
                      </div>

                      <button
                        onClick={() => removeItem(item)}
                        aria-label={`Remove ${item.product.name}`}
                        className="h-fit text-muted-foreground transition-colors hover:text-destructive"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>

                    <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
                      <div className="flex flex-wrap gap-2 text-xs">
                        <span className="rounded-md border border-border bg-muted/60 px-3 py-1.5 text-foreground">
                          {item.colour}
                        </span>

                        <span className="rounded-md border border-border bg-muted/60 px-3 py-1.5 text-foreground">
                          Size: {item.size}
                        </span>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex h-9 items-center overflow-hidden rounded-md border border-border bg-background">
                        <button
                          onClick={() => updateQuantity(item, -1)}
                          aria-label="Decrease quantity"
                          className="flex size-9 items-center justify-center text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                        >
                          <Minus size={14} />
                        </button>

                        <span className="min-w-10 text-center text-sm font-semibold text-foreground tabular-nums">
                          {item.qty}
                        </span>

                        <button
                          onClick={() => updateQuantity(item, 1)}
                          aria-label="Increase quantity"
                          className="flex size-9 items-center justify-center text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Summary */}
          <aside className="sticky top-28 rounded-lg border border-border bg-card p-6 text-card-foreground md:p-8">
            <h2 className="text-lg font-bold text-card-foreground">
              Enquiry Summary
            </h2>

            <div className="my-6 space-y-5 border-y border-border py-6">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  Unique products
                </span>
                <span className="font-semibold text-card-foreground">
                  {uniqueProducts}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  Total selected lines
                </span>
                <span className="font-semibold text-card-foreground">
                  {items.length}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  Total quantities
                </span>
                <span className="font-bold text-primary">
                  {nf.format(totalPieces)} pcs
                </span>
              </div>
            </div>

            <div className="mb-6 rounded-md bg-accent/60 p-4">
              <div className="flex items-center gap-2 text-accent-foreground">
                <Package size={17} />

                <p className="text-xs font-bold tracking-wide uppercase">
                  WHOLESALE ENQUIRY
                </p>
              </div>

              <p className="mt-3 text-xs leading-6 text-muted-foreground">
                No online payment required. Our sales team
                will confirm MOQ, stock, pricing and delivery.
              </p>
            </div>

            <button
              onClick={sendWhatsApp}
              className="flex h-14 w-full items-center justify-center gap-3 rounded-md bg-primary px-5 text-xs font-bold tracking-widest text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <MessageCircle size={19} />
              SEND ALL TO WHATSAPP
            </button>

            <p className="mt-4 text-center text-[11px] leading-5 text-muted-foreground">
              Your complete product selection will be
              included in one WhatsApp enquiry.
            </p>
          </aside>
        </div>
      </div>
    </section>
  )
}