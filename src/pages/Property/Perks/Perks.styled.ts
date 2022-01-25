import styled from 'styled-components';
import { margin, MarginProps } from 'styled-system';

import { media } from 'styles/media';
import { textMixin } from 'styles/helpers';

export const perksHorizontalGap = 30;
export const perkWidth = { m: 90, t: 120 };
export const perksListGap = 30;
const perksVerticalGap = 30;

export const Root = styled.div`
  margin-top: 100px;
  padding: 0 20px;

  ${media.bigDesktop`
    padding: 0;
    display: flex;
  `}
`;

export const PerkTitle = styled.div`
  ${textMixin({
    fontType: 'liberGrotesqueSemiBold',
    fontSize: 16,
    lineHeight: 25,
    align: 'center',
  })}
  
  ${media.mediumDesktop`
    font-size: 20px;
  `}

  ${media.bigDesktop`
    font-size: 22px;
  `}
`;

export const Header = styled.div`
  width: 100%;
  margin-bottom: 30px;

  ${textMixin({
    fontType: 'bwGradualBold',
    fontSize: 26,
    color: 'mineShaft',
  })}
  
  ${media.mediumDesktop`
    font-size: 30px;
  `}

  ${media.bigDesktop`
    font-size: 38px;
  `}
`;

export const Perks = styled.div<MarginProps>`
  width: 100%;

  ${margin}
`;

export const List = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: -${perksVerticalGap}px 0 0 -${perksHorizontalGap}px;
  width: calc(100% + ${perksHorizontalGap}px);
`;

export const Perk = styled.div`
  width: ${perkWidth.m}px;
  flex-shrink: 0;
  margin: ${perksVerticalGap}px 0 0 ${perksHorizontalGap}px;

  ${media.tablet`
    width: ${perkWidth.t}px;
  `}
`;

export const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70px;
  margin-bottom: 10px;
`;
