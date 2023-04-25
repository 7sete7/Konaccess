import { publicProcedure, router } from '../trpc';

const ModuleRoutes = router({
	getAll: publicProcedure.query<KonectyClient.Module[]>(async () => {
		await new Promise(resolve => setTimeout(resolve, 1000));
		return [
			{ title: 'Quadrados', iconName: 'building', version: { name: '1.3', date: new Date() } },
			{ title: 'Empreendimentos', iconName: 'flag', version: { name: '1.0', date: new Date() } },
		];
	}),
});

export default ModuleRoutes;
export type ModuleRoutes = typeof ModuleRoutes;
