import { saveAccess } from '@/api/Konecty';
import { FieldsState } from '@/layout/AccessSection/FieldTable';
import { FieldAccess, MetaAccess, UpdateAccessPayload } from '@konecty/sdk/types/access';
import { KonCondition } from '@konecty/sdk/types/filter';
import invert from 'lodash/invert';
import memoize from 'lodash/memoize';
import pick from 'lodash/pick';

export type AccessFieldOptions = (typeof Access.fieldOptions)[number];
export type AccessOperations = keyof FieldAccess;
export type ParsedFields = Record<string, Partial<Record<AccessOperations, AccessFieldOptions>>>;

const conditionMap: Record<string, AccessFieldOptions> = {
	'_user._id | equals | $user': 'only-_user',
	'_user.group._id | equals | $group': '_user-and-group',
	'_user.group._id | in | $allgroups': '_user-and-allgroups',
};

export default class Access {
	_id: string;
	name: string;
	document: string;
	label: string;
	raw: Pick<MetaAccess, 'fields' | 'readFilter' | 'updateFilter'> = {};

	static fieldOptions = ['any', 'only-_user', '_user-and-group', '_user-and-allgroups', 'none'] as const;

	constructor(metaAccess: MetaAccess) {
		this._id = metaAccess._id;
		this.label = this.name = metaAccess.name;
		this.document = metaAccess.document;

		this.raw = pick(metaAccess, ['fields', 'readFilter', 'updateFilter']);

		this.parseCondition = memoize(this.parseCondition, JSON.stringify);
		this.mountCondition = memoize(this.mountCondition);
	}

	private parseCondition(condition: KonCondition) {
		const { term, operator, value } = condition;
		const conditionStr = `${term} | ${operator} | ${value}`;
		return conditionMap[conditionStr];
	}

	private mountCondition(strValue: AccessFieldOptions) {
		const invertedConditionMap = invert(conditionMap);
		const allow = strValue !== 'none';
		const conditionStr = strValue === 'any' || !allow ? undefined : invertedConditionMap[strValue];
		let condition = undefined;

		if (conditionStr) {
			const [term, operator, value] = conditionStr.split(' | ');
			condition = { term, operator, value };
		}

		return { allow, condition };
	}

	public parseRawFields() {
		const fields = Object.entries(this.raw.fields ?? {}).reduce<ParsedFields>((acc, [fieldName, fieldOperations]) => {
			for (const operation in fieldOperations) {
				const fieldValue = fieldOperations[operation as AccessOperations];

				if (fieldValue.condition) {
					const accessOpt = this.parseCondition(fieldValue.condition);

					if (accessOpt) {
						acc[fieldName] = { ...acc[fieldName], [operation]: accessOpt };
					} else {
						console.warn(`${fieldName} Unknown condition: ${JSON.stringify(fieldValue.condition)}`);
					}

					continue;
				}

				acc[fieldName] = { ...acc[fieldName], [operation]: fieldValue.allow === false ? 'none' : 'any' };
			}
			return acc;
		}, {});

		return fields;
	}

	public parseModuleFilters() {
		//TODO multiple conditions, currently using only the first one
		return {
			readFilter: this.raw.readFilter?.conditions?.[0] ? this.parseCondition(this.raw.readFilter.conditions[0]) : 'any',
			updateFilter: this.raw.updateFilter?.conditions?.[0] ? this.parseCondition(this.raw.updateFilter.conditions[0]) : 'any',
		};
	}

	public async save(data: Partial<{ fields: FieldsState; readFilter: AccessFieldOptions; updateFilter: AccessFieldOptions }>) {
		const payload: UpdateAccessPayload = { fields: [] };

		if (data.fields) {
			const fieldGroups = groupFields(data.fields);

			payload.fields = fieldGroups.map(({ fieldNames, operation, value }) => {
				const { allow, condition } = this.mountCondition(value);

				return { fieldNames, operation, allow, condition };
			});
		}

		if (data.readFilter) {
			const { allow, condition } = this.mountCondition(data.readFilter);
			payload.readFilter =
				allow && condition ? { match: 'and', conditions: [condition] } : { allow, match: 'and', conditions: [] };
		}

		if (data.updateFilter) {
			const { allow, condition } = this.mountCondition(data.updateFilter);
			payload.updateFilter =
				allow && condition ? { match: 'and', conditions: [condition] } : { allow, match: 'and', conditions: [] };
		}

		return await saveAccess(this, payload);
	}
}

type FieldGroup = { fieldNames: string[]; operation: AccessOperations; value: AccessFieldOptions };
function groupFields(fields: FieldsState): FieldGroup[] {
	return Object.entries(fields).reduce<FieldGroup[]>((acc, [fieldName, fieldOperations]) => {
		for (const operation in fieldOperations) {
			const fieldValue = fieldOperations[operation as AccessOperations];
			if (!fieldValue) continue;

			const fieldGroupIdx = acc.findIndex(fg => fg.operation === operation && fg.value === fieldValue);

			if (fieldGroupIdx < 0) {
				acc.push({ fieldNames: [fieldName], operation: operation as AccessOperations, value: fieldValue });
				continue;
			}

			acc[fieldGroupIdx].fieldNames.push(fieldName);
		}
		return acc;
	}, []);
}
