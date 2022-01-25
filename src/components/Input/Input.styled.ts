import styled from 'styled-components';
import { Colors } from '@types';

type Input = {
  isError: boolean | undefined | string;
  widthInput: number;
  textAlign: string;
  fontSizeInput: number;
  division: number;
  sizeInput: number;
  minWidth: number | undefined;
};

export const Input = styled.input.attrs((props: Input) => ({
  style: {
    width: `${(props.sizeInput + 1) *
      (props.fontSizeInput / props.division)}px`,
  },
}))<Input>`
  font-family: LiberGrotesqueBlack, sans-serif;
  color: ${Colors.emperor};
  font-size: ${({ fontSizeInput }) => `${fontSizeInput}px`};
  text-align: ${({ textAlign }) => textAlign};
  min-width: ${({ minWidth }) => (minWidth ? `${minWidth}px` : 'auto')};
  border-bottom: ${({ isError, widthInput }) =>
    `${widthInput}px solid ${
      isError ? Colors.burningOrange : Colors.dodgerBlue
    }`};
`;
