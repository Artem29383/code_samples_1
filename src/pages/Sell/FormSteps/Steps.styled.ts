import styled from 'styled-components';
import { Colors } from '@types';
import {
  alignItems,
  AlignItemsProps,
  display,
  DisplayProps,
  justifyContent,
  JustifyContentProps,
  margin,
  MarginProps,
  maxWidth,
  MaxWidthProps,
  padding,
  PaddingProps,
} from 'styled-system';
import { FONTS } from 'styles/fonts';
import { Form as FormikForm } from 'formik';
import { media } from 'styles/media';

export const Root = styled.div`
  width: 100%;
  //     padding: 78px 68px;
  padding: 78px 16px 23px 16px;
  z-index: 2;
  min-height: calc(100vh - 50px);
  height: auto;

  ${media.desktop`
    padding: 78px 40px;
    min-height: calc(100vh - 70px);
  `}
`;

export const RootAnother = styled.div`
  width: 100%;
  height: auto;
  //     padding: 78px 68px;
  padding: 68px 2px 23px 2px;
  z-index: 2;
  min-height: calc(100vh - 50px);

  ${media.desktop`
    padding: 78px 40px;
    min-height: calc(100vh - 70px);
  `}
`;

export const RootDynamic = styled.div<PaddingProps>`
  width: 100%;
  height: auto;
  z-index: 2;
  min-height: calc(100vh - 50px);
  ${padding};

  ${media.desktop`
    min-height: calc(100vh - 70px);
  `}
`;

export const Title = styled.h1<MaxWidthProps & MarginProps>`
  width: 100%;
  text-align: center;
  font-family: ${FONTS.BwGradualExtraBold};
  font-weight: 800;
  color: ${Colors.mineShaft};
  font-size: 32px;

  ${maxWidth};
  ${margin};

  ${media.desktop`
    font-size: 44px;
  `}
`;

export const Subtitle = styled.h2`
  text-transform: uppercase;
  font-size: 12px;
  color: ${Colors.black};
  text-align: center;
  margin: 18px auto 0 auto;
  line-height: 15.25px;
  font-family: ${FONTS.LiberGrotesqueBold};

  ${media.desktop`
    font-family: liberGrotesqueRegular, sans-serif;
  `}
`;

export const Wrapper = styled.div`
  max-width: 906px;
  width: 100%;
  margin: 0 auto 150px auto;

  ${media.desktop`
    margin: 0 auto;
  `}
`;

export const Buy = styled.div`
  margin-top: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Text = styled.p`
  margin-left: 15px;
  font-size: 14px;
  color: ${Colors.black};
  font-family: ${FONTS.LiberGrotesqueBold};

  ${media.desktop`
    font-size: 16px;
  `}
`;

export const Choosen = styled.div<{ font: number }>`
  font-size: ${({ font }) => `${font}px`};
  text-align: center;
  font-family: ${FONTS.LiberGrotesqueBold};
  overflow: hidden;
  padding: 5px;
  margin: -5px -5px 34px -5px;

  ${media.desktop`
    margin-bottom: 22px;  
  `};
`;

export const Controls = styled.div`
  width: 100%;
  height: auto;
  flex-grow: 1;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  position: relative;
  padding: 28px 29px 10px 23px;

  ${media.tablet`
    flex-direction: row;
    padding: 28px 29px 28px 23px;
  `}
`;

export const Zooms = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  top: -31px;
  left: 50%;
  transform: translateX(-50%);

  ${media.tablet`
    transform: translateX(0);
    position: static;
  `}
`;

export const ButtonAbsolute = styled.div`
  align-items: center;
  position: absolute;
  bottom: 38px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
`;

export const Buttons = styled.div`
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
  flex-direction: column-reverse;

  ${media.tablet`
    margin-top: 0;
    flex-direction: row;
  `}
`;

export const TextButton = styled.div`
  height: 60px;
  width: 225px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 17px;
  font-family: liberGrotesqueBlack, sans-serif;
`;

export const GradSlider = styled.p`
  color: #638cff;
  background: linear-gradient(90.21deg, #638cff 2.85%, #c192ff 99.96%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  padding: 5px;
`;

