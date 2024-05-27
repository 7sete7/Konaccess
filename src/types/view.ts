import { z } from "zod";
import { LabelSchema } from "./module";

const ViewField = z.object({
  fieldName: z.string(),
  type: z.string(),
});

const VisualGroup = z.object({
  type: z.literal("visualGroup"),
  style: z.any().optional(),
  label: z.any(),
});

export const DocumentFormVisualsSchema = z.discriminatedUnion("type", [
  VisualGroup.extend({
    visuals: z.union([
      ViewField.array(),
      VisualGroup.extend({
        visuals: z.union([ViewField.array(), VisualGroup.extend({ visuals: z.union([ViewField.array(), VisualGroup.array()]) }).array()]),
      }).array(),
    ]),
  }),
  z.object({
    type: z.literal("visualSymlink"),
    fieldName: z.string(),
  }),
  z.object({
    type: z.literal("reverseLookup"),
    style: z.any().optional(),
    field: z.string(),
    document: z.string(),
    list: z.string(),
  }),
]);

export type DocumentFormVisuals = z.infer<typeof DocumentFormVisualsSchema>;

export const DocumentFormSchema = z.object({
  _id: z.string(),
  name: z.string(),
  document: z.string().optional(),
  label: LabelSchema,
  plurals: LabelSchema,
  visuals: z.array(DocumentFormVisualsSchema),
});

export type KonectyView = z.infer<typeof DocumentFormSchema>;
export type ViewField = z.infer<typeof ViewField>;
