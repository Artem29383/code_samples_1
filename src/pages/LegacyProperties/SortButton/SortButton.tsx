import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  MutableRefObject,
} from 'react';
import { useAnimation, motion } from 'framer-motion';

import { PositionProps, SpaceProps, LayoutProps } from 'styled-system';
import { ColorsStrings } from '@types';

import useToggle from 'hooks/useToggle';

import * as Styled from './SortButton.styled';

const transitionSettings = { ease: 'easeIn', duration: 0.3 };
const itemTransitionSettings = { ease: 'linear', duration: 0.2 };

const arrowsAnimationVariants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const rootAnimationVariants = {
  closed: { width: 50 },
  open: { width: 500 },
};

const itemsAnimationVariants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const itemAnimationVariants = {
  ASC: { rotate: -45 },
  DESC: { rotate: 135 },
};

type Props = {
  open?: boolean;
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
  (
    { items, onChange, open = false, mode = 'default', ...rest }: Props,
    ref
  ) => {
    const [_open, toggleOpen] = useToggle(open);
    const [opened, setOpened] = useState(_open);
    const mounted = useRef<boolean>(false);
    const itemsRef = useRef<HTMLDivElement>(null);
    const arrowsRef = useRef<HTMLDivElement>(null);

    const arrowsAnimation = useAnimation();
    const rootAnimation = useAnimation();
    const itemsAnimation = useAnimation();

    useEffect(() => {
      const animationSequence = async () => {
        if (_open) {
          await arrowsAnimation.start(arrowsAnimationVariants.hidden);
          await rootAnimation.start(rootAnimationVariants.open);
          itemsRef.current!.style.display = 'flex';
          arrowsRef.current!.style.display = 'none';
          setOpened(true);
          await itemsAnimation.start(itemsAnimationVariants.visible);
        } else {
          await itemsAnimation.start(itemsAnimationVariants.hidden);
          setOpened(false);
          await rootAnimation.start(rootAnimationVariants.closed);
          itemsRef.current!.style.display = 'none';
          arrowsRef.current!.style.display = 'block';
          await arrowsAnimation.start(arrowsAnimationVariants.visible);
        }
      };

      if (mounted.current) {
        animationSequence();
      } else {
        mounted.current = true;
      }
    }, [arrowsAnimation, itemsAnimation, rootAnimation, _open, toggleOpen]);

    const rootInitial = open
      ? rootAnimationVariants.open
      : rootAnimationVariants.closed;

    const arrowsInitial = open
      ? arrowsAnimationVariants.hidden
      : arrowsAnimationVariants.visible;

    const itemsInitial = open
      ? itemsAnimationVariants.visible
      : itemsAnimationVariants.hidden;

    const handleItemClick = useCallback(
      (e: React.SyntheticEvent<HTMLElement>, id: string) => {
        e.stopPropagation();
        onChange(id);
      },
      [onChange]
    );

    return (
      <Styled.Root
        onClick={toggleOpen}
        initial={rootInitial}
        animate={rootAnimation}
        transition={transitionSettings}
        opened={opened}
        ref={ref as MutableRefObject<HTMLInputElement>}
        mode={mode}
        {...rest}
      >
        {/* Create common arrow comonent for back arrow also */}
        <motion.div
          initial={arrowsInitial}
          animate={arrowsAnimation}
          transition={transitionSettings}
        >
          <Styled.Arrows
            ref={arrowsRef}
            style={{ display: open ? 'none' : 'block' }}
          >
            <Styled.Arrow />
            <Styled.Arrow />
          </Styled.Arrows>
        </motion.div>
        <Styled.Items
          ref={itemsRef}
          initial={itemsInitial}
          animate={itemsAnimation}
          style={{ display: open ? 'flex' : 'none' }}
        >
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
