import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

export interface BreadcrumbItemProps {
  active?: boolean;
}

export const BreadcrumbItem: React.FC<BreadcrumbItemProps> = props => {
  return (
    <li className={classNames({ "is-active": props.active })}>
      <a>
        {props.children}
      </a>
    </li>
  );
}

BreadcrumbItem.displayName = "Breadcrumb.Item";
BreadcrumbItem.propTypes = {
  active: PropTypes.bool,
};
