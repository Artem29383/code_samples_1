import styled from 'styled-components';
import { layout, LayoutProps } from 'styled-system';
import { rgba } from 'polished';

import { Colors } from '@types';

import { center } from 'styles/helpers';
import { media } from 'styles/media';

export const Root = styled.div`
  position: relative;
  border-radius: 20px;

  ${media.desktop`
    padding: 25px 25px 60px 25px;
    background-color: ${Colors.white};
    box-shadow: 0px 10px 30px ${rgba(Colors.black, 0.1)};
    
    a {
    text-decoration: underline;
  }
  `}
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-bottom: 22px;

  &::before,
  &::after {
    content: '';
    display: block;
    background-color: ${Colors.bombay};
    height: 1px;
    width: 35%;

    ${center(false, true)}
  }

  &::before {
    left: 0;
  }

  &::after {
    right: 0;
  }
`;

export const Content = styled.div`
  display: flex;
`;

export const ItemsChunk = styled.div`
  width: 100%;

  &:not(:last-child) {
    margin-right: 24px;
  }

  ${media.desktop`
     width: 200px;
     
     ${media.height(800)`
        width: 160px;
    `}
  `}
`;

export const Item = styled.div<LayoutProps>`
  position: relative;
  cursor: pointer;

  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 25px;
  }

  &:not(:last-child) {
    margin-bottom: 23px;
  }

  ${layout}

  ${media.desktop`
    ${media.height(800)`
        height: 100px;
    `}
  `}
`;

export const MockImage = styled.img`
  width: 100%;
  height: 100%;
  background-color: ${Colors.mischka};
  border-radius: 25px;
`;

export const Info = styled.div`
  position: absolute;
  left: 20px;
  bottom: 12px;
`;

export const Wrapper = styled.div`
  overflow: hidden;
  width: 100%;
  border-radius: 25px;
  height: 100%;

  img {
    width: 100%;
    height: 100%;
  }
`;
