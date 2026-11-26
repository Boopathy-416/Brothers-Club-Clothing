
import { useState } from "react";
import {
  ArrowRight,
  Mail,
  MapPin,
  Phone,
  Building2,
} from "lucide-react";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    business: "",
    email: "",
    phone: "",
    enquiry: "Wholesale Enquiry",
    message: "",
  });

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    // Connect your backend/API here to receive enquiries.
    console.log("Business enquiry:", form);
    alert("Form is ready. Connect your enquiry backend to receive submissions.");
  }

  const contactItems = [
    {
      icon: Building2,
      title: "Business Enquiries",
      description: "Wholesale, retail and bulk orders.",
    },
    {
      icon: MapPin,
      title: "Manufacturing Base",
      description: "Tiruppur, Tamil Nadu, India.",
    },
    {
      icon: Mail,
      title: "Email",
      description: "Add your official business email.",
    },
    {
      icon: Phone,
      title: "Phone",
      description: "Add your official business contact number.",
    },
  ];

  return (
    <main className="bg-background text-foreground">

      {/* HERO */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32">

          <p className="mb-6 text-xs font-semibold tracking-[0.25em] text-muted-foreground uppercase">
            CONTACT · BUSINESS ENQUIRIES
          </p>

          <h1 className="max-w-5xl text-5xl font-semibold leading-[1.08] tracking-tight md:text-7xl lg:text-8xl">
            Let's Build
            <br />
            A Business Relationship.
          </h1>

          <p className="mt-8 max-w-xl text-base leading-8 text-muted-foreground md:text-lg">
            Looking for a dependable menswear manufacturing
            and wholesale partner? Connect with Brothers Club
            Clothing for product enquiries, bulk orders and
            retail partnerships.
          </p>
        </div>
      </section>

      {/* CONTACT CONTENT */}
      <section className="mx-auto grid max-w-[1440px] gap-16 px-5 py-24 md:grid-cols-[0.8fr_1.2fr] md:px-10 md:py-32">

        {/* INFORMATION */}
        <div>
          <p className="mb-5 text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
            GET IN TOUCH
          </p>

          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Let's Talk Business.
          </h2>

          <p className="mt-5 max-w-md text-sm leading-7 text-muted-foreground">
            Our team welcomes enquiries from retailers,
            wholesalers and business partners looking
            to explore our menswear collections.
          </p>

          <div className="mt-12 space-y-8">
            {contactItems.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="flex gap-5 border-b border-border pb-7"
                >
                  <Icon size={21} strokeWidth={1.5} />

                  <div>
                    <h3 className="text-sm font-semibold">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-12">
            <p className="text-xs font-semibold tracking-widest uppercase">
              POWERED BY WINSTAR TEX
            </p>

            <p className="mt-3 text-xs text-muted-foreground">
              Manufacturer-direct wholesale from Tiruppur.
            </p>
          </div>
        </div>

        {/* ENQUIRY FORM */}
        <div className="border border-border p-6 md:p-10">
          <p className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
            BUSINESS ENQUIRY FORM
          </p>

          <h2 className="mt-4 text-2xl font-semibold">
            Tell Us About Your Requirement.
          </h2>

          <form onSubmit={handleSubmit} className="mt-9 space-y-6">

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-xs font-semibold">
                  Full Name *
                </label>

                <input
                  required
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="h-12 w-full border border-border bg-transparent px-4 text-sm outline-none focus:border-foreground"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold">
                  Business Name
                </label>

                <input
                  name="business"
                  value={form.business}
                  onChange={handleChange}
                  placeholder="Company / Store name"
                  className="h-12 w-full border border-border bg-transparent px-4 text-sm outline-none focus:border-foreground"
                />
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-xs font-semibold">
                  Email Address *
                </label>

                <input
                  required
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="h-12 w-full border border-border bg-transparent px-4 text-sm outline-none focus:border-foreground"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold">
                  Phone Number *
                </label>

                <input
                  required
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+91"
                  className="h-12 w-full border border-border bg-transparent px-4 text-sm outline-none focus:border-foreground"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold">
                Enquiry Type
              </label>

              <select
                name="enquiry"
                value={form.enquiry}
                onChange={handleChange}
                className="h-12 w-full border border-border bg-background px-4 text-sm outline-none focus:border-foreground"
              >
                <option>Wholesale Enquiry</option>
                <option>Retailer Partnership</option>
                <option>Bulk Order</option>
                <option>Product Enquiry</option>
                <option>Manufacturing Enquiry</option>
                <option>Other Business Enquiry</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold">
                Tell Us Your Requirement *
              </label>

              <textarea
                required
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={5}
                placeholder="Describe your products, quantities or business requirements..."
                className="w-full resize-none border border-border bg-transparent p-4 text-sm outline-none focus:border-foreground"
              />
            </div>

            <button
              type="submit"
              className="flex h-13 w-full items-center justify-center gap-3 bg-primary px-6 text-xs font-semibold tracking-widest text-primary-foreground uppercase transition hover:opacity-80"
            >
              Submit Enquiry <ArrowRight size={17} />
            </button>

            <p className="text-center text-xs leading-6 text-muted-foreground">
              Your information will be used to respond to your business enquiry.
            </p>

          </form>
        </div>
      </section>
    </main>
  );
}
