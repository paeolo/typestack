import classNames from "classnames";
import React from "react";

interface MenuLabelProps {
  className?: string;
}

export const MenuLabel: React.FC<MenuLabelProps> = props => {
  return (
    <p className={classNames("menu-label", props.className)}>
      {props.children}
    </p>

  );
}

MenuLabel.displayName = "Menu.Label";
