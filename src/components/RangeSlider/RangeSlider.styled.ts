import styled from 'styled-components';
import {
  maxWidth,
  MaxWidthProps,
  position,
  PositionProps,
} from 'styled-system';
import { media } from 'styles/media';
import { FONTS } from 'styles/fonts';

export const Slider = styled.div<{ last: boolean } & MaxWidthProps>`
  background: #eaeff8;
  border-radius: 24px;
  height: 10px;
  position: relative;
  width: calc(100% - 58px);
  margin: 0 auto;
  cursor: pointer;

  &::before {
    content: '';
    display: block;
    position: absolute;
    width: 43px;
    height: 10px;
    background: linear-gradient(270deg, #c293ff 0%, #7f95f9 46.15%);
    border-radius: 24px;
    left: -30px;
  }

  &::after {
    content: '';
    display: block;
    position: absolute;
    width: 43px;
    z-index: -1;
    height: 10px;
    background: ${({ last }) =>
      last
        ? 'linear-gradient(270deg, #C293FF 0%, #7F95F9 46.15%);'
        : '#eaeff8'};
    border-radius: 24px;
    right: -30px;
    top: 0;
  }
  ${maxWidth};
`;

export const Input = styled.input`
  position: absolute;
  width: 100%;
  background: transparent;
  left: 0;
  top: 0;
  z-index: 9;
  cursor: pointer;
  outline: none;
  opacity: 0;

  ${media.desktop`
    width: 100%;
  `}

  &::-webkit-slider-thumb {
    width: 20px;
    height: 20px;
    cursor: pointer;
  }
`;

export const ProgressLine = styled.div`
  width: 0;
  border-radius: 24px;
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  background: linear-gradient(270deg, #c293ff 0%, #7f95f9 46.15%);
  transition: width 0.3s ease-out;
`;

export const Dots = styled.div<{ dot: number }>`
  left: 0;
  cursor: pointer;
  height: 24px;
  position: absolute;
  touch-action: none;
  background-color: #fff;
  width: 24px;
  clip-path: polygon(50% 0%, 100% 38%, 100% 99%, 0 100%, 0% 38%);
  top: 50%;
  transform: ${({ dot }) =>
    dot === 0 ? 'translate(0, -50%)' : 'translate(-24px, -50%)'};
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 5px 20px rgba(68, 79, 108, 0.13);
  transition: left 0.3s ease-out;

  &::before {
    content: '';
    width: 12px;
    height: 12px;
    clip-path: polygon(50% 0%, 100% 38%, 100% 99%, 0 100%, 0% 38%);
    background-color: #c192ff;
  }
`;

export const Range = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 23px auto 18px auto;
  position: relative;
  width: calc(100% - 58px);
`;

export const P = styled.div<PositionProps>`
  width: 81px;
  font-size: 11px;
  line-height: 14px;
  color: #afa9c9;
  font-family: ${FONTS.LiberGrotesqueRegular};
  font-weight: 700;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  //transform: translateX(-50%);
  left: 33%;
  transform: translateX(-50%);
  ${position};

  span {
    font-size: 6px;
    height: 6px;
    margin-bottom: 6px;
  }
`;

export const Option = styled.option`
  font-size: 11px;
  line-height: 14px;
  color: #afa9c9;
  font-family: ${FONTS.LiberGrotesqueRegular};
  font-weight: 700;
  font-family: ${FONTS.LiberGrotesqueRegular};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &::before {
    display: block;
    content: '|';
    width: 10px;
    height: 5px;
    font-size: 6px;
    margin-bottom: 6px;
    text-align: center;
  }
`;

export const DataList = styled.datalist`
  display: flex;
  justify-content: space-between;
  color: red;
  //width: calc(100% - 58px);
  margin: 13px auto 18px auto;
  width: 100%;
`;
