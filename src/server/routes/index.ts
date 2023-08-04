import { router } from '../trpc';
import ModuleRoutes from './module';
import RuleRoutes from './rule';

const Router = router({
	modules: ModuleRoutes,
	rules: RuleRoutes,
});

export default Router;
export type Routes = typeof Router;
