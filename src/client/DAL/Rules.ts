import getClient from './Client';

export const saveRule = async (moduleName: string, rule: KonectyClient.Rule) => {
	try {
		await getClient().rules.save.mutate({ moduleName, rule });
		return true;
	} catch (e) {
		console.error(e);
		return false;
	}
};
