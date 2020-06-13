import classNames from "classnames";
import React from "react";

import { MenuListItem } from "./MenuListItem";

interface MenuListProps {
  className?: string;
  children?: React.ReactNode;
}

export const MenuList = Object.assign(
  (props: MenuListProps) => {
    return (
      <ul
        className={classNames("menu-list", props.className)}>
        {props.children}
      </ul>
    );
  },
  {
    Item: MenuListItem,
    displayName: "Menu.List"
  },
);
