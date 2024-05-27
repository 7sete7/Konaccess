import { Suspense, lazy, useMemo } from "react";

import { cn } from "@/lib/utils";
import { LucideProps, PersonStanding } from "lucide-react";
import dynamicIconImports from "lucide-react/dynamicIconImports";

interface IconProps extends Omit<LucideProps, "ref"> {
  name: string;
}

type IconKeys = keyof typeof dynamicIconImports;

export default function LazyIcon({ name, ...props }: IconProps) {
  const LucideIcon = useMemo(() => lazy(dynamicIconImports[name as IconKeys] ?? dynamicIconImports["person-standing"]) ?? <PersonStanding />, [name]);

  return (
    <Suspense fallback={<div className={cn("h-1 bg-gray", props.size && `w-[${Number(props.size) * 3}px]`)} />}>
      <LucideIcon {...props} />
    </Suspense>
  );
}
