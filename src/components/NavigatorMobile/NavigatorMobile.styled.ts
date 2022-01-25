import styled from 'styled-components';
import { Colors } from '@types';
import { media } from 'styles/media';

export const NavigatorMobile = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10005;

  // enter from
  &.fade-enter {
    transform: translateX(-100%);
  }

  // enter to
  &.fade-enter-active {
    transform: translateX(0);
    transition: transform 200ms linear 150ms;
  }

  // exit from
  &.fade-exit {
    transform: translateX(0);
  }

  // exit to
  &.fade-exit-active {
    transform: translateX(-100%);
    transition: transform 200ms linear;
  }
`;

export const BlackGround = styled.div`
  background-color: rgba(0, 0, 0, 0.6);
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;

  // enter from
  &.drop-enter {
    background-color: rgba(0, 0, 0, 0);
  }

  // enter to
  &.drop-enter-active {
    background-color: rgba(0, 0, 0, 0.6);
    transition: background-color 150ms linear;
  }

  // exit from
  &.drop-exit {
    background-color: rgba(0, 0, 0, 0.6);
    transform: translateX(0);
  }

  // exit to
  &.drop-exit-active {
    background-color: rgba(0, 0, 0, 0);
    transition: background-color 150ms linear 100ms;
  }
`;

export const NavigatorBackDrop = styled.div`
  padding: 30px 0 0 30px;
  height: 100%;
  width: 250px;
  position: relative;
  background: linear-gradient(135deg, #c192ff, #3d9dff);
  display: flex;
  flex-direction: column;
  overflow-y: auto;

  // ${media.height(890)`
    overflow-y: auto;
  `};
`;

export const BackDrop = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
`;

export const Settings = styled.div`
  position: absolute;
  background-color: ${Colors.white};
  width: 100%;
  left: 0;
  bottom: 0;
  padding: 20px 45px;
  border-radius: 20px 20px 0 0;
  transition: transform 150ms linear;

  // enter from
  &.swipe-enter {
    transform: translateY(100%);
  }

  // enter to
  &.swipe-enter-active {
    transform: translateY(0);
    transition: transform 150ms linear;
  }

  // exit from
  &.swipe-exit {
    transform: translateY(0);
  }

  // exit to
  &.swipe-exit-active {
    transform: translateY(100%);
    transition: transform 150ms linear;
  }
`;
