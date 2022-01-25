import React, { memo } from 'react';

import * as Styled from './Triangle.styled';

type Props = {
  size?: number;
  showBody: boolean;
};

const Triangle = ({ size = 0.5, showBody }: Props) => {
  return <Styled.Triangle isActive={showBody} size={size} />;
};

export default memo(Triangle);
