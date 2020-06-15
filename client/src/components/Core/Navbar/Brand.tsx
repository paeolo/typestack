import classNames from "classnames";
import React from "react";

export type NavbarBrandProps = {
  className?: string;
}

export const NavbarBrand: React.FC<NavbarBrandProps> = props => {
  return (
    <div className={classNames("navbar-brand", props.className)}>
      {props.children}
    </div>
  );
}

NavbarBrand.displayName = "Navbar.Brand";
