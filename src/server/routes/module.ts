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

	getViewFor: publicProcedure
		.input(z.string({ description: 'Module name' }))
		.query<KonectyClient.ViewSection[]>(async ({ input: moduleName }) => {
			const module = AllModules.get(moduleName);
			if (module == null) throw new Error('Module not found');

			try {
				return module
					.getView()
					.visuals.filter(({ type }) => type === 'visualGroup')[0]
					.visuals.map(convertViewToClient(module));
			} catch (e) {
				console.error(e);
				return [];
			}
		}),
});

const convertRuleToClient = (rule: MetaObjects.AccessRule): KonectyClient.Rule => ({
	_id: rule._id,
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
	_id: module._id,
	title: module.label,
	iconName: module.icon,
	version: module.version,
});

const convertViewToClient =
	(module: Module) =>
	(visuals: MetaObjects.ViewVisual): KonectyClient.ViewSection => ({
		icon: visuals.style.icon,
		label: visuals.label.pt_BR,
		fields: visuals.visuals.map(({ fieldName }) => ({ label: module.getFieldLabel(fieldName), name: fieldName, type: 'text' })),
	});

export default ModuleRoutes;
export type ModuleRoutes = typeof ModuleRoutes;
