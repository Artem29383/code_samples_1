import styled from 'styled-components';
import { Colors } from '@types';
import { media } from 'styles/media';
import { NavLink } from 'react-router-dom';

export const Root = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  background-image: linear-gradient(327deg, #6a8dff 78%, #c192ff);
  overflow: hidden;
`;

export const Controls = styled.div`
  display: flex;
  padding: 26px 21px;
  align-items: center;
  justify-content: space-between;

  svg {
    width: 25px;
    height: 36px;
    fill: ${Colors.white};
  }
`;

export const IconWrap = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  svg {
    fill: ${Colors.white};
  }
`;

export const Wrapper = styled.div`
  margin-right: 17px;
  position: relative;
  height: 456px;
  margin-top: 81px;
`;

export const WrapperText = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 50vw;

  ${media.desktop`
    max-width: 210px;
  `}

  & div {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;

    width: 100%;
  }
`;

export const Body = styled.div`
  padding: 32px 0 26px 17.5px;
  background-color: ${Colors.alabaster};
  width: 100%;
  border-radius: 20px 20px 0 0;
  overflow-y: auto;
`;

export const Profile = styled.div`
  display: flex;
  padding-right: 22px;
  max-width: 330px;

  ${media.tablet`
  //   margin: 0 auto;
  `}
`;

export const UI = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-left: 17px;
  align-items: flex-start;

  a {
    text-decoration: underline;
  }
`;

export const Icons = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;

  svg {
    width: 20px;
    height: 20px;
  }
`;

export const LinkAllBoard = styled(NavLink)`
  font-size: 14px;
  line-height: 14px;
  color: ${Colors.bombay};
  margin: 23px 0 0 0;
  padding-bottom: 20px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: LiberGrotesqueExtraBold, sans-serif;
  text-decoration: underline;
`;

export const SpinnerInner = styled.div`
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
