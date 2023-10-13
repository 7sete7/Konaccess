import { z } from 'zod';
import { AllModules } from '../store/all_modules';
import { publicProcedure, router } from '../trpc';

const RuleRoutes = router({
	save: publicProcedure
		.input(z.object({ moduleName: z.string(), rule: z.unknown(), roleName: z.string() }))
		.mutation(async ({ input: { moduleName, rule: unsafeRule, roleName } }) => {
			//TODO: Validate rule
			const rule = unsafeRule as KonectyClient.Rule;

			const module = AllModules.get(moduleName);
			if (!module) {
				throw new Error(`Module ${moduleName} not found`);
			}

			const access = module.getAccessess().get(roleName);
			if (!access) {
				throw new Error(`Access ${moduleName}:${roleName} not found`);
			}

			access.updateRule(convertRuleToServer(rule));

			return true;
		}),
});

const convertRuleToServer = (rule: KonectyClient.Rule): MetaObjects.AccessRule => ({
	_id: rule._id,
	label: rule.label,
	fields: rule.fields,
	rule: {
		READ: rule.options.view ?? 'inherit',
		CREATE: rule.options.create ?? 'inherit',
		UPDATE: rule.options.edit ?? 'inherit',
	},
});

export default RuleRoutes;
export type RuleRoutes = typeof RuleRoutes;
