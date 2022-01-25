import React, { memo, useCallback } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import _isEmpty from 'lodash/isEmpty';

import { PropsComponentSell } from 'pages/Sell/types';

import { useActionWithPayload } from 'hooks/useAction';
import { actions } from 'models/steps';
import { useSelector } from 'hooks/useSelector';
import { requestSelector, userSelector } from 'models/steps/selectors';

import InputSell from 'components/InputAutocomplete/InputSell';
import Switcher from 'pages/Sell/Switcher';

import * as S from 'pages/Sell/FormSteps/Steps.styled';

const StepUnregisteredUser = ({
  load,
  setLoad,
  step,
  setStep,
}: PropsComponentSell) => {
  const user = useSelector(userSelector);
  const requestId = useSelector(requestSelector);
  const createForm = useActionWithPayload(actions.createForm);
  const updateForm = useActionWithPayload(actions.updateForm);

  const handleNext = useCallback(
    data => {
      setLoad(true);
      if (!requestId) {
        createForm({
          data: {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phone: data.phone,
            unregistered: true,
          },
          step: step + 1,
        });
      } else {
        updateForm({
          data: {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phone: data.phone,
            unregistered: true,
          },
          step: step + 1,
        });
      }
    },
    [setLoad, requestId, createForm, step, updateForm]
  );

  const handlePrev = useCallback(() => {
    setStep(step - 1);
  }, [setStep, step]);

  return (
    <>
      <S.Root>
        <S.Title
          margin={{
            t: '0 auto 25px auto',
            m: '0 auto 14px auto',
          }}
          maxWidth={{ d: 430, m: 314 }}
        >
          Let’s get acquainted
        </S.Title>
        <S.ContentCentered mb={{ m: 120, d: 0 }}>
          <Formik
            onSubmit={handleNext}
            initialValues={{
              firstName: user.firstName || '',
              lastName: user.lastName || '',
              phone: user.phone || '',
              email: user.email || '',
            }}
            validationSchema={Yup.object({
              firstName: Yup.string().required(),
              lastName: Yup.string().required(),
              email: Yup.string()
                .required()
                .email(),
              phone: Yup.string().required(),
            })}
          >
            {({ handleSubmit, isValid, touched }) => (
              <S.Form>
                <InputSell
                  name="firstName"
                  label="Your name"
                  placeholder="What is your name?"
                />
                <InputSell
                  name="lastName"
                  label="Your lastname"
                  placeholder="What is your lastname?"
                />
                <InputSell
                  name="email"
                  label="Your email"
                  placeholder="What is your email?"
                />
                <InputSell
                  name="phone"
                  label="Your phone number"
                  placeholder="What is your phone number?"
                />
                <Switcher
                  load={load}
                  notValid={!isValid && !_isEmpty(touched)}
                  step={step}
                  onClickNext={handleSubmit}
                  onClickPrev={handlePrev}
                />
              </S.Form>
            )}
          </Formik>
        </S.ContentCentered>
      </S.Root>
    </>
  );
};

export default memo(StepUnregisteredUser);
