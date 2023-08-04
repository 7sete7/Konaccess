import { createContext, useCallback, useMemo, useState } from 'react';

interface AppState {
	module: string | null;
	rule: KonectyClient.Rule | null;
}

interface ConsumerData extends AppState {}
interface ConsumerFns {
	selectModule: (moduleName: string) => void;
	selectRule: (rule: KonectyClient.Rule) => void;
	updateRule: (data: Partial<KonectyClient.Rule>) => void;
}

type ContextData = [ConsumerData, ConsumerFns];

const initialData = { module: null, rule: null };
const noop = () => {};
export const AppContext = createContext<ContextData>([initialData, { selectModule: noop, selectRule: noop, updateRule: noop }]);

const ContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [state, setState] = useState<AppState>(initialData);

	const selectModule = useCallback<ConsumerFns['selectModule']>(
		moduleName => {
			setState(current => ({ ...current, module: moduleName, rule: null }));
		},
		[setState],
	);

	const selectRule = useCallback<ConsumerFns['selectRule']>(
		rule => {
			setState(current => ({ ...current, rule }));
		},
		[setState],
	);

	const updateRule = useCallback<ConsumerFns['updateRule']>(
		data => {
			setState(current => ({ ...current, rule: { ...current.rule!, ...data } }));
		},
		[setState],
	);

	const consumerData = useMemo<ConsumerData>(() => ({ module: state.module, rule: state.rule }), [state]);

	return <AppContext.Provider value={[consumerData, { selectModule, selectRule, updateRule }]}>{children}</AppContext.Provider>;
};

export default ContextProvider;
