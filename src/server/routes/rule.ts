import { z } from 'zod';
import { publicProcedure, router } from '../trpc';

const RuleRoutes = router({
	save: publicProcedure
		.input(z.object({ moduleName: z.string(), rule: z.unknown() }))
		.mutation(async ({ input: { moduleName, rule } }) => {
			console.log(moduleName, rule);
		}),
});

export default RuleRoutes;
export type RuleRoutes = typeof RuleRoutes;
