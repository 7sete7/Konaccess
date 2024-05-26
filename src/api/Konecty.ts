import parseMenu from "@/lib/parseMenu";
import parseView from "@/lib/parseView";
import { KonectyMenu } from "@/types/menu";
import { KonectyModule } from "@/types/module";
import { KonectyClient } from "@konecty/sdk/Client";

const konectyClient = new KonectyClient({
  endpoint: import.meta.env.VITE_KONECTY_URL ?? "http://localhost:3000",
  accessKey: import.meta.env.VITE_KONECTY_TOKEN ?? "",
});

export const fetchView = async (moduleName: string) => {
  try {
    const view = await konectyClient.getForm(moduleName);
    if (view.success === false) {
      return null;
    }

    const module = await konectyClient.getDocument(view.data.document);
    if (module.success === false) {
      return null;
    }

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
      return [];
    }

    return parseMenu((menu.data ?? []) as unknown as KonectyMenu[]);
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default konectyClient;
