import React, { memo } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';

import { PasswordConfirmPayload } from 'models/user/types';

import Button from 'components/Button';
import TextField from 'components/TextField';

import * as Styled from './PasswordChange.styled';

type Props = {
  onChange: (payload: PasswordConfirmPayload) => void;
};

const PasswordChange = ({ onChange }: Props) => {
  const onSubmit = ({
    oldPassword,
    password,
    confirm,
  }: PasswordConfirmPayload) => {
    onChange({ password, confirm, oldPassword });
  };

  return (
    <Formik
      initialValues={{
        oldPassword: '',
        password: '',
        confirm: '',
      }}
      validationSchema={Yup.object({
        oldPassword: Yup.string().required(),
        password: Yup.string().required(),
        confirm: Yup.string()
          .oneOf([Yup.ref('password')], 'Passwords must match')
          .required(),
      })}
      onSubmit={onSubmit}
    >
      {({ handleBlur }) => (
        <Styled.Form>
          <TextField
            minWidth={40}
            division={{
              m: 1.6,
              t: 1.6,
            }}
            label="Old Password"
            isEdit
            isEditable
            name="oldPassword"
            onBlur={handleBlur}
          />
          <TextField
            minWidth={40}
            division={{
              m: 1.6,
              t: 1.6,
            }}
            label="Password"
            isEdit
            isEditable
            name="password"
            onBlur={handleBlur}
          />
          <TextField
            minWidth={40}
            division={{
              m: 1.6,
              t: 1.6,
            }}
            label="Confirm Password"
            isEdit
            isEditable
            name="confirm"
            onBlur={handleBlur}
          />
          <Button type="submit">
            <Styled.Text>Submit</Styled.Text>
          </Button>
        </Styled.Form>
      )}
    </Formik>
  );
};

export default memo(PasswordChange);
