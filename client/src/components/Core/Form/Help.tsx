import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import { DefaultsType } from "../types";

export type HelpProps = {
  color?: typeof DefaultsType["colors"][number];
  className?: string;
};

export const Help: React.FC<HelpProps> = props => {

  const { className, color, ...rest } = props;

  return (
    <p
      className={classNames("help", { [`is-${color}`]: color }, className)}
      {...rest}
    />
  );
}

Help.displayName = "Help";
Help.propTypes = {
  color: PropTypes.oneOf(DefaultsType["colors"]),
};
