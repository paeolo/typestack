import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import { DefaultsType } from "../types";

export const IconTypes = {
  alignments: ['left', 'right'] as const,
  sizes: ['small', 'medium', 'large'] as const,
};

export type IconProps = {
  color?: typeof DefaultsType["colors"][number];
  align?: typeof IconTypes['alignments'][number];
  size?: typeof IconTypes['sizes'][number];
  className?: string;
  icon: string;
};

export const Icon: React.FC<IconProps> = props => {
  return (
    <span
      className={classNames(
        "icon",
        props.className,
        {
          [`has-text-${props.color}`]: props.color,
          [`is-${props.align}`]: props.align,
          [`is-${props.size}`]: props.size,
        },
      )}>
      <i className={props.icon}>
        {props.children}
      </i>
    </span>
  );
}

Icon.displayName = "Icon";
Icon.propTypes = {
  color: PropTypes.oneOf(DefaultsType["colors"]),
  align: PropTypes.oneOf(IconTypes['alignments']),
  size: PropTypes.oneOf(IconTypes['sizes'])
};
