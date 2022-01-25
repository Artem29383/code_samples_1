import React, { useEffect, useCallback } from 'react';
import { LayoutProps, MarginProps } from 'styled-system';

import * as Styled from './TransparentScrollContainer.styled';

type Props = {
  id: string;
  isOpen: boolean;
  children: React.ReactNode;
  maxContentHeight: number;
} & LayoutProps &
  MarginProps;

export const TransparentScrollContainer = ({
  id,
  isOpen,
  children,
  maxContentHeight,
  ...rest
}: Props) => {
  const querySelector = useCallback(
    (query: string) =>
      document.querySelector<HTMLDivElement>(`#${id} ${query}`)!,
    [id]
  );

  useEffect(() => {
    if (isOpen) {
      const topShadow = querySelector('#transparent-modal-shadow-top');
      const bottomShadow = querySelector('#transparent-modal-shadow-bottom');
      const content = querySelector('#transparent-modal-content');

      if (content.scrollHeight > maxContentHeight) {
        /* TODO Remove event listner on unmount */
        bottomShadow.style.opacity = '1';

        content.addEventListener('scroll', () => {
          if (content.scrollTop > 0) {
            topShadow.style.opacity = '1';
            if (
              Math.ceil(content.offsetHeight + content.scrollTop) ===
              content.scrollHeight
            ) {
              bottomShadow.style.opacity = '0';
            } else {
              bottomShadow.style.opacity = '1';
            }
          } else {
            topShadow.style.opacity = '0';
          }
        });
      }
    }
  }, [isOpen, maxContentHeight, querySelector]);

  return (
    <Styled.Root id={id} {...rest}>
      <Styled.TopShadow id="transparent-modal-shadow-top" />
      <Styled.Content
        maxHeight={maxContentHeight}
        id="transparent-modal-content"
      >
        {children}
      </Styled.Content>
      <Styled.BottomShadow id="transparent-modal-shadow-bottom" />
    </Styled.Root>
  );
};

export default TransparentScrollContainer;
