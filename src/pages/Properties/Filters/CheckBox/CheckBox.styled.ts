import styled from 'styled-components';
import { Colors } from '@types';

export const Root = styled.div<{ isActive: boolean }>`
  width: 43px;
  height: 26px;
  border-radius: 25px;
  background: ${({ isActive }) =>
    isActive
      ? 'linear-gradient(109.47deg, #C192FF -23.71%, #638CFF 126.14%)'
      : '#C4C4D9'};
  position: relative;
  cursor: pointer;
`;

export const Circle = styled.div<{ isActive: boolean }>`
  width: 22px;
  height: 22px;
  background-color: ${Colors.white};
  position: absolute;
  transform: ${({ isActive }) =>
    isActive ? 'translate(19px, -50%)' : 'translate(2px, -50%)'};
  border-radius: 25px;
  top: 50%;
  transition: transform 300ms ease;
`;
