import styled from 'styled-components';
import { FONTS } from 'styles/fonts';
import { media } from 'styles/media';

export const Root = styled.div`
  max-width: 449px;
  width: 100%;
  border-radius: 20px;
  height: 74px;
  padding: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #ffffff;
  box-shadow: 0px 10px 20px rgba(46, 48, 55, 0.1);

  ${media.desktop`
    height: 96px;
    padding: 19px 16px 19px 36px;
  `}
`;

export const Text = styled.p`
  font-size: 11px;
  line-height: 15px;
  max-width: 175px;
  width: 100%;
  text-align: left;
  color: #000000;
  font-family: ${FONTS.LiberGrotesqueBold};

  ${media.desktop`
    font-size: 12px;
    max-width: 195px;
  `}
`;
