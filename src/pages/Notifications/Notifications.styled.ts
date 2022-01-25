import styled from 'styled-components';
import { media } from 'styles/media';

export const Root = styled.div`
  width: 100%;
  padding: 54px 24px;

  ${media.desktop`
    padding: 0;
    max-width: 400px;
  `}
`;

export const Contact = styled.div`
  margin-bottom: 39px;
`;

export const Text = styled.div`
  display: flex;
  justify-content: flex-end;
  max-width: 70%;
  & > div {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    max-width: 100%;
    padding: 5px 0 0 0;
    margin-top: -5px;

    ${media.desktop`
      padding: 0;
      margin-top: 0;
    `}
  }

  ${media.tablet`
     max-width: 100%%;
     display: block;
     & > div {
       overflow: initial;
       text-overflow: initial;
     }
  `}
`;

export const Notification = styled.div``;
