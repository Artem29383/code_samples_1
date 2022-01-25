import { Swiper } from 'swiper/react';
import styled from 'styled-components';
import { Colors } from '@types';
import { margin, MarginProps, maxWidth, MaxWidthProps } from 'styled-system';
import { FONTS } from 'styles/fonts';

export const Slider = styled(Swiper)<
  MaxWidthProps & { minWidthElement: string }
>`
  width: 100%;
  ${maxWidth};

  & .swiper-wrapper {
    align-items: center;
  }

  & .swiper-slide {
    display: flex;
    cursor: pointer;
    justify-content: center;
    align-items: center;
    min-width: ${({ minWidthElement }) => `${minWidthElement}!important`};
    width: auto !important;
    font-size: 24px;
    color: ${Colors.mischka};

    &-active {
      font-size: 46px;
      width: auto !important;
      color: #638cff;
      background: linear-gradient(90.21deg, #638cff 2.85%, #c192ff 99.96%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
`;

export const MonthName = styled.p`
  font-size: inherit;
  text-align: center;
  display: flex;
  color: inherit;
  align-items: center;
  justify-content: center;
  font-family: BwGradualBold, sans-serif;
`;

export const Remote = styled.div<MarginProps>`
  position: relative;
  ${margin};
  ${maxWidth};
`;

export const ShadowLeft = styled.div`
  background: linear-gradient(
    270deg,
    #f9f9fc 6.98%,
    rgba(249, 249, 252, 0) 100%
  );
  height: 100%;
  position: absolute;
  top: 50%;
  pointer-events: none;
  transform: translateY(-50%) rotate(-180deg);
  z-index: 1;
  width: 40%;
  left: -2px;
`;

export const ShadowRight = styled(ShadowLeft)`
  right: -2px;
  left: initial;
  width: 40%;
  pointer-events: none;
  background: linear-gradient(
    270deg,
    #f9f9fc 6.98%,
    rgba(249, 249, 252, 0) 100%
  );
  transform: translateY(-50%);
`;

export const Edit = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5px;
`;

export const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const Input = styled.input`
  font-family: ${FONTS.BwGradualBold};
  font-size: 46px;
  text-align: center;
  max-width: 130px;
  margin-bottom: 30px;
  border-bottom: 1px solid #3d9dff;
  color: #638cff;
  background: linear-gradient(90.21deg, #638cff 2.85%, #c192ff 99.96%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;
