import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

export const ButtonGroupTypes = {
  alignments: ["centered", "right"] as const,
  sizes: ["small", "medium", "large"] as const,
};

export type ButtonGroupProps = {
  align?: typeof ButtonGroupTypes["alignments"][number];
  hasAddons?: boolean;
  size?: typeof ButtonGroupTypes["sizes"][number];
  className?: string;
};

export const ButtonGroup: React.FC<ButtonGroupProps> = props => {
  return (
    <div
      className={classNames("buttons", props.className,
        {
          [`are-${props.size}`]: props.size,
          "has-addons": props.hasAddons,
          [`is-${[props.align]}`]: props.align,
        },
      )}>
      {props.children}
    </div>
  )
}

ButtonGroup.displayName = "Button.Group";
ButtonGroup.propTypes = {
  align: PropTypes.oneOf(ButtonGroupTypes["alignments"]),
  hasAddons: PropTypes.bool,
  size: PropTypes.oneOf(ButtonGroupTypes["sizes"]),
};
