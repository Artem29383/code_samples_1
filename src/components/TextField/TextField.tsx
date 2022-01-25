import React, { memo } from 'react';
import { useField } from 'formik';

import Input from 'components/Input';

import * as Styled from './TextField.styled';

type Props = {
  label: string;
  isEdit?: boolean;
  isEditable?: boolean;
  name: string;
  type?: string;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  minWidth?: number;
  division?: {
    m: number;
    t: number;
  };
};

const TextField = ({
  label,
  isEdit,
  isEditable = false,
  minWidth,
  division,
  name,
  onBlur,
  type = 'text',
}: Props) => {
  const [field, { error, touched }] = useField(name);
  if (!isEditable)
    return (
      <Styled.Root>
        <Styled.Title>{label}</Styled.Title>
        <Styled.Text>{field.value}</Styled.Text>
      </Styled.Root>
    );
  return (
    <Styled.Root>
      <Styled.Title>{label}</Styled.Title>
      {!isEdit ? (
        <Styled.Text>{field.value || '-'}</Styled.Text>
      ) : (
        <Styled.InputWrapper>
          <Input
            minWidth={minWidth}
            division={division}
            type={type}
            {...field}
            isError={error && touched}
            onBlur={onBlur}
          />
        </Styled.InputWrapper>
      )}
    </Styled.Root>
  );
};

export default memo(TextField);
