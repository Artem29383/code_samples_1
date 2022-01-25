import React from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useParams } from 'react-router-dom';

import { ResetPasswordPayload } from 'models/user/types';

import { password as passwordRegexps } from 'utils/regexps';

import AuthField from 'components/Forms/AuthField';
import Button from 'components/Button';
import Text from 'components/Text';

import * as S from './ResetPassword.styled';

type Props = {
  onReset: (payload: ResetPasswordPayload) => void;
};

const RecoverPassword = ({ onReset }: Props) => {
  const params = useParams<{ token: string }>();

  return (
    <S.Root>
      <S.Panel>
        <S.Header>Reset your password</S.Header>
        <Formik
          onSubmit={({ password, passwordConfirm }) =>
            onReset({
              token: params.token,
              confirm: passwordConfirm,
              password,
            })
          }
          initialValues={{ password: '', passwordConfirm: '' }}
          validationSchema={Yup.object({
            password: Yup.string()
              .required()
              .matches(passwordRegexps),
            passwordConfirm: Yup.string()
              .required()
              .oneOf([Yup.ref('password')]),
          })}
        >
          {({ isValid, values }) => (
            <S.Form>
              <AuthField
                name="password"
                label="New password"
                type="text"
                marginBottom={10}
              />
              <Text
                fontType="liberGrotesqueBold"
                fontSize={12}
                color="mischka"
                mb={20}
                align="left"
              >
                Should contain min 8 characters.At least one digit, one lower
                and one upper case letter
              </Text>
              <AuthField
                name="passwordConfirm"
                label="New password confirmation"
                type="text"
                marginBottom={20}
              />
              <Button
                type="submit"
                disabled={
                  !isValid ||
                  !Object.keys(values).every(
                    key => (values as Record<string, any>)[key] !== ''
                  )
                }
              >
                Reset your password
              </Button>
            </S.Form>
          )}
        </Formik>
      </S.Panel>
    </S.Root>
  );
};

export default RecoverPassword;
