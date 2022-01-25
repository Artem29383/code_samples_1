import styled from 'styled-components';
import { Colors } from '@types';
import { media } from 'styles/media';

export const List = styled.div`
  width: 100%;
  padding: 25px 45px;
  max-width: 100%;
  border-radius: 4.1% 4.1% 0 0;
  color: ${Colors.emperor};
  font-family: LiberGrotesqueNews, sans-serif;
  min-height: 450px;

  ${media.desktop`
      max-width: 450px;
      min-height: initial;
  `}
`;
