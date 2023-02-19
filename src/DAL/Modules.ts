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
