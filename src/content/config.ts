import { defineCollection, z } from "astro:content";

const workshop = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.string(),
    location: z.string(),
    hero: z.string(),
  }),
});

export const collections = {
  workshop,
};
