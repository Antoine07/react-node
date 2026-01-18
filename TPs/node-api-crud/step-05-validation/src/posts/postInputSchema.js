import { z } from "zod";

// TODO:
// - title: string non vide
// - content: string non vide
export const postInputSchema = z.object({
  title: z.any(),
  content: z.any()
});

