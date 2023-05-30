import Access from './Access';
import getDB from './db';

type VersionData = {
	name: string;
	date: Date;
};

export default class Module {
	private moduleName: string;

	public icon: string = '';
	public label: string = '';
	public version: VersionData = {
		name: '1.0',
		date: new Date(),
	};

	private accesses: Map<string, Access> = new Map();

	constructor(moduleName: string) {
		this.moduleName = moduleName;
	}

	async initialize() {
		const db = await getDB();
		const module = await db.collection<MetaObjects.Meta>('MetaObjects').findOne({ _id: this.moduleName });
		if (module == null) throw new Error('Module not found');

		this.icon = module.icon;
		this.label = module.label.pt_BR;

		await this.loadAccesses();
		return this;
	}

	public getAccessess() {
		return this.accesses;
	}

	private async loadAccesses() {
		const db = await getDB();
		const cursor = db.collection<MetaObjects.Access>('MetaObjects').find({ _id: { $regex: `^${this.moduleName}:access:` } });

		for await (const accessDoc of cursor) {
			const roleName = accessDoc._id.split(':')[2];
			const access = await new Access(this.moduleName, roleName).initialize();

			this.accesses.set(roleName, access);
		}
	}
}
