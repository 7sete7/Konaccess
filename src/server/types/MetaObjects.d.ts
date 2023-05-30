declare namespace MetaObjects {
	export interface Access<TModule = object> {
		_id: `${string}:access:${string}`;
		fields: Record<keyof TModule extends never ? string : keyof TModule, AccessField>;
		rules?: AccessRule[];
	}

	type AccessField = {
		[key in 'READ' | 'CREATE' | 'UPDATE']?: {
			allow: boolean;
			condition?: {
				term: string;
				operator: string;
				value: string;
			};
		};
	};

	export type Rule = 'all' | 'none' | 'only-owner' | 'within-group' | 'within-additional-groups' | 'inherit';

	export interface AccessRule {
		label: string;
		fields: string[];
		rule: {
			[key in 'READ' | 'CREATE' | 'UPDATE']: Rule;
		};
	}

	export interface Meta {
		_id: string;
		icon: string;
		label: {
			en: string;
			pt_BR: string;
		};
	}
}
