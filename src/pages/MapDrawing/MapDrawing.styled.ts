import styled from 'styled-components';
import { FONTS } from 'styles/fonts';

export const Map = styled.div`
  width: 100%;
  height: 600px;

  .map-marker {
    background-color: transparent;
    width: 50px;
    height: 50px;
    position: absolute;
    cursor: pointer;
    transform: translate(-120%, -50%);
  }

  .map-marker-style {
    width: 128px;
    height: 50px;
    background: rgba(51, 51, 51, 0.6);
    border-radius: 25px;
    padding: 15px 19px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .map-marker-text {
    font-style: normal;
    font-weight: 800;
    font-size: 18px;
    line-height: 18px;
    color: #ffffff;
    text-shadow: -13.1644px 12.276px 62px rgba(0, 0, 0, 0.129412);
    font-family: ${FONTS.LiberGrotesqueRegular};
  }

  .map-marker-cross {
    position: relative;
    width: 32px;
    height: 32px;

    &:before {
      position: absolute;
      content: ' ';
      height: 22px;
      width: 2px;
      background-color: #fff;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%) rotate(45deg);
    }

    &:after {
      position: absolute;
      content: ' ';
      height: 22px;
      width: 2px;
      background-color: #fff;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%) rotate(-45deg);
    }
  }
`;

export const Root = styled.div``;
