import styled from 'styled-components';
import { media } from 'styles/media';
import { Colors } from '@types';
import { Swiper } from 'swiper/react';

export const Root = styled.div`
  width: 100%;
  height: 100%;
  padding: 19px 0 0 0;

  ${media.desktop`
    padding: 0;
  `}
`;

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Slider = styled(Swiper)`
  margin: -10px -20px -10px -10px;
  width: 100%;
  height: 100%;

  ${media.tablet`
    padding-left: 4px!important;  
    margin: -20px;
  `}
  
  ${media.desktop`
    padding-left: 50px!important;
  `}

  ${media.bigDesktop`
    padding-left: 91px!important;
  `}

  & .swiper-slide {
    display: flex;
    justify-content: center;
    align-items: flex-start;

    ${media.tablet`
      width: 419px!important;
    `}
  }
`;

export const Gallery = styled.div`
  display: flex;
  padding: 0 15px;
  flex-wrap: wrap;
  justify-content: space-between;

  ${media.desktop`
    padding: 0;
    display: block;
    height: calc(100% - 85px);
    margin-left: -31px;
  `}

  ${media.bigDesktop`
    margin-left: -72px;`}
`;

export const Column = styled.div<{
  direction: string;
  isEven: boolean;
  isNumericLast: boolean;
  width: string;
}>`
  flex-direction: ${({ direction }) => direction};
  max-width: ${({ isEven, isNumericLast, width }) =>
    !isEven && isNumericLast ? width : '42.645vw'};
  margin-right: ${({ isEven, isNumericLast }) =>
    !isEven && isNumericLast ? 'auto' : 'initial'};
  min-width: 160px;
  width: 100%;
  display: flex;
  justify-content: space-around;

  ${media.desktop`
    max-height: 100%;
    height: 100%;
    grid-gap: 15px 0;
    margin-right: 35px;
    max-width: 419px;
    min-width: 419px;
    justify-content: initial;
    // @ts-ignore
    flex-direction: ${({ direction }) => direction};
    display: grid;
    // @ts-ignore
    grid-template-rows: ${({ direction }) =>
      direction === 'column' ? '2fr 3fr' : '3fr 2fr'};
  `};
`;

export const Board = styled.div<{
  height: {
    m: string;
    d: string;
  };
}>`
  width: 100%;
  height: ${({ height }) => height.m};
  background-color: ${Colors.mischka};
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 25px;
  position: relative;

  ${media.desktop`
    // @ts-ignore
    height: ${({ height }) => height.d};
    max-width: 100%;
    width: 100%;
  `}
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const MockImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
