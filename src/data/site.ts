export const site = {
  name: "Midrift Concrete Works Ltd",
  shortName: "Midrift",
  tagline: "Quality precast concrete. Built for strength. Designed for performance.",
  phone: "0791 502 707",
  phoneHref: "tel:+254791502707",
  phoneAlt: "0791 502 707",
  phoneAltHref: "tel:+254791502707",
  /** Central sales line — every call, WhatsApp and quote handoff goes here. */
  whatsapp: "254791502707",
  whatsappDisplay: "0791 502 707",
  whatsappAlt: "254791502707",
  whatsappCatalog: "https://wa.me/c/254745240050",
  email: "midmerchants@gmail.com",
  location: "Old Nairobi Road, Nakuru, Kenya",
  address: "Midrift Concrete Works, Old Nairobi Rd, Nakuru, Kenya",
  mapsUrl: "https://maps.app.goo.gl/QvdwAQEf79oM6LwZ9",
  mapsEmbedUrl:
    "https://www.google.com/maps?q=Midrift+Concrete+Works,+Old+Nairobi+Road,+Nakuru,+Kenya&output=embed",
  reviewsUrl:
    "https://www.google.com/maps/place/Midrift+Concrete+Works,+Old+Nairobi+Rd,+Nakuru/data=!4m6!3m5!1s0x1829939fa6abac9d:0xcc545138471d5578!9m1!1b1",
  hours: "Mon – Fri, 7:30am – 5:00pm · Sat, 7:30am – 1:00pm · Sun closed",
  hoursRows: [
    { day: "Monday", time: "7:30 AM – 5:00 PM" },
    { day: "Tuesday", time: "7:30 AM – 5:00 PM" },
    { day: "Wednesday", time: "7:30 AM – 5:00 PM" },
    { day: "Thursday", time: "7:30 AM – 5:00 PM" },
    { day: "Friday", time: "7:30 AM – 5:00 PM" },
    { day: "Saturday", time: "7:30 AM – 1:00 PM" },
    { day: "Sunday", time: "Closed" },
  ],
  socials: [
    {
      label: "TikTok",
      icon: "tiktok",
      href: "https://vm.tiktok.com/ZS9BPAFdBFgDM-d8aRb/",
    },
    { label: "Instagram", icon: "instagram", href: "#" },
    { label: "Facebook", icon: "facebook", href: "#" },
    { label: "LinkedIn", icon: "linkedin", href: "#" },
  ],
} as const;

/**
 * Official WhatsApp click-to-chat link (https://wa.me/<international number>?text=...).
 * The number is reduced to digits only (no +, spaces, brackets or dashes) and the
 * message is fully URL-encoded, so the same link opens the WhatsApp app on Android
 * and iPhone and WhatsApp Web on desktop. The draft is never sent automatically.
 */
export function whatsappLink(message = "Hello Midrift, I would like a quote for precast concrete products.") {
  const number = site.whatsapp.replace(/\D/g, "");
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

const defaultEmailBody = `Hello Midrift Concrete Works,

I would like a written quotation for the following:

Product:
Quantity:
Delivery location:
Required by:
Project type:

My contact details:
Name:
Phone:

Thank you.`;

/**
 * Pre-filled mailto for sales enquiries. Subject and body are URL-encoded and
 * line breaks are normalised to CRLF so drafts render correctly in Gmail,
 * Apple Mail and Outlook.
 */
export function emailLink(subject = "Quotation request — Midrift Concrete Works", body = defaultEmailBody) {
  const encodedBody = encodeURIComponent(body.replace(/\r?\n/g, "\r\n"));
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodedBody}`;
}

/** Pre-filled mailto tailored to a specific product or category. */
export function productEmailLink(product: string) {
  return emailLink(
    `Quotation request — ${product}`,
    `Hello Midrift Concrete Works,

I would like a written quotation for ${product}.

Quantity:
Delivery location:
Required by:
Project type:

My contact details:
Name:
Phone:

Thank you.`,
  );
}

export const mainNav = [
  { label: "Products", to: "/products" },
  { label: "Catalogue", to: "/catalogue" },
  { label: "Services", to: "/services" },
  { label: "Ready-Mix", to: "/ready-mix" },
  { label: "Bulk & Delivery", to: "/delivery" },
  { label: "Bulk & Wholesale", to: "/bulk-wholesale" },
  { label: "Who We Serve", to: "/solutions" },
  { label: "Projects", to: "/projects" },
  { label: "Testimonials", to: "/testimonials" },
  { label: "Quality", to: "/quality" },
  { label: "About", to: "/about" },
  { label: "Our Team", to: "/team" },
  { label: "Contact", to: "/contact" },
] as const;
