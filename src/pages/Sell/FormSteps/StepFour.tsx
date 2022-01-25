import React, { memo, useCallback, useState } from 'react';

import { PropsComponentSell } from 'pages/Sell/types';

import { useActionWithPayload } from 'hooks/useAction';
import { actions } from 'models/steps';

import Switcher from 'pages/Sell/Switcher';
import ItemsSlider from 'components/ItemsSlider';

import { range } from 'utils/range';

import * as S from 'pages/Sell/FormSteps/Steps.styled';
import * as Styled from 'components/ItemsSlider/ItemsSlider.styled';
import useInput from 'hooks/useInput';

const StepFour = ({
  setLoad,
  load,
  step,
  setStep,
  bedRoomsProps,
  bathRoomsProps,
  squareProps,
  yearProps,
}: PropsComponentSell) => {
  const [bedrooms, setBedrooms] = useState<number>(bedRoomsProps || 2);
  const [bathrooms, setBathrooms] = useState<number>(bathRoomsProps || 2);
  const square = useInput(String(squareProps || 45));
  const year = useInput(String(yearProps || 2010));
  const updateForm = useActionWithPayload(actions.updateForm);

  const handleNext = useCallback(() => {
    setLoad(true);
    updateForm({
      data: {
        bathrooms_total: bathrooms,
        bedrooms_total: bedrooms,
        living_area_total_square_feet: Number(square.value),
        year_built: Number(year.value),
      },
      step: 5,
    });
    setStep(step + 1);
  }, [
    bathrooms,
    bedrooms,
    setLoad,
    setStep,
    square.value,
    step,
    updateForm,
    year.value,
  ]);

  const handlePrev = useCallback(() => {
    setStep(step - 1);
  }, [setStep, step]);

  return (
    <>
      <S.Root>
        <S.Title
          margin={{
            t: '0 auto 25px auto',
            m: '0 auto 20px auto',
          }}
          maxWidth={{ t: 600, m: 314 }}
        >
          Confirm your home details
        </S.Title>
        <S.ContentCentered
          maxWidth={600}
          margin={{ m: '0 auto 130px auto', d: '0 auto' }}
        >
          <S.Row justifyContent="space-between">
            <S.ItemBox maxWidth={190}>
              <S.TitleH>Bedrooms</S.TitleH>
              <ItemsSlider
                initialValue={bedrooms}
                callback={setBedrooms}
                minWidthElement="20px"
                elements={range(1, 6)}
              />
            </S.ItemBox>
            <S.ItemBox maxWidth={190}>
              <S.TitleH>Bathrooms</S.TitleH>
              <ItemsSlider
                initialValue={bathrooms}
                callback={setBathrooms}
                minWidthElement="20px"
                elements={range(1, 6)}
              />
            </S.ItemBox>
          </S.Row>
          <S.Row justifyContent="space-between">
            <S.ItemBox alignItems="center" maxWidth={190}>
              <S.TitleH>Square feet</S.TitleH>
              <Styled.Input
                value={square.value}
                onChange={square.setValue}
                type="number"
              />
            </S.ItemBox>
            <S.ItemBox alignItems="center" maxWidth={190}>
              <S.TitleH>Year built</S.TitleH>
              <Styled.Input
                value={year.value}
                onChange={year.setValue}
                type="number"
              />
            </S.ItemBox>
          </S.Row>
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

export default memo(StepFour);
