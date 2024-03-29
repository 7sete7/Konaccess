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
		_id: string;
		label: string;
		fields: string[];
		rule: {
			[key in 'READ' | 'CREATE' | 'UPDATE']: Rule;
		};
	}

	export interface Meta extends WithDualLabel {
		_id: string;
		icon: string;
		fields: {
			[key: string]: Partial<WithDualLabel>;
		};
	}

	export interface View {
		_id: `${string}:view:${string}`;
		name: string;
		visuals: [{ visuals: ViewVisual[]; type: string }];
	}

	type ViewVisual = {
		style: {
			icon: string;
		};
		type: string;
		visuals: ViewField[];
	} & WithDualLabel;

	type ViewField = {
		type: string;
		fieldName: string;
		style?: {
			readOnlyVersion: boolean;
		};
	};

	type WithDualLabel = {
		label: {
			pt_BR: string;
			en: string;
		};
	};
}
