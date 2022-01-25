import styled from 'styled-components';
import { media } from 'styles/media';
import { Colors } from '@types';

export const Root = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  background: white;
  padding: 50px 24px 24px 24px;
  overflow-y: scroll;

  ${media.desktop`
    padding: 0;
    position: static;
    overflow-y: initial;
    background: transparent;
    height: auto;
    max-width: 350px;
  `}
`;
export const HeaderUser = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 47px;

  ${media.desktop`
    margin-bottom: 0;
    display: grid;
    grid-template-columns: 42% 1fr;
  `}
`;

export const Form = styled.div`
  ${media.desktop`
    margin-top: 50px;
    max-width: 340px;
  `}
`;

export const Controls = styled.div`
  display: flex;
  padding: 26px 0;
  align-items: center;
  justify-content: space-between;
  position: relative;

  svg {
    fill: ${Colors.malibu};
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 76vw;

  ${media.desktop`
    max-width: 210px;
  `}
  & div {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    padding: 0 0 3px 0;

    width: 100%;
  }
`;
