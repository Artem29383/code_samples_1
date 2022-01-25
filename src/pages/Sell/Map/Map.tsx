import React, { memo } from 'react';

import * as S from './Map.styled';

type Props = {
  $map: React.RefObject<HTMLDivElement>;
};

const Map = ({ $map }: Props) => {
  return <S.Map ref={$map} id="#map" />;
};

export default memo(Map);
