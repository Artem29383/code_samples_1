import React from 'react';
import { PositionProps, LayoutProps } from 'styled-system';

import { PinIcon } from 'styles/icons';

import * as Styled from './PinButton.styled';

type Props = {
  onClick?: () => void;
  disabled?: boolean;
} & LayoutProps &
  PositionProps;

export const PinButton = (props: Props) => {
  return (
    <Styled.Root {...props}>
      <PinIcon color="merlin" />
    </Styled.Root>
  );
};

export default PinButton;
