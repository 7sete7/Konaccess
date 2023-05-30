import getClient from './Client';

export const getModuleViewFor = (moduleName: string): KonectyClient.ViewSection[] => [
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

export const getModules = async (): Promise<KonectyClient.Module[]> => {
	const mods = await getClient().modules.getAll.query();
	console.log(mods);
	return [
		{ title: 'Imóveis', iconName: 'building', version: { name: '1.3', date: new Date() } },
		{ title: 'Empreendimentos', iconName: 'flag', version: { name: '1.0', date: new Date() } },
	];
};

const rules: KonectyClient.Rule[] = [
	{ _id: 'rule-1', label: 'Apenas visualização', fields: ['Situação', 'Estágio do cadastramento'], totalFields: 5, options: {} },
	{ _id: 'rule-2', label: 'Aberto', fields: ['Imagens', 'Elevadores'], totalFields: 5, options: {} },
];

export const getRolesFor = async (moduleName: string): Promise<KonectyClient.Role[]> => {
	const roles = await getClient().modules.getRolesFor.query(moduleName);
	return roles;
};
