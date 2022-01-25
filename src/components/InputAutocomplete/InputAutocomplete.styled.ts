import styled, { createGlobalStyle } from 'styled-components';
import { Colors } from '@types';
import { maxWidth, MaxWidthProps } from 'styled-system';
import { media } from 'styles/media';
import { rgba } from 'polished';
import { FONTS } from 'styles/fonts';

export const Wrapper = styled.div<MaxWidthProps>`
  border-radius: 20px;
  width: 100%;
  padding: 20px;
  background-color: ${Colors.white};
  box-shadow: 0 10px 20px rgba(46, 48, 55, 0.1);
  margin: 0 auto;
  ${maxWidth};

  ${media.desktop`
    padding: 28px 37px;
    margin: 0 auto;
  `}
`;

export const Label = styled.label<{ error?: boolean }>`
  text-transform: uppercase;
  font-size: 12px;
  line-height: 15px;
  color: ${({ error }) => (error ? Colors.burningOrange : Colors.black)};
  font-family: ${FONTS.LiberGrotesqueRegular};
  font-weight: bold;
`;

export const Input = styled.input`
  width: 100%;
  color: #000000;
  margin-top: 4px;
  font-size: 16px;
  line-height: 25px;
  font-family: liberGrotesqueRegular, sans-serif;
  font-weight: bold;

  &::placeholder {
    color: #bec0d6;
    font-size: 16px;
    line-height: 25px;
    font-weight: bold;
    font-family: liberGrotesqueRegular, sans-serif;
  }
`;

export const Global = createGlobalStyle<{ width: string }>`
  .pac-container {
    width: ${({ width }) => width}!important;
    border-radius: 0 0 15px 15px;
    border-top: none;
    box-shadow: 4px 6px 9px ${rgba(Colors.black, 0.1)};
    left: 50%!important;
    transform: translateX(-50%)!important;
    padding: 0 6px!important;
    
    ${media.desktop`
      padding: 0 20px!important;
    `}

    &::after {
      display: none;
    }

    & .pac-icon {
      display: none;
    }

    & .pac-item {
      cursor: pointer;
      padding: 15px 15px;
      border-top: none;
    }

    &,
    & .pac-item {
      font-family: ${FONTS.LiberGrotesqueBold};
      color: #000;
      font-size: 16px;
    }
    & .pac-item-selected {
      border-radius: 10px;
      background-color: #F9F9FD!important;
    }
    & .pac-item-query {
      font-family: ${FONTS.LiberGrotesqueBold};
      color: #000;
      font-size: 16px;
    }

    & .pac-matched {
      font-family: ${FONTS.LiberGrotesqueBold};
      color: ${Colors.mauve};
      font-size: 16px;
    }
  }
`;
