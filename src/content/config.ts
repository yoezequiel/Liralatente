import { defineCollection, z } from "astro:content";

const poesiasCollection = defineCollection({
    type: "content",
    schema: z.object({
        titulo: z.string(),
        index: z.number(),
        last: z.boolean().optional(),
    }),
});

export const collections = {
    poesias: poesiasCollection,
};
