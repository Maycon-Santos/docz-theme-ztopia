import React, {
  FC,
  memo,
  Children,
  cloneElement,
  isValidElement,
  CSSProperties,
} from 'react';
import classNames from 'classnames/bind';

import styles from './Container.css';

const cx = classNames.bind(styles);

export interface ContainerProps {
  isCentered?: boolean;
  gap?: number;
  style?: CSSProperties;
}

export const Container: FC<ContainerProps> = memo(
  ({ isCentered, gap, style, children }) => {
    const newStyle: CSSProperties = {
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      ...style,
    };
    if (isCentered) {
      newStyle.justifyContent = 'center';
    }
    return (
      <section style={newStyle} className={cx('content')}>
        {Children.map(children, child =>
          isValidElement(child)
            ? cloneElement(child, {
                style: {
                  ...child.props.style,
                  margin: gap,
                },
              })
            : child,
        )}
      </section>
    );
  },
);

Container.defaultProps = {
  isCentered: false,
  gap: 10,
  style: {},
};
