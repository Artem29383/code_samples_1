import React, { ChangeEvent, memo, useEffect, useRef, useState } from 'react';

import useWindowResize from 'hooks/useWindowResize';

import * as Styled from './Input.styled';

type Props = {
  value: string;
  onChange: {
    (e: ChangeEvent<HTMLInputElement>): void;
  };
  name: string;
  isError: boolean | undefined | string;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  type: string;
  width?: number;
  textAlign?: string;
  fontSize?: {
    m: number;
    t: number;
  };
  division?: {
    m: number;
    t: number;
  };
  size?: number;
  onKeyEvent?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  minWidth?: number;
  customInvalidChars?: string[];
};

const invalidChars = ['-', '+', 'e', ',', '.', 'E'];

const Input = ({
  value = '',
  onChange,
  name,
  isError,
  onBlur,
  type,
  width = 1,
  textAlign = 'right',
  fontSize = {
    m: 22,
    t: 18,
  },
  division = {
    m: 2.7,
    t: 2.7,
  },
  size = 2,
  onKeyEvent,
  minWidth,
  customInvalidChars,
}: Props) => {
  const [sizeInput, setSize] = useState(size);
  const $input = useRef(null);
  const { width: windowWidth } = useWindowResize();

  const handleKeyPress = (e: { key: string; preventDefault: () => void }) => {
    if (type === 'number') {
      if (customInvalidChars) {
        if (customInvalidChars.includes(e.key)) {
          e.preventDefault();
        }
      } else if (invalidChars.includes(e.key)) {
        e.preventDefault();
      }
    }
  };

  useEffect(() => {
    if ($input.current) {
      setSize(value.toString().length);
    }
  }, [$input, value]);

  return (
    <Styled.Input
      division={windowWidth < 1025 ? division.m : division.t}
      ref={$input}
      minWidth={minWidth}
      sizeInput={sizeInput}
      fontSizeInput={windowWidth < 1025 ? fontSize.m : fontSize.t}
      widthInput={width}
      name={name}
      onKeyPress={handleKeyPress}
      onKeyDown={onKeyEvent}
      value={value}
      onChange={onChange}
      isError={isError}
      onBlur={onBlur}
      type={type}
      textAlign={textAlign}
    />
  );
};

export default memo(Input);
