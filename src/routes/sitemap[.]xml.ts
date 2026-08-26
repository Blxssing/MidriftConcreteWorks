import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { categories } from "@/data/products";
import { projects } from "@/data/projects";
import { solutions } from "@/data/solutions";

const BASE_URL = "https://midrift-prime-solutions.lovable.app";

interface SitemapEntry {
  path: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries: SitemapEntry[] = [
          { path: "/", changefreq: "weekly", priority: "1.0" },
          { path: "/products", changefreq: "weekly", priority: "0.9" },
          { path: "/solutions", changefreq: "monthly", priority: "0.8" },
          { path: "/projects", changefreq: "monthly", priority: "0.7" },
          { path: "/quality", changefreq: "yearly", priority: "0.6" },
          { path: "/bulk-wholesale", changefreq: "monthly", priority: "0.7" },
          { path: "/delivery", changefreq: "yearly", priority: "0.6" },
          { path: "/about", changefreq: "yearly", priority: "0.6" },
          { path: "/resources", changefreq: "monthly", priority: "0.5" },
          { path: "/contact", changefreq: "monthly", priority: "0.8" },
        ];

        for (const category of categories) {
          entries.push({ path: `/products/${category.slug}`, changefreq: "monthly", priority: "0.8" });
          for (const product of category.products) {
            entries.push({
              path: `/products/${category.slug}/${product.slug}`,
              changefreq: "monthly",
              priority: "0.7",
            });
          }
        }

        for (const solution of solutions) {
          entries.push({ path: `/solutions/${solution.slug}`, changefreq: "monthly", priority: "0.7" });
        }

        for (const project of projects) {
          entries.push({ path: `/projects/${project.slug}`, changefreq: "yearly", priority: "0.5" });
        }

        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`,
          ]
            .filter(Boolean)
            .join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
