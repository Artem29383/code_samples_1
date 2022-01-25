import React, { useCallback, useState } from 'react';

import { PropsComponentSell } from 'pages/Sell/types';

import { actions } from 'models/steps';
import { useActionWithPayload } from 'hooks/useAction';

import Switcher from 'pages/Sell/Switcher';
import Switch from 'components/Switcher';

import * as S from 'pages/Sell/FormSteps/Steps.styled';

const StepNine = ({
  step,
  setStep,
  alreadyWorkWithAgent,
  hasLender,
  load,
  setLoad,
}: PropsComponentSell) => {
  const [lender, setLender] = useState(hasLender);
  const [search, setSearch] = useState(false);
  const [agent, setAgent] = useState(alreadyWorkWithAgent);
  const updateForm = useActionWithPayload(actions.updateForm);

  const handlePrev = useCallback(() => {
    setStep(step - 1);
  }, [setStep, step]);

  const handleNext = useCallback(() => {
    setLoad(true);
    if (agent) {
      updateForm({
        data: {
          already_work_with_agent: agent,
          has_lender: lender,
        },
        step: step + 1,
      });
    }
    if (!agent) {
      updateForm({
        data: {
          finished: true,
          already_work_with_agent: agent,
          has_lender: lender,
        },
        step: 1,
      });
    }
  }, [agent, lender, setLoad, step, updateForm]);

  return (
    <>
      <S.RootDynamic
        padding={{ m: '68px 16px 23px 16px', d: '78px 60px 78px 60px' }}
      >
        <S.Title
          margin={{
            t: '0 auto 8px auto',
            m: '0 auto 10px auto',
          }}
          maxWidth={{ d: 1112, m: 314 }}
        >
          Fantastic! You’re done!
        </S.Title>
        <S.SubText
          m={{ d: '0 auto 19px auto', m: '0 auto 38px auto' }}
          maxWidth={{ m: 234, d: 500 }}
        >
          We’ll review your submission and work to gather your options.
        </S.SubText>
        <S.ContentCentered display="flex" mb={{ m: 130, d: 0 }}>
          <S.Gridder>
            <Switch
              value={lender}
              onChange={setLender}
              label="DO YOU HAVE A LENDER?"
            />
            <Switch
              value={search}
              onChange={setSearch}
              label="WOULD YOU LIKE TO SET UP YOUR SEARCH NOW?"
            />
            <Switch
              value={agent}
              onChange={setAgent}
              label="DO YOU HAVE AN AGENT?"
            />
          </S.Gridder>
        </S.ContentCentered>
      </S.RootDynamic>
      <Switcher
        isNext={agent}
        load={load}
        notValid={false}
        step={step}
        onClickNext={handleNext}
        onClickPrev={handlePrev}
      />
    </>
  );
};

export default StepNine;
