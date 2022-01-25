import React from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import _isEmpty from 'lodash/isEmpty';

import AuthField from 'components/Forms/AuthField';
import Button from 'components/Button';

import * as S from './RecoverPassword.styled';

type Props = {
  onRecover: (payload: string) => void;
};

const RecoverPassword = ({ onRecover }: Props) => (
  <S.Root>
    <S.Panel>
      <S.Header>Reset your password</S.Header>
      <Formik
        onSubmit={({ email }) => onRecover(email)}
        initialValues={{ email: '' }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email()
            .required(),
        })}
      >
        {({ isValid, touched }) => (
          <S.Form>
            <AuthField
              name="email"
              label="Email"
              placeholder="youremail@gmail.com"
              type="text"
              marginBottom={20}
            />
            <Button disabled={!isValid && !_isEmpty(touched)} type="submit">
              Get reset password link
            </Button>
          </S.Form>
        )}
      </Formik>
    </S.Panel>
  </S.Root>
);

export default RecoverPassword;
