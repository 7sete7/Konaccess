import { z } from 'zod';
import Module from '../lib/Module';
import { AllModules } from '../store/all_modules';
import { publicProcedure, router } from '../trpc';

const ModuleRoutes = router({
	getAll: publicProcedure.query<KonectyClient.Module[]>(async () => {
		const modules: KonectyClient.Module[] = [...AllModules.values()].map(convertModuleToClient);

		return modules;
	}),

	getRolesFor: publicProcedure
		.input(z.string({ description: 'Module name' }))
		.query<KonectyClient.Role[]>(async ({ input: moduleName }) => {
			const module = AllModules.get(moduleName);
			const roles: KonectyClient.Role[] = [];

			if (module == null) throw new Error('Module not found');

			for (const access of module.getAccessess().values()) {
				roles.push({
					_id: `${moduleName}:${access.getRoleName()}`,
					label: access.getRoleName(),
					rules: access.getRules().map(convertRuleToClient),
				});
			}

			return roles;
		}),
});

const convertRuleToClient = (rule: MetaObjects.AccessRule): KonectyClient.Rule => ({
	_id: rule.label + Date.now(),
	label: rule.label,
	fields: rule.fields,
	totalFields: rule.fields.length,
	options: {
		view: rule.rule.READ,
		edit: rule.rule.UPDATE,
		create: rule.rule.CREATE,
	},
});

const convertModuleToClient = (module: Module): KonectyClient.Module => ({
	title: module.label,
	iconName: module.icon,
	version: module.version,
});

export default ModuleRoutes;
export type ModuleRoutes = typeof ModuleRoutes;
