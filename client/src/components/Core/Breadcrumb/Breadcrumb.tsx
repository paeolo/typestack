import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import { BreadcrumbItem } from "./BreadcrumbItem";

export const BreadcrumbTypes = {
  alignments: ['centered', 'right'] as const,
  separators: ['arrow', 'bullet', 'dot', 'succeeds'] as const,
  sizes: ['small', 'medium', 'large'] as const,
};

export type BreadcrumbProps = {
  align?: typeof BreadcrumbTypes['alignments'][number];
  separator?: typeof BreadcrumbTypes['separators'][number];
  size?: typeof BreadcrumbTypes['sizes'][number];
  className?: string;
};

const BreadcrumbElement: React.FC<BreadcrumbProps> = props => {
  return (
    <nav
      className={classNames("breadcrumb", props.className,
        {
          [`has-${props.separator}-separator`]: props.separator,
          [`is-${props.align}`]: props.align,
          [`is-${props.size}`]: props.size,
        },
      )}>
      <ul>{props.children}</ul>
    </nav>
  );
};

BreadcrumbElement.propTypes = {
  align: PropTypes.oneOf(BreadcrumbTypes['alignments']),
  separator: PropTypes.oneOf(BreadcrumbTypes['separators']),
  size: PropTypes.oneOf(BreadcrumbTypes['sizes']),
};

export const Breadcrumb = Object.assign(
  BreadcrumbElement,
  {
    displayName: 'Breadcrumb',
    Item: BreadcrumbItem
  },
);
