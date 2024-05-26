import { Suspense, lazy } from "react";

import { LucideProps, PersonStanding } from "lucide-react";
import dynamicIconImports from "lucide-react/dynamicIconImports";

interface IconProps extends Omit<LucideProps, "ref"> {
  name: string;
}

export default function LazyIcon({ name, ...props }: IconProps) {
  const LucideIcon = lazy(dynamicIconImports[name as keyof typeof dynamicIconImports] ?? dynamicIconImports["person-standing"]) ?? <PersonStanding />;

  return (
    <Suspense fallback={<div className="h-1 w-1 bg-gray" />}>
      <LucideIcon {...props} />
    </Suspense>
  );
}
