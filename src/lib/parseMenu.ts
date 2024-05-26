import { KonectyMenu, MenuDocument } from "@/types/menu";
import omit from "lodash/omit";

type ParsedMenu = (MenuDocument & { isChild?: boolean })[];

export default function parseMenu(menu: KonectyMenu[]): ParsedMenu {
  const moduleList = menu
    .map((menuItem) => {
      if ("children" in menuItem) {
        return [omit(menuItem, ["children"]), ...parseMenu(menuItem.children).map((child) => ({ ...child, isChild: true }))];
      }

      return menuItem;
    })
    .flat() as ParsedMenu;

  return moduleList;
}
