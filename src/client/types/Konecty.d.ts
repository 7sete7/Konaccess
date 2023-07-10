declare namespace KonectyClient {
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
		_id: string;
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
		options: RuleOptions;
	}

	export interface RuleOptions {
		view?: MetaObjects.Rule;
		edit?: MetaObjects.Rule;
		create?: MetaObjects.Rule;
	}
}
