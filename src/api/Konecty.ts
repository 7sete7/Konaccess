import Access from '@/lib/Access';
import parseMenu from '@/lib/parseMenu';
import parseView from '@/lib/parseView';
import { KonectyMenu } from '@/types/menu';
import { KonectyModule } from '@/types/module';
import { KonectyClient } from '@konecty/sdk/Client';
import { UpdateAccessPayload } from '@konecty/sdk/types/access';

const moduleCache: Record<string, KonectyModule> = {};

const konectyClient = new KonectyClient({
	endpoint: import.meta.env.VITE_KONECTY_URL ?? 'http://localhost:3000',
	accessKey: import.meta.env.VITE_KONECTY_TOKEN ?? '',
});

export const fetchView = async (moduleName: string) => {
	try {
		const view = await konectyClient.getForm(moduleName);
		if (view.success === false) {
			console.error(view);
			return null;
		}

		const module = await konectyClient.getDocument(view.data.document);
		if (module.success === false) {
			console.error(module);
			return null;
		}

		moduleCache[moduleName] = module.data as unknown as KonectyModule;
		return parseView(view.data, module.data as unknown as KonectyModule);
	} catch (error) {
		console.error(error);
		return null;
	}
};

export const fetchModules = async () => {
	try {
		const menu = await konectyClient.getMenu();

		if (menu.success === false) {
			console.error(menu);
			return [];
		}

		return parseMenu((menu.data ?? []) as unknown as KonectyMenu[]);
	} catch (error) {
		console.error(error);
		return [];
	}
};

export const fetchAccesses = async (moduleName: string) => {
	try {
		const accesses = await konectyClient.getAccesses(moduleName);

		if (accesses.success === false) {
			console.error(accesses);
			return [];
		}

		return accesses.data?.map(metaAccess => new Access(metaAccess)) ?? [];
	} catch (error) {
		console.error(error);
		return [];
	}
};

export const fetchModule = async (moduleName: string) => {
	if (moduleCache[moduleName]) {
		return moduleCache[moduleName];
	}

	const module = await konectyClient.getDocument(moduleName);
	return module.data as unknown as KonectyModule;
};

export const saveAccess = async (access: Access, data: UpdateAccessPayload) => {
	try {
		return await konectyClient.updateAccess(access.document, access.name, data);
	} catch (error) {
		console.error(error);
		return { success: false, errors: [{ message: (error as Error).message }] };
	}
};

export default konectyClient;
