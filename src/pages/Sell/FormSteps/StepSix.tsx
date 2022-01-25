import React, { memo, useCallback, useEffect, useState } from 'react';

import { PropsComponentSell } from 'pages/Sell/types';

import { useActionWithPayload } from 'hooks/useAction';
import { actions } from 'models/steps';

import Switcher from 'pages/Sell/Switcher';
import ButtonSvg from 'components/ButtonSvg';

import { objectToArray } from 'pages/Sell/objectToArray';
import { checkActiveElem } from 'pages/Sell/checkExistActiveElements';

import { icons } from 'styles/icons';

import * as S from 'pages/Sell/FormSteps/Steps.styled';

const StepSix = ({
  load,
  setLoad,
  step,
  setStep,
  problems = [],
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
      serverValue: 'unpermitted_additions',
      humanText: 'Unpermitted additions',
      svg: icons.documentIcon,
    },
    1: {
      active: false,
      serverValue: 'plumbing_or_pipe_problems',
      humanText: 'Plumbing or pipe problems',
      svg: icons.plumbing,
    },
    2: {
      active: false,
      serverValue: 'chemical_spills',
      humanText: 'Chemical spills',
      svg: icons.chemical,
    },
    3: {
      active: false,
      serverValue: 'leaking_roof',
      humanText: 'Leaking roof',
      svg: icons.leaking,
    },
    4: {
      active: false,
      serverValue: 'mold_problems',
      humanText: 'Mold problems',
      svg: icons.mold,
    },
    5: {
      active: false,
      serverValue: 'malfunctioning_hvac_system',
      humanText: 'Malfunctioning HVAC system',
      svg: icons.malfunctioning,
    },
    6: {
      active: false,
      serverValue: 'termites_or_bugs',
      humanText: 'Termits or bugs',
      svg: icons.termits,
    },
    7: {
      active: false,
      serverValue: 'foundation_cracks',
      humanText: 'Foundation cracks',
      svg: icons.foundation,
    },
  });

  const handleNext = useCallback(() => {
    setLoad(true);
    updateForm({
      data: {
        problems: objectToArray(state),
      },
      step: step + 1,
    });
  }, [setLoad, state, step, updateForm]);

  const handlePrev = useCallback(() => {
    setStep(step - 1);
  }, [setStep, step]);

  useEffect(() => {
    setState(prevState => checkActiveElem(prevState, problems));
  }, [problems]);

  return (
    <>
      <S.Root>
        <S.Title
          margin={{
            t: '0 auto 16px auto',
            m: '0 auto 10px auto',
          }}
          maxWidth={{ d: 620, m: 314 }}
        >
          Are there any problems?
        </S.Title>
        <S.SubText m={{ d: '0 auto 46px auto', m: '0 auto 20px auto' }}>
          Click all that apply
        </S.SubText>
        <S.ContentCentered display="flex" mb={{ m: 150, t: 0 }}>
          <S.GridNormal maxWidth={1081}>
            {Object.entries(state).map(array => (
              <ButtonSvg
                height={56}
                callback={setState}
                active={array[1].active}
                key={array[0]}
                id={array[0]}
                svg={array[1].svg}
              >
                {array[1].humanText}
              </ButtonSvg>
            ))}
          </S.GridNormal>
        </S.ContentCentered>
      </S.Root>
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

export default memo(StepSix);
