import styled from 'styled-components';
import { Swiper } from 'swiper/react';
import { size } from 'polished';

import { PositionProps, Colors } from '@types';

import TextComponent from 'components/Text';

import { positionProps, center } from 'styles/helpers';
import { media } from 'styles/media';

export const Root = styled.div`
  position: relative;
  color: black;
  max-width: 420px;
  margin: 0 auto;
  width: 100%;

  ${media.tablet`
     max-width: 660px;
  `}
`;

export const Slider = styled(Swiper)``;

export const bgcColor = (active: boolean, isTour: boolean) => {
  if (active) {
    return (
      'linear-gradient( \n' +
      '-55deg\n' +
      ',#6a8dff 0%,#8d8fff 41%,#8d8fff 41%,#928fff 46%,#928fff 47%,#928fff 47%,#c192ff 100% );'
    );
  }
  if (isTour) {
    return 'rgb(193, 146, 255)';
  }
  return 'inherit';
};

export const Item = styled.div<{ active: boolean; isTour: boolean }>`
  color: ${p => (p.active || p.isTour ? 'red' : 'inherit')};
  text-align: center;
  background: ${p => bgcColor(p.active, p.isTour)};
  padding: 5px 0;
  border-radius: 40px;
  cursor: pointer;
  min-width: 43px;

  ${media.tablet`
    min-width: auto;
    padding: 1px 0;
  `}
`;

export const Nav = styled.div<{ rotate: number } & PositionProps>`
  display: inline-block;
  border: solid ${Colors.malibu};
  padding: 5px;
  border-width: 5px 5px 0 0;
  cursor: pointer;
  z-index: 2;
  transform: translateY(-50%) rotate(${p => p.rotate}deg);

  ${positionProps}
`;

export const Text = styled(TextComponent)<{ active: boolean }>`
  position: relative;
  z-index: 1;
  color: ${p => (p.active ? Colors.white : p.color || 'inherit')};

  &::before {
    content: '';
    display: ${p => (p.active ? 'block' : 'none')};
    //background-color: ${Colors.malibu};
    border-radius: 50%;
    z-index: -1;

    ${size(45)}
    ${center()}
  }
`;

export const Spinner = styled.div`
  position: absolute;
  right: 1%;
  top: -22%;

  ${media.desktop`
    right: 5%;
  `}
`;
