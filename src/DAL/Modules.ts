import getClient from './Client';

export const getModuleViewFor = (moduleName: string): Konecty.ViewSection[] => [
	{
		label: 'Informações',
		icon: 'info-sign',
		fields: [
			{ label: 'Situação', name: 'status', type: 'picklist' },
			{ label: 'Estágio do Cadastramento', name: 'editorialStatus', type: 'picklist' },
		],
	},
	{
		label: 'Detalhes',
		icon: 'zoom-in',
		fields: [
			{ label: 'Zona', name: 'zone', type: 'text' },
			{ label: 'Elevadores', name: 'elevators', type: 'text' },
		],
	},
];

export const getModules = async (): Promise<Konecty.Module[]> => {
	const mods = await getClient().modules.getAll.query();
	console.log(mods);
	return [
		{ title: 'Imóveis', iconName: 'building', version: { name: '1.3', date: new Date() } },
		{ title: 'Empreendimentos', iconName: 'flag', version: { name: '1.0', date: new Date() } },
	];
};

const rules: Konecty.Rule[] = [
	{ _id: 'rule-1', label: 'Apenas visualização', fields: ['Situação', 'Estágio do cadastramento'], totalFields: 5 },
	{ _id: 'rule-2', label: 'Aberto', fields: ['Imagens', 'Elevadores'], totalFields: 5 },
];

export const getRolesFor = (moduleName: string): Konecty.Role[] => [
	{ _id: 'abc123', label: 'Corretor', rules },
	{ _id: 'def456', label: 'Gerente', rules: [] },
	{ _id: 'ghi789', label: 'Diretor Comercial', rules: [] },
];
