import styled from 'styled-components';
import {
  layout,
  margin,
  padding,
  flexbox,
  position,
  typography,
  FontSizeProps,
} from 'styled-system';
import _omit from 'lodash/omit';

import { TextProps } from '@types';

import { textMixin, translateProps } from 'styles/helpers';

export const Root = styled.div<
  { cursor: 'pointer' | 'default' } & Omit<
    TextProps,
    'fontSize' | 'lineHeight'
  > &
    FontSizeProps
>`
  position: static;
  cursor: ${p => p.cursor};

  ${props =>
    textMixin(
      _omit(props, ['fontSize', 'lineHeight']) as Omit<
        TextProps,
        'fontSize' | 'lineHeight'
      >
    )}

  ${flexbox}
  ${layout}
  ${margin}
  ${padding}
  ${position}
  ${typography}
  ${translateProps}
`;
