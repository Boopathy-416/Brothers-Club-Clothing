
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Award,
  Factory,
  ShieldCheck,
  Truck,
} from "lucide-react";

export default function About() {
  const values = [
    {
      icon: Factory,
      title: "Manufacturing Foundation",
      text: "Built around garment manufacturing expertise, with a focus on dependable production and wholesale supply.",
    },
    {
      icon: ShieldCheck,
      title: "Quality Commitment",
      text: "We focus on fabric selection, garment finishing and consistent product standards.",
    },
    {
      icon: Award,
      title: "Considered Design",
      text: "Modern menswear designed with attention to fit, comfort and everyday versatility.",
    },
    {
      icon: Truck,
      title: "Pan-India Reach",
      text: "Manufacturer-direct wholesale dispatch to business and retail partners across India.",
    },
  ];

  return (
    <main className="bg-background text-foreground">

      {/* HERO */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-36">

          <p className="mb-6 text-xs font-semibold tracking-[0.25em] uppercase text-muted-foreground">
            OUR STORY · TIRUPPUR
          </p>

          <h1 className="max-w-5xl text-5xl font-semibold leading-[1.08] tracking-tight md:text-7xl lg:text-8xl">
            Built on Craft.
            <br />
            Defined by Character.
          </h1>

          <div className="mt-10 flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <p className="max-w-xl text-base leading-8 text-muted-foreground md:text-lg">
              Brothers Club Clothing brings together manufacturing
              expertise, considered design and dependable quality
              to create menswear for modern businesses and retail partners.
            </p>

            <Link
              to="/contact"
              className="inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-wider"
            >
              Work With Us <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* BRAND STORY */}
      <section className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:grid-cols-2 md:px-10 md:py-32">

        <div>
          <p className="mb-5 text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
            WHO WE ARE
          </p>

          <h2 className="text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
            More Than Clothing.
            <br />
            A Manufacturing Identity.
          </h2>
        </div>

        <div className="space-y-6 text-base leading-8 text-muted-foreground">
          <p>
            Brothers Club Clothing is a menswear brand built
            around manufacturing, product development and
            wholesale partnerships.
          </p>

          <p>
            Powered by Winstar Tex and rooted in Tiruppur's
            garment manufacturing ecosystem, we bring together
            production knowledge and a practical understanding
            of the apparel market.
          </p>

          <p>
            Our focus is to serve retailers and business partners
            with considered menswear collections, dependable
            supply and a professional approach to every order.
          </p>
        </div>
      </section>

      {/* BRAND IMAGE */}
      <section className="px-5 md:px-10">
        <div className="mx-auto max-w-[1440px]">
          <div className="relative flex min-h-[420px] items-center overflow-hidden bg-neutral-900 px-8 py-20 text-white md:min-h-[560px] md:px-20">
            <div className="relative z-10 max-w-2xl">
              <p className="mb-6 text-xs tracking-[0.25em] text-white/60 uppercase">
                POWERED BY WINSTAR TEX
              </p>

              <h2 className="text-4xl font-semibold leading-tight md:text-6xl">
                From Manufacturing
                <br />
                To Market.
              </h2>

              <p className="mt-7 max-w-lg leading-8 text-white/70">
                Connecting manufacturing capabilities with
                the needs of India's evolving menswear market.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* OUR VALUES */}
      <section className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32">

        <div className="mb-16 max-w-2xl">
          <p className="mb-5 text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
            WHAT DEFINES US
          </p>

          <h2 className="text-4xl font-semibold tracking-tight md:text-6xl">
            Our Approach.
          </h2>
        </div>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="border-t border-border pt-7"
              >
                <span className="mb-10 block text-sm text-muted-foreground">
                  0{index + 1}
                </span>

                <Icon size={27} strokeWidth={1.5} />

                <h3 className="mt-6 text-lg font-semibold">
                  {item.title}
                </h3>

                <p className="mt-4 text-sm leading-7 text-muted-foreground">
                  {item.text}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="border-y border-border bg-muted/30">
        <div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-8 px-5 py-20 md:flex-row md:items-center md:px-10">

          <div>
            <p className="mb-4 text-xs tracking-[0.2em] text-muted-foreground uppercase">
              OUR COLLECTIONS
            </p>

            <h2 className="text-3xl font-semibold md:text-5xl">
              Made for Modern Menswear.
            </h2>

            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              Explore formalwear, trousers, shorts and T-shirts.
            </p>
          </div>

          <Link
            to="/shop"
            className="inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-wider"
          >
            Explore Collection <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-[1440px] px-5 py-24 text-center md:px-10 md:py-32">
        <p className="mb-5 text-xs tracking-[0.2em] text-muted-foreground uppercase">
          PARTNER WITH US
        </p>

        <h2 className="mx-auto max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl">
          Let's Build Something Together.
        </h2>

        <Link
          to="/contact"
          className="mt-9 inline-flex items-center gap-3 bg-primary px-8 py-4 text-xs font-semibold tracking-widest text-primary-foreground uppercase transition hover:opacity-80"
        >
          Contact Our Team <ArrowRight size={17} />
        </Link>
      </section>

    </main>
  );
}
