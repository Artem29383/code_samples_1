import styled from 'styled-components';
import { MarginProps, margin } from 'styled-system';
import { rgba } from 'polished';

import { Colors } from '@types';

import { textMixin, center } from 'styles/helpers';
import { media } from 'styles/media';

export const contentLeftHorOffset = 25;
export const itemMarginBottom = 30;

export const Root = styled.div`
  position: relative;
  height: 100%;
`;

export const Item = styled.div<MarginProps>`
  position: relative;
  width: 100%;
  height: 125px;
  padding: 15px;
  flex-shrink: 0;
  border-radius: 10px;
  // border: 2px solid ${Colors.mischka};
  box-shadow: 0px 10px 30px ${rgba(Colors.black, 0.1)};
  cursor: pointer;

  ${margin}

  &:not(:last-child) {
    margin-right: 30px;
  }

  ${media.desktop`
    width: 300px;
  `}
`;

export const ModalContent = styled.div`
  max-height: 200px;
  overflow-y: scroll;
`;

export const Items = styled.div`
  max-height: 435px;

  ${media.desktop`
    display: flex;
    margin-bottom: ${itemMarginBottom}px;
  `}
`;

export const QueryItem = styled.div`
  &:not(:last-child) {
    margin-bottom: 10px;
  }
`;

export const QueryTitle = styled.span`
  ${textMixin({
    fontType: 'liberGrotesqueNews',
    fontSize: 14,
  })}
`;

export const QueryValue = styled.span`
  ${textMixin({
    fontType: 'liberGrotesqueBlack',
    fontSize: 14,
  })}
`;

export const NoResult = styled.div`
  text-align: center;

  ${center()}
`;

export const ItemsContainer = styled.div`
  width: 100%;
  overflow-x: scroll;
`;

export const RowsContainer = styled.div`
  display: inline-block;
  margin-right: ${contentLeftHorOffset}px;
`;
