import React from 'react';
import * as Styled from './Icon.styled';

import { SizeProps } from '@types';

const iconsSprite = require('assets/icons-sprite.svg');

type Props = { id: string };

const Icon = ({ id, ...rest }: Props & SizeProps) => (
  <Styled.Root {...rest}>
    <use xlinkHref={`${iconsSprite}#${id}`} />
  </Styled.Root>
);

export default Icon;
