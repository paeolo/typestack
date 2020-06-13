import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";
import { TabGroup } from "./TabGroup";

export type TabProps = {
  active?: boolean;
};

const TabItem: React.FC<TabProps> = props => {
  return (
    <li className={classNames({ 'is-active': props.active })}>
      <a>
        {props.children}
      </a>
    </li>
  );
}

TabItem.displayName = "Tab";
TabItem.propTypes = {
  active: PropTypes.bool,
};

export const Tab = Object.assign(
  TabItem,
  { Group: TabGroup }
);
