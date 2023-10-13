import { createContext, useCallback, useMemo, useState } from 'react';
import { saveRule as ruleSave } from '../DAL/Rules';

interface AppState {
	module: string | null;
	rule: KonectyClient.Rule | null;
	role: string | null;
}

interface ConsumerData extends AppState {}
interface ConsumerFns {
	selectModule: (moduleName: string) => void;
	selectRule: (rule: KonectyClient.Rule, role: string) => void;
	updateRule: (data: Partial<KonectyClient.Rule>) => void;
	saveRule: () => void;
}

type ContextData = [ConsumerData, ConsumerFns];

const initialData = { module: null, rule: null, role: null };
const noop = () => {};
export const AppContext = createContext<ContextData>([
	initialData,
	{ selectModule: noop, selectRule: noop, updateRule: noop, saveRule: noop },
]);

const ContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [state, setState] = useState<AppState>(initialData);

	const selectModule = useCallback<ConsumerFns['selectModule']>(
		moduleName => {
			setState(current => ({ ...current, module: moduleName, rule: null }));
		},
		[setState],
	);

	const selectRule = useCallback<ConsumerFns['selectRule']>(
		(rule, role) => {
			setState(current => ({ ...current, rule, role }));
		},
		[setState],
	);

	const updateRule = useCallback<ConsumerFns['updateRule']>(
		data => {
			setState(current => ({ ...current, rule: { ...current.rule!, ...data } }));
		},
		[setState],
	);

	const saveRule = useCallback<ConsumerFns['saveRule']>(async () => {
		const { module, rule, role } = state;
		if (module == null || rule == null || role == null) return;

		const success = await ruleSave(module, rule, role);
		return success;
	}, [state]);

	const consumerData = useMemo<ConsumerData>(() => ({ module: state.module, rule: state.rule, role: state.role }), [state]);

	return (
		<AppContext.Provider value={[consumerData, { selectModule, selectRule, updateRule, saveRule }]}>
			{children}
		</AppContext.Provider>
	);
};

export default ContextProvider;
