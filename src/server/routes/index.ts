import { router } from '../trpc';
import ModuleRoutes from './module';

const Router = router({
	modules: ModuleRoutes,
});

export default Router;
export type Routes = typeof Router;
