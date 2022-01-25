import React from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';

import { CreateUserValues } from 'models/user/types';

import AuthField from 'components/Forms/AuthField';
import Button from 'components/Button';
import Text from 'components/Text';

import { password } from 'utils/regexps';

import * as Styled from './CreateUser.styled';

type Props = {
  onCreateUser: (values: CreateUserValues) => void;
};

const CreateUser = ({ onCreateUser }: Props) => (
  <Styled.Root>
    <Styled.Panel>
      <Text
        fontType="bwGradualExtraBold"
        color="malibu"
        fontSize={{ m: 18, t: 22 }}
        align="center"
        mb={{ m: 20, t: 30 }}
      >
        Fill you personal information
      </Text>
      <Formik
        onSubmit={onCreateUser}
        initialValues={{
          firstName: '',
          lastName: '',
          phone: '',
          password: '',
          passwordConfirm: '',
        }}
        validationSchema={Yup.object({
          firstName: Yup.string().required(),
          lastName: Yup.string().required(),
          phone: Yup.string().required(),
          password: Yup.string()
            .required()
            .matches(password),
          passwordConfirm: Yup.string()
            .required()
            .oneOf([Yup.ref('password')]),
        })}
      >
        {({ isValid, values }) => (
          <Styled.Form>
            <AuthField
              label="First name"
              name="firstName"
              type="text"
              mb={{ m: 10, t: 20 }}
              required
            />
            <AuthField
              label="Last name"
              name="lastName"
              type="text"
              mb={{ m: 10, t: 20 }}
              required
            />
            <AuthField
              label="Phone"
              name="phone"
              type="text"
              mb={{ m: 10, t: 20 }}
              required
            />
            <AuthField
              label="Password"
              name="password"
              type="password"
              mb={10}
              required
            />
            <Text
              fontType="liberGrotesqueBold"
              fontSize={{ m: 10, t: 12 }}
              color="mischka"
              mb={{ m: 10, t: 20 }}
            >
              Should contain min 8 characters. At least one digit, one lower and
              one upper case letter
            </Text>
            <AuthField
              label="Password confirmation"
              name="passwordConfirm"
              type="password"
              required
              mb={{ m: 20, t: 40 }}
            />
            <Button
              disabled={
                !isValid ||
                !Object.keys(values).every(
                  key => (values as Record<string, any>)[key] !== ''
                )
              }
              type="submit"
            >
              Create user
            </Button>
          </Styled.Form>
        )}
      </Formik>
    </Styled.Panel>
  </Styled.Root>
);

export default CreateUser;
