import styled from 'styled-components';
import { rgba } from 'polished';
import { position, PositionProps } from 'styled-system';

import { media } from 'styles/media';

import { Colors } from '@types';

export const Root = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100%;
  background: linear-gradient(135deg, ${Colors.mauve}, ${Colors.dodgerBlue});

  ${media.desktop`
    padding: 61px 0 52px 47px;
    overflow: hidden;
    flex-direction: row;
  `}
`;

export const Content = styled.div<
  {
    color: string;
    hide?: boolean;
    height: number;
    isDashboard: boolean;
  } & PositionProps
>`
  left: 0;
  width: 100%;
  z-index: 3;
  display: ${({ hide }) => (hide ? 'none' : 'block')};
  background-color: ${p => p.color};
  border-radius: 20px 20px 0 0;
  height: 100%;
  //top: 200px;

  ${position}

  ${media.desktop`
    // @ts-ignore
    height: ${({ height }) => `${height}%`};
    position: absolute;
    overflow: hidden;

    border-radius: 0;
    display: block;
    width: calc(100vw - 280px);
    padding: ${({ isDashboard }) => (isDashboard ? 0 : '61px 0 0 30px')};
    top: 0;
    left: initial;
    border-bottom-left-radius: 50px;
    box-shadow: 10px 12px 30px ${rgba(Colors.black, 0.1)};
    ${position}
  `}
  
  ${media.bigDesktop`
     padding: ${({ isDashboard }) => (isDashboard ? 0 : '64px 0 0 73px')};
     width: calc(100vw - 347px);
  `}
`;

export const Avatar = styled.div`
  width: 131px;
  overflow: hidden;
  height: 131px;
  min-width: 131px;
  margin-bottom: 32px;
  margin-right: 10px;
  border-radius: 50%;
  border: 6px solid white;
  background-color: ${Colors.mischka};
  box-shadow: 0px 13px 14px ${rgba(Colors.black, 0.08)};
`;

export const Controls = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  min-height: 52px;
  padding: 0 21px;

  svg {
    width: 25px;
    height: 36px;
    fill: ${Colors.white};
  }
`;

export const IconWrap = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  svg {
    fill: ${Colors.white};
  }
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
`;

export const Head = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 295px;
  margin: 0 auto;
  width: 100%;
  height: 163px;
  margin-top: 30px;
  min-height: 161px;

  ${media.desktop`
    display: none;
  `}
`;
