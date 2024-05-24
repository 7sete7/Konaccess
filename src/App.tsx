import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import ActionBar from "@/layout/AccessSection/ActionBar";
import ModuleList from "@/layout/ModulesList";
import RolesList from "@/layout/RolesList";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Eye, Pencil } from "lucide-react";
import "./globals.css";

const NAV_DEFAULT_SIZE = 255;
const ACCESS_OPTS = ["Apenas o responsável", "O responsável e seu gerente", "O responsável e seus superiores", "Todos os usuários"];

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
        <ScrollArea type="always" dir="ltr" className="p-2 overflow-auto max-h-full">
          <div id="general-control" className="py-2 px-3">
            <h1 className="text-3xl font-bold font-sans">Imóvel</h1>
            <div className="flex gap-5 mt-8">
              <div className="flex-grow">
                <label htmlFor="general-read" className="text-sm">
                  Pode visualizar registros:
                </label>
                <Select name="general-read">
                  <SelectTrigger className="py-1 px-2 mt-2">
                    <Eye size={16} />
                    <SelectValue placeholder="Selecione..." />
                  </SelectTrigger>
                  <SelectContent>
                    {ACCESS_OPTS.map((opt) => (
                      <SelectItem key={opt} value={opt}>
                        {opt}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex-grow">
                <label htmlFor="general-read" className="text-sm">
                  Pode editar registros:
                </label>
                <Select name="general-read">
                  <SelectTrigger className="py-1 px-2 mt-2">
                    <Pencil size={16} />
                    <SelectValue placeholder="Selecione..." />
                  </SelectTrigger>
                  <SelectContent>
                    {ACCESS_OPTS.map((opt) => (
                      <SelectItem key={opt} value={opt}>
                        {opt}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Separator className="mt-4" />
          </div>

          <section id="content">
            <div>
              {Array.from({ length: 100 }).map((_, i) => (
                <div key={i} className="p-2">
                  {i}
                </div>
              ))}
            </div>
          </section>

          <ActionBar />
        </ScrollArea>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
