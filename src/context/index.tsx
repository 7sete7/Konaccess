import { createContext, useCallback, useMemo, useState } from "react";

type ConsumerData = {
  selectedModule?: string;
  selectedRole?: string;
};

type ConsumerFns = {
  selectModule: (name: string) => void;
  selectRole: (name: string) => void;
};

const noop = () => {};

type ContextData = [ConsumerData, ConsumerFns];
const AppContext = createContext<ContextData>([{}, { selectModule: noop, selectRole: noop }]);

export function ContextProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<ConsumerData>({});

  const selectModule = useCallback((name: string) => setState((prev) => ({ ...prev, selectedModule: name, selectedRole: undefined })), [setState]);
  const selectRole = useCallback((name: string) => setState((prev) => ({ ...prev, selectedRole: name })), [setState]);

  const contextValue = useMemo<ContextData>(() => [state, { selectModule, selectRole }], [state, selectModule]);
  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
}

export default AppContext;
