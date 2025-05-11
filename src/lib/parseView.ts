import { KonectyModule } from '@/types/module';
import { KonectyView, ViewField } from '@/types/view';

export type ParsedView = Array<{
	sectionTitle: string;
	fields: { name: string; label: string; type: string; descriptionFields?: string[] }[];
}>;

export default function parseView(view: KonectyView, meta: KonectyModule, isChild: boolean = false) {
	const parsedView: ParsedView = [];

	for (let visual of view.visuals) {
		if (visual.type === 'visualGroup') {
			// Get the first "visual" children, if it is a "visualGroup" parse recursive
			if (visual.visuals[0].type === 'visualGroup') {
				const items = parseView({ visuals: visual.visuals } as KonectyView, meta, true);
				parsedView.push(...items);
			} else {
				// Otherwise, assume the children are fields - Nested
				const fields = getFieldsNested(visual);
				parsedView.push({
					sectionTitle: visual.label?.pt_BR ?? 'Section',
					fields: fields.map(({ fieldName }) => ({
						name: fieldName,
						...getFieldConfig(fieldName, meta),
					})),
				});
			}
		}
	}

	if (isChild) {
		return parsedView.concat([
			{
				sectionTitle: 'Responsável',
				fields: [{ name: '_user', label: 'Usuário', type: 'lookup' }],
			},
		]);
	}

	return parsedView;
}

const getFieldsNested = (visualGroup: KonectyView['visuals'][number]): ViewField[] => {
	if (visualGroup.type !== 'visualGroup') return [];
	if (visualGroup.visuals == null || visualGroup.visuals.length === 0) {
		return [];
	}

	if ('fieldName' in visualGroup.visuals[0]) {
		return visualGroup.visuals as ViewField[];
	}

	return getFieldsNested(visualGroup.visuals[0] as KonectyView['visuals'][number]);
};

const getFieldConfig = (fieldName: string, meta: KonectyModule) => {
	const fieldMeta = meta.fields.find(f => f.name === fieldName);

	if (fieldMeta == null) {
		console.warn(`Field ${fieldName} not found in module ${meta.name}`);
		return {
			label: `[${fieldName}!!]`,
			type: 'text',
		};
	}

	return {
		label: fieldMeta.label?.pt_BR ?? fieldName,
		type: fieldMeta.type,
		descriptionFields: fieldMeta.descriptionFields,
	};
};
