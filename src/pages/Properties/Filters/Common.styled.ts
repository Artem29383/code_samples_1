import styled from 'styled-components';
import {
  layout,
  flexbox,
  margin,
  FlexboxProps,
  LayoutProps,
  MarginProps,
  MaxWidthProps,
  AlignItemsProps,
  maxWidth,
  alignItems,
  justifyContent,
  JustifyContentProps,
  WidthProps,
  width,
} from 'styled-system';

import { textMixin } from 'styles/helpers';
import { media } from 'styles/media';
import { FONTS } from 'styles/fonts';

export const Header = styled.h3`
  ${textMixin({
    fontType: 'bwGradualBold',
    fontSize: 22,
    color: 'mineShaft',
  })}
  text-align: center;
  margin-bottom: 60px;
`;

export const HeaderAdvanced = styled.h3<MarginProps>`
  ${textMixin({
    fontType: 'bwGradualBold',
    fontSize: 22,
    color: 'mineShaft',
  })}
  text-align: center;
  ${margin};
`;

export const HeaderTitle = styled.h3`
  ${textMixin({
    fontType: 'bwGradualBold',
    fontSize: 22,
    color: 'mineShaft',
  })}
  text-align: center;
  margin-bottom: 14px;
`;

export const ItemBox = styled.div<MaxWidthProps & AlignItemsProps>`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 25px;
  ${maxWidth};
  ${alignItems};

  & .slider {
    //margin-left: 50%;
    //transform: translateX(-50%);
  }

  ${media.tablet`
    margin-bottom: 0;
  `}
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

export const WrapperButton = styled.div`
  max-width: 213px;
  width: 100%;
  margin-bottom: 37px;

  &:not(:last-child) {
    margin-right: 15px;
  }
`;

export const SectionSlider = styled.div<JustifyContentProps>`
  display: flex;
  ${justifyContent};
  &:not(:last-child) {
    margin-bottom: 35px;
  }
`;

export const MultiplePickerContainer = styled.div<LayoutProps>`
  position: relative;
`;

export const Badges = styled.div<MarginProps>`
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;

  ${margin}

  & div {
    max-width: 83px;
    text-align: center;
  }
`;

export const Checker = styled.div<WidthProps & MarginProps>`
  height: 50px;
  background: #f3f3fb;
  border: 1px solid #ececf8;
  box-sizing: border-box;
  border-radius: 25px;
  padding: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${width};
  ${margin}
`;

export const Label = styled.div`
  font-style: normal;
  font-family: ${FONTS.LiberGrotesqueExtraBold};
  font-size: 18px;
  line-height: 18px;
  text-align: center;
  color: #768efe;
  text-shadow: -13.1644px 12.276px 62px rgba(0, 0, 0, 0.129412);
`;
