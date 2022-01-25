import styled from 'styled-components';
import { margin } from 'styled-system';

import { Colors } from '@types';

import { textMixin } from 'styles/helpers';
import { media } from 'styles/media';

export const Root = styled.div`
  ${margin}
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 5px;

  ${textMixin({
    fontType: 'liberGrotesqueBold',
    fontSize: 14,
    color: 'mischka',
    align: 'left',
  })};

  ${media.tablet`
    margin-bottom: 8px;
    font-size: 16px;
  `}
`;

export const Input = styled.input<{ error: boolean }>`
  width: 100%;
  padding-bottom: 2px;
  border-bottom: 1px solid
    ${p => (p.error ? Colors.terracotta : Colors.dovGray)};
  color: ${Colors.shark};

  ::placeholder {
    color: ${Colors.catsKillWhite};
  }

  ${textMixin({
    fontType: 'bwGradualBold',
    fontSize: 14,
    align: 'left',
  })}

  ${media.tablet`
    font-size: 16px;
    padding-bottom: 8px;
  `}
`;
