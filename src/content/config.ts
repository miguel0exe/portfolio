import { defineCollection, z } from 'astro:content';

// Definimos el esquema de tus "Pergaminos"
const grimorioCollection = defineCollection({
  type: 'content', // Indicamos que son archivos de contenido (Markdown)
  schema: z.object({
    title: z.string(),
    desc: z.string(),
    type: z.enum(['frontend', 'backend', 'devops', 'core', 'all']), // Validamos que solo sean estos tipos
    lang: z.string(),
    tags: z.array(z.string()),
  }),
});

// Exportamos la colección
export const collections = {
  'grimorio': grimorioCollection,
};