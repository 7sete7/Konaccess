import getClient from './Client';

export const getModuleViewFor = async (moduleName: string): Promise<KonectyClient.ViewSection[]> => {
	const view = await getClient().modules.getViewFor.query(moduleName);
	return view;
};

export const getModules = async (): Promise<KonectyClient.Module[]> => {
	const allModules = await getClient().modules.getAll.query();

	return allModules.map(module => ({
		...module,
		version: {
			...module.version,
			date: new Date(module.version.date),
		},
	}));
};

export const getRolesFor = async (moduleName: string): Promise<KonectyClient.Role[]> => {
	const roles = await getClient().modules.getRolesFor.query(moduleName);
	return roles;
};
