import styled from 'styled-components';
import { media } from 'styles/media';
import { FONTS } from 'styles/fonts';
import { Colors } from '@types';

export const Switch = styled.div`
  padding: 0 0 0 0;
  border-radius: 36px;
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${media.desktop`
    padding: 0 35px 0 0;
  `}
`;

export const Button = styled.div<{ status: boolean | null }>`
  height: 100%;
  cursor: pointer;
  z-index: 2;
  display: flex;
  font-size: 16px;
  font-family: ${FONTS.LiberGrotesqueExtraBold};
  width: 125px;
  justify-content: center;
  align-items: center;
  letter-spacing: 0.45px;
  color: ${({ status }) =>
    status === null || !status ? Colors.malibu : '#fff'};
  transition: color 200ms ease;

  ${media.desktop`
    width: 189px;
    font-size: 18px;
  `}
`;

export const ButtonRight = styled.div<{ status: boolean | null }>`
  height: 100%;
  cursor: pointer;
  z-index: 2;
  display: flex;
  font-size: 16px;
  font-family: ${FONTS.LiberGrotesqueExtraBold};
  width: 190px;
  justify-content: center;
  align-items: center;
  letter-spacing: 0.45px;
  color: ${({ status }) =>
    status === null || !status ? Colors.malibu : '#fff'};
  transition: color 200ms ease;

  ${media.desktop`
    width: 189px;
    font-size: 18px;
  `}
`;

export const BackDrop = styled.div<{ status: boolean | null }>`
  border-radius: 38px;
  position: absolute;
  width: ${({ status }) => (status ? '125px' : '185px')};
  top: 50%;
  height: 80%;
  left: ${({ status }) => (status ? '0' : '100%')};
  transform: ${({ status }) =>
    status ? 'translate(0, -50%)' : 'translate(-102%, -50%);'};
  background: linear-gradient(292.34deg, #3d9dff -84.94%, #9592ff 105.65%);
  transition: transform 300ms linear, left 300ms linear, width 300ms linear;

  ${media.desktop`
    width: ${({ status }) => (status ? '189px' : '250px')};
    transform: ${({ status }) =>
      status ? 'translate(0, -50%)' : 'translate(-101%, -50%)'};
  `}
`;
