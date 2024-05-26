import { z } from "zod";

const MenuDocumentSchema = z.object({
  type: z.literal("document"),
  _id: z.string(),
  name: z.string(),
  icon: z.string(),

  lists: z.array(z.record(z.string())),
  pivots: z.array(z.record(z.string())).optional(),
});

export type MenuDocument = z.infer<typeof MenuDocumentSchema>;

const MenuSchema = z.union([MenuDocumentSchema, MenuDocumentSchema.extend({ children: z.array(MenuDocumentSchema) })]);

export type KonectyMenu = z.infer<typeof MenuSchema>;
