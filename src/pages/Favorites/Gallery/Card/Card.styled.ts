import styled from 'styled-components';
import { size } from 'polished';

import { Colors } from '@types';

import { media } from 'styles/media';
import { textMixin } from 'styles/helpers';

export const Content = styled.div<{ height: string }>`
  width: 45.576vw;
  height: ${({ height }) => height};
  box-shadow: 1px 5px 21px 6px rgb(68 68 68 / 20%);
  border-radius: 25px;
  background-color: ${Colors.white};
  padding: 10px 10px 0 10px;

  ${media.desktop`
    height: 445px;
    padding: 20px 17px 0 17px;
    width: 368px;
    margin-right: 35px;
    
    ${media.height(850)`
      height: 430px;
    `}
    
    ${media.height(830)`
      height: 390px;
    `}
    
    ${media.height(760)`
      height: 360px;
    `}
  `}
`;

export const SlideImage = styled.img`
  object-position: center;
  object-fit: cover;

  ${size('100%')}
`;

export const Image = styled.div<{ heightImage: string }>`
  height: ${({ heightImage }) => heightImage};
  border-radius: 20px;
  overflow: hidden;

  ${media.desktop`
    height: 220px;
    
    ${media.height(830)`
      height: 180px;
    `}
    
    ${media.height(760)`
      height: 150px;
    `}
  `}
`;

export const ProgressWrapper = styled.div`
  width: 701px;
  margin-top: 100px;
  margin-left: 50px;
`;

export const Progress = styled.div`
  height: 3px;
  width: 100%;
  background-color: rgba(136, 136, 136, 0.3);
  border-radius: 1px;
  position: relative;
`;

export const Filler = styled.div<{ width: number }>`
  width: ${({ width }) => `${width}px`};
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  height: 5px;
  border-radius: 21px;
  background-color: ${Colors.argent};
`;

export const ProgressBar = styled.div`
  &.swiper-pagination-list {
    top: 50% !important;
    left: 0 !important;
    transform: translateY(-50%);
    border-radius: 10px;
    overflow: hidden;
    height: 5px;

    ${media.desktop`
       border-radius: 0;
  `}

    .swiper-pagination-progressbar-fill {
      background-color: ${Colors.argent};
    }

    width: 100% !important;
    bottom: 35px;

    ${media.desktop`
    bottom: 10px;
  `}
  }
`;

export const Counter = styled.div`
  display: flex;
  max-width: 70px;
  width: 100%;
  margin-left: auto;
  margin-top: 20px;
  justify-content: space-between;
  align-items: center;
`;

export const Br = styled.div`
  width: 0px;
  height: 46px;
  transform: rotate(30deg);
  border-left: 1px solid #acafb5;
`;

export const InfoLine = styled.div`
  width: 100%;
  display: none;
  justify-content: space-between;
  align-items: center;

  ${media.desktop`
    display: flex;
  `}
`;

export const Address = styled.div`
  max-width: 224px;

  ${textMixin({
    fontType: 'liberGrotesqueBold',
    fontSize: 8,
    color: 'tundora',
    lineHeight: 11,
  })}

  ${media.tablet`
  ${textMixin({
    fontType: 'liberGrotesqueBold',
    fontSize: 13,
    color: 'tundora',
    lineHeight: 20,
  })}
 `}
`;

export const LineAddress = styled.div``;

export const LineAddressMin = styled.div`
  font-size: 8px;
  line-height: 1;
  margin-top: 5px;

  ${media.tablet`
    font-size: 13px;
  `}
`;

export const Wrapper = styled.div`
  margin-top: 3.733vw;
  margin-bottom: 4.8vw;

  ${media.desktop`
    padding: 0 15px;
    margin-top: 20px;
    margin-bottom: 20px;
  `}
`;

export const PriceAndStatus = styled.div<{ width: string }>`
  text-align: right;
  display: flex;
  align-items: flex-end;
  width: 100%;
  justify-content: space-around;
  flex-direction: column;
  margin-left: 15px;

  ${media.tablet`
  // @ts-ignore
    width: ${({ width }) => width};
    margin-left: 0;
  `}

  ${media.bigDesktop`
    display: block;
  `}
`;

export const Button = styled.button`
  width: 100%;
  height: 40px;
  display: none;
  box-shadow: 0 20px 50px rgba(167, 184, 202, 0.1);
  border-radius: 29px;
  cursor: pointer;
  background-image: linear-gradient(
    -55deg,
    #6a8dff 0%,
    #8d8fff 41%,
    #8d8fff 41%,
    #928fff 46%,
    #928fff 47%,
    #928fff 47%,
    #c192ff 100%
  );

  ${media.tablet`
    width: 334px;
    height: 58px;
  `}

  ${media.desktop`
    display: block;
    
    ${media.height(850)`
      height: 40px;
    `}
  `}
`;

export const ButtonIcon = styled.div<{ active?: boolean }>`
  display: flex;
  align-items: center;
  cursor: pointer;
  justify-content: space-around;
  position: absolute;
  bottom: 10px;
  right: 10px;
  z-index: 1234;
  stroke-width: 2px;
  fill: ${({ active }) => (active ? Colors.burningOrange : 'transparent')};
  stroke: ${({ active }) => (active ? Colors.white : Colors.white)};
`;

export const Price = styled.div<{ color: string }>`
  margin-bottom: 4px;
  font-family: liberGrotesqueExtraBold, sans-serif;
  font-size: 12px;
  color: ${({ color }) => color};

  ${media.tablet`
    margin-bottom: 10px;
    font-size: 16px;
  `}

  ${media.bigDesktop`
    font-size: 20px;
  `}
`;

export const Status = styled.div<{ color: string }>`
  font-family: liberGrotesqueBold, sans-serif;
  font-size: 8px;
  color: ${({ color }) => color};

  ${media.tablet`
    font-size: 14px;
  `}

  ${media.bigDesktop`
    font-size: 13px;
  `}
`;
