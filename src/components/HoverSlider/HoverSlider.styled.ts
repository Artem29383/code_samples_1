import styled from 'styled-components';
import { layout, margin } from 'styled-system';
import { rgba } from 'polished';

import { Colors } from '@types';

export const Root = styled.div`
  position: relative;
  width: 100%;
  background-color: ${Colors.argent};
  border-radius: 10px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px;
  }

  ${layout}
  ${margin}
`;

export const progressItemMargin = 2;

export const ProgressBar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  padding: 0 7px 7px;
`;

export const ProgressItem = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  &:not(:last-child) {
    margin-right: ${progressItemMargin}px;
  }

  & .hover-slider-highlight-part {
    background: ${rgba(Colors.white, 0.5)};
  }

  &:hover {
    & .hover-slider-highlight-part {
      background: linear-gradient(
        135deg,
        ${Colors.melrose},
        ${Colors.malibu},
        ${Colors.dodgerBlue}
      );
    }
  }
`;

export const TransparentPart = styled.div`
  background-color: transparent;
  height: 100%;
`;

export const HighlightPart = styled.div`
  background-color: white;
  height: 4px;
  border-radius: 4px;
`;
