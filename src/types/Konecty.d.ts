declare namespace Konecty {
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
}
