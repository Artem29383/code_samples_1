import styled from 'styled-components';
import { motion } from 'framer-motion';
import { size, rgba } from 'polished';
import { position, layout } from 'styled-system';

import { center, textMixin, translateProps } from 'styles/helpers';

import { Colors } from '@types';

const searchIcon = require('assets/icons/search.svg');

export const Root = styled(motion.div)<{ disabled: boolean }>`
  position: relative;
  background-color: ${Colors.white};
  border-radius: 25px;
  box-shadow: 4px 6px 9px ${rgba(Colors.black, 0.1)};
  pointer-events: ${p => (p.disabled ? 'none' : 'all')};

  ${position}
  ${layout}
  ${translateProps}
`;

export const Input = styled.input<{ opened: boolean }>`
  padding-left: 50px;
  padding-right: ${p => (p.opened ? 50 : 0)}px;
  cursor: ${p => (p.opened ? 'text' : 'pointer')};

  ${size('100%')}

  ${textMixin({
    fontType: 'bwGradualExtraBold',
    fontSize: 15,
    color: 'bombay',
  })}
`;

export const SearchIcon = styled(searchIcon)`
  left: 13px;
  cursor: pointer;

  & path {
    fill: ${Colors.bombay};
    stroke: ${Colors.bombay};
  }

  ${center(false, true)}
  ${size(23)};
`;

export const CrossWrapper = styled(motion.span)`
  right: 25px;

  ${center(false, true)}
`;
