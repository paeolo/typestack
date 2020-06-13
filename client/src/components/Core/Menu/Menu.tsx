import classNames from "classnames";
import React from "react";

import { MenuLabel } from "./MenuLabel";
import { MenuList } from "./MenuList";

interface MenuProps {
  className?: string;
  children?: React.ReactNode;
}

export const Menu = Object.assign(
  (props: MenuProps) => {
    return (
      <aside className={classNames("menu", props.className)}>
        {props.children}
      </aside>
    );
  },
  {
    Label: MenuLabel,
    List: MenuList,
    displayName: "Menu",
  },
);
