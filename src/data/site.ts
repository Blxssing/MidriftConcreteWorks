export const site = {
  name: "Midrift Concrete Works Ltd",
  shortName: "Midrift",
  tagline: "Quality precast concrete. Built for strength. Designed for performance.",
  phone: "0791 502 707",
  phoneHref: "tel:+254791502707",
  phoneAlt: "0745 240 050",
  phoneAltHref: "tel:+254745240050",
  whatsapp: "254745240050",
  whatsappAlt: "254791502707",
  whatsappCatalog: "https://wa.me/c/254745240050",
  email: "midmerchants@gmail.com",
  location: "Old Nairobi Road, Nakuru, Kenya",
  address: "Midrift Concrete Works, Old Nairobi Rd, Nakuru, Kenya",
  mapsUrl: "https://maps.app.goo.gl/QvdwAQEf79oM6LwZ9",
  reviewsUrl:
    "https://www.google.com/maps/place/Midrift+Concrete+Works,+Old+Nairobi+Rd,+Nakuru/data=!4m6!3m5!1s0x1829939fa6abac9d:0xcc545138471d5578!9m1!1b1",
  hours: "Mon – Sat, 7:30am – 6:00pm",
  socials: [
    {
      label: "TikTok",
      icon: "tiktok",
      href: "https://www.tiktok.com/@invisible4866?_r=1&_t=ZS-99Bp340Ms0j",
    },
    { label: "Instagram", icon: "instagram", href: "#" },
    { label: "Facebook", icon: "facebook", href: "#" },
    { label: "LinkedIn", icon: "linkedin", href: "#" },
  ],
} as const;

export function whatsappLink(message = "Hello Midrift, I would like a quote for precast concrete products.") {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
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

/** Pre-filled mailto for sales enquiries (opens the device mail app). */
export function emailLink(subject = "Quotation request — Midrift Concrete Works", body = defaultEmailBody) {
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
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
  { label: "Who We Serve", to: "/solutions" },
  { label: "Projects", to: "/projects" },
  { label: "Quality", to: "/quality" },
  { label: "About", to: "/about" },
  { label: "Resources", to: "/resources" },
  { label: "Contact", to: "/contact" },
] as const;
