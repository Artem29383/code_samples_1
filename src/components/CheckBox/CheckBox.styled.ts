import styled from 'styled-components';
import { Colors } from '@types';

export const Root = styled.div<{ isActive: boolean }>`
  width: 52px;
  height: 28px;
  box-shadow: 5px 5px 9px rgba(0, 0, 0, 0.1);
  border-radius: 25px;
  background: ${({ isActive }) =>
    isActive
      ? 'linear-gradient(90deg, #6A8DFF 0%, #C192FF 100%)'
      : Colors.mischka};
  position: relative;
  cursor: pointer;
`;

export const Circle = styled.div<{ isActive: boolean }>`
  width: 22px;
  height: 22px;
  box-shadow: 5px 5px 9px rgba(0, 0, 0, 0.1);
  background-color: ${Colors.white};
  position: absolute;
  transform: ${({ isActive }) =>
    isActive ? 'translate(25px, -50%)' : 'translate(5px, -50%)'};
  border-radius: 25px;
  top: 50%;
  transition: transform 300ms ease;
`;
