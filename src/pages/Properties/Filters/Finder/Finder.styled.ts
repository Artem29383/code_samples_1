import styled from 'styled-components';
import { Colors } from '@types';
import { FONTS } from 'styles/fonts';

export const FinderInput = styled.input`
  background: #ffffff;
  box-shadow: 0 10px 20px rgba(49, 55, 64, 0.1);
  border-radius: 8px;
  width: 100%;
  height: 54px;
  color: #c4c4d9;
  padding: 18px 20px;
  border: 1px solid ${Colors.malibu};

  &::placeholder {
    font-style: normal;
    font-weight: bold;
    font-size: 14px;
    line-height: 18px;
    color: #c4c4d9;
    font-family: ${FONTS.LiberGrotesqueRegular};
  }
`;
