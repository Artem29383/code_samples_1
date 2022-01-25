import styled from 'styled-components';
import {
  margin,
  MarginProps,
  maxWidth,
  MaxWidthProps,
  padding,
  PaddingProps,
} from 'styled-system';

export const Root = styled.div<PaddingProps & MarginProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  ${padding};
  ${margin};
`;

export const SliderWrapper = styled.div<MaxWidthProps>`
  position: relative;
  width: 100%;
  height: 10px;
  ${maxWidth};

  &::before {
    content: '';
    height: 10px;
    width: 20px;
    display: block;
    background: repeating-linear-gradient(
      to right,
      #c4c4d9,
      #c4c4d9 2px,
      #ffffff 2px,
      #fff 6px
    );
    position: absolute;
    left: -24px;
    top: 0;
  }

  &::after {
    content: '';
    height: 10px;
    width: 20px;
    display: block;
    background: repeating-linear-gradient(
      to right,
      #c4c4d9,
      #c4c4d9 2px,
      #ffffff 2px,
      #fff 6px
    );
    position: absolute;
    right: -19px;
    top: 0;
  }
`;

export const Input = styled.input<{ zIndex: number; events: boolean }>`
  pointer-events: ${({ events }) => (events ? 'none' : 'auto')};
  position: absolute;
  height: 0;
  cursor: pointer;
  top: 3px;
  width: 105%;
  z-index: ${({ zIndex }) => zIndex};
  outline: none;
  background: transparent;
  opacity: 0;

  &::-webkit-slider-thumb {
    -webkit-appearance: none !important;
    background-color: #f1f5f7;
    border: none;
    border-radius: 50%;
    box-shadow: 0 0 1px 1px #ced4da;
    cursor: pointer;
    height: 24px;
    width: 24px;
    margin-top: 4px;
    pointer-events: all;
    position: relative;
    appearance: none !important;
  }

  &::-moz-range-thumb {
    background-color: #f1f5f7;
    border: none;
    border-radius: 50%;
    box-shadow: 0 0 1px 1px #ced4da;
    cursor: pointer;
    height: 24px;
    width: 24px;
    margin-top: 4px;
    pointer-events: all;
    position: relative;
  }
`;

export const Slider = styled.div`
  position: relative;
  width: 100%;
  height: 10px;
`;

export const Track = styled.div`
  height: 10px;
  //background: #c4c4d9;
  background: repeating-linear-gradient(
    to right,
    #c4c4d9,
    #c4c4d9 2px,
    #ffffff 2px,
    #fff 6px
  );
  width: 100%;
  z-index: 1;
  cursor: pointer;
  position: absolute;
`;

export const Range = styled.div`
  border-radius: 6px;
  position: absolute;
  background: linear-gradient(213.91deg, #c192ff -34.32%, #638cff 112.48%);
  z-index: 2;
  height: 10px;
`;

export const WrapperDotLeft = styled.div`
  left: 0 !important;
  opacity: 1;
  height: 24px;
  width: 24px;
  position: absolute;
  transform: translate(0, -50%);
  top: 50%;
`;

export const WrapperDotRight = styled.div`
  left: 99% !important;
  opacity: 1;
  height: 24px;
  width: 24px;
  position: absolute;
  transform: translate(0, -50%);
  top: 50%;
`;

export const Dot = styled.div<{ thumbWidth: number }>`
  left: 0 !important;
  opacity: 1;
  cursor: pointer;
  height: ${({ thumbWidth }) => `${thumbWidth}px`};
  z-index: 4;
  pointer-events: none;
  position: absolute;
  touch-action: none;
  background-color: #fff;
  width: ${({ thumbWidth }) => `${thumbWidth}px`};
  clip-path: polygon(50% 0%, 100% 38%, 100% 99%, 0 100%, 0% 38%);
  top: 50%;
  transform: translate(0, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 5px 20px rgba(68, 79, 108, 0.13);
  transition: left 0.1s linear;

  &::before {
    content: '';
    width: 12px;
    height: 12px;
    clip-path: polygon(50% 0%, 100% 38%, 100% 99%, 0 100%, 0% 38%);
    background-color: #c192ff;
  }
`;

export const DotRight = styled(Dot)`
  left: 0% !important;
`;

export const ProgressLine = styled.div`
  width: 0;
  border-radius: 24px;
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  background: linear-gradient(270deg, #c293ff 0%, #7f95f9 46.15%);
  transition: width 0.1s linear;
`;
