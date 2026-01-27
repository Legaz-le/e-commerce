import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/checkout", "/basket", "/orders"],
    },
    sitemap: "https://e-commerce-ruby-two-72.vercel.app/sitemap.xml",
  };
}
