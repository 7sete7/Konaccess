import { z } from "zod";
import { LabelSchema } from "./module";

const MenuDocumentSchema = z.object({
  type: z.literal("document"),
  _id: z.string(),
  name: z.string(),
  icon: z.string(),

  label: LabelSchema.optional(),

  lists: z.array(z.record(z.string())),
  pivots: z.array(z.record(z.string())).optional(),
  isChild: z.boolean().optional(),
});

export type MenuDocument = z.infer<typeof MenuDocumentSchema>;

const MenuSchema = z.union([MenuDocumentSchema, MenuDocumentSchema.extend({ children: z.array(MenuDocumentSchema) })]);

export type KonectyMenu = z.infer<typeof MenuSchema>;
