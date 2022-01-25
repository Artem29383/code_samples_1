import styled from 'styled-components';
import { media } from 'styles/media';

export const Root = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;

  ${media.desktop`
    padding: 0;
  `}
`;

export const Widgets = styled.div`
  ${media.desktop`
    margin-top: 70px;
  `}
`;

export const Calendar = styled.div`
  max-width: 518px;
  position: relative;
  margin: 0 auto;
  height: 456px;

  ${media.tablet`
    max-width: none;
    margin: 0;
  `}

  ${media.desktop`
     max-width: 518px;
     
   ${media.desktop`
      ${media.height(800)`
        height: 370px;
        min-width: 465px;
        max-width: 465px;
      `}
    `}
  `}
`;

export const Spinner = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 20px;
  z-index: 1234;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.3);

  div {
    border-color: white;
    border-bottom-color: transparent;
  }
`;
