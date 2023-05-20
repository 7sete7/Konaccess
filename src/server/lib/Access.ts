import getDB from './db';

export default class KonAccess {
	private moduleName: string;
	private roleName: string;

	private originalAccess: object = {};

	constructor(moduleName: string, roleName: string) {
		this.moduleName = moduleName;
		this.roleName = roleName;

		this.getOriginalAccess();
	}

	private async getOriginalAccess() {
		const db = await getDB();
		const access = await db
			.collection<MetaObjects.Access>('MetaObjects')
			.findOne({ _id: `${this.moduleName}:access:${this.roleName}` });

		if (access == null) throw new Error('Access not found');
		this.originalAccess = access;
	}
}
