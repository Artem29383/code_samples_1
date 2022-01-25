import styled from 'styled-components';

export const Triangle = styled.div<{ size: number; isActive: boolean }>`
  width: 0;
  height: 0;
  border-style: solid;
  cursor: pointer;
  transform: ${({ isActive }) => (isActive ? 'rotate(90deg)' : 'rotate(0)')};
  border-width: ${({ size }) =>
    `${10 * size}px 0 ${10 * size}px ${20 * size}px`};
  border-color: transparent transparent transparent #555555;
`;
