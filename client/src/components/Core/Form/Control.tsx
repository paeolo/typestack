import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

export const ControlTypes = {
  sizes: ["small", "medium", "large"] as const,
};

export type ControlProps = {
  expanded?: boolean;
  iconLeft?: boolean;
  iconRight?: boolean;
  loading?: boolean;
  size?: typeof ControlTypes["sizes"][number];
  className?: string;
};

export const Control: React.FC<ControlProps> = props => {
  return (
    <div
      className={classNames("control", props.className,
        {
          "has-icons-left": props.iconLeft,
          "has-icons-right": props.iconRight,
          "is-expanded": props.expanded,
          "is-loading": props.loading,
          [`is-${props.size}`]: props.size,
        },
      )}>
      {props.children}
    </div>
  )
}

Control.displayName = "Control";
Control.propTypes = {
  expanded: PropTypes.bool,
  iconLeft: PropTypes.bool,
  iconRight: PropTypes.bool,
  loading: PropTypes.bool,
  size: PropTypes.oneOf(ControlTypes['sizes']),
};
