import styled from 'styled-components';
import { Colors } from '@types';
import { Swiper } from 'swiper/react';
import { size } from 'polished';
import { media } from 'styles/media';

export const Root = styled.div`
  max-width: 100%;
  width: 100%;
  position: relative;
  overflow: hidden;

  ${media.tablet`
    margin-right: 0px;
    margin-right: 0;
    max-width: 100%;
  `}
`;

export const Content = styled.div`
  width: 200px;
  height: 255px;
  box-shadow: 10px 10px 15px rgba(68, 68, 68, 0.2);
  border-radius: 25px;
  background-color: ${Colors.white};
  padding: 10px 10px 0 10px;

  ${media.tablet`
    width: 260px;
    height: 327px;
  `}
`;

export const SlideImage = styled.img`
  object-position: center;
  object-fit: cover;
  background-color: ${Colors.argent};

  ${size('100%')}
`;

export const Slider = styled(Swiper)<{ fullscreen: string }>`
  border-radius: 20px;
  margin: -10px -20px -10px -10px;

  ${size(325, '100%')}
  
  ${media.tablet`
      margin: -20px;
      ${size(400, '100%')}
  `}

  & .swiper-slide {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding: 10px 10px 10px 15px;

    width: 245px!important;
    // width: ${({ fullscreen }) => (fullscreen === 'true' ? '100%' : '80%')};
    
    ${media.tablet`
      padding: 20px 20px 20px 0;
      // align-items: center;
      margin-left: 20px;
      width: 292px!important;
    `}
  }
`;

export const Image = styled.div`
  height: 60%;
  border-radius: 15px;
  overflow: hidden;

  ${media.tablet`
    height: 200px;
  `}
`;

export const Wrapper = styled.div`
  margin-top: 9px;
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

export const Button = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 85px;
  left: 28px;
  z-index: 1;
  width: 112px;
  height: 40px;
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
    width: 144px;
    height: 49px;
    bottom: 225px;
    left: 20px;
  `}
`;

export const ButtonListing = styled.button`
  width: 100%;
  height: 40px;
  box-shadow: 0 20px 50px rgba(167, 184, 202, 0.1);
  border-radius: 29px;
  cursor: pointer;
  margin-top: -26px;
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
    width: 100%;
    height: 58px;
    margin-top: -10px;
  `}
`;
