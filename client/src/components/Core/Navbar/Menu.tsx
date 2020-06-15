import classNames from "classnames";
import React from "react";

export type NavbarMenuProps = {
  active?: boolean;
  className?: string;
}

export const NavbarMenu: React.FC<NavbarMenuProps> = props => {

  const { className, active, ...rest } = props;

  return (
    <div
      className={classNames(
        "navbar-menu",
        { "is-active": active },
        className,
      )}
      {...rest}
    />
  );
}

NavbarMenu.displayName = "Navbar.Menu";
