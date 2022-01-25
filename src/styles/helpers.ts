import { css } from 'styled-components';

import {
  PositionProps,
  SizeProps,
  MarginProps,
  FontTypes,
  Colors,
  TextProps,
  TranslateProps,
} from '@types';

import { LayoutSizes } from 'styles/sizes';
import { ViewportShorthands } from './media';

export const windowHeightValue = `var(--vh, 1vh) * 100`;

export const windowHeightMixin = css`
  height: calc(${windowHeightValue});
`;

export const positionProps = css<PositionProps>`
  position: ${p => p.position || 'static'};

  ${p =>
    p.top !== undefined
      ? `top: ${typeof p.top === 'number' ? `${p.top}px` : p.top}`
      : ''};

  ${p =>
    p.left !== undefined
      ? `left: ${typeof p.left === 'number' ? `${p.left}px` : p.left}`
      : ''};

  ${p =>
    p.bottom !== undefined
      ? `bottom: ${typeof p.bottom === 'number' ? `${p.bottom}px` : p.bottom}`
      : ''};

  ${p =>
    p.right !== undefined
      ? `right: ${typeof p.right === 'number' ? `${p.right}px` : p.right}`
      : ''};

  ${p => (p.zIndex ? `z-index: ${p.zIndex}` : ``)};

  ${p =>
    p.center ? `top: 50%; left: 50%; transform: translate(-50%, -50%)` : ''}

  ${p =>
    p.centerHor
      ? `left: 50%; ${p.applyTransform ? 'transform: translate(-50%, 0)' : ''}`
      : ``};

  ${p =>
    p.centerVert
      ? `top: 50%; ${p.applyTransform ? 'transform: translate(0, -50%)' : ''}`
      : ``};
`;

export const marginProps = css<MarginProps>`
  ${p => {
    if (p.margin) {
      return `margin: ${p.margin
        .map(i => (typeof i === 'number' ? `${i}px` : i))
        .join(' ')}`;
    }

    return '';
  }};

  ${p =>
    p.marginTop
      ? `margin-top: ${
          typeof p.marginTop === 'number' ? `${p.marginTop}px` : p.marginTop
        }`
      : ''};

  ${p =>
    p.marginBottom
      ? `margin-bottom: ${
          typeof p.marginBottom === 'number'
            ? `${p.marginBottom}px`
            : p.marginBottom
        }`
      : ''};
  ${p =>
    p.marginLeft
      ? `margin-left: ${
          typeof p.marginLeft === 'number' ? `${p.marginLeft}px` : p.marginLeft
        }`
      : ''};

  ${p =>
    p.marginRight
      ? `margin-right: ${
          typeof p.marginRight === 'number'
            ? `${p.marginRight}px`
            : p.marginRight
        }`
      : ''};
`;

export const textMixin = ({
  fontType = 'bwGradualExtraBold',
  lineHeight = 'inherit',
  color = 'mineShaft',
  textTransform = 'none',
  whiteSpace = 'none',
  align = 'inherit',
  fontSize = 20,
  textDecoration = 'none',
}: TextProps) => css`
  ${`font-family: ${FontTypes[fontType]}`};
  ${`color: ${Colors[color]}`};
  ${`white-space: ${whiteSpace}`};
  ${`text-align: ${align}`};
  ${`text-transform: ${textTransform}`};
  ${`line-height: ${
    typeof lineHeight === 'number' ? `${lineHeight}px` : lineHeight
  }`};
  ${`font-size: ${typeof fontSize === 'number' ? `${fontSize}px` : fontSize}`};
  ${`text-decoration: ${textDecoration}`};
`;

export const sizeProps = css<SizeProps>`
  ${p =>
    p.width
      ? `width: ${typeof p.width === 'number' ? `${p.width}px` : p.width}`
      : ''};
  ${p =>
    p.height
      ? `height: ${typeof p.height === 'number' ? `${p.height}px` : p.height}`
      : ''};
`;

export const minContentHeightProp: ViewportShorthands = {
  m: `calc(${windowHeightValue} - ${LayoutSizes.headerHeight.m}px)`,
  t: `calc(${windowHeightValue} - ${LayoutSizes.headerHeight.t}px)`,
};

export const center = (hor = true, vert = true, transform = true) => css`
  position: absolute;
  ${hor ? 'left: 50%' : ''};
  ${vert ? 'top: 50%' : ''};
  ${transform
    ? `transform: translate(${hor ? '-50%' : '0px'}, ${vert ? '-50%' : '0px'})`
    : ''};
`;

export const translateProps = css<TranslateProps>`
  transform: translate(${p => p.hor || 0}, ${p => p.vert || 0});
`;
