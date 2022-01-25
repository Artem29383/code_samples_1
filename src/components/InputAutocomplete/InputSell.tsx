import React, { memo } from 'react';

import * as S from 'components/InputAutocomplete/InputAutocomplete.styled';
import { useField } from 'formik';

type Props = {
  label: string;
  placeholder: string;
  name: string;
};

const InputSell = ({ label, placeholder, name }: Props) => {
  const [field, { error, touched }] = useField(name);

  return (
    <S.Wrapper>
      <S.Label error={touched && error !== undefined}>{label}</S.Label>
      <S.Input id={name} type="text" placeholder={placeholder} {...field} />
    </S.Wrapper>
  );
};

export default memo(InputSell);
