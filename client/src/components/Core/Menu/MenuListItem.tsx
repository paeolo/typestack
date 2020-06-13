import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

export type MenuListItemProps = {
  active?: boolean;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
};

export const MenuListItem: React.FC<MenuListItemProps> = props => {
  return (
    <li>
      <a
        className={classNames(props.className, { "is-active": props.active })}
        style={{ padding: '0.5em 0' }}
        onClick={props.onClick}>
        {props.children}
      </a>
    </li>
  );
}

MenuListItem.displayName = "Menu.List.Item";
MenuListItem.propTypes = {
  active: PropTypes.bool,
};
