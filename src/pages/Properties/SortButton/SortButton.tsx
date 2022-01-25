import React, { useRef, useCallback, MutableRefObject } from 'react';
import { motion } from 'framer-motion';

import { PositionProps, SpaceProps, LayoutProps } from 'styled-system';
import { ColorsStrings } from '@types';

import * as Styled from './SortButton.styled';

const itemTransitionSettings = { ease: 'linear', duration: 0.2 };

const itemAnimationVariants = {
  ASC: { rotate: -45 },
  DESC: { rotate: 135 },
};

type Props = {
  mode?: 'default' | 'small';
  items: {
    direction: 'ASC' | 'DESC';
    field: string;
    title: string;
    color: ColorsStrings;
  }[];
  onChange: (field: string) => void;
} & PositionProps &
  SpaceProps &
  LayoutProps;

const SortButton = React.forwardRef(
  ({ items, onChange, mode = 'default', ...rest }: Props, ref) => {
    const itemsRef = useRef<HTMLDivElement>(null);

    const handleItemClick = useCallback(
      (e: React.SyntheticEvent<HTMLElement>, id: string) => {
        e.stopPropagation();
        onChange(id);
      },
      [onChange]
    );

    return (
      <Styled.Root
        ref={ref as MutableRefObject<HTMLInputElement>}
        mode={mode}
        {...rest}
      >
        <Styled.Items ref={itemsRef} style={{ display: 'flex' }}>
          {items.map(({ title, field, color, direction }) => (
            <Styled.Item
              key={field}
              color={color}
              mode={mode}
              onClick={(e: React.SyntheticEvent<HTMLElement>) =>
                handleItemClick(e, field)
              }
            >
              <motion.span
                variants={itemAnimationVariants}
                transition={itemTransitionSettings}
                animate={direction}
                initial={itemAnimationVariants[direction]}
              />
              <span>{title}</span>
            </Styled.Item>
          ))}
        </Styled.Items>
      </Styled.Root>
    );
  }
);

export default SortButton;
