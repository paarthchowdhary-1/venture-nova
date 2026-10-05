import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Everything behind a login, plus the admin area and shared founder pages.
        disallow: [
          "/admin",
          "/dashboard",
          "/portfolio",
          "/ventures",
          "/v/",
          "/auth",
          "/reset-password",
        ],
      },
    ],
    sitemap: "https://venturenova.org/sitemap.xml",
  };
}
