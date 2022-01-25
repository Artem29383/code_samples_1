import React, { memo, useCallback, useEffect, useState } from 'react';

import { PropsComponentSell } from 'pages/Sell/types';

import { useSelector } from 'hooks/useSelector';
import { authorizedSelector } from 'models/user/selectors';
import { actions } from 'models/steps';
import { useActionWithPayload } from 'hooks/useAction';

import Switcher from 'pages/Sell/Switcher';
import RangeSlider from 'components/RangeSlider';
import CheckBox from 'components/CheckBox';
import ButtonSvg from 'components/ButtonSvg';

import useToggle from 'hooks/useToggle';
import useWindowResize from 'hooks/useWindowResize';

import { objectToArray } from 'pages/Sell/objectToArray';
import { checkActiveElem } from 'pages/Sell/checkExistActiveElements';

import { Viewport } from 'styles/media';

import * as S from 'pages/Sell/FormSteps/Steps.styled';
/* eslint-disable react-hooks/exhaustive-deps */

const translate: { [key: string]: string } = {
  'like yesterday': 'like_yesterday',
  'few weeks': 'few_weeks',
  '2 or 3 weeks': '2_or_3_weeks',
  longer: 'longer',
};

const translateReverse: { [key: string]: string } = {
  like_yesterday: 'Like yesterday',
  few_weeks: 'Few weeks',
  '2_or_3_weeks': '2 or 3 weeks',
  longer: 'Longer',
};

const variants = {
  0: 'Like yesterday',
  4: 'Few weeks',
  8: '2 or 3 weeks',
  12: 'Longer',
};

const variantsInitial: { [key: string]: number } = {
  'Like yesterday': 0,
  'Few weeks': 4,
  '2 or 3 weeks': 8,
  Longer: 12,
};

const StepThree = ({
  setLoad,
  load,
  step,
  setStep,
  timeline,
  sellingReasons,
  wantBuyNewProperty,
}: PropsComponentSell) => {
  const user = useSelector(authorizedSelector);
  const [chosen, setChosen] = useState(timeline || 'like_yesterday');
  const updateForm = useActionWithPayload(actions.updateForm);
  const [font, setFont] = useState(34);
  const [buy, setBuy] = useToggle(wantBuyNewProperty || false);
  const { width: windowWidth } = useWindowResize();
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
      serverValue: 'upgrading',
      humanText: 'Upgrading',
    },
    1: {
      active: false,
      serverValue: 'downsizing',
      humanText: 'Downsizing',
    },
    2: {
      active: false,
      serverValue: 'accessing_home_equity',
      humanText: 'Accessing home equity',
    },
    3: {
      active: false,
      serverValue: 'relocating',
      humanText: 'Relocating',
    },
  });

  useEffect(() => {
    setFont(font === 34 ? 34.1 : 34);
  }, [chosen]);

  useEffect(() => {
    setState(prevState =>
      checkActiveElem(prevState, sellingReasons as string[])
    );
  }, []);

  const handleNext = useCallback(() => {
    setLoad(true);
    updateForm({
      data: {
        timeline: translate[chosen.toLowerCase()],
        selling_reasons: objectToArray(state),
        want_buy_new_property: buy,
      },
      step: 4,
    });
  }, [setLoad, updateForm, chosen, state, buy]);

  const handlePrev = useCallback(() => {
    if (!user) {
      setStep(step - 1);
    } else {
      setStep(1);
    }
  }, [user, setStep, step]);

  const handleChange = useCallback((value: string) => {
    setChosen(value || '');
  }, []);

  return (
    <>
      <S.Root>
        <S.Title
          margin={{
            t: '0 auto 25px auto',
            m: '0 auto 14px auto',
          }}
          maxWidth={{ d: 440, m: 314 }}
        >
          What are you after?
        </S.Title>
        <S.Subtitle>I’D LIKE TO SELL IT...</S.Subtitle>
        <S.Choosen font={font}>
          <S.PGradRedly>{chosen}</S.PGradRedly>
        </S.Choosen>
        <S.Wrapper>
          <RangeSlider
            initialValue={
              variantsInitial[translateReverse[timeline || 'like_yesterday']] ||
              0
            }
            callback={handleChange}
            variants={variants}
          />
          {windowWidth < Viewport.tablet && (
            <S.Range>
              <S.P>VERY QUICKLY</S.P>
              <S.P>I’VE GOT TIME</S.P>
            </S.Range>
          )}
          <S.Because>
            <S.TextBecause>Because...</S.TextBecause>
            <S.SubTextBecause>(optional)</S.SubTextBecause>
          </S.Because>
          <S.ContentCentered
            display={{
              t: 'block',
              m: 'flex',
            }}
            mb={{ m: 21, d: 0 }}
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
          {/* <S.WrapperInput> */}
          {/*  <S.Label>REASON FOR SELLING</S.Label> */}
          {/*  <S.Input */}
          {/*    type="text" */}
          {/*    placeholder="Reason I’m selling the property is..." */}
          {/*    value={reason.value === '{}' ? '' : reason.value} */}
          {/*    onChange={reason.setValue} */}
          {/*  /> */}
          {/* </S.WrapperInput> */}
          <S.Buy>
            <CheckBox isActive={buy} onChange={setBuy} />
            <S.Text>I’d like to buy a new house as well</S.Text>
          </S.Buy>
        </S.Wrapper>
      </S.Root>
      <Switcher
        load={load}
        notValid={!chosen.trim()}
        step={step}
        onClickNext={handleNext}
        onClickPrev={handlePrev}
      />
    </>
  );
};

export default memo(StepThree);
