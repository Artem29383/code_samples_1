/* eslint-disable no-param-reassign */

import React, { MutableRefObject, useCallback } from 'react';

import {
  PerksFilters,
  RuleValuesPair,
  Perks as PerksType,
  RuleFilters,
} from 'models/properties/types';

import Badge from 'components/Badge';
import MultiSlider from 'components/MultiSlider/MultiSlider';
import ItemsSlider from 'components/ItemsSliderFilters';
import Button from 'components/Button';

import { handleRangeInputValue } from '../utils';

import * as S from 'pages/Sell/FormSteps/Steps.styled';
import * as CommonStyled from '../Common.styled';

type Props = {
  perksFilters: PerksFilters;
  onPerksFilterChange: (payload: PerksType) => void;
  rulesFiltersValues: MutableRefObject<RuleFilters>;
  toggleSaveModal: () => void;
  onResetFilters: () => void;
};

const commonPickerElements = [
  'Any',
  '1',
  '1+',
  '2',
  '2+',
  '3',
  '3+',
  '4',
  '4+',
  '5',
  '5+',
  '6',
  '6+',
];

const Perks = ({
  perksFilters,
  onPerksFilterChange,
  rulesFiltersValues,
  toggleSaveModal,
  onResetFilters,
}: Props) => {
  const bedroomsCallback = useCallback(
    values => {
      rulesFiltersValues.current.garage = values;
    },
    [rulesFiltersValues]
  );

  return (
    <React.Fragment>
      <CommonStyled.Section>
        <CommonStyled.Header>Lot Sq Ft</CommonStyled.Header>
        <MultiSlider
          leftBorder={100}
          rightBorder={10000}
          div={1000}
          minValueInitial={
            (rulesFiltersValues.current.lotSize as RuleValuesPair)[0].value
          }
          maxValueInitial={
            (rulesFiltersValues.current.lotSize as RuleValuesPair)[1].value
          }
          maxWidth="100%"
          padding="0 56px"
          STEP={100}
          onChange={values => {
            rulesFiltersValues.current.lotSize = handleRangeInputValue(
              values,
              value => value
            );
          }}
        />
      </CommonStyled.Section>
      <CommonStyled.SectionSlider justifyContent="center">
        <S.ItemBox maxWidth={190}>
          <CommonStyled.HeaderTitle>Garage</CommonStyled.HeaderTitle>
          <ItemsSlider
            initialValue={rulesFiltersValues.current.garage}
            callback={bedroomsCallback}
            minWidthElement="20px"
            elements={commonPickerElements}
          />
        </S.ItemBox>
      </CommonStyled.SectionSlider>
      <CommonStyled.Section>
        <CommonStyled.Header>Must have</CommonStyled.Header>
        <CommonStyled.Badges mt={-34} mb={42}>
          <Badge
            mr={13}
            title="Pool"
            id="pool"
            disabled={!perksFilters.pool}
            onClick={() => onPerksFilterChange('pool')}
          />
          <Badge
            mr={13}
            title="Casita / Guest House"
            id="guestHouse"
            disabled={!perksFilters.guestHouse}
            onClick={() => onPerksFilterChange('guestHouse')}
          />
          <Badge
            mr={13}
            title="Den / Loft"
            id="loft"
            disabled={!perksFilters.loft}
            onClick={() => onPerksFilterChange('loft')}
          />
          <Badge
            mr={13}
            title="Golf Course"
            id="golf"
            disabled={!perksFilters.golfCourse}
            onClick={() => onPerksFilterChange('golfCourse')}
          />
          <Badge
            mr={13}
            title="Community Pool"
            id="communityPool"
            disabled={!perksFilters.communityPool}
            onClick={() => onPerksFilterChange('communityPool')}
          />
          <Badge
            mr={13}
            title="Guarded"
            id="guard"
            disabled={!perksFilters.guard}
            onClick={() => onPerksFilterChange('guard')}
          />
          <Badge
            mr={0}
            title="Gated"
            id="gate"
            disabled={!perksFilters.gate}
            onClick={() => onPerksFilterChange('gate')}
          />
        </CommonStyled.Badges>
      </CommonStyled.Section>
      <CommonStyled.Section justifyContent="center" display="flex">
        <CommonStyled.WrapperButton>
          <Button onClick={onResetFilters}>Reset filters</Button>
        </CommonStyled.WrapperButton>
        <CommonStyled.WrapperButton>
          <Button onClick={toggleSaveModal}>Save this search</Button>
        </CommonStyled.WrapperButton>
      </CommonStyled.Section>
    </React.Fragment>
  );
};

export default Perks;
