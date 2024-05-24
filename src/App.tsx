import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "./components/ui/resizable";

import ModuleList from "@/layout/ModulesList";
import RolesList from "@/layout/RolesList";
import "./globals.css";

const NAV_DEFAULT_SIZE = 255;

export default function App() {
  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel defaultSize={NAV_DEFAULT_SIZE} collapsible={true} minSize={10} maxSize={20} collapsedSize={4}>
        <ModuleList />
      </ResizablePanel>
      <ResizableHandle withHandle />

      <ResizablePanel defaultSize={NAV_DEFAULT_SIZE} collapsible={true} minSize={10} maxSize={20} collapsedSize={4}>
        <RolesList />
      </ResizablePanel>
      <ResizableHandle withHandle />

      <ResizablePanel defaultSize={NAV_DEFAULT_SIZE * 2} minSize={30}>
        <main className="p-2">
          <h1 className="text-xl font-bold">Hello World</h1>
        </main>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
