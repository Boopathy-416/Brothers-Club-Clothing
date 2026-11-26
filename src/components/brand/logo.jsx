// import { Link } from "react-router-dom";
// import { cn } from "../../lib/utils";

// export function Logo({ className, inverted = false, href = "/" }) {
//   return (
//     <Link
//       to={href}
//       className={cn("group inline-flex flex-col leading-none", className)}
//       aria-label="Brothers Club Clothing home"
//     >
//       <span
//         style={{
//           fontFamily: "bcc",
//           letterSpacing: "0.04em",
//         }}
//         className={cn(
//           "text-lg transition-colors md:text-xl",
//           inverted
//             ? "font-medium text-cream group-hover:text-white"
//             : "font-medium text-primary group-hover:text-primary/85",
//         )}
//       >
//         BROTHERS CLUB
//       </span>

//       <span
//         className={cn(
//           "mt-1 text-[0.6rem] font-medium tracking-[0.32em]",
//           inverted ? "text-sage" : "text-muted-foreground",
//         )}
//       >
//         CLOTHING · BY WINSTAR TEX
//       </span>
//     </Link>
//   );
// }



import { Link } from "react-router-dom";
import { cn } from "../../lib/utils";

const LOGO_URL =
  "https://res.cloudinary.com/dpm3bum4n/image/upload/v1795594427/web_wtkfwv.png";

export function Logo({ className, inverted = false, href = "/" }) {
  return (
    <Link
      to={href}
      className={cn("group inline-flex items-center gap-2.5 md:gap-3", className)}
      aria-label="Brothers Club Clothing home"
    >
      <img
        src={LOGO_URL}
        alt="Brothers Club Clothing"
        className="h-10 w-auto shrink-0 object-contain md:h-14"
      />

      <span className="flex flex-col leading-none">
        <span
          style={{
            fontFamily: "bcc",
            letterSpacing: "0.02em",
          }}
          className={cn(
            "text-lg transition-colors md:text-xl",
            inverted
              ? "font-medium text-cream group-hover:text-white"
              : "text-primary group-hover:text-primary/85",
          )}
        >
          BROTHERS CLUB
        </span>

        <span
          className={cn(
            "mt-1 text-[0.6rem] font-medium tracking-[0.32em]",
            inverted ? "text-sage" : "text-muted-foreground",
          )}
        >
          CLOTHING · BY WINSTAR TEX
        </span>
      </span>
    </Link>
  );
}