import React from 'react';

export const validationInputMoney = (
  e: React.ChangeEvent<HTMLInputElement>,
  initialValue = '',
  maxSymbols: number
) => {
  const value: string =
    e.currentTarget.value.length > maxSymbols
      ? initialValue
      : e.currentTarget.value;
  // eslint-disable-next-line
  const notValid = /[а-яА-Яa-zA-Z-!%^&*$()_+|~=`\\#{}\[\]:№#@!";'<>?,.\s\/]/.test(
    value.replace(/\$/, '')
  );
  if (!notValid) {
    return `$${value.replace('$', '')}`;
  }
  return initialValue;
};
