import styled from 'styled-components';
import { Colors } from '@types';
import { media } from 'styles/media';

export const Card = styled.div`
  width: 100%;
  //height: 101px;
  max-height: 150px;
  height: 100%;
  box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.2);
  background-color: ${Colors.white};
  border-radius: 20px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  overflow: hidden;

  ${media.desktop`
      max-height: none;
      height: 240px;
  `}
`;

export const PropertyCard = styled.div<{ isActive: boolean }>`
  display: flex;
  position: relative;
  max-width: 600px;
  width: 100%;
  flex-direction: column;
  height: 100%;
  cursor: ${({ isActive }) => (isActive ? 'pointer' : 'default')};
  margin-bottom: 20px;

  ${media.desktop`
      margin-top: 18px;
      position: relative;
      margin-right: 50px;
      margin-bottom: 50px;
  `}
`;

export const WrapperImage = styled.div`
  //height: 100%;
  width: 30%;
  overflow: hidden;

  ${media.desktop`
      width: 40%;
  `}
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const Content = styled.div`
  width: 70%;
  padding: 15px 10px;

  ${media.desktop`
    width: 60%;
      padding: 30px 25px;
  `}
`;

export const Props = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Prop = styled.div`
  display: flex;
  align-items: center;
`;

export const LowContent = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 21px;

  div {
    word-break: break-word;
  }

  ${media.desktop`
      margin-top: 55px;
  `}
`;

export const Price = styled.div<{ color: string }>`
  max-width: 50%;
  align-items: flex-end;
  width: 100%;
  display: flex;
  flex-direction: column;

  & div {
    color: ${({ color }) => color};
  }
`;

export const StatusShowing = styled.div`
  color: ${Colors.malibu};
  font-size: 14px;
  font-family: liberGrotesqueRegular, sans-serif;
  position: absolute;
  right: 18px;
  top: -18px;
`;
