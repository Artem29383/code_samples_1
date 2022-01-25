import styled from 'styled-components';
import { layout, margin, MarginProps } from 'styled-system';

export const Root = styled.div<MarginProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;

  ${margin}
`;

export const Circle = styled.div<{ disabled: boolean; stoke: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  margin-bottom: 5px;
  border-radius: 50%;
  background: ${p =>
    p.disabled
      ? '#F2F2F9'
      : `linear-gradient(0deg, #6A8DFF 0%, #C192FF 100%);`};

  svg {
    stroke: ${({ stoke }) => stoke};
    stroke-width: 2px;
  }

  ${layout}
`;
