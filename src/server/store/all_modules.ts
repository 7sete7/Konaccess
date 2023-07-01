import Module from '../lib/Module';
import getDB from '../lib/db';

export const AllModules = new Map<string, Module>();

export default async function fetchAllModules() {
	console.log('Start fetching all modules');

	const db = await getDB();
	const cursor = db.collection<MetaObjects.Meta>('MetaObjects').find({ type: 'document' }, { projection: { _id: 1 } });

	for await (const moduleDoc of cursor) {
		const module = await new Module(moduleDoc._id).initialize();
		AllModules.set(moduleDoc._id, module);
	}

	console.log('Finished fetching all modules');
}
