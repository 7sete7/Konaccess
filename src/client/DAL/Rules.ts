import getClient from './Client';

export const saveRule = async (moduleName: string, rule: KonectyClient.Rule, roleName: string) => {
	try {
		await getClient().rules.save.mutate({ moduleName, rule, roleName });
		return true;
	} catch (e) {
		console.error(e);
		return false;
	}
};
