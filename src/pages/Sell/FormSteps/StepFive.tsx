import React, { memo, useCallback, useEffect, useState } from 'react';

import { PropsComponentSell } from 'pages/Sell/types';

import { useActionWithPayload } from 'hooks/useAction';
import { actions } from 'models/steps';

import Switcher from 'pages/Sell/Switcher';
import ButtonSvg from 'components/ButtonSvg';

import { checkActiveElem } from 'pages/Sell/checkExistActiveElements';
import { objectToArray } from 'pages/Sell/objectToArray';

import * as S from 'pages/Sell/FormSteps/Steps.styled';

const StepFive = ({
  setLoad,
  load,
  step,
  setStep,
  features = [],
}: PropsComponentSell) => {
  const updateForm = useActionWithPayload(actions.updateForm);
  const [state, setState] = useState<{
    [key: number]: { active: boolean; serverValue: string; humanText: string };
  }>({
    0: {
      active: false,
      serverValue: 'structural_additions',
      humanText: 'Structural additions',
    },
    1: {
      active: false,
      serverValue: 'solar_panels',
      humanText: 'Solar panels',
    },
    2: {
      active: false,
      serverValue: 'gated_community',
      humanText: 'Gated community',
    },
    3: {
      active: false,
      serverValue: 'age_restricted',
      humanText: 'Age restricted',
    },
    4: {
      active: false,
      serverValue: 'built_in_bbq',
      humanText: 'Built-in BBQ',
    },
    5: {
      active: false,
      serverValue: 'in_ground_pool',
      humanText: 'In-ground pool',
    },
    6: {
      active: false,
      serverValue: 'significant_view',
      humanText: 'Significant view',
    },
  });

  useEffect(() => {
    setState(prevState => checkActiveElem(prevState, features));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleNext = useCallback(() => {
    setLoad(true);
    updateForm({
      data: {
        features: objectToArray(state),
      },
      step: step + 1,
    });
  }, [setLoad, state, step, updateForm]);

  const handlePrev = useCallback(() => {
    setStep(step - 1);
  }, [setStep, step]);

  return (
    <>
      <S.RootAnother>
        <S.Title
          margin={{
            t: '0 auto 8px auto',
            m: '0 auto 10px auto',
          }}
          maxWidth={{ d: 620, m: 314 }}
        >
          Do you have these features?
        </S.Title>
        <S.SubText m={{ d: '0 auto 31px auto', m: '0 auto 22px auto' }}>
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

export default memo(StepFive);
