import { createContext, useCallback, useMemo, useState } from 'react';

interface AppState {
	module: string | null;
	rule: string | null;
}

interface ConsumerData extends AppState {}
interface ConsumerFns {
	selectModule: (moduleName: string) => void;
}

type ContextData = [ConsumerData, ConsumerFns];

const initialData = { module: null, rule: null };
export const AppContext = createContext<ContextData>([initialData, { selectModule: () => {} }]);

const ContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [state, setState] = useState<AppState>(initialData);

	const selectModule = useCallback<ConsumerFns['selectModule']>(
		moduleName => {
			setState(current => ({ ...current, module: moduleName }));
		},
		[setState],
	);

	const consumerData = useMemo<ConsumerData>(() => ({ module: state.module, rule: state.rule }), [state]);

	return <AppContext.Provider value={[consumerData, { selectModule }]}>{children}</AppContext.Provider>;
};

export default ContextProvider;
