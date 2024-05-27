import { KonectyMenu, MenuDocument } from "@/types/menu";
import omit from "lodash/omit";

export default function parseMenu(menu: KonectyMenu[]): MenuDocument[] {
  const moduleList = menu
    .map((menuItem) => {
      if ("children" in menuItem) {
        return [omit(menuItem, ["children"]), ...parseMenu(menuItem.children).map((child) => ({ ...child, isChild: true }))];
      }

      return menuItem;
    })
    .flat();

  return moduleList;
}
