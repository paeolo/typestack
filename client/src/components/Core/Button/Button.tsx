import classNames from "classnames";
import PropTypes from "prop-types";
import React, { ComponentProps } from "react";

import { ButtonGroup } from "./ButtonGroup";
import { DefaultsType } from '../types';

export const ButtonTypes = {
  sizes: ["small", "normal", "medium", "large"] as const,
  states: ["hovered", "focused", "active", "loading"] as const,
};

export type ButtonProps = {
  color?: typeof DefaultsType["colors"][number];
  fullwidth?: boolean;
  inverted?: boolean;
  outlined?: boolean;
  rounded?: boolean;
  selected?: boolean;
  size?: typeof ButtonTypes["sizes"][number];
  state?: typeof ButtonTypes["states"][number];
  static?: boolean;
  text?: boolean;
  className?: string;
  onClick?: () => void
} & ComponentProps<'button'>;

export const ButtonComponent: React.FC<ButtonProps> = props => {

  const {
    className,
    color,
    fullwidth,
    inverted,
    outlined,
    rounded,
    selected,
    size,
    state,
    static: isStatic,
    text,
    onClick,
    ...rest
  } = props;

  return (
    <button
      className={classNames("button", className,
        {
          [`is-${color}`]: color,
          "is-fullwidth": fullwidth,
          "is-inverted": inverted,
          "is-outlined": outlined,
          "is-rounded": rounded,
          "is-selected": selected,
          [`is-${size}`]: size,
          [`is-${state}`]: state,
          "is-static": isStatic,
          "is-text": text,
        },
      )}
      onClick={onClick}
      {...rest}
    />
  );
}

export const Button = Object.assign(
  ButtonComponent,
  { Group: ButtonGroup },
);

const propTypes = {
  color: PropTypes.oneOf(DefaultsType["colors"]),
  fullwidth: PropTypes.bool,
  inverted: PropTypes.bool,
  outlined: PropTypes.bool,
  rounded: PropTypes.bool,
  selected: PropTypes.bool,
  size: PropTypes.oneOf(ButtonTypes["sizes"]),
  state: PropTypes.oneOf(ButtonTypes["states"]),
  static: PropTypes.bool,
  text: PropTypes.bool,
};

Button.displayName = "Button";
Button.propTypes = propTypes;
