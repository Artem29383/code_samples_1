import React from 'react';

import Text from 'components/Text';

import * as Styled from './Line.styled';

type Props = {
  children: React.ReactChild;
  label: string;
};

const Line = ({ children, label }: Props) => {
  return (
    <Styled.Line>
      <Text
        fontSize={14}
        lineHeight="12px"
        fontType="liberGrotesqueRegular"
        color="emperor"
      >
        {label}
      </Text>
      {children}
    </Styled.Line>
  );
};

export default Line;
