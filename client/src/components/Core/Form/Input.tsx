import classNames from "classnames";
import PropTypes from "prop-types";
import React, { ComponentProps } from "react";

import { DefaultsType } from "../types";

export const InputTypes = {
  sizes: ["small", "medium", "large"] as const,
  states: ["focused", "hovered"] as const,
  types: [
    "text",
    "email",
    "tel",
    "password",
    "number",
    "search",
    "color",
    "date",
    "time",
  ] as const,
};

export type InputProps = {
  color?: typeof DefaultsType["colors"][number];
  readOnly?: React.InputHTMLAttributes<HTMLInputElement>["readOnly"];
  rounded?: boolean;
  size?: typeof InputTypes["sizes"][number];
  state?: typeof InputTypes["states"][number];
  isStatic?: boolean;
  type?: typeof InputTypes["types"][number];
  className?: string
} & Omit<ComponentProps<'input'>, 'size'>;

export const Input: React.FC<InputProps> = props => {

  const { className, color, rounded, size, isStatic, state, readOnly, ...rest } = props;
  const isReadOnly = readOnly === true || isStatic === true;

  return (
    <input
      className={classNames(
        "input", props.className,
        {
          [`is-${color}`]: color,
          "is-rounded": rounded,
          [`is-${size}`]: size,
          "is-static": isStatic,
          [`is-${state}`]: state,
        },
      )}
      readOnly={isReadOnly}
      {...rest}
    />
  );
}

Input.displayName = "Input";
Input.propTypes = {
  color: PropTypes.oneOf(DefaultsType["colors"]),
  readOnly: PropTypes.bool,
  rounded: PropTypes.bool,
  size: PropTypes.oneOf(InputTypes["sizes"]),
  state: PropTypes.oneOf(InputTypes["states"]),
  isStatic: PropTypes.bool,
  type: PropTypes.oneOf(InputTypes["types"]),
};
