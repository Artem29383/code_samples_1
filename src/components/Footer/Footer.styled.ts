import styled from 'styled-components';

import { Colors, LayoutSizes } from '@types';

import { textMixin } from 'styles/helpers';

export const Root = styled.footer`
  display: flex;
  height: ${LayoutSizes.footerHeight}px;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    to top,
    ${Colors.cornFlowerBlue},
    ${Colors.melrose}
  );
`;

export const Content = styled.span`
  ${textMixin({ color: 'white' })}
`;
