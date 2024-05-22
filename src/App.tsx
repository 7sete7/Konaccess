import { Suspense, lazy } from "react";
import { Button } from "./components/ui/button";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "./components/ui/resizable";

import { LucideProps } from "lucide-react";
import dynamicIconImports from "lucide-react/dynamicIconImports";

import "./globals.css";

const NAV_DEFAULT_SIZE = 255;
const NAV_LINKS: { name: string; icon: string }[] = Array(10).fill({ name: "Imovel", icon: "home" });

export default function App() {
  return (
    <ResizablePanelGroup direction="horizontal" className="h-full">
      <ResizablePanel defaultSize={NAV_DEFAULT_SIZE} collapsible={true} minSize={10} maxSize={20} collapsedSize={4}>
        <aside id="nav" className="group flex flex-col gap-2 py-2">
          <nav className="grid gap-1 px-2">
            {NAV_LINKS.map(({ name, icon }) => (
              <Button variant="link" className="justify-start flex gap-1 align-baseline">
                <LazyIcon name={icon} size={20} />
                {name}
              </Button>
            ))}
          </nav>
        </aside>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={NAV_DEFAULT_SIZE} collapsible={true} minSize={30}>
        <main>LEL</main>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}

interface IconProps extends Omit<LucideProps, "ref"> {
  name: string;
}

const LazyIcon = ({ name, ...props }: IconProps) => {
  const LucideIcon = lazy(dynamicIconImports[name as keyof typeof dynamicIconImports]);

  return (
    <Suspense fallback={<div className="h-1 w-1 bg-gray" />}>
      <LucideIcon {...props} />
    </Suspense>
  );
};
