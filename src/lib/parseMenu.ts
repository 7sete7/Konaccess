import { KonectyMenu, MenuDocument } from "@/types/menu";
import omit from "lodash/omit";

export default function parseMenu(menu: KonectyMenu[]): MenuDocument[] {
  const moduleList = menu.flatMap((menuItem) => {
    if ("children" in menuItem) {
      return [omit(menuItem, ["children"]), ...parseMenu(menuItem.children).map((child) => ({ ...child, isChild: true }))];
    }

    return menuItem;
  });

  return moduleList;
}
