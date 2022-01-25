import styled from 'styled-components';
import { border, padding, shadow, BorderProps } from 'styled-system';

import { CommonProps } from './types';
import { Colors, ColorsStrings } from '@types';

import { marginProps, sizeProps, textMixin } from 'styles/helpers';

const defaultButtonColor = `linear-gradient( 
-55deg
,#6a8dff 0%,#8d8fff 41%,#8d8fff 41%,#928fff 46%,#928fff 47%,#928fff 47%,#c192ff 100% );`;

export const defaultVerticalPadding = 15;

/* eslint-disable no-nested-ternary */
export const Root = styled.button<
  CommonProps & {
    color: ColorsStrings | 'default';
    textColor: ColorsStrings;
    customColor?: string;
  } & BorderProps
>`
  width: 100%;
  padding: 15px 0;
  border-radius: 35px;
  cursor: pointer;
  background: ${p =>
    p.disabled
      ? Colors.bombay
      : p.color in Colors
      ? Colors[p.color as ColorsStrings]
      : defaultButtonColor};

  background: ${p => p.customColor || defaultButtonColor};

  ${p =>
    textMixin({
      fontType: 'liberGrotesqueBlack',
      fontSize: 16,
      color: p.textColor,
      align: 'center',
    })}

  ${shadow}
  ${sizeProps}
  ${marginProps}
  ${border}
  ${padding}
`;
/* eslint-disable no-nested-ternary */
