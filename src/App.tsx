import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "./components/ui/resizable";

import ModuleList from "@/layout/ModulesList";
import RolesList from "@/layout/RolesList";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Button } from "./components/ui/button";
import "./globals.css";

const NAV_DEFAULT_SIZE = 255;

export default function App() {
  return (
    <ResizablePanelGroup direction="horizontal" className="max-h-dvh">
      <ResizablePanel defaultSize={NAV_DEFAULT_SIZE} collapsible={true} minSize={10} maxSize={20} collapsedSize={4}>
        <ModuleList />
      </ResizablePanel>
      <ResizableHandle withHandle />

      <ResizablePanel defaultSize={NAV_DEFAULT_SIZE} collapsible={true} minSize={10} maxSize={20} collapsedSize={4}>
        <RolesList />
      </ResizablePanel>
      <ResizableHandle withHandle />

      <ResizablePanel defaultSize={NAV_DEFAULT_SIZE * 2} minSize={30}>
        <ScrollArea type="always" dir="ltr" className="p-2 overflow-auto max-h-full">
          <div className="">
            <div>
              {Array.from({ length: 100 }).map((_, i) => (
                <div key={i} className="p-2">
                  {i}
                </div>
              ))}
            </div>

            <nav className="sticky bottom-0 p-2 flex justify-end border-t-2 border-accent">
              <div className="w-1/2 flex align-center gap-5 justify-end px-3">
                <Button variant="outline">Cancelar</Button>
                <Button variant="default" className="bg-success-500 hover:bg-success-600">
                  Salvar
                </Button>
              </div>
            </nav>
          </div>
        </ScrollArea>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
