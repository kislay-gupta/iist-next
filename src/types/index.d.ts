import { IconType } from "react-icons";
export interface TopBarLink {
  icons: IconType;
  route: string;
  label: string;
}

export interface MenuLink {
  icon?: IconType;
  route: string;
  label: string;
  submenu?: MenuLink[]; // Optional submenu of the same structure
}
