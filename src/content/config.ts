import { defineCollection, z } from "astro:content";

const pages = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string().optional(),
    cmsLabel: z.string().optional(),
    date: z.string().optional(),
    location: z.string().optional(),
    lang: z.enum(["de", "en"]).default("de"),
    textColor: z.string().optional(),
    backgroundColor: z.string().optional(),
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
          columns: z.any().optional(),
          textColor: z.string().optional(),
          backgroundColor: z.string().optional(),
          imagePath: z.string().optional(),
          imagePosition: z.enum(["left", "right"]).optional(),
          imageAlt: z.string().optional(),
          mapsUrl: z.string().optional(),
          noShadow: z.boolean().optional(),
        })
      )
      .optional(),
  }),
});

const workshop = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.string(),
    location: z.string(),
    registrationUrl: z.string().optional(),
    mapsUrl: z.string().optional(),
    moreInfoUrl: z.string().optional(),
    calendarUrl: z.string().optional(),
    isActive: z.boolean().default(true),
    lang: z.enum(["de", "en"]).default("de"),
    backgroundColor: z.string().optional(),
    textColor: z.string().optional(),
    signalColor: z.string().optional(),
  }),
});

export const collections = {
  pages,
  workshop,
};
