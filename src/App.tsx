import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";

import ActionBar from "@/layout/AccessSection/ActionBar";
import FieldTable from "@/layout/AccessSection/FieldTable";
import ModuleControl from "@/layout/AccessSection/ModuleControl";
import ModuleList from "@/layout/ModulesList";
import RolesList from "@/layout/RolesList";
import { ScrollArea } from "@radix-ui/react-scroll-area";

import "./globals.css";

const NAV_DEFAULT_SIZE = 255;

export default function App() {
  return (
    <ResizablePanelGroup direction="horizontal" className="max-h-dvh font-sans">
      <ResizablePanel defaultSize={NAV_DEFAULT_SIZE} collapsible={true} minSize={10} maxSize={20} collapsedSize={4}>
        <ModuleList />
      </ResizablePanel>
      <ResizableHandle withHandle />

      <ResizablePanel defaultSize={NAV_DEFAULT_SIZE} collapsible={true} minSize={10} maxSize={20} collapsedSize={4}>
        <RolesList />
      </ResizablePanel>
      <ResizableHandle withHandle />

      <ResizablePanel defaultSize={NAV_DEFAULT_SIZE * 2} minSize={30}>
        <ScrollArea type="always" dir="ltr" className="p-2 overflow-auto max-h-full min-h-svh flex flex-col">
          <ModuleControl />

          <section id="content" className="h-full">
            <FieldTable moduleName="Product" role="Corretor" />
          </section>

          <ActionBar />
        </ScrollArea>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
