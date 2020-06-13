import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import { Radio } from "./Radio";
import { Checkbox } from "./Checkbox";

export const LabelTypes = {
  sizes: ["small", "medium", "large"] as const,
};

export type LabelProps = {
  disabled?: boolean;
  size?: typeof LabelTypes["sizes"][number];
  className?: string;
};

const identifyLabelDiscriminator = (children: React.ReactNode) => {
  let discriminator = "label";

  React.Children.forEach(children, (child, i) => {
    if (typeof child === "object" && child !== null && "type" in child) {
      if (
        child.type === Checkbox ||
        (child.type === "input" &&
          (child.props as React.InputHTMLAttributes<Element>).type ===
          "checkbox")
      ) {
        discriminator = "checkbox";
      } else if (
        child.type === Radio ||
        (child.type === "input" &&
          (child.props as React.InputHTMLAttributes<Element>).type === "radio")
      ) {
        discriminator = "radio";
      } else if (child.type === React.Fragment) {
        discriminator = identifyLabelDiscriminator(
          (child.props as React.ComponentPropsWithoutRef<typeof React.Fragment>)
            .children,
        );
      }
    }
  });

  return discriminator;
};

export const Label: React.FC<LabelProps> = props => {
  const discriminator = identifyLabelDiscriminator(props.children);

  return (
    <label
      className={classNames(props.className,
        {
          [`${discriminator}`]: discriminator,
          "is-disabled": props.disabled,
          [`is-${props.size}`]: props.size,
        },
      )}>
      {props.children}
    </label>
  );
}

Label.displayName = "Label";
Label.propTypes = {
  disabled: PropTypes.bool,
  size: PropTypes.oneOf(LabelTypes["sizes"]),
};
