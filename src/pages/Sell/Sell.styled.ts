import styled from 'styled-components';
import { media } from 'styles/media';

export const Root = styled.div`
  width: 100%;
  //background-color: rgba(229, 229, 229, 0.1);
  position: relative;
  //max-height: 585px;
  height: auto;
  min-height: calc(100vh - 50px);

  & #splash-icons {
    transform: translateX(-50%);
  }

  ${media.tablet`
    min-height: calc(100vh - 70px);
  `}
`;

export const Buttons = styled.div<{ isCenter: boolean }>`
  display: flex;
  justify-content: ${({ isCenter }) => (isCenter ? 'space-between' : 'center')};
  align-items: center;
  position: absolute;
  bottom: 38px;
  left: 50%;
  transform: translateX(-50%);
`;

export const ProgressBarControl = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 2;
`;

export const ProgressRoot = styled.div`
  width: 100%;
  height: 10px;
`;

export const ProgressBar = styled.div<{ width: number }>`
  height: 100%;
  max-width: 100%;
  width: ${({ width }) => `${width}px`};
  background-image: -webkit-gradient(
    linear,
    left top,
    right top,
    from(#c192ff),
    to(#3f87ff)
  );
  background-image: linear-gradient(90deg, #c192ff, #3f87ff);
  border-bottom-right-radius: 5px;
  border-top-right-radius: 5px;
  transition: width 300ms ease-out;
`;
