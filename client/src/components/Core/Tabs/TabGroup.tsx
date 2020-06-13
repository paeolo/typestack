import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

export const TabTypes = {
  alignments: ['centered', 'right'] as const,
  sizes: ['small', 'medium', 'large'] as const,
  kinds: ['boxed', 'toggle', 'toggle-rounded'] as const,
};

export type TabGroupProps = {
  align?: typeof TabTypes['alignments'][number];
  fullwidth?: boolean;
  kind?: typeof TabTypes['kinds'][number];
  size?: typeof TabTypes['sizes'][number];
  className?: string;
};

export const TabGroup: React.FC<TabGroupProps> = props => {
  return (
    <div
      className={classNames(
        'tabs',
        props.className,
        {
          [`is-${props.align}`]: props.align,
          [`is-${props.size}`]: props.size,
          'is-fullwidth': props.fullwidth,
          [`is-${props.kind}`]: props.kind,
          'is-toggle': props.kind === 'toggle' || props.kind === 'toggle-rounded',
          'is-toggle-rounded': props.kind === 'toggle-rounded'
        }
      )}>
      <ul>
        {props.children}
      </ul>
    </div>
  );
}

TabGroup.displayName = 'Tab.Group';
TabGroup.propTypes = {
  align: PropTypes.oneOf(TabTypes['alignments']),
  fullwidth: PropTypes.bool,
  kind: PropTypes.oneOf(TabTypes['kinds']),
  size: PropTypes.oneOf(TabTypes['sizes']),
};
