import styled from 'styled-components';
import { media } from 'styles/media';

export const Switch = styled.div`
  padding: 6px;
  background: #f2f7ff;
  border-radius: 36px;
  position: relative;
  max-width: 108px;
  width: 100%;
  height: 46px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${media.desktop`
    height: 58px;
    max-width: 149px;
  `}
`;

export const Button = styled.div<{ status: boolean }>`
  text-transform: uppercase;
  max-width: 48px;
  height: 100%;
  cursor: pointer;
  width: 100%;
  z-index: 2;
  display: flex;
  font-size: 11px;
  justify-content: center;
  align-items: center;
  color: ${({ status }) => (status ? '#fff' : '#000')};
  transition: color 200ms ease;

  ${media.desktop`
    font-size: 16px;
    max-width: 69px;
  `}
`;

export const BackDrop = styled.div<{ status: boolean }>`
  max-width: 48px;
  border-radius: 38px;
  position: absolute;
  left: 6px;
  width: 100%;
  top: 50%;
  height: 80%;
  transform: ${({ status }) =>
    status ? 'translate(0, -50%)' : 'translate(100%, -50%)'};
  background: linear-gradient(292.34deg, #3d9dff -84.94%, #9592ff 105.65%);
  transition: transform 300ms ease;

  ${media.desktop`
    max-width: 69px;
  `}
`;
