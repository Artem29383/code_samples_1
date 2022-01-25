import styled from 'styled-components';
import { Colors } from '@types';
import { media } from 'styles/media';

export const Filter = styled.div<{ isActive: boolean }>`
  color: ${({ isActive }) => (isActive ? Colors.lightBlack : Colors.argent)};
  line-height: 23px;
  font-size: 16px;
  font-family: LiberGrotesqueNews, sans-serif;
  letter-spacing: -0.23px;
  margin-right: 4.533vw;
  cursor: pointer;
  border-bottom: ${({ isActive }) =>
    isActive ? `0.267vw solid ${Colors.lightBlack}` : 'none'};

  ${media.desktop`
    font-size: 18px;
    line-height: 23px;
    margin-right: 25px;
    // @ts-ignore
    border-bottom: ${({ isActive }) =>
      isActive ? `1px solid ${Colors.lightBlack}` : 'none'};
  `}

  ${media.mediumDesktop`
    margin-right: 40px;
  `}
`;
