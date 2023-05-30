import { z } from 'zod';
import Module from '../lib/Module';
import { publicProcedure, router } from '../trpc';

const ModuleRoutes = router({
	getAll: publicProcedure.query<KonectyClient.Module[]>(async () => {
		await new Promise(resolve => setTimeout(resolve, 1000));
		return [
			{ title: 'Quadrados', iconName: 'building', version: { name: '1.3', date: new Date() } },
			{ title: 'Empreendimentos', iconName: 'flag', version: { name: '1.0', date: new Date() } },
		];
	}),

	getRolesFor: publicProcedure
		.input(z.string({ description: 'Module name' }))
		.query<KonectyClient.Role[]>(async ({ input: moduleName }) => {
			const module = await new Module(moduleName).initialize();
			const roles: KonectyClient.Role[] = [];

			for (const access of module.getAccessess().values()) {
				roles.push({
					_id: '',
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

export default ModuleRoutes;
export type ModuleRoutes = typeof ModuleRoutes;
