import React from 'react';
import { PositionProps } from 'styled-system';

import * as Styled from './FilterButton.styled';

type Props = {
  onClick?: () => void;
} & PositionProps;

export const FilterButton = ({ onClick = () => {}, ...rest }: Props) => (
  <Styled.Root onClick={onClick} {...rest}>
    <Styled.ToggleIcon />
    <Styled.ToggleIcon />
  </Styled.Root>
);

export default FilterButton;
