import styled from 'styled-components';

export const Map = styled.div`
  width: 100%;
  height: 100%;

  & .gm-style-iw {
    max-width: 279px !important;
    height: 130px !important;
    width: 100%;
    border: 8px solid #6a8dff;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  & .gm-style-iw-t::after {
    background: none;
    box-shadow: none;
    left: initial;
    transform: rotate(-45deg) translateX(-50%);
    border-radius: 0 0 0 0.25em;
    background: #fff;
    height: 25px;
    width: 25px;
    border-bottom: 6px solid #6a8dff;
    border-left: 6px solid #6a8dff;
    top: -25px;
  }

  & button.gm-ui-hover-effect {
    display: none !important;
  }
`;

export const RootContentMarker = styled.div`
  width: 100%;
  max-width: 100%;
  max-height: 100%;
  position: relative;
  height: 110px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Triangle = styled.div``;

export const Root = styled.div`
  position: relative;
  z-index: 10000;
  max-width: 323px;
  height: auto;
  text-align: center;
  padding-top: 30px;
  padding-left: 40px;
  padding-right: 40px;
  padding-bottom: 20px;

  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    height: 40px;
    width: 40px;
  }
`;

export const Question = styled.div`
  font-size: 12px;
  color: #c4c4c4;
  font-family: liberGrotesqueBold, sans-serif;
  text-transform: uppercase;
  margin-bottom: 3px;
  line-height: 15px;
  text-align: center;
`;

export const Address = styled.div`
  font-size: 16px;
  color: #000;
  font-family: liberGrotesqueBold, sans-serif;
  line-height: 20px;
  text-align: center;
`;
