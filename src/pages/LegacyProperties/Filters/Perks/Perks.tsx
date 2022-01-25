/* eslint-disable no-param-reassign */

import React, { useMemo, MutableRefObject } from 'react';

import {
  PerksFilters,
  RuleValuesPair,
  Perks as PerksType,
  RuleFilters,
  minMaxRuleValues,
} from 'models/properties/types';

import RangeInput from 'components/RangeInput';

import Badge from 'components/Badge';
import MultiplePicker from 'components/MultiplePicker';

import {
  createInitialMultiplePickerState,
  handleMultipleItemsPickerValue,
  handleRangeInputValue,
} from '../utils';

import * as CommonStyled from '../Common.styled';

type Props = {
  perksFilters: PerksFilters;
  onPerksFilterChange: (payload: PerksType) => void;
  rulesFiltersValues: MutableRefObject<RuleFilters>;
};

const Perks = ({
  perksFilters,
  onPerksFilterChange,
  rulesFiltersValues,
}: Props) => {
  const garageSpace = useMemo(
    () =>
      createInitialMultiplePickerState(
        rulesFiltersValues.current.garage,
        minMaxRuleValues.garage[1],
        ['', '', '', '', '', '', '+']
      ),
    [rulesFiltersValues]
  );

  return (
    <React.Fragment>
      <CommonStyled.Section>
        <CommonStyled.Header>Personal Perks</CommonStyled.Header>
        <CommonStyled.Subheader>
          On your private property
        </CommonStyled.Subheader>
        <RangeInput
          id="lot-size-range-input"
          min={minMaxRuleValues.lotSize[0]}
          max={minMaxRuleValues.lotSize[1]}
          start={[
            (rulesFiltersValues.current.lotSize as RuleValuesPair)[0].value,
            (rulesFiltersValues.current.lotSize as RuleValuesPair)[1].value,
          ]}
          step={1}
          margin={1}
          pickerWidth={70}
          mb={15}
          onChange={values => {
            rulesFiltersValues.current.lotSize = handleRangeInputValue(
              values,
              value => value
            );
          }}
        />
        <CommonStyled.Subtitle>Lot Size (Square Feet)</CommonStyled.Subtitle>
        <MultiplePicker
          onChange={values => {
            rulesFiltersValues.current.garage = handleMultipleItemsPickerValue(
              values,
              garageSpace
            );
          }}
          items={garageSpace}
          mb={15}
        />
        <CommonStyled.Subtitle>Garage Size</CommonStyled.Subtitle>
        <CommonStyled.Badges>
          <Badge
            title="Pool"
            id="pool"
            disabled={!perksFilters.pool}
            onClick={() => onPerksFilterChange('pool')}
          />
          <Badge
            title="Casita / Guest House"
            id="guestHouse"
            disabled={!perksFilters.guestHouse}
            onClick={() => onPerksFilterChange('guestHouse')}
          />
          <Badge
            title="Den / Loft"
            id="loft"
            disabled={!perksFilters.loft}
            onClick={() => onPerksFilterChange('loft')}
          />
        </CommonStyled.Badges>
      </CommonStyled.Section>
      <CommonStyled.Section>
        <CommonStyled.Header>Community Perks</CommonStyled.Header>
        <CommonStyled.Badges mb={25}>
          <Badge
            title="Golf Course"
            id="golf"
            disabled={!perksFilters.golfCourse}
            onClick={() => onPerksFilterChange('golfCourse')}
          />
          <Badge
            title="Community Pool"
            id="pool"
            disabled={!perksFilters.communityPool}
            onClick={() => onPerksFilterChange('communityPool')}
          />
          <Badge
            title="Guarded"
            id="guard"
            disabled={!perksFilters.guard}
            onClick={() => onPerksFilterChange('guard')}
          />
          <Badge
            title="Gated"
            id="gate"
            disabled={!perksFilters.gate}
            onClick={() => onPerksFilterChange('gate')}
          />
        </CommonStyled.Badges>
      </CommonStyled.Section>
    </React.Fragment>
  );
};

export default Perks;
