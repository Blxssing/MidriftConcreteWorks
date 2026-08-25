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
  email: "sales@midriftconcrete.co.ke",
  location: "Nakuru, Kenya",
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

/** Pre-filled mailto for sales enquiries (opens the device mail app). */
export function emailLink(
  subject = "Quotation request — Midrift Concrete Works",
  body = "Hello Midrift,\n\nProduct:\nQuantity:\nDelivery location:\nRequired date:\n\nThank you.",
) {
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
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
