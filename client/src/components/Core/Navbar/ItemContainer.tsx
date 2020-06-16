import classNames from "classnames";
import React from "react";

export type NavbarItemContainerProps = {
  active?: boolean;
  dropdown?: boolean;
  expanded?: boolean;
  hoverable?: boolean;
  managed?: boolean;
  onClick?: React.MouseEventHandler;
  tab?: boolean;
  up?: boolean;
  initialClassName?: string;
  href?: string;
};

export const NavbarItemContainer: React.FC<NavbarItemContainerProps> = React.forwardRef(
  (props, ref) => {
    const {
      active,
      initialClassName,
      dropdown,
      expanded,
      hoverable,
      managed,
      onClick,
      tab,
      up,
      href,
      ...rest
    } = props;

    const className = classNames(
      "navbar-item",
      {
        "has-dropdown": dropdown,
        "has-dropdown-up": up,
        "is-active": active,
        "is-expanded": expanded,
        "is-hoverable": hoverable,
        "is-tab": tab,
      },
      initialClassName,
    );

    if (dropdown === true) {
      return (
        <div className={className} {...rest} />
      );
    }

    return (
      <a
        className={className}
        onClick={onClick}
        href={href}
        {...rest}
      />
    );
  }
);
