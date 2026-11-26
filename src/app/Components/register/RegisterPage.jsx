
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, Store, User, Phone, MapPin, Building2, ShoppingBag } from 'lucide-react';

import { Container } from "../../../components/site/section"
import { SITE } from '../../../lib/site';
import { waLink } from '../../../lib/wholesale';

export default function RegisterPage() {
  const [form, setForm] = useState({
    shopName: '',
    ownerName: '',
    phone: '',
    city: '',
    state: '',
    businessType: 'Retail Shop',
    message: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: '',
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!form.shopName.trim()) newErrors.shopName = 'Shop name is required';
    if (!form.ownerName.trim()) newErrors.ownerName = 'Owner name is required';
    if (!/^[6-9]\d{9}$/.test(form.phone.trim())) {
      newErrors.phone = 'Enter a valid 10-digit mobile number';
    }
    if (!form.city.trim()) newErrors.city = 'City is required';

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    const message = `
Hello Brothers Club Clothing!

I would like to register as a retail / wholesale partner.

SHOP DETAILS
-------------------------
Shop Name: ${form.shopName}
Owner Name: ${form.ownerName}
Mobile Number: ${form.phone}
City: ${form.city}
State: ${form.state}
Business Type: ${form.businessType}

Additional Requirements:
${form.message || 'Not specified'}

Please contact me with your wholesale collection and pricing details.

Thank you!
    `.trim();

    const whatsappUrl = waLink(SITE.whatsappNumber, message);

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const inputClass =
    'w-full h-12 rounded-md border border-neutral-300 bg-white px-4 text-sm text-black outline-none transition focus:border-black focus:ring-1 focus:ring-black placeholder:text-neutral-400';

  const labelClass =
    'mb-2 block text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-600';

  return (
    <main className="min-h-screen bg-[#f5f4f0] text-black">

      {/* Header */}
      <div className=" ">
        <Container className="flex items-center justify-between py-5">
          {/* <Link
            to="/"
            className="text-xl font-black tracking-tight uppercase"
          >
            BROTHERS CLUB
            <span className="ml-2 text-[9px] font-medium tracking-[0.2em] text-neutral-500">
              CLOTHING
            </span>
          </Link> */}

          <Link
            to="/shop"
            className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-600 hover:text-black"
          >
            <ArrowLeft size={15} />
            Back to shop
          </Link>
        </Container>
      </div>

      {/* Hero */}
      <Container className="grid gap-12 py-14 md:grid-cols-[0.9fr_1.1fr] md:py-24">

        <div className="flex flex-col justify-center">
          <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-500">
            Brothers Club Clothing / Partnerships
          </p>

          <h1 className="max-w-xl text-4xl font-bold leading-[1.1] tracking-tight md:text-6xl">
            Grow your business with
            <span className="block text-neutral-400">
              Brothers Club.
            </span>
          </h1>

          <p className="mt-6 max-w-md text-sm leading-7 text-neutral-600">
            Join our retail partner network and explore premium men's
            clothing collections, wholesale pricing and business
            opportunities.
          </p>

          <div className="mt-10 grid grid-cols-2 gap-5 border-t border-black/10 pt-7">
            <div>
              <Store size={20} className="mb-3" />
              <h3 className="text-sm font-bold">Retail Partners</h3>
              <p className="mt-1 text-xs text-neutral-500">
                For clothing stores and retailers.
              </p>
            </div>

            <div>
              <ShoppingBag size={20} className="mb-3" />
              <h3 className="text-sm font-bold">Wholesale Enquiries</h3>
              <p className="mt-1 text-xs text-neutral-500">
                Discover our collections and pricing.
              </p>
            </div>
          </div>

          <div className="mt-12 hidden md:block">
            <p className="text-[10px] font-semibold tracking-[0.2em] text-neutral-400">
              PREMIUM MENSWEAR · WHOLESALE · ALL INDIA
            </p>
          </div>
        </div>

        {/* Registration Form */}
        <div className="rounded-lg border border-black/10 bg-white p-6 shadow-sm md:p-10">

          <div className="mb-8 border-b border-black/10 pb-6">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400">
              Retailer Registration
            </p>

            <h2 className="mt-3 text-2xl font-bold tracking-tight">
              Tell us about your business.
            </h2>

            <p className="mt-2 text-xs leading-6 text-neutral-500">
              Submit your details to connect with our sales team through WhatsApp.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Shop Name */}
            <div>
              <label className={labelClass}>Shop / Business Name *</label>
              <div className="relative">
                <Store size={16} className="absolute left-4 top-4 text-neutral-400" />
                <input
                  name="shopName"
                  value={form.shopName}
                  onChange={handleChange}
                  placeholder="Enter your shop name"
                  className={`${inputClass} pl-11`}
                />
              </div>
              {errors.shopName && (
                <p className="mt-1 text-xs text-red-600">{errors.shopName}</p>
              )}
            </div>

            {/* Owner */}
            <div>
              <label className={labelClass}>Owner / Contact Person *</label>
              <div className="relative">
                <User size={16} className="absolute left-4 top-4 text-neutral-400" />
                <input
                  name="ownerName"
                  value={form.ownerName}
                  onChange={handleChange}
                  placeholder="Enter owner name"
                  className={`${inputClass} pl-11`}
                />
              </div>
              {errors.ownerName && (
                <p className="mt-1 text-xs text-red-600">{errors.ownerName}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className={labelClass}>Mobile Number *</label>
              <div className="relative">
                <Phone size={16} className="absolute left-4 top-4 text-neutral-400" />
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  maxLength={10}
                  placeholder="10-digit mobile number"
                  className={`${inputClass} pl-11`}
                />
              </div>
              {errors.phone && (
                <p className="mt-1 text-xs text-red-600">{errors.phone}</p>
              )}
            </div>

            {/* City and State */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label className={labelClass}>City *</label>
                <div className="relative">
                  <MapPin size={16} className="absolute left-4 top-4 text-neutral-400" />
                  <input
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    placeholder="Your city"
                    className={`${inputClass} pl-11`}
                  />
                </div>
                {errors.city && (
                  <p className="mt-1 text-xs text-red-600">{errors.city}</p>
                )}
              </div>

              <div>
                <label className={labelClass}>State</label>
                <input
                  name="state"
                  value={form.state}
                  onChange={handleChange}
                  placeholder="Your state"
                  className={inputClass}
                />
              </div>
            </div>

            {/* Business Type */}
            <div>
              <label className={labelClass}>Business Type</label>
              <div className="relative">
                <Building2 size={16} className="absolute left-4 top-4 text-neutral-400" />
                <select
                  name="businessType"
                  value={form.businessType}
                  onChange={handleChange}
                  className={`${inputClass} appearance-none pl-11`}
                >
                  <option>Retail Shop</option>
                  <option>Wholesale Business</option>
                  <option>Distributor</option>
                  <option>Online Clothing Store</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            {/* Message */}
            <div>
              <label className={labelClass}>
                Additional Requirements (Optional)
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={4}
                placeholder="Tell us about your product requirements..."
                className="w-full rounded-md border border-neutral-300 bg-white p-4 text-sm text-black outline-none transition focus:border-black focus:ring-1 focus:ring-black placeholder:text-neutral-400"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="group flex h-14 w-full items-center justify-center gap-3 rounded-md bg-black px-6 text-xs font-bold uppercase tracking-[0.18em] text-white transition hover:bg-neutral-800"
            >
              Submit via WhatsApp
              <ArrowUpRight
                size={17}
                className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </button>

            <p className="text-center text-[10px] leading-5 text-neutral-400">
              By submitting, you agree to be contacted by Brothers Club
              Clothing regarding wholesale and retail enquiries.
            </p>

          </form>
        </div>
      </Container>

      {/* Footer */}
      <footer className="border-t border-black/10 bg-white">
        <Container className="flex flex-col justify-between gap-3 py-6 sm:flex-row">
          <p className="text-[10px] font-semibold tracking-[0.15em] text-neutral-500">
            © {new Date().getFullYear()} BROTHERS CLUB CLOTHING
          </p>

          <Link
            to="/"
            className="text-[10px] font-semibold uppercase tracking-widest text-neutral-500 hover:text-black"
          >
            Back to Home
          </Link>
        </Container>
      </footer>

    </main>
  );
}
