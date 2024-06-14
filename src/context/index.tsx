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

  addSaveHook: (key: string, hook: () => object) => void;
  onSave: () => void;
};

const saveHooks: Record<string, Parameters<ConsumerFns["addSaveHook"]>[1]> = {};

const noop = () => {};

type ContextData = [ConsumerData, ConsumerFns];
const AppContext = createContext<ContextData>([{}, { selectModule: noop, selectAccess: noop, addSaveHook: noop, onSave: noop }]);

export function ContextProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<ConsumerData>({});

  const selectModule: ConsumerFns["selectModule"] = useCallback(
    (name) => setState((prev) => ({ ...prev, selectedModule: name, selectedAccess: undefined })),
    [setState]
  );
  const selectAccess: ConsumerFns["selectAccess"] = useCallback((item) => setState((prev) => ({ ...prev, selectedAccess: item })), [setState]);

  const addSaveHook: ConsumerFns["addSaveHook"] = useCallback((key, hook) => {
    saveHooks[key] = hook;
  }, []);

  const onSave: ConsumerFns["onSave"] = useCallback(() => {
    const data: Parameters<Access["save"]>[0] = {};

    for (const hook of Object.values(saveHooks)) {
      Object.assign(data, hook());
    }

    state.selectedAccess?.save(data);
  }, [state.selectedAccess?._id]);

  const contextValue = useMemo<ContextData>(() => [state, { selectModule, selectAccess, addSaveHook, onSave }], [state, selectModule, selectAccess]);
  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
}

export default AppContext;
