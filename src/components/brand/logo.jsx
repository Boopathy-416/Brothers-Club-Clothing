// // import { Link } from "react-router-dom";
// // import { cn } from "../../lib/utils";

// // export function Logo({ className, inverted = false, href = "/" }) {
// //   return (
// //     <Link
// //       to={href}
// //       className={cn("group inline-flex flex-col leading-none", className)}
// //       aria-label="Brothers Club Clothing home"
// //     >
// //       <span
// //         style={{
// //           fontFamily: "bcc",
// //           letterSpacing: "0.04em",
// //         }}
// //         className={cn(
// //           "text-lg transition-colors md:text-xl",
// //           inverted
// //             ? "font-medium text-cream group-hover:text-white"
// //             : "font-medium text-primary group-hover:text-primary/85",
// //         )}
// //       >
// //         BROTHERS CLUB
// //       </span>

// //       <span
// //         className={cn(
// //           "mt-1 text-[0.6rem] font-medium tracking-[0.32em]",
// //           inverted ? "text-sage" : "text-muted-foreground",
// //         )}
// //       >
// //         CLOTHING · BY WINSTAR TEX
// //       </span>
// //     </Link>
// //   );
// // }



// import { Link } from "react-router-dom";
// import { cn } from "../../lib/utils";

// const LOGO_URL =
//   "https://res.cloudinary.com/dpm3bum4n/image/upload/v1795594427/web_wtkfwv.png";

// export function Logo({ className, inverted = false, href = "/" }) {
//   return (
//     <Link
//       to={href}
//       className={cn("group inline-flex items-center gap-2.5 md:gap-3", className)}
//       aria-label="Brothers Club Clothing home"
//     >
//       <img
//         src={LOGO_URL}
//         alt="Brothers Club Clothing"
//         className="h-10 w-auto shrink-0 object-contain md:h-14"
//       />

//       <span className="flex flex-col leading-none">
//         <span
//           style={{
//             fontFamily: "bcc",
//             letterSpacing: "0.04em",
//           }}
//           className={cn(
//             "text-lg transition-colors md:text-xl",
//             inverted
//               ? "font-medium text-cream group-hover:text-white"
//               : "text-primary md:leading-6  group-hover:text-primary/85",
//           )}
//         >
//           BROTHERS CLUB
//         </span>

//         <span
//           className={cn(
//             " md:mt-1 text-[0.6rem] font-medium tracking-[0.8em] md:tracking-[0.30em]",
//             inverted ? "text-sage" : "text-muted-foreground",
//           )}
//         >
//           CLOTHING · BY WINSTAR TEX
//         </span>
//       </span>
//     </Link>
//   );
// }






import { Link } from "react-router-dom";
import { cn } from "../../lib/utils";

const DARK_LOGO_URL =
  "https://res.cloudinary.com/dpm3bum4n/image/upload/v1795594427/web_wtkfwv.png";

const WHITE_LOGO_URL =
  "https://res.cloudinary.com/dpm3bum4n/image/upload/v1795678566/perfect_x7xmx7.png";

export function Logo({ className, inverted = false, href = "/" }) {
  return (
    <Link
      to={href}
      className={cn("group inline-flex items-center gap-1.8 md:gap-2.5", className)}
      aria-label="Brothers Club Clothing home"
    >
      {inverted ? (
        /* Always show white logo on dark/burgundy surfaces like the footer */
        <img
          src={WHITE_LOGO_URL}
          alt="Brothers Club Clothing"
          className="h-10 w-auto shrink-0 object-contain md:h-14"
        />
      ) : (
        <>
          {/* Day (Light) Theme Logo */}
          <img
            src={DARK_LOGO_URL}
            alt="Brothers Club Clothing"
            className="block h-10 w-auto shrink-0 object-contain dark:hidden md:h-14"
          />

          {/* Dark Theme Logo */}
          <img
            src={WHITE_LOGO_URL}
            alt="Brothers Club Clothing"
            className="hidden h-10 w-auto shrink-0 object-contain dark:block md:h-14"
          />
        </>
      )}

      <span className="flex flex-col leading-none">
        <span
          style={{
            fontFamily: "bcc",
            letterSpacing: "0.04em",
          }}
          className={cn(
            "text-lg transition-colors md:text-xl",
            inverted
              ? "font-medium text-cream group-hover:text-white"
              : "text-primary group-hover:text-primary/85 md:leading-7",
          )}
        >
          BROTHERS CLUB
        </span>

        <span
          className={cn(
            "text-[0.6rem] font-medium tracking-[0.22em] md:mt-1 md:tracking-[0.30em]",
            inverted ? "text-sage" : "text-muted-foreground",
          )}
        >
          CLOTHING · BY WINSTAR TEX
        </span>
      </span>
    </Link>
  );
}