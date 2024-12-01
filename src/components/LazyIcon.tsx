import { Suspense, lazy, memo } from 'react';

import { cn } from '@/lib/utils';
import { LucideProps, PersonStanding } from 'lucide-react';
import dynamicIconImports from 'lucide-react/dynamicIconImports';

interface IconProps extends Omit<LucideProps, 'ref'> {
	name: string;
}

type IconKeys = keyof typeof dynamicIconImports;

function LazyIcon({ name, ...props }: IconProps) {
	const LucideIcon = lazy(dynamicIconImports[name as IconKeys] ?? dynamicIconImports['person-standing']) ?? <PersonStanding />;

	return (
		<Suspense fallback={<div className={cn('h-1 bg-gray', props.size && `w-[${Number(props.size) * 3}px]`)} />}>
			<LucideIcon {...props} />
		</Suspense>
	);
}

export default memo(LazyIcon);
