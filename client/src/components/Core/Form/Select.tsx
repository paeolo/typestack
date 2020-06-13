import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import { SelectOption } from "./SelectOption";
import { DefaultsType } from "../types";

export const SelectContainerTypes = {
  sizes: ["small", "medium", "large"] as const,
  states: ["focused", "hovered", "loading"] as const,
};

export type SelectContainerProps = {
  color?: typeof DefaultsType["colors"][number];
  fullwidth?: boolean;
  rounded?: boolean;
  size?: typeof SelectContainerTypes["sizes"][number];
  state?: typeof SelectContainerTypes["states"][number];
  className?: string;
};

const mapSelectContainerChildren = (
  children: React.ReactNode,
  state?: typeof SelectContainerTypes["states"][number],
) => {
  let classNameExtension: string | undefined;
  const mapped = React.Children.map(children, (child, i) => {
    if (typeof child === "object" && child !== null && "type" in child) {
      if (child.type === "select" || child.type === Select) {
        classNameExtension = classNames({
          "is-multiple": (child.props as React.SelectHTMLAttributes<Element>)
            .multiple,
        });
        if (state === "focused" || state === "hovered") {
          return React.cloneElement(child, {
            className: classNames(
              `is-${state}`,
              (child.props as React.SelectHTMLAttributes<Element>).className,
            ),
          });
        }

        return child;
      } else if (child.type === React.Fragment) {
        const fragmentMapped = mapSelectContainerChildren(
          (child.props as React.ComponentPropsWithoutRef<typeof React.Fragment>)
            .children,
          state,
        );
        classNameExtension = classNames(
          classNameExtension,
          fragmentMapped.classNameExtension,
        );

        return <React.Fragment children={fragmentMapped.children} />;
      }
    }
    return child;
  });

  return { children: mapped, classNameExtension };
};

export const SelectContainer: React.FC<SelectContainerProps> = props => {
  const mapped = mapSelectContainerChildren(props.children, props.state);

  return (
    <div
      className={classNames(
        "select",
        {
          [`is-${props.color}`]: props.color,
          "is-fullwidth": props.fullwidth,
          "is-loading": props.state === "loading",
          "is-rounded": props.rounded,
          [`is-${props.size}`]: props.size,
        },
        mapped.classNameExtension,
        props.className,
      )}>
      {mapped.children}
    </div>
  );
}

SelectContainer.displayName = "Select.Container";
SelectContainer.propTypes = {
  color: PropTypes.oneOf(DefaultsType["colors"]),
  fullwidth: PropTypes.bool,
  rounded: PropTypes.bool,
  size: PropTypes.oneOf(SelectContainerTypes["sizes"]),
  state: PropTypes.oneOf(SelectContainerTypes["states"]),
};

export const Select = Object.assign(
  props => <select {...props} />,
  {
    Container: SelectContainer,
    Option: SelectOption,
  },
  {
    displayName: "Select"
  }
);
