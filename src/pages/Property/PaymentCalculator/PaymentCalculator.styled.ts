import styled from 'styled-components';
import { media } from 'styles/media';
import { Colors } from '@types';

export const Root = styled.div`
  width: 100%;
  padding-bottom: 22px;

  ${media.desktop`
    box-shadow: -10px 10px 30px 0 rgba(0, 0, 0, 0.1);
    max-width: 720px;
    border-radius: 20px;
  `}
`;

export const Wrapper = styled.div`
  padding: 45px 19px;
  width: 100%;

  ${media.desktop`
     padding: 40px 35px;
  `}

  ${media.bigDesktop`
     padding: 40px 63px;
  `}
`;

export const Button = styled.div`
  width: 100%;
  padding: 0 19px;
`;

export const Body = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const Header = styled.div``;

export const Title = styled.div`
  font-family: bwGradualBold, sans-serif;
  color: ${Colors.mineShaft};
  margin-bottom: 20px;
  font-size: 22px;
  
  ${media.tablet`
    font-size: 38px;
  `}
  
  ${media.desktop`
    font-size: 28px;
  `}
  
  ${media.mediumDesktop`
    font-size: 30px;
  `}
  
  ${media.bigDesktop`
    font-size:38px;
  `}
`;

export const Left = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  ${media.desktop`
     width: 40%;
  `}
`;
export const Right = styled.div`
  line-height: 42px;
  width: 40%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const Line = styled.div<{ mb?: number; flex?: string }>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: ${({ flex }) => `${flex}`};
  margin-bottom: ${({ mb }) => `${mb}px`};
`;

export const InputWrapper = styled.div<{ ml?: number }>`
  max-width: 100%;
  margin-left: ${({ ml }) => `${ml}px`};
  display: flex;
`;

export const Estimated = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 44px;
`;
