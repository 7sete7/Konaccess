import { DialogTrigger } from '@/components/ui/dialog';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectSeparator,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Button } from './ui/button';

import { cn } from '@/lib/utils';
import { Eye, Pencil, PlusCircle } from 'lucide-react';

const selectTypes = {
	read: {
		icon: Eye,
		label: 'Pode ler:',
	},
	edit: {
		icon: Pencil,
		label: 'Pode editar:',
	},
	create: {
		icon: PlusCircle,
		label: 'Pode criar:',
	},
};

type OptionSelectProps = {
	type: keyof typeof selectTypes;
	variant: keyof typeof variants;
	value?: string;
	onChange?: (value: string) => void;
};

const variants = {
	standalone: {
		withLabel: true,
		withIcon: true,
		withBorder: true,
		placeholder: 'Selecione...',
	},
	table: {
		withLabel: false,
		withIcon: false,
		withBorder: false,
		placeholder: null,
	},
};

export default function OptionSelect({ type, variant, value, onChange }: OptionSelectProps) {
	const { icon: Icon, label } = selectTypes[type];
	const { withLabel, withIcon, withBorder, placeholder } = variants[variant];

	return (
		<>
			{withLabel && <label className="block text-sm mb-2">{label}</label>}
			<Select onValueChange={onChange} value={value} defaultValue="any">
				<SelectTrigger className={cn('py-1 px-2', withBorder === false && 'border-0')}>
					{withIcon && <Icon size={16} />}
					<SelectValue placeholder={placeholder} />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="any">Todos os usuários</SelectItem>
					<SelectItem value="only-_user">Apenas o responsável</SelectItem>
					<SelectItem value="_user-and-group">O responsável e seu gerente</SelectItem>
					<SelectItem value="_user-and-allgroups">O responsável e seus superiores</SelectItem>
					<SelectItem value="none">Não pode</SelectItem>
					<SelectSeparator />
					<SelectGroup>
						<SelectLabel>
							<div className="flex items-center justify-between gap-2">
								<span>Minhas regras</span>
								<DialogTrigger asChild>
									<Button variant="ghost" size="icon">
										<PlusCircle size={16} />
									</Button>
								</DialogTrigger>
							</div>
						</SelectLabel>
						<SelectItem value="group-1">Grupo 1</SelectItem>
					</SelectGroup>
				</SelectContent>
			</Select>
		</>
	);
}
