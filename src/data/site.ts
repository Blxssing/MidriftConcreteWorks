export const site = {
  name: "Midrift Concrete Works Ltd",
  shortName: "Midrift",
  tagline: "Quality precast concrete. Built for strength. Designed for performance.",
  phone: "+254 700 000 000",
  phoneHref: "tel:+254700000000",
  whatsapp: "254700000000",
  email: "sales@midriftconcrete.co.ke",
  location: "Nakuru, Kenya",
  hours: "Mon – Sat, 7:30am – 6:00pm",
  socials: [
    { label: "Facebook", href: "#" },
    { label: "Instagram", href: "#" },
    { label: "LinkedIn", href: "#" },
    { label: "TikTok", href: "#" },
    { label: "YouTube", href: "#" },
  ],
} as const;

export function whatsappLink(message = "Hello Midrift, I would like a quote for precast concrete products.") {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
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
