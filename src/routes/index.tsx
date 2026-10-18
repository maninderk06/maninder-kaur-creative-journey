import { createFileRoute, redirect } from "@tanstack/react-router";

// The portfolio is a plain HTML/CSS/JS site in public/site/.
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Maninder Kaur | Portfolio" },
      { name: "description", content: "Portfolio of Maninder Kaur, BCA student and aspiring web designer." },
      { property: "og:title", content: "Maninder Kaur | Portfolio" },
      { property: "og:description", content: "BCA Student | Aspiring Web Designer" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  beforeLoad: () => {
    throw redirect({ href: "/site/index.html" });
  },
});
