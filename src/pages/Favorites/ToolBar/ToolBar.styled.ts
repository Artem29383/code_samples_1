import styled from 'styled-components';
import { Colors } from '@types';
import { media } from 'styles/media';

export const ToolBar = styled.div`
  max-width: 326px;
  width: 100%;
  margin-left: 20px;
  margin-bottom: 30px;
  box-shadow: 10px 10px 20px 0 rgba(0, 0, 0, 0.09);
  background-color: #ffffff;
  height: 73px;
  display: flex;
  padding: 15px;
  justify-content: space-around;
  align-items: center;
  border-radius: 15px;

  ${media.desktop`
    margin-left: initial;
    margin-bottom: initial;
  `}
`;

export const ItemBar = styled.div`
  font-size: 22px;
  cursor: pointer;
  font-family: BwGradual, sans-serif;
  color: ${Colors.disableColor};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ItemCount = styled.div<{ isActive: boolean }>`
  font-family: inherit;
  color: ${({ isActive }) => (isActive ? Colors.cornFlowerBlue : 'inherit')};
  font-size: inherit;
  margin-bottom: 7px;
  transition: color 300ms linear;
`;

export const ItemLabel = styled.div<{ isActive: boolean }>`
  font-size: 16px;
  font-family: LiberGrotesqueRegular, sans-serif;
  color: ${({ isActive }) => (isActive ? Colors.black : 'inherit')};
  transition: color 300ms linear;
`;
