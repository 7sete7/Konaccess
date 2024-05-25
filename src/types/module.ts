import { z } from "zod";

const ModuleSchema = z.object({
  _id: z.string(),
  fields: z
    .object({
      name: z.string(),
      label: z.object({
        en_US: z.string(),
        pt_BR: z.string(),
      }),
    })
    .array(),
});

export type KonectyModule = z.infer<typeof ModuleSchema>;
