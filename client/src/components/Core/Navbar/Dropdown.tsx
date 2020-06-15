import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

export const NavbarDropdownTypes = {
  alignments: ["right"] as const,
};

export type NavbarDropdownProps = {
  align?: typeof NavbarDropdownTypes["alignments"][number];
  boxed?: boolean;
  className?: string;
};

export const NavbarDropdown: React.FC<NavbarDropdownProps> = props => {

  const { align, boxed, className, ...rest } = props;

  return (
    <span
      className={classNames(
        "navbar-dropdown",
        {
          [`is-${align}`]: align,
          "is-boxed": boxed,
        },
        className,
      )}
      {...rest}
    />
  );
}

NavbarDropdown.displayName = "Navbar.Dropdown";
NavbarDropdown.propTypes = {
  align: PropTypes.oneOf(NavbarDropdownTypes["alignments"]),
  boxed: PropTypes.bool,
};