export const PGrad = styled.p`
  color: #9392ff;
  background: linear-gradient(90.21deg, #9392ff 2.85%, #c192ff 99.96%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  padding: 5px;
`;

export const PGradRedly = styled.div`
  color: #c192ff;
  background: linear-gradient(#c192ff 1.31%, #6a8dff 99.97%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  padding: 5px;
`;

export const Form = styled(FormikForm)`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 8px;
  max-width: 345px;
  margin: 0 auto;

  ${media.tablet`
    grid-gap: 14px;
    max-width: 950px;
    grid-template-columns: 1fr 1fr;
  `}
`;

export const Range = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 13px;
  margin-bottom: 18px;
`;

export const P = styled.p`
  font-size: 11px;
  line-height: 14px;
  color: #afa9c9;
  font-family: ${FONTS.LiberGrotesqueRegular};
  font-weight: 700;
`;

export const Row = styled.div<JustifyContentProps>`
  display: flex;
  max-width: 800px;
  flex-direction: column;
  margin: 0 auto 0 auto;
  align-items: flex-start;
  ${justifyContent};

  ${media.tablet`
    margin: 31px auto 45px auto;
    flex-direction: row;
  `}
`;

export const ItemBox = styled.div<MaxWidthProps & AlignItemsProps>`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 25px;
  ${maxWidth};
  ${alignItems};

  & .slider {
    //margin-left: 50%;
    //transform: translateX(-50%);
  }

  ${media.tablet`
    margin-bottom: 0;
  `}
`;

export const TitleH = styled.h1`
  font-size: 24px;
  line-height: 29px;
  margin: 0 auto 17px auto;
  color: #000;
  font-family: ${FONTS.BwGradualBold};
`;

export const SubText = styled.p<MaxWidthProps & MarginProps>`
  color: #bec0d6;
  font-size: 12px;
  line-height: 15px;
  text-align: center;
  font-family: ${FONTS.LiberGrotesqueBold};
  ${maxWidth};
  width: 100%;
  ${margin};

  ${media.desktop`
    font-size: 16px;
    line-height: 20px;
  `}
`;

export const ContentCentered = styled.div<
  MarginProps & DisplayProps & MaxWidthProps
>`
  justify-content: center;
  align-items: center;
  ${margin};
  ${display};
  ${maxWidth};
`;

export const Grid = styled.div`
  display: inline-flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 375px;
  margin: -6px 0 0 -4px;
  width: calc(100% + 6px);

  & > div {
    margin: 6px 0 0 4px;
  }

  ${media.tablet`
    max-width: 900px;
    margin: -10px 0 0 50%;
    transform: translateX(-50%);
    width: calc(100% + 10px);
    
    & > div {
      margin: 10px 0 0 10px;
    }
  `}
`;

export const GridNormal = styled.div<MaxWidthProps>`
  display: inline-flex;
  flex-wrap: wrap;
  margin: -10px 0 0 -10px;
  width: calc(100% + 10px);
  justify-content: center;
  ${maxWidth};

  & > div {
    margin: 10px 0 0 10px;
  }
`;

export const DropZone = styled.div`
  max-width: 1088px;
  position: relative;
  margin: 0 auto;
  width: 100%;
  padding: 49px 4px 7px 4px;
  min-height: 208px;
  margin-top: -11px;
  border-radius: 12px;
  border: 1px dashed #d1d9e9;
  background-color: #f0f3f9;
  display: flex;
  justify-content: center;
  align-items: center;

  ${media.desktop`
    padding: 49px 22px;
  `}
`;

export const Description = styled.p`
  font-size: 11px;
  line-height: 14px;
  text-align: center;
  font-family: ${FONTS.LiberGrotesqueBold};
  color: #bec0d6;
  max-width: 669px;
  width: 100%;
  margin: 15px auto 110px auto;

  ${media.desktop`
    margin: 15px auto 50px auto;
  `}
`;

export const PhotosGrid = styled.div`
  align-items: center;
  z-index: 3;
  display: flex;
  flex-wrap: wrap;
  margin: -6px 0 0 -6px;
  width: calc(100% + 6px);
  justify-content: center;

  & > div {
    margin: 6px 0 0 6px;
  }

  ${media.tablet`
    justify-content: flex-start;
  `}

  ${media.desktop`
    justify-content: center;
  `}
