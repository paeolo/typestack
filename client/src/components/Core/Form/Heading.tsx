import classNames from "classnames";
import React, { ComponentProps } from "react";

export type HeadingProps = {
  className?: string;
} & ComponentProps<'p'>;

export const Heading: React.FC<HeadingProps> = props => {

  const { className, ...rest } = props;
  return (
    <p
      className={classNames("heading is-size-6", className)} {...rest}
      style={{ margin: '1rem 0' }}
    />
  );
}

Heading.displayName = "Heading";
