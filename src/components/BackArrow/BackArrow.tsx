/* eslint-disable jsx-a11y/alt-text */

import React from 'react';

import * as Styled from './BackArrow.styled';

import { MarginProps } from '@types';

const BackArrow = ({ ...rest }: MarginProps) => {
  return (
    <Styled.Root {...rest}>
      <span />
      <span />
    </Styled.Root>
  );
};

export default BackArrow;
