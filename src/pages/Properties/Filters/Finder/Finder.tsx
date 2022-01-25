import React, { memo } from 'react';

import * as Styled from './Finder.styled';

type Props = {
  reference: React.RefObject<any>;
};

const Finder = ({ reference }: Props) => (
  <Styled.FinderInput ref={reference} placeholder="Enter location..." />
);

export default memo(Finder);
