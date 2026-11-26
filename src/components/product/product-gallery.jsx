// import { useState } from 'react'
// import { ZoomIn } from 'lucide-react'
// import { Dialog, DialogContent, DialogTitle } from '../../components/ui/dialog'
// import { cn } from '../../lib/utils'

// export function ProductGallery({ images, activeSrc }) {
//   const [picked, setPicked] = useState(null)
//   const [zoom, setZoom] = useState(false)
//   const [lastActive, setLastActive] = useState(activeSrc)

//   if (activeSrc !== lastActive) {
//     setLastActive(activeSrc)
//     setPicked(null)
//   }

//   const current =
//     images.find((i) => i.src === (picked ?? activeSrc)) ?? images[0]

//   return (
//     <div className="flex flex-col-reverse gap-3 md:flex-row lg:sticky lg:top-32 lg:self-start">
//       <div
//         className="flex gap-3 overflow-x-auto md:w-20 md:flex-col"
//         role="list"
//         aria-label="Product images"
//       >
//         {images.map((img) => (
//           <button
//             key={img.src}
//             type="button"
//             role="listitem"
//             onClick={() => setPicked(img.src)}
//             aria-label={`View ${img.alt}`}
//             aria-current={img.src === current?.src}
//             className={cn(
//               'relative aspect-[3/4] w-16 shrink-0 overflow-hidden rounded-md bg-muted ring-offset-2 ring-offset-background md:w-full',
//               img.src === current?.src
//                 ? 'ring-1 ring-foreground'
//                 : 'opacity-70 hover:opacity-100',
//             )}
//           >
//             <img
//               src={img.src}
//               alt={img.alt}
//               className="absolute inset-0 h-full w-full object-cover"
//             />
//           </button>
//         ))}
//       </div>

//       <button
//         type="button"
//         onClick={() => setZoom(true)}
//         className="group relative aspect-[3/4] flex-1 cursor-zoom-in overflow-hidden rounded-lg bg-muted"
//         aria-label="Zoom image"
//       >
//         {current && (
//           <img
//             src={current.src}
//             alt={current.alt}
//             fetchPriority="high"
//             className="absolute inset-0 h-full w-full object-cover"
//           />
//         )}

//         <span className="absolute right-4 bottom-4 inline-flex size-10 items-center justify-center rounded-full bg-background/90 opacity-0 transition-opacity group-hover:opacity-100">
//           <ZoomIn className="size-4" aria-hidden />
//         </span>
//       </button>

//       <Dialog open={zoom} onOpenChange={setZoom}>
//         <DialogContent className="max-w-[min(92vw,900px)] p-0 sm:max-w-[min(92vw,900px)]">
//           <DialogTitle className="sr-only">
//             {current?.alt}
//           </DialogTitle>

//           <div className="relative aspect-[3/4] max-h-[88vh] w-full overflow-hidden rounded-lg bg-muted">
//             {current && (
//               <img
//                 src={current.src}
//                 alt={current.alt}
//                 className="absolute inset-0 h-full w-full object-contain"
//               />
//             )}
//           </div>
//         </DialogContent>
//       </Dialog>
//     </div>
//   )
// }



import { useEffect, useState } from "react";
import { ZoomIn } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "../../components/ui/dialog";

import { cn } from "../../lib/utils";

export function ProductGallery({ images = [], activeSrc }) {
  const [picked, setPicked] = useState(null);
  const [zoom, setZoom] = useState(false);

  // Reset selected image when the product's active image changes
  useEffect(() => {
    setPicked(null);
    setZoom(false);
  }, [activeSrc]);

  // Safely handle empty or invalid image arrays
  const validImages = Array.isArray(images)
    ? images.filter((img) => img?.src)
    : [];

  const current =
    validImages.find((img) => img.src === (picked ?? activeSrc)) ??
    validImages[0] ??
    null;

  const handleImageSelect = (src) => {
    setPicked(src);
  };

  return (
    <div className="flex flex-col-reverse gap-3 md:flex-row lg:sticky lg:top-32 lg:self-start">

      {/* Thumbnail Gallery */}
      <div
        className="flex gap-3 overflow-x-auto md:w-20 md:flex-col"
        role="group"
        aria-label="Product image thumbnails"
      >
        {validImages.map((img, index) => (
          <button
            key={`${img.src}-${index}`}
            type="button"
            onClick={() => handleImageSelect(img.src)}
            aria-label={`View ${img.alt || `product image ${index + 1}`}`}
            aria-pressed={img.src === current?.src}
            className={cn(
              "relative aspect-[3/4] w-16 shrink-0 overflow-hidden rounded-md bg-muted ring-offset-2 ring-offset-background md:w-full",
              img.src === current?.src
                ? "ring-1 ring-foreground"
                : "opacity-70 hover:opacity-100"
            )}
          >
            <img
              src={img.src}
              alt={img.alt || `Product thumbnail ${index + 1}`}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </button>
        ))}
      </div>

      {/* Main Product Image */}
      <button
        type="button"
        onClick={() => current && setZoom(true)}
        disabled={!current}
        className="group relative aspect-[3/4] min-w-0 flex-1 cursor-zoom-in overflow-hidden rounded-lg bg-[#f1f0ec] disabled:cursor-default"
        aria-label="Zoom product image"
      >
        {current ? (
          <img
            src={current.src}
            alt={current.alt || "Product image"}
            fetchPriority="high"
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
            No product images available
          </div>
        )}

        {current && (
          <span className="absolute right-4 bottom-4 inline-flex size-10 items-center justify-center rounded-full bg-background/90 opacity-0 transition-opacity group-hover:opacity-100">
            <ZoomIn className="size-4" aria-hidden="true" />
          </span>
        )}
      </button>

      {/* Zoom Dialog */}
      <Dialog open={zoom} onOpenChange={setZoom}>
        <DialogContent className="max-w-[min(92vw,900px)] overflow-hidden p-0 sm:max-w-[min(92vw,900px)]">
          <DialogTitle className="sr-only">
            {current?.alt || "Product image preview"}
          </DialogTitle>

          <div className="relative aspect-[3/4] max-h-[88vh] w-full overflow-hidden rounded-lg bg-muted">
            {current && (
              <img
                src={current.src}
                alt={current.alt || "Product image preview"}
                className="absolute inset-0 h-full w-full object-contain"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>

    </div>
  );
}
