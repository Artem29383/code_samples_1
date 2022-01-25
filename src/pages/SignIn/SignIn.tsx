import React from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';

import AuthField from 'components/Forms/AuthField';
import Button from 'components/Button';
import Text from 'components/Text';
import AppLink from 'components/AppLink';

import { Routes } from '@types';

import { SignInPayload } from 'models/user/types';

import * as S from './SignIn.styled';

type Props = {
  onSignIn: (payload: SignInPayload) => void;
};

const SignIn = ({ onSignIn }: Props) => (
  <S.Root>
    <S.Panel>
      <Text
        as="h2"
        fontType="bwGradualExtraBold"
        fontSize={{ m: 21, t: 22 }}
        color="malibu"
        align="center"
        mb={{ m: 30, t: 40 }}
      >
        Sign into your account
      </Text>
      <Formik
        onSubmit={onSignIn}
        initialValues={{ email: '', password: '' }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email()
            .required(),
          password: Yup.string().required(),
        })}
      >
        {() => (
          <S.Form>
            <AuthField
              name="email"
              label="Email"
              placeholder="youremail@gmail.com"
              type="text"
              mb={20}
            />
            <AuthField
              name="password"
              label="Password"
              type="password"
              mb={{ m: 25, t: 40 }}
            />
            <Button type="submit">Sign in</Button>
          </S.Form>
        )}
      </Formik>
      <S.AdditionalControls>
        <Text
          fontType="liberGrotesqueExtraBold"
          as="div"
          color="mischka"
          fontSize={14}
          mb={{ m: 20, t: 0 }}
        >
          Not a member? &nbsp;
          <AppLink to={Routes.signUp}>
            <Text
              fontType="liberGrotesqueExtraBold"
              as="span"
              fontSize={14}
              color="malibu"
              cursor="pointer"
              textDecoration="underline"
            >
              Sign up.
            </Text>
          </AppLink>
        </Text>
        <AppLink to={Routes.recoverPassword}>
          <Text
            fontType="liberGrotesqueExtraBold"
            as="span"
            fontSize={14}
            color="mischka"
            cursor="pointer"
            textDecoration="underline"
          >
            Forgot your password?
          </Text>
        </AppLink>
      </S.AdditionalControls>
    </S.Panel>
  </S.Root>
);

export default SignIn;
