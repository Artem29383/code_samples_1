import styled from 'styled-components';
/* TODO check this import for size */
import { rgba } from 'polished';

import { PushTimings, Colors } from '@types';

import { PushType } from 'models/pushes';

import { textMixin } from 'styles/helpers';

const pushWidth = 240;

const pushesBackgorunds = {
  info: `linear-gradient(
    to top,
    ${Colors.cornFlowerBlue},
    ${Colors.melrose}
  )`,
  error: Colors.terracotta,
};

export const Root = styled.div`
  position: fixed;
  bottom: 25px;
  right: ${-pushWidth}px;
  z-index: 1000;
`;

export const Header = styled.div`
  padding: 10px;
  border-radius: 3px 0 0 0;
  font-size: 14px;
  color: 'white';

  ${textMixin({
    fontType: 'liberGrotesqueBold',
    fontSize: 14,
    color: 'white',
  })}
`;

export const Content = styled.div`
  font-size: 14px;
  padding: 10px;
  border-radius: 0 0 0 3px;

  ${textMixin({
    fontType: 'liberGrotesqueRegular',
    fontSize: 13,
    color: 'white',
  })}
`;

export const Push = styled.div<{
  fadeOut?: boolean;
  slideIn?: boolean;
  type: PushType;
}>`
  width: ${pushWidth}px;
  margin-bottom: 10px;
  cursor: pointer;
  opacity: 1;
  background: ${p => pushesBackgorunds[p.type]};
  box-shadow: 0 2px 4px ${rgba(Colors.bombay, 0.2)};
  transition: transform ${PushTimings.slideInDuration}ms ease;

  transform: ${p =>
    p.slideIn ? `translateX(${-(pushWidth + 20)}px)}` : `translateX(0)`};

  ${p =>
    p.fadeOut
      ? `
    transform: opacity;
    opacity: 0;
    transition: opacity ${PushTimings.fadeOutDuration}ms ease;
  `
      : ''};
`;
