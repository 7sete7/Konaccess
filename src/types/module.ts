import { z } from 'zod';

export const LabelSchema = z.object({
	en: z.string().optional(),
	pt_BR: z.string(),
});

const ModuleSchema = z.object({
	_id: z.string(),
	name: z.string(),
	plurals: LabelSchema,
	label: LabelSchema,

	fields: z
		.object({
			name: z.string(),
			type: z.string(),
			label: z.object({
				en_US: z.string(),
				pt_BR: z.string(),
			}),
			descriptionFields: z.array(z.string()).optional(),
		})
		.array(),
});

export type KonectyModule = z.infer<typeof ModuleSchema>;
