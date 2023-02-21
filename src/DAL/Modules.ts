export type ViewField = {
	label: string;
	type: 'text' | 'picklist';
	name: string;
};

export interface ViewSection {
	icon: string;
	label: string;
	fields: ViewField[];
}

export interface Module {
	title: string;
	iconName: string;
	version: {
		name: string;
		date: Date;
	};
}

export interface Role {
	_id: string;
	label: string;
	rules: Rule[];
}

export interface Rule {
	_id: string;
	label: string;
	fields: string[];
	totalFields: number;
}

export const getModuleViewFor = (moduleName: string): ViewSection[] => [
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

export const getModules = (): Module[] => [
	{ title: 'Imóveis', iconName: 'building', version: { name: '1.3', date: new Date() } },
	{ title: 'Empreendimentos', iconName: 'flag', version: { name: '1.0', date: new Date() } },
];

const rules: Rule[] = [
	{ _id: 'rule-1', label: 'Apenas visualização', fields: ['Situação', 'Estágio do cadastramento'], totalFields: 5 },
	{ _id: 'rule-2', label: 'Aberto', fields: ['Imagens', 'Elevadores'], totalFields: 5 },
];

export const getRolesFor = (moduleName: string): Role[] => [
	{ _id: 'abc123', label: 'Corretor', rules },
	{ _id: 'def456', label: 'Gerente', rules: [] },
	{ _id: 'ghi789', label: 'Diretor Comercial', rules: [] },
];
