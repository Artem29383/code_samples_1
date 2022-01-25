import React, { MutableRefObject } from 'react';
import { SpaceProps, PositionProps } from 'styled-system';

import * as Styled from './MapButton.styled';

type Props = {
  onClick: () => void;
  disabled: boolean;
} & SpaceProps &
  PositionProps;

export const MapButton = React.forwardRef((props: Props, ref) => (
  <Styled.Root {...props} ref={ref as MutableRefObject<HTMLInputElement>}>
    <span />
    <span />
    <span />
  </Styled.Root>
));

export default MapButton;
