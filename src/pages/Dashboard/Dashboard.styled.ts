import styled from 'styled-components';
import { rgba } from 'polished';
import { margin, MarginProps, position } from 'styled-system';
import { Swiper } from 'swiper/react';

import { media } from 'styles/media';

import { Colors } from '@types';

export const Root = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 61px 0 52px 47px;
  height: 100%;
  background-color: ${Colors.dodgerBlue};
  overflow: hidden;

  ${media.tablet`
    display: flex;
    flex-direction: column;
    position: relative;
    padding: 61px 0 52px 47px;
    height: 100%;
    background-color: ${Colors.white};
    overflow: hidden;
  `}
  
  ${media.desktop`  
    padding: 61px 0 0 30px;
  `}

  ${media.bigDesktop`
    padding: 64px 0 0 73px;
  `}
`;

export const Content = styled.div`
  display: none;
  width: calc(100vw - 280px);
  //padding: 138px 0 0 106px;
  position: static;
  height: 100%;
  top: 0;
  right: 0;
  bottom: 75px;
  z-index: 1;
  background: ${Colors.white};
  overflow:hidden;


  ${position}

  ${media.tablet`
    display: block;
  `}

  ${media.height(965)`
      // padding: 60px 0 0 106px;
  `}
  
  ${media.desktop`
    bottom: 0;
  `}

  ${media.bigDesktop`
     width: calc(100vw - 347px);
  `}
`;

export const Spinner = styled.div`
  min-height: 300px;
  max-width: 300px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;

  & div {
    border-color: ${Colors.white};
    border-bottom-color: transparent;
  }
`;

export const Slider = styled(Swiper)<{ fullscreen: string }>`
  ${media.desktop`
    padding-left: 31px!important;
    padding-right: 30px!important;
    padding-top: 30px!important;
    padding-bottom: 30px!important;
    margin-right: -30px!important;
    margin-top: -30px!important;
    margin-bottom: -30px!important;
  `}

  ${media.bigDesktop`
    padding-left: 73px!important;
  `}

  & .swiper-slide {
    display: flex;
    width: auto;
    justify-content: center;
    align-items: flex-start;
  }
`;

export const Widgets = styled.div`
  position: absolute;
  left: 0;
  margin-top: 50px;
  width: 100%;

  ${media.desktop`
    margin-right: 10px;
    ${media.height(905)`
        margin-top: 20px;
    `}
  `}
`;

export const Avatar = styled.div`
  width: 131px;
  height: 131px;
  overflow: hidden;
  margin-bottom: 32px;
  border-radius: 50%;
  border: 6px solid white;
  background-color: ${Colors.mischka};
  box-shadow: 0px 13px 14px ${rgba(Colors.black, 0.08)};
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
`;

export const Nav = styled.ul<MarginProps>`
  width: fit-content;

  ${margin}
`;

export const Settings = styled.div<{ active: boolean }>`
  position: absolute;
  background-color: ${Colors.white};
  width: 100%;
  left: 0;
  bottom: 0;
  padding: 20px 45px;
  border-radius: 20px 20px 0 0;
  transform: ${({ active }) => (active ? 'translateY(0)' : 'translateY(100%)')};
  transition: transform 300ms ease;
`;

export const WrapperCalendar = styled.div`
  position: relative;
  max-height: 456px;
  height: 456px;
  overflow-y: auto;
  border-radius: 20px;

  ::-webkit-scrollbar {
    width: 0;
    display: none;
    background: transparent;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;

  ${media.desktop`
    box-shadow: 0px 10px 30px rgb(0 0 0 / 10%);
    ${media.height(800)`
      height: 370px;
    `}
  `}
`;
