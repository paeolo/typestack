import PropTypes from "prop-types";

import { NavbarBrand } from "./Brand";
import { NavbarBurger } from "./Burger";
import { NavbarContainer, NavbarTypes } from "./Container";
import { NavbarDivider } from "./Divider";
import { NavbarDropdown } from "./Dropdown";
import { NavbarItem } from "./Item";
import { NavbarLink } from "./Link";
import { NavbarMenu } from "./Menu";
import { NavbarSegment } from "./Segment";
import { DefaultsType } from "../types";

export const Navbar = Object.assign(
  NavbarContainer,
  {
    Brand: NavbarBrand,
    Burger: NavbarBurger,
    Container: NavbarContainer,
    Divider: NavbarDivider,
    Dropdown: NavbarDropdown,
    Item: NavbarItem,
    Link: NavbarLink,
    Menu: NavbarMenu,
    Segment: NavbarSegment,
  },
);

Navbar.displayName = "Navbar";
Navbar.propTypes = {
  active: PropTypes.bool,
  color: PropTypes.oneOf(DefaultsType["colors"]),
  fixed: PropTypes.oneOf(NavbarTypes["fixedAlignments"]),
  managed: PropTypes.bool,
  transparent: PropTypes.bool,
};
