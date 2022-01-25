import React from 'react';

import { Colors } from '@types';

import * as Styled from './Spinner.styled';
import { PositionProps } from 'styled-system';

const Spinner = ({
  color = Colors.malibu,
  ...props
}: { color?: string } & PositionProps) => (
  // @ts-ignore
  <Styled.Root {...props} color={color} />
);

export default Spinner;
