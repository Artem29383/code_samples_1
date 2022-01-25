import styled from 'styled-components';
import { Colors } from '@types';
import { media } from 'styles/media';

// background: ${({ timeRange }) =>
//   timeRange === 'past' ? Colors.mischka : Colors.malibu};

export const ToolTip = styled.div<{
  direction: string;
  timeRange: string | boolean;
}>`
  content: '';
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 115%;
  right: ${({ direction }) => (direction === 'left' ? '0' : 'initial')};
  left: ${({ direction }) => (direction === 'right' ? '0' : 'initial')};
  width: 168px;
  height: 40px;
  box-shadow: 10px 10px 22px rgba(0, 0, 0, 0.13);
  border-radius: 15px;
  background-color: #c192ff;
  z-index: -1;
  justify-content: center;
  align-items: center;

  // enter from
  &.opacity-enter {
    opacity: 0;
  }

  // enter to
  &.opacity-enter-active {
    opacity: 1;
    transition: opacity 500ms ease;
  }

  // exit from
  &.opacity-exit {
    opacity: 1;
  }

  // exit to
  &.opacity-exit-active {
    opacity: 0;
  }

  ${media.desktop`
    top: 115%;
  `}
`;

export const Text = styled.div`
  color: ${Colors.white};
  font-size: 16px;
  line-height: 16px;
  font-family: LiberGrotesqueBlack, sans-serif;
  border-bottom: 1px solid white;
`;

export const ContactText = styled.div`
  color: ${Colors.white};
  font-size: 12px;
  line-height: 12px;
  text-align: left;
  font-family: LiberGrotesqueNews, sans-serif;
`;

export const Line = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 10px;
`;

export const Contact = styled.div`
  color: ${Colors.white};
  font-size: 14px;
  line-height: 14px;
  font-family: LiberGrotesqueNews, sans-serif;
  text-decoration: underline;
`;

export const Triangle = styled.div<{ direction: string }>`
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 10px 10px 10px;
  position: absolute;
  top: -9px;
  border-color: transparent transparent ${Colors.mischka} transparent;
  right: ${({ direction }) => (direction === 'left' ? '9px;' : 'initial;')};
  left: ${({ direction }) => (direction === 'right' ? '10px;' : 'initial;')};
`;
