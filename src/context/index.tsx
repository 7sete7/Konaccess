import { MenuDocument } from "@/types/menu";
import { createContext, useCallback, useMemo, useState } from "react";

type ConsumerData = {
  selectedModule?: MenuDocument;
  selectedAccess?: string;
};

type ConsumerFns = {
  selectModule: (name: MenuDocument) => void;
  selectAccess: (name: string) => void;
};

const noop = () => {};

type ContextData = [ConsumerData, ConsumerFns];
const AppContext = createContext<ContextData>([{}, { selectModule: noop, selectAccess: noop }]);

export function ContextProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<ConsumerData>({});

  const selectModule: ConsumerFns["selectModule"] = useCallback(
    (name) => setState((prev) => ({ ...prev, selectedModule: name, selectedAccess: undefined })),
    [setState]
  );
  const selectAccess: ConsumerFns["selectAccess"] = useCallback((name) => setState((prev) => ({ ...prev, selectedAccess: name })), [setState]);

  const contextValue = useMemo<ContextData>(() => [state, { selectModule, selectAccess }], [state, selectModule]);
  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
}

export default AppContext;
