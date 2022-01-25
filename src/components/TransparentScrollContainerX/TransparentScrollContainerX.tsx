import React, { useCallback, useEffect, useRef, useState } from 'react';
import { MarginProps } from 'styled-system';

import * as Styled from './TransparentScrollContainerX.styled';

type Props = {
  children: React.ReactNode;
  contentLeftHorOffset?: number;
  setShadowTape?: (p: null | HTMLDivElement) => void;
} & MarginProps;

const TransparentScrollContainerX = ({
  children,
  contentLeftHorOffset = 0,
  setShadowTape,
  ...rest
}: Props) => {
  const $element = useRef<HTMLDivElement>(null);
  const $shadowLeft = useRef<HTMLDivElement>(null);
  const $shadowRight = useRef<HTMLDivElement>(null);
  const [node, setNode] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if ($element.current) {
      setNode($element.current);
      if (setShadowTape) {
        setShadowTape($element.current);
      }
    }
  }, [$element, setShadowTape]);

  const opacityChanged = useCallback(() => {
    const styledLeftShadow = $shadowLeft.current;
    const styledRightShadow = $shadowRight.current;

    if (Math.ceil(node!.scrollLeft) > 0) {
      styledLeftShadow!.style.opacity = '1';
    } else {
      styledLeftShadow!.style.opacity = '0';
    }
    if (Math.ceil(node!.scrollLeft + node!.offsetWidth) >= node!.scrollWidth) {
      styledRightShadow!.style.opacity = '0';
    } else {
      styledRightShadow!.style.opacity = '1';
    }
  }, [node]);

  useEffect(() => {
    if (node) {
      node.addEventListener('scroll', opacityChanged);
    }

    return () => {
      if (node) {
        node.removeEventListener('scroll', opacityChanged);
      }
    };
  }, [node, opacityChanged]);

  return (
    <Styled.Root {...rest}>
      <Styled.ShadowLeft ref={$shadowLeft} />
      <Styled.Content pl={contentLeftHorOffset} ref={$element}>
        {children}
      </Styled.Content>
      <Styled.ShadowRight ref={$shadowRight} />
    </Styled.Root>
  );
};

export default TransparentScrollContainerX;
