import React, { ComponentProps } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

import { DefaultsType } from "../types";

export const TextareaTypes = {
  sizes: ["small", "medium", "large"] as const,
  states: ["focused", "hovered"] as const,
};

export type TextareaProps = {
  color?: typeof DefaultsType["colors"][number];
  fixedSize?: boolean;
  size?: typeof TextareaTypes["sizes"][number];
  state?: typeof TextareaTypes["states"][number];
  className?: string;
} & Omit<ComponentProps<'textarea'>, 'size'>;

export const Textarea: React.FC<TextareaProps> = props => {

  const { fixedSize, color, size, state, className, ...rest } = props;

  return (
    <textarea
      className={classNames(
        "textarea",
        {
          "has-fixed-size": fixedSize,
          [`is-${color}`]: color,
          [`is-${size}`]: size,
          [`is-${state}`]: state,
        },
        props.className,
      )}
      {...rest}
    />
  );
}

Textarea.displayName = "Textarea";
Textarea.propTypes = {
  color: PropTypes.oneOf(DefaultsType["colors"]),
  fixedSize: PropTypes.bool,
  size: PropTypes.oneOf(TextareaTypes["sizes"]),
  state: PropTypes.oneOf(TextareaTypes["states"]),
};
