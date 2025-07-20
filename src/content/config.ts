import { defineCollection, z } from "astro:content";

const pages = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string().optional(),
    cmsLabel: z.string().optional(),
    date: z.string().optional(),
    location: z.string().optional(),
    hero: z.union([
      z.string().optional(),
      z
        .object({
          title: z.string().optional(),
          subtitle: z.string().optional(),
          image: z.string().optional(),
        })
        .optional(),
    ]),
    body: z.string().optional(),
    sections: z
      .array(
        z.object({
          type: z.string().optional(),
          title: z.string().optional(),
          content: z.string().optional(),
          date: z.string().optional(),
          location: z.string().optional(),
        })
      )
      .optional(),
  }),
});

export const collections = {
  pages,
};
