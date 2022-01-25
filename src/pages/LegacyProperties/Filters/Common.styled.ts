import styled from 'styled-components';
import {
  layout,
  flexbox,
  margin,
  FlexboxProps,
  LayoutProps,
  MarginProps,
} from 'styled-system';

import { textMixin } from 'styles/helpers';

export const Header = styled.h3`
  margin-bottom: 15px;

  ${textMixin({
    fontType: 'bwGradualBold',
    fontSize: 22,
    color: 'mineShaft',
  })}
`;

export const Subheader = styled.h3`
  margin-bottom: 15px;

  ${textMixin({
    fontType: 'liberGrotesqueExtraBold',
    fontSize: 16,
    color: 'bombay',
  })}
`;

export const Subtitle = styled.h3`
  margin-bottom: 15px;

  ${textMixin({
    fontType: 'liberGrotesqueBold',
    fontSize: 14,
    color: 'argent',
  })}
`;

export const Section = styled.div<LayoutProps & FlexboxProps>`
  &:not(:last-child) {
    margin-bottom: 35px;
  }

  ${flexbox}
  ${layout}
`;

export const MultiplePickerContainer = styled.div<LayoutProps>`
  position: relative;
`;

export const Badges = styled.div<MarginProps>`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  ${margin}
`;
