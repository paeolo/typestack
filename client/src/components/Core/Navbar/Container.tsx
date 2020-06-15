import classNames from "classnames";
import React from "react";

import { DefaultsType } from "../types";

export const NavbarTypes = {
  fixedAlignments: ["top", "bottom"] as const,
};

export type NavbarContainerProps = {
  active?: boolean;
  color?: typeof DefaultsType["colors"][number];
  fixed?: typeof NavbarTypes["fixedAlignments"][number];
  innerRef?: React.Ref<HTMLElement | SVGElement | React.ComponentType>;
  managed?: boolean;
  transparent?: boolean;
  className?: string;
};

export interface NavbarContainerState {
  active: boolean;
}

export const NavbarContainer: React.FC<NavbarContainerProps> = props => {

  const { active, className, color, fixed, innerRef, managed, transparent, ...rest } = props;

  return (
    <nav
      className={classNames(
        "navbar",
        {
          "is-transparent": transparent,
          [`is-fixed-${fixed}`]: fixed,
          [`is-${color}`]: color,
        },
        className,
      )}
      role="navigation"
      {...rest}
    />
  );
}
