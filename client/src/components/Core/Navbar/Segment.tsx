import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

export const NavbarSegmentTypes = {
  alignments: ["start", "end"] as const,
};

export type NavbarSegmentProps = {
  align: typeof NavbarSegmentTypes["alignments"][number];
  className?: string;
};

export const NavbarSegment: React.FC<NavbarSegmentProps> = props => {

  const { align, className, ...rest } = props;

  return (
    <div
      className={classNames(className,
        {
          [`navbar-${align}`]: align,
        }
      )}
      {...rest}
    />
  );
}

NavbarSegment.displayName = "Navbar.Segment";
NavbarSegment.propTypes = {
  align: PropTypes.oneOf(NavbarSegmentTypes["alignments"]).isRequired,
};
