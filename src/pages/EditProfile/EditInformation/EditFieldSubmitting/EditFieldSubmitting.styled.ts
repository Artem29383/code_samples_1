import styled from 'styled-components';
import { Colors } from '@types';
import { media } from 'styles/media';

export const Field = styled.div`
  width: 100%;
  margin-bottom: 33px;
`;
export const Label = styled.div`
  color: ${Colors.bombay};
  font-family: liberGrotesqueExtraBold, sans-serif;
  font-size: 12px;
  margin-bottom: 15px;

  ${media.tablet`
      text-transform: uppercase;
  `}
`;
export const Content = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  overflow: hidden;

  & > div {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    padding-top: 4px;
    max-width: 80%;
  }

  & input {
    max-width: 255px;
    font-size: 18px;
  }
`;
export const Action = styled.div`
  color: ${Colors.malibu};
  font-family: liberGrotesqueBold, sans-serif;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  font-style: normal;
  letter-spacing: -0.14px;
  line-height: 14px;
  text-align: right;
  text-decoration: underline;
`;
