import { defineCollection, z } from "astro:content";
import { getCategoryNames } from "../data/categories";

// Obtener los nombres de categorías válidos del archivo centralizado
const validCategories = getCategoryNames();

const poesiasCollection = defineCollection({
    type: "content",
    schema: z.object({
        titulo: z.string(),
        index: z.number(),
        last: z.boolean().optional(),
        categorias: z
            .array(z.enum(validCategories as [string, ...string[]]))
            .optional()
            .default(["existencial"]),
    }),
});

export const collections = {
    poesias: poesiasCollection,
};
