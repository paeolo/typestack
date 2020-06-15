import classNames from "classnames";
import React from "react";

export type NavbarDividerProps = {
  className?: string;
}

export const NavbarDivider: React.FC<NavbarDividerProps> = props => {
  const { className, ...rest } = props;

  return (
    <div
      className={classNames("navbar-divider", className)}
      {...rest}
    />
  );
}

NavbarDivider.displayName = "Navbar.Divider";
