import React from 'react';
import { useField } from 'formik';
import { MarginProps } from 'styled-system';

import * as Styled from './AuthField.styled';

type Props = {
  id?: string;
  name: string;
  placeholder?: string;
  label: string;
  type?: 'password' | 'text';
  value?: string;
  required?: boolean;
} & MarginProps;

const AuthField = ({
  id,
  name,
  type = 'text',
  required = false,
  label,
  ...rest
}: Props) => {
  const [field, { error, touched }] = useField(name);

  return (
    <Styled.Root {...rest}>
      <Styled.Label id={id || name}>
        {label}
        {required && <span>&#42;</span>}
      </Styled.Label>
      <Styled.Input
        id={id || name}
        type={type}
        error={touched && error !== undefined}
        {...field}
      />
    </Styled.Root>
  );
};

export default AuthField;
