import React from 'react';

import { PropsComponentSell } from 'pages/Sell/types';

import { useSelector } from 'hooks/useSelector';
import {
  dataSelector,
  loadSelector,
  stepSelector,
  userSelector,
} from 'models/steps/selectors';
import { useActionWithPayload } from 'hooks/useAction';
import { actions } from 'models/steps';

import StepOneAddress from 'pages/Sell/FormSteps/StepOneAddress';
import StepUnregisteredUser from 'pages/Sell/FormSteps/StepUnregisteredUser';
import StepThree from 'pages/Sell/FormSteps/StepThree';
import StepFour from 'pages/Sell/FormSteps/StepFour';
import StepFive from 'pages/Sell/FormSteps/StepFive';
import StepSix from 'pages/Sell/FormSteps/StepSix';
import StepSeven from 'pages/Sell/FormSteps/StepSeven';
import StepEight from 'pages/Sell/FormSteps/StepEight';
import StepNine from 'pages/Sell/FormSteps/StepNine';
import StepTen from 'pages/Sell/FormSteps/StepTen';

const steps: {
  [key: number]: React.FC<PropsComponentSell>;
} = {
  1: StepOneAddress,
  2: StepUnregisteredUser,
  3: StepThree,
  4: StepFour,
  5: StepFive,
  6: StepSix,
  7: StepSeven,
  8: StepEight,
  9: StepNine,
  10: StepTen,
};

const Steps = () => {
  const setLoad = useActionWithPayload(actions.setLoad);
  const load = useSelector(loadSelector);
  const state = useSelector(dataSelector);
  const step = useSelector(stepSelector);
  const setStep = useActionWithPayload(actions.setStep);
  const user = useSelector(userSelector);

  const Component = steps[step];
  return (
    <Component
      step={step}
      setStep={setStep}
      address={state.address}
      sellingReasons={state.selling_reasons}
      timeline={state.timeline}
      bedRoomsProps={state.bedrooms_total}
      bathRoomsProps={state.bathrooms_total}
      squareProps={+state.living_area_total_square_feet}
      yearProps={+state.year_built}
      wantBuyNewProperty={state.want_buy_new_property}
      features={state.features}
      problems={state.problems}
      remodels={state.remodeled_items}
      photos={state.photos}
      alreadyWorkWithAgent={state.already_work_with_agent}
      hasLender={state.has_lender}
      load={load}
      setLoad={setLoad}
      token={user.unregistered_user_identy_token}
    />
  );
};

export default Steps;