`;

export const ImageWrapper = styled.div`
  width: 100%;
  max-width: 110px;
  height: 110px;
  overflow: hidden;
  border-radius: 12px;
  position: relative;
  background: #ebf0f9;
  filter: drop-shadow(0px 5px 15px rgba(40, 44, 52, 0.09));

  & svg {
    transform: translateX(-50%);
  }
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const ItemAdd = styled.div`
  width: 100%;
  max-width: 110px;
  height: 110px;
  position: relative;
  background: #ebf0f9;
  border: 1px dashed #d6ddeb;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Drop = styled.div`
  max-width: 218px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Minus = styled.div`
  display: inline-block;
  width: 60px;
  cursor: pointer;
  height: 60px;
  border-radius: 50%;
  position: relative;
  background: linear-gradient(312.01deg, #6a8dff 7.67%, #c192ff 113.48%);
  box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.0784314);

  &:after {
    display: block;
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 20px;
    height: 2px;
    background: #fff;
    transform: translateX(-50%);
  }
`;

export const Plus = styled(Minus)`
  margin-right: 10px;

  &:before {
    display: block;
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 20px;
    height: 2px;
    background: #fff;
    transform: translateX(-50%) rotate(90deg);
  }
`;

export const ExtraPlus = styled(Plus)`
  margin-right: 0;
  width: 42px;
  height: 42px;
`;

export const DropTitle = styled(SubText)`
  margin-top: 14px;
`;

export const Counter = styled.div`
  background: linear-gradient(320.19deg, #638cff -11.69%, #c192ff 113.74%);
  border-radius: 5px;
  position: absolute;
  width: 100%;
  top: 14px;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  height: 25px;
  max-width: 33px;
  right: 50%;
  transform: translateX(50%);

  ${media.desktop`
    right: 15px;
    height: 15px;
    transform: translateX(0);
  `}
`;

export const Count = styled.p`
  font-size: 10px;
  line-height: 15px;
  color: ${Colors.white};
  font-family: ${FONTS.LiberGrotesqueBold};
`;

export const Gridder = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: calc(100% + 6px);
  max-width: 930px;
  margin: -6px 0 0 -6px;

  & > div {
    margin: 6px 0 0 6px;
  }

  ${media.desktop`
    margin: -16px 0 0 -16px;
  
    & > div {
      margin: 16px 0 0 16px;
    }
  `}
`;

export const WrapperInput = styled.div`
  border-radius: 20px;
  width: 100%;
  padding: 20px;
  margin-top: 55px;
  background-color: ${Colors.white};
  box-shadow: 0 10px 20px rgba(46, 48, 55, 0.1);

  ${media.tablet`
    padding: 28px 37px;
  `}
`;

export const Label = styled.label`
  text-transform: uppercase;
  font-size: 11px;
  line-height: 15px;
  color: ${Colors.black};
  font-family: liberGrotesqueBold, sans-serif;

  ${media.tablet`
    font-size: 12px;
  `};
`;

export const Input = styled.input`
  width: 100%;
  color: #000;
  margin-top: 4px;
  font-size: 12px;
  line-height: 20px;
  font-family: liberGrotesqueRegular, sans-serif;
  font-weight: 700;

  ${media.tablet`
    font-size: 16px;
  `}

  &::placeholder {
    color: #bec0d6;
    font-size: 12px;
    font-family: liberGrotesqueRegular, sans-serif;
    font-weight: 700;

    ${media.tablet`
        font-size: 16px;
    `}
  }
`;

export const Because = styled.div`
  max-width: 100px;
  width: 100%;
  margin: 30px auto 14px auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const TextBecause = styled.div`
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 15px;
  text-align: center;
  font-family: ${FONTS.LiberGrotesqueRegular};
  color: #000000;
  text-transform: uppercase;
`;

export const SubTextBecause = styled.div`
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 15px;
  text-align: center;
  font-family: ${FONTS.LiberGrotesqueRegular};
  color: #c4c4d9;
`;
