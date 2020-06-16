import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

export type NavbarBurgerProps = {
  active?: boolean;
  onClick?: React.MouseEventHandler;
  className?: string;
};

export const NavbarBurger: React.FC<NavbarBurgerProps> = props => {

  const { active, className, onClick, ...rest } = props;

  return (
    <div
      className={classNames("navbar-burger", className,
        { "is-active": active },
      )}
      onClick={onClick}
      role="button"
      {...rest}
    >
      <span />
      <span />
      <span />
    </div>
  );
}

NavbarBurger.displayName = "Navbar.Burger";
NavbarBurger.propTypes = {
  onClick: PropTypes.func,
};
