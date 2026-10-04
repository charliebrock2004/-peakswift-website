import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

const entries: { path: string; priority: number }[] = [
  { path: "/", priority: 1 },
  { path: "/pricing", priority: 0.9 },
  { path: "/website-design-crieff", priority: 0.8 },
  { path: "/website-design-perth", priority: 0.8 },
  { path: "/website-design-perthshire", priority: 0.8 },
  { path: "/small-business-websites", priority: 0.8 },
  { path: "/website-redesign", priority: 0.8 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return entries.map(({ path, priority }) => ({
    url: path === "/" ? site.url : `${site.url}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority,
  }));
}
