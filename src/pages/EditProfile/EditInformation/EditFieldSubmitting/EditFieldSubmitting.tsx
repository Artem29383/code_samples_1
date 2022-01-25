import React, { memo, useCallback } from 'react';
import { useField } from 'formik';

import Text from 'components/Text';
import Input from 'components/Input';

import useToggle from 'hooks/useToggle';

import * as Styled from './EditFieldSubmitting.styled';

type Props = {
  label: string;
  name: string;
  onSubmitField: (e?: React.FormEvent<HTMLFormElement> | undefined) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  titleButton: string;
  division?: {
    m: number;
    t: number;
  };
  minWidth?: number;
  isSpaceBlocked?: boolean;
};

const EditFieldSubmitting = ({
  label,
  name,
  onSubmitField,
  onBlur,
  titleButton,
  division,
  minWidth,
  isSpaceBlocked = false,
}: Props) => {
  const [isEdit, setEdit] = useToggle(false);
  const [field, { error, touched }] = useField(name);

  const handleSubmit = useCallback(() => {
    if (!error) {
      setEdit();
      onSubmitField();
    }
  }, [error, onSubmitField, setEdit]);

  const handleSubmitKey = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        if (!error) {
          setEdit();
          onSubmitField();
        }
      }
    },
    [error, onSubmitField, setEdit]
  );

  return (
    <Styled.Field>
      <Styled.Label>{label}</Styled.Label>
      <Styled.Content>
        {!isEdit ? (
          <Text
            maxWidth={255}
            fontSize={18}
            fontType="liberGrotesqueBold"
            lineHeight={{ m: '23px', d: '18px' }}
          >
            {field.value}
          </Text>
        ) : (
          <Input
            {...field}
            value={isSpaceBlocked ? field.value.trim() : field.value}
            minWidth={minWidth}
            division={division}
            onKeyEvent={handleSubmitKey}
            isError={error && touched}
            type="text"
            textAlign="left"
            onBlur={onBlur}
          />
        )}
        {isEdit ? (
          <Styled.Action onClick={handleSubmit}>Save</Styled.Action>
        ) : (
          <Styled.Action onClick={setEdit}>{titleButton}</Styled.Action>
        )}
      </Styled.Content>
    </Styled.Field>
  );
};

export default memo(EditFieldSubmitting);
