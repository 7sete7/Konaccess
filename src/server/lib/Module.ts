import Access from './Access';
import getDB from './db';

type VersionData = {
	name: string;
	date: Date;
};

export default class Module {
	private moduleName: string;

	public _id: string = '';
	public icon: string = '';
	public label: string = '';
	public version: VersionData = {
		name: '1.0',
		date: new Date(),
	};

	public fields: Map<string, MetaObjects.Meta['fields'][string]> = new Map();
	private accesses: Map<string, Access> = new Map();
	private view!: MetaObjects.View;

	constructor(moduleName: string) {
		this.moduleName = moduleName;
	}

	async initialize() {
		const db = await getDB();
		const module = await db.collection<MetaObjects.Meta>('MetaObjects').findOne({ _id: this.moduleName });
		if (module == null) throw new Error('Module not found');

		this._id = module._id;
		this.icon = module.icon;
		this.label = module.label.pt_BR;

		for (const fieldName in module.fields) {
			this.fields.set(fieldName, module.fields[fieldName]);
		}

		await this.loadAccesses();
		await this.loadView();
		return this;
	}

	public getAccessess() {
		return this.accesses;
	}

	public getView() {
		return this.view;
	}

	private async loadAccesses() {
		const db = await getDB();
		const cursor = db.collection<MetaObjects.Access>('MetaObjects').find({ _id: { $regex: `^${this.moduleName}:access:` } });

		for await (const accessDoc of cursor) {
			const roleName = accessDoc._id.split(':')[2];
			const access = await new Access(this.moduleName, roleName).initialize();

			this.accesses.set(`${this._id}:${roleName}`, access);
		}
	}

	private async loadView() {
		const db = await getDB();
		const view = await db.collection<MetaObjects.View>('MetaObjects').findOne({ _id: `${this.moduleName}:view:Default` });

		if (view == null) throw new Error(`Module ${this.moduleName} has no view!`);

		this.view = view;
	}

	public getFieldLabel(fieldName: string) {
		const field = this.fields.get(fieldName);

		return field && field.label ? field.label.pt_BR : fieldName;
	}
}
