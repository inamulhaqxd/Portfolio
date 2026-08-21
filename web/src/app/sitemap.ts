import type { MetadataRoute } from "next";

const SITE_URL = "https://inamtariq.vercel.app";

const PROJECTS = [
  "intelligent-document-flow",
  "ai-knowledge-assistant",
  "workflow-insights",
  "sentiment-analyzer",
  "image-classifier",
  "predictive-maintenance",
  "chatbot-framework",
  "data-pipeline",
  "recommendation-engine",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 1 },
    { url: `${SITE_URL}/projects`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${SITE_URL}/services`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 },
  ];

  const projectPages = PROJECTS.map((slug) => ({
    url: `${SITE_URL}/projects/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...projectPages];
}
