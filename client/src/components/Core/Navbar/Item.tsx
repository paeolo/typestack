import PropTypes from "prop-types";

import { NavbarItemContainer } from "./ItemContainer";

export const NavbarItem = Object.assign(
  NavbarItemContainer,
  { Container: NavbarItemContainer },
);

NavbarItem.displayName = "Navbar.Item";
NavbarItem.propTypes = {
  active: PropTypes.bool,
  dropdown: PropTypes.bool,
  expanded: PropTypes.bool,
  hoverable: PropTypes.bool,
  managed: PropTypes.bool,
  onClick: PropTypes.func,
  tab: PropTypes.bool,
  up: PropTypes.bool,
};
