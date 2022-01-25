import React from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import _isEmpty from 'lodash/isEmpty';

import { Colors } from '@types';
import { PropsComponentSell } from 'pages/Sell/types';

import { actions } from 'models/steps';
import { useActionWithPayload } from 'hooks/useAction';

import InputSell from 'components/InputAutocomplete/InputSell';
import Button from 'components/Button';
import Spinner from 'pages/Sell/Spinner';

import * as S from 'pages/Sell/FormSteps/Steps.styled';
import { useSelector } from 'hooks/useSelector';
import { requestSelector } from 'models/steps/selectors';

const StepTen = ({ load, setLoad }: PropsComponentSell) => {
  const sendInvitation = useActionWithPayload(actions.sendInvitation);
  const requestId = useSelector(requestSelector);

  const handleComplete = (data: {
    email: string;
    name: string;
    brokerage: string;
    phone: string;
  }) => {
    setLoad(true);
    sendInvitation({
      data: {
        email: data.email,
        full_name: data.name,
        phone: data.phone,
        id: requestId,
      },
      finished: true,
      fields: {
        name: data.name,
        brokerage: data.brokerage,
        email: data.email,
        phone: data.phone,
      },
    });
  };

  return (
    <>
      <S.Root>
        <S.Title
          margin={{
            t: '0 auto 25px auto',
            m: '0 auto 13px auto',
          }}
          maxWidth={{ d: 827, m: 314 }}
        >
          One more thing. Let’s get acquainted with your agent
        </S.Title>
        <S.ContentCentered mb={{ m: 120, d: 0 }}>
          <Formik
            onSubmit={handleComplete}
            initialValues={{ name: '', email: '', phone: '', brokerage: '' }}
            validationSchema={Yup.object({
              email: Yup.string()
                .email()
                .required(),
              name: Yup.string().required(),
              phone: Yup.string().required(),
              brokerage: Yup.string().required(),
            })}
          >
            {({ handleSubmit, isValid, touched }) => (
              <S.Form>
                <InputSell
                  name="name"
                  label="AGENT’S FULL NAME"
                  placeholder="What is your agent’s full name?"
                />
                <InputSell
                  name="email"
                  label="AGENT’S EMAIL"
                  placeholder="What is your agent’s email?"
                />
                <InputSell
                  name="phone"
                  label="AGENT’S PHONE NUMBER"
                  placeholder="What is your agent’s phone number?"
                />
                <InputSell
                  name="brokerage"
                  label="AGENT’S BROKERAGE"
                  placeholder="What is your agent’s brokerage?"
                />
                <S.ButtonAbsolute>
                  <Button
                    width={185}
                    height={60}
                    onClick={handleSubmit}
                    disabled={!isValid && !_isEmpty(touched)}
                  >
                    {load ? <Spinner color={Colors.white} /> : 'Complete'}
                  </Button>
                </S.ButtonAbsolute>
              </S.Form>
            )}
          </Formik>
        </S.ContentCentered>
      </S.Root>
    </>
  );
};

export default StepTen;
