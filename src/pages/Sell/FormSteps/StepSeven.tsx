/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useCallback, useEffect, useState } from 'react';

import { PropsComponentSell } from 'pages/Sell/types';

import { useActionWithPayload } from 'hooks/useAction';
import { actions } from 'models/steps';

import Switcher from 'pages/Sell/Switcher';
import ButtonSvg from 'components/ButtonSvg';

import { checkActiveElem } from 'pages/Sell/checkExistActiveElements';
import { objectToArray } from 'pages/Sell/objectToArray';

import * as S from 'pages/Sell/FormSteps/Steps.styled';

const StepSeven = ({
  load,
  setLoad,
  step,
  setStep,
  remodels = [],
}: PropsComponentSell) => {
  const updateForm = useActionWithPayload(actions.updateForm);
  const [state, setState] = useState<{
    [key: number]: {
      active: boolean;
      serverValue: string;
      humanText: string;
      svg?: React.ElementType | keyof JSX.IntrinsicElements;
    };
  }>({
    0: {
      active: false,
      serverValue: 'kitchen_backsplash',
      humanText: 'Kitchen backsplash',
    },
    1: {
      active: false,
      serverValue: 'kitchen_island',
      humanText: 'Kitchen island',
    },
    2: {
      active: false,
      serverValue: 'kitchen_counters',
      humanText: 'Kitchen counters',
    },
    3: {
      active: false,
      serverValue: 'bathrooms',
      humanText: 'Bathrooms',
    },
    4: {
      active: false,
      serverValue: 'outdoor_spaces',
      humanText: 'Outdoor spaces',
    },
    5: {
      active: false,
      serverValue: 'cabinets',
      humanText: 'Cabinets',
    },
    6: {
      active: false,
      serverValue: 'flooring',
      humanText: 'Flooring',
    },
  });

  useEffect(() => {
    setState(prevState => checkActiveElem(prevState, remodels));
  }, []);

  const handleNext = useCallback(() => {
    setLoad(true);
    updateForm({
      data: {
        remodeled_items: objectToArray(state),
      },
      step: step + 1,
    });
  }, [setLoad, setStep, state, step, updateForm]);

  const handlePrev = useCallback(() => {
    setStep(step - 1);
  }, [step, setStep]);

  return (
    <>
      <S.RootAnother>
        <S.Title
          margin={{
            t: '0 auto 14px auto',
            m: '0 auto 10px auto',
          }}
          maxWidth={{ d: 1112, m: 314 }}
        >
          Have you done any updates in the last 3 years?
        </S.Title>
        <S.SubText m={{ d: '0 auto 31px auto', m: '0 auto 17px auto' }}>
          Click all that apply
        </S.SubText>
        <S.ContentCentered
          display={{
            t: 'block',
            m: 'flex',
          }}
          mb={{ m: 130, d: 0 }}
        >
          <S.Grid>
            {Object.entries(state).map(array => (
              <ButtonSvg
                height={48}
                callback={setState}
                active={array[1].active}
                key={array[0]}
                id={array[0]}
              >
                {array[1].humanText}
              </ButtonSvg>
            ))}
          </S.Grid>
        </S.ContentCentered>
      </S.RootAnother>
      <Switcher
        load={load}
        notValid={false}
        step={step}
        onClickNext={handleNext}
        onClickPrev={handlePrev}
      />
    </>
  );
};

export default memo(StepSeven);
