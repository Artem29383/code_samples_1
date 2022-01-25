import styled from 'styled-components';
import { media } from 'styles/media';
import { Swiper } from 'swiper/react';

export const Root = styled.div`
  width: 100%;
  height: 100%;
  margin: 30px 0;
  padding: 0 26px;
  display: flex;
  flex-direction: column;
  align-items: center;

  ${media.desktop`
    padding: 0;
    display: block;
    
    ${media.height(760)`
      margin: 0;
    `}
  `}
`;

export const Slider = styled(Swiper)<{ fullscreen: string }>`
  ${media.desktop`
    padding-left: 30px!important;
  `}

  ${media.bigDesktop`
    padding-left: 74px!important;
   `}

  & .swiper-slide {
    display: flex;
    width: auto;
    justify-content: center;
    align-items: flex-start;
  }
`;

export const DatePicker = styled.div`
  width: 100%;

  ${media.desktop`
    padding-left: 30px;
    max-width: 660px;
  `}
`;

export const Tours = styled.div<{ isLoad: boolean }>`
  margin: 30px 0;
  width: 100%;
  position: relative;

  ${media.desktop`
    position: absolute;
    left: 0;
  `}
`;

export const MobileRoot = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const List = styled.div<{ width: number }>`
  height: 100%;
  display: flex;
  width: 100%;
  flex-direction: column;

  ${media.desktop`
    flex-direction: row;
    // @ts-ignore
    width: ${({ width }) => `${width}px`};
  `}
`;

export const Spinner = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 123;
  min-height: 100px;

  ${media.desktop`
      min-height: 200px;
    `}
`;
