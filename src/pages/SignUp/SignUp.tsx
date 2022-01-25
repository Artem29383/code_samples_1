import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';

import Button from 'components/Button';
import AuthField from 'components/Forms/AuthField';
import Text from 'components/Text';
import { SignUpIcon } from 'styles/icons';

import { SendInvitationPayload } from 'models/user/types';
import useWindowResize from 'hooks/useWindowResize';

import _isEmpty from 'lodash/isEmpty';

import * as Styled from './SignUp.styled';

type Props = {
  onSendInvitation: (payload: SendInvitationPayload) => void;
};

const SignUp = ({ onSendInvitation }: Props) => {
  const { height: windowHeight } = useWindowResize();

  return (
    <Styled.Root>
      <Styled.Panel>
        {windowHeight > 650 && (
          <SignUpIcon width={{ m: 120, t: 198 }} height="auto" mb={20} />
        )}
        <Text
          fontType="bwGradualBold"
          fontSize={{ m: 20, t: 24 }}
          align="center"
          mb={{ m: 25, t: 33 }}
        >
          Where do we send your <br />
          dream and wishes
        </Text>
        <Formik
          onSubmit={onSendInvitation}
          initialValues={{ email: '' }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email()
              .required(),
          })}
        >
          {({ isValid, touched }) => (
            <Styled.Form>
              <AuthField
                label="Email"
                name="email"
                type="text"
                mb={{ m: 20, t: 30 }}
              />
              <Styled.Agreement>
                By submitting, you’re in agreement with our <br /> Terms and
                Conditions and Privacy Policy
              </Styled.Agreement>
              <Button
                type="submit"
                disabled={!isValid && !_isEmpty(touched)}
                marginBottom={30}
              >
                Let&apos; s find your next home
              </Button>
            </Styled.Form>
          )}
        </Formik>
        <Styled.SignIn>
          <Text
            fontType="liberGrotesqueExtraBold"
            fontSize={16}
            color="mischka"
          >
            Already a member?
          </Text>
          <Styled.Link to="/sign-in">Sign in</Styled.Link>
        </Styled.SignIn>
      </Styled.Panel>
    </Styled.Root>
  );
};

export default SignUp;
