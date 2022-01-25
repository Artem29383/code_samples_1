import styled from 'styled-components';
import { Swiper } from 'swiper/react';
import { size } from 'polished';
import { media } from 'styles/media';

export const Root = styled.div`
  max-width: calc(100% + 30px);
  width: calc(100% + 30px);
  position: absolute;
  left: -30px;
  height: 300px;

  ${media.bigDesktop`
    width: calc(100% + 73px);
    max-width: calc(100% + 73px);
    left: -73px;
  `}
`;

export const Slider = styled(Swiper)<{ fullscreen: string }>`
  border-radius: 20px;
  margin: -10px -20px -10px -10px;

  ${size(390, '100%')}
  
  ${media.tablet`
      padding-left: 4px!important;  
      margin: -20px;
      ${size(520, '100%')}
  `}
  
  ${media.desktop`
    padding-left: 25px!important;  
  `}
  
  ${media.mediumDesktop`
    padding-left: 28px!important;  
  `}
  
  ${media.bigDesktop`
    padding-left: 45px!important;  
  `}

  & .swiper-slide {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding: 10px 10px 10px 15px;

    width: 220px!important;
    // width: ${({ fullscreen }) => (fullscreen === 'true' ? '100%' : '80%')};
    
    ${media.tablet`
        padding: 20px 20px 20px 25px;
      // align-items: center;
      width: 368px!important;
    `}
  }
`;

export const Empty = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
