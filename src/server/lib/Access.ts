import getDB from './db';

export default class KonAccess {
	private moduleName: string;
	private roleName: string;

	private originalAccess: MetaObjects.Access | null = null;

	constructor(moduleName: string, roleName: string) {
		this.moduleName = moduleName;
		this.roleName = roleName;
	}

	private async getOriginalAccess() {
		const db = await getDB();
		const access = await db
			.collection<MetaObjects.Access>('MetaObjects')
			.findOne({ _id: `${this.moduleName}:access:${this.roleName}` });

		if (access == null) throw new Error('Access not found');
		this.originalAccess = access;
	}

	public async initialize() {
		await this.getOriginalAccess();

		if (this.originalAccess?.rules == null && this.originalAccess?.fields != null) {
			this.originalAccess.rules = this.convertToNewRules();
		}

		return this;
	}

	private convertToNewRules() {
		const rulesObj = Object.entries(this.originalAccess?.fields ?? {}).reduce((acc, [fieldName, fieldAccess]) => {
			const output = ['READ', 'CREATE', 'UPDATE']
				.map(accessType => {
					const access = fieldAccess[accessType as keyof MetaObjects.AccessField];

					switch (true) {
						case access == null:
							return `${accessType}:inherit`;
						case access!.condition == null:
							return `${accessType}:${access!.allow ? 'all' : 'none'}`;
						case access!.condition!.value === '$user':
							return `${accessType}:only-owner`;
						case access!.condition!.value === '$group':
							return `${accessType}:within-group`;
						case access!.condition!.value === '$allgroups':
							return `${accessType}:within-additional-groups`;
					}
				})
				.join(' | ');

			if (acc[output] == null) {
				acc[output] = {
					label: output,
					fields: [],
					rule: output
						.split('|')
						.map(v => v.split(':'))
						.reduce((a, [k, v]) => ({ ...a, [k]: v }), {}) as MetaObjects.AccessRule['rule'],
				};
			}
			acc[output].fields.push(fieldName);

			return acc;
		}, {} as Record<string, MetaObjects.AccessRule>);

		return Object.values(rulesObj);
	}

	public getRoleName = () => this.roleName;
	public getRules = () => this.originalAccess?.rules ?? [];
}
