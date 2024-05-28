import Access from "@/lib/Access";
import { MenuDocument } from "@/types/menu";
import { createContext, useCallback, useMemo, useState } from "react";

type ConsumerData = {
  selectedModule?: MenuDocument;
  selectedAccess?: Access;
};

type ConsumerFns = {
  selectModule: (name: MenuDocument) => void;
  selectAccess: (name: Access) => void;
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
  const selectAccess: ConsumerFns["selectAccess"] = useCallback((item) => setState((prev) => ({ ...prev, selectedAccess: item })), [setState]);

  const contextValue = useMemo<ContextData>(() => [state, { selectModule, selectAccess }], [state, selectModule]);
  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
}

export default AppContext;
