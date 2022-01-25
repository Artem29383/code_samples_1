import React from 'react';

import * as Styled from './Filters.styled';

type Props = {
  children: React.ReactNode;
};

const Filters = ({ children }: Props) => {
  return <Styled.FiltersWrapper>{children}</Styled.FiltersWrapper>;
};

export default Filters;
