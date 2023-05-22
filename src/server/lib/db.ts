import { MongoClient } from 'mongodb';

const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017';
const MONGO_DB = process.env.MONGO_DB || 'foxter';

let client: MongoClient | null = null;

export default async function getDB() {
	if (client != null) {
		return client.db(MONGO_DB);
	}

	client = await MongoClient.connect(MONGO_URL, { directConnection: true });
	client.on('topologyClosed', () => (client = null));
	client.on('close', () => (client = null));

	return client.db(MONGO_DB);
}

const closeClient = async () => {
	if (client != null) {
		await client.close();
	}
};

process.on('exit', closeClient);
process.on('SIGINT', closeClient);
