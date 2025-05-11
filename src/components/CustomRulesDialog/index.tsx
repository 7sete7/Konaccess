import { fetchView } from '@/api/Konecty';
import { DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import AppContext from '@/context';
import { FieldsState } from '@/layout/AccessSection/FieldTable';
import { OPERATORS } from '@/lib/consts';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { useCallback, useContext, useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import { Button } from '../ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible';
import { Input } from '../ui/input';
import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group';

type CustomRule = {
	name: string;
	term?: string;
	operator?: string;
	value?: string;
};

export default function CustomRulesDialog() {
	const [{ selectedModule, selectedAccess }] = useContext(AppContext);
	const [fieldsData, setFieldsData] = useState<FieldsState>({});
	const [inputValue, setInputValue] = useState('');

	const { isLoading: viewLoading, data: viewData } = useQuery(
		['view', selectedModule?.name],
		() => fetchView(selectedModule!.name),
		{
			enabled: selectedModule != null && selectedAccess != null,
		},
	);

	const [customRule, setCustomRule] = useState<CustomRule>({ name: '' });
	console.log('viewData', viewData);

	const onSelectRuleItem = useCallback(
		(item: string) => (value: string) => {
			setCustomRule(prev =>
				Object.assign(
					{},
					prev,
					{ [item]: value == '' ? null : value },
					item === 'term' && value === '' ? { operator: null } : {},
				),
			);
		},
		[],
	);

	const fields = useMemo(() => {
		if (viewData == null) return [];

		return viewData.flatMap(section =>
			section.fields.map(field => (
				<ToggleGroupItem key={field.name} value={field.name}>
					{field.label}
				</ToggleGroupItem>
			)),
		);
	}, [viewData]);

	const operators = useMemo(() => {
		if (viewData == null) return [];

		return OPERATORS.map(operator => (
			<ToggleGroupItem key={operator.value} value={operator.value}>
				{operator.label}
			</ToggleGroupItem>
		));
	}, [viewData]);

	// const values = useMemo(() => {
	// 	if (userModule == null) return [];

	// 	return userModule.fields.map(field => field.name);
	// }, [userModule]);

	const isFixedValue = useMemo(() => customRule.value === 'custom', [customRule.value]);

	const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);
	}, []);

	return (
		<DialogContent className="h-3/4 w-5/6 max-w-none md:w-4/6 md:max-w-screen-md z-50 flex flex-col justify-between">
			<DialogHeader>
				<DialogTitle>Regras personalizadas</DialogTitle>
			</DialogHeader>
			<div className="grid grid-cols-3 gap-2 overflow-hidden">
				<ToggleGroup
					type="single"
					className="flex flex-col gap-2 overflow-y-scroll"
					onValueChange={onSelectRuleItem('term')}
					value={customRule.term}
				>
					{fields}
				</ToggleGroup>
				<ToggleGroup
					disabled={customRule.term == null}
					value={customRule.operator}
					type="single"
					className="flex flex-col gap-2"
					onValueChange={onSelectRuleItem('operator')}
				>
					{operators}
				</ToggleGroup>
				<ToggleGroup
					disabled={customRule.term == null || customRule.operator == null}
					type="single"
					className="flex flex-col gap-2 overflow-y-scroll"
					onValueChange={onSelectRuleItem('value')}
				>
					<Collapsible open={isFixedValue} className="w-full">
						<CollapsibleTrigger className="w-full flex justify-between">
							<ToggleGroupItem value="custom" className="hover:bg-accent w-full">
								<span>Usar valor fixo</span>
								{isFixedValue ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
							</ToggleGroupItem>
						</CollapsibleTrigger>
						<CollapsibleContent>
							<div className="flex items-center w-full px-2 py-4">
								<Input
									placeholder="Digite um valor..."
									value={inputValue}
									onChange={handleInputChange}
									className="h-full w-full border-0 focus-visible:ring-0 focus-visible:ring-offset-0 px-3 py-2 border-b border-b-gray-600 rounded-none"
								/>
							</div>
						</CollapsibleContent>
					</Collapsible>
					<ToggleGroupItem value="value1">Valor 1</ToggleGroupItem>
					<ToggleGroupItem value="value2">Valor 2</ToggleGroupItem>
					<ToggleGroupItem value="value3">Valor 3</ToggleGroupItem>
				</ToggleGroup>
			</div>
			<DialogFooter>
				<Button disabled={customRule.term == null || customRule.operator == null || customRule.value == null}>
					Adicionar
				</Button>
			</DialogFooter>
		</DialogContent>
	);
}
