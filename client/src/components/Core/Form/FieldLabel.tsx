import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

export const FieldLabelTypes = {
  sizes: ["small", "normal", "medium", "large"] as const,
};

export type FieldLabelProps = {
  size?: typeof FieldLabelTypes["sizes"][number];
  className?: string;
};

export const FieldLabel: React.FC<FieldLabelProps> = props => {
  return (
    <div
      className={classNames("field-label", props.className,
        {
          [`is-${props.size}`]: props.size
        })}>
      {props.children}
    </div>
  );
}

FieldLabel.displayName = "Field.Label";
FieldLabel.propTypes = {
  size: PropTypes.oneOf(FieldLabelTypes['sizes']),
};
