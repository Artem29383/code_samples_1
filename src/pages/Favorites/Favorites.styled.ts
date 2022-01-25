import styled from 'styled-components';
import { Colors } from '@types';
import { media } from 'styles/media';

export const Root = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  padding: 25px 0;

  ${media.desktop`
    padding: 0;
  `}
`;

export const Spinner = styled.div`
  margin: 50px auto 0 auto;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  ${media.desktop`
    position: absolute;
    margin: initial;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  `}
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding-right: 60px;
`;

export const Input = styled.input`
  max-width: 493px;
  border-radius: 40px;
  width: 100%;
  height: 60px;
  display: none;
  padding: 18px 23.7px 17px 35px;
  box-shadow: 10px 10px 20px 0 rgba(68, 68, 68, 0.1);
  background-color: ${Colors.white};
  color: ${Colors.argent};
  font-size: 16px;
  line-height: 16px;
  font-family: liberGrotesqueBold, sans-serif;

  &::placeholder {
    color: inherit;
    line-height: inherit;
    font-family: inherit;
    font-size: inherit;
  }

  ${media.desktop`
    max-width: 300px;
  `}

  ${media.mediumDesktop`
    max-width: 493px;
  `}
`;

export const Filters = styled.div`
  width: 100%;
  justify-content: space-between;
  display: flex;
  margin-top: 3.733vw;
  padding: 0 26px;

  ${media.desktop`
    padding: 0;
    padding-right: 60px;
    margin-top: 33px;
    margin-bottom: 81px;
    
    ${media.height(900)`
      margin-bottom: 35px;
    `}
    
    ${media.height(800)`
      margin-bottom: 25px;
      margin-top: 20px;
    `}
  `}
`;

export const Hidden = styled.div<{ propertyTypes: string }>`
  position: absolute;
  top: 19px;
  right: 19px;
  font-size: 14px;
  line-height: 23px;
  font-family: liberGrotesqueNews, sans-serif;
  cursor: pointer;
  color: ${({ propertyTypes }) =>
    propertyTypes === 'favorite' ? Colors.argent : Colors.lightBlack};

  ${media.desktop`
    position: initial;
    font-size: 18px;
    line-height: 23px;
  `}
`;
