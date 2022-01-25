import styled from 'styled-components';

import { Colors } from '@types';
import { media } from 'styles/media';

export const Root = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  margin-bottom: 15px;

  ${media.desktop`
      margin-bottom: 30px;
  `}
`;
export const Title = styled.div`
  font-family: LiberGrotesqueNews, sans-serif;
  font-size: 14px;
  flex-basis: 50%;
  color: ${Colors.emperor};

  ${media.desktop`
      font-size: 18px;
  `}
`;
export const Text = styled.div`
  font-family: LiberGrotesqueNews, sans-serif;
  font-size: 14px;
  flex-basis: 50%;
  text-align: right;
  color: ${Colors.emperor};

  ${media.desktop`
    font-size: 16px;
  `}
`;

export const InputWrapper = styled.div`
  flex-basis: auto;
  max-width: 120px;
  overflow: hidden;
`;
