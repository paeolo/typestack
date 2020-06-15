import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

export type NavbarLinkProps = {
  arrowless?: boolean;
  onClick?: React.MouseEventHandler;
  className?: string;
};

export const NavbarLink: React.FC<NavbarLinkProps> = props => {

  const { arrowless, className, onClick, ...rest } = props;

  return (
    <span
      className={classNames(
        "navbar-link",
        { "is-arrowless": arrowless },
        className,
      )}
      onClick={onClick}
      {...rest}
    />
  );
}

NavbarLink.displayName = "Navbar.Link";
NavbarLink.propTypes = {
  arrowless: PropTypes.bool,
  onClick: PropTypes.func,
};
