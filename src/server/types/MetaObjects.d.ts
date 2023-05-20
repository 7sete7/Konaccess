declare namespace MetaObjects {
	export interface Access<TModule = string> {
		_id: `${TModule}:access:${string}`;
		fields: Record<keyof TModule, object>;
		rule?: {};
	}

	export interface AccessRule {
		label: string;
		fields: string[];
		rule: 'all' | 'none' | 'only-owner' | 'within-group' | 'within-additional-groups';
	}
}
