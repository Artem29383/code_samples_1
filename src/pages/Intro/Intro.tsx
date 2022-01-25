import React from 'react';

import {
  PropertyTypeFilters,
  Filters as FiltersType,
  RuleFilters,
  RuleValuesPair,
} from 'models/properties/types';

import useLayout from 'hooks/useLayout';

import Badge from 'components/Badge';
import Addresses from 'pages/Properties/Filters/Addresses';
import RangeInput from 'components/RangeInput';
import Arrow from 'components/Arrow';

import * as CommonStyled from 'pages/Properties/Filters/Common.styled';
import * as Styled from './Intro.styled';

type Props = {
  filters: FiltersType;
  mapLoaded: boolean;
  onSave: () => void;
  onSetTypeFilters: (payload: PropertyTypeFilters) => void;
  onSetRuleFilters: (payload: RuleFilters) => void;
};

const Intro = ({
  onSave,
  onSetRuleFilters,
  onSetTypeFilters,
  filters,
  mapLoaded,
}: Props) => {
  const layout = useLayout();
  const pickerSize = layout === 'mobile' ? 45 : 50;

  return (
    <Styled.Root>
      <Styled.Content>
        <Styled.Section>
          <CommonStyled.Header>I want to live around</CommonStyled.Header>
          <Addresses
            mapLoaded={mapLoaded}
            maxAddresses={1}
            setActive={false}
            addTitle="Add"
          />
        </Styled.Section>
        <Styled.Section>
          <CommonStyled.Header>
            Property typed I&apos;d like
          </CommonStyled.Header>
          <CommonStyled.Badges>
            <Badge
              title="House"
              id="house"
              disabled={!filters.boolean.types.house}
              onClick={() =>
                onSetTypeFilters({
                  ...filters.boolean.types,
                  house: !filters.boolean.types.house,
                })
              }
            />
            <Badge
              title="Condo"
              id="condo"
              disabled={!filters.boolean.types.condo}
              onClick={() =>
                onSetTypeFilters({
                  ...filters.boolean.types,
                  condo: !filters.boolean.types.condo,
                })
              }
            />
            <Badge
              title="Townhome"
              id="townhome"
              disabled={!filters.boolean.types.townhome}
              onClick={() =>
                onSetTypeFilters({
                  ...filters.boolean.types,
                  townhome: !filters.boolean.types.townhome,
                })
              }
            />
            <Badge
              title="Lot"
              id="lot"
              disabled={!filters.boolean.types.lot}
              onClick={() =>
                onSetTypeFilters({
                  ...filters.boolean.types,
                  lot: !filters.boolean.types.lot,
                })
              }
            />
          </CommonStyled.Badges>
        </Styled.Section>
        <Styled.Section>
          <CommonStyled.Header>My budget is</CommonStyled.Header>
          <RangeInput
            id="budget-range-input"
            min={100}
            max={999}
            step={1}
            margin={1}
            suffix="k"
            prefix="$"
            pickerWidth={70}
            pickerHeight={pickerSize}
            start={[
              (filters.rules.budget as RuleValuesPair)[0].value / 1000,
              (filters.rules.budget as RuleValuesPair)[1].value / 1000,
            ]}
            onChange={values =>
              onSetRuleFilters({
                ...filters.rules,
                budget: [
                  { rule: 'gteq', value: values[0] * 1000 },
                  { rule: 'lteq', value: values[1] * 1000 },
                ],
              })
            }
          />
        </Styled.Section>
      </Styled.Content>
      <Styled.Next onClick={onSave}>
        Next
        <Arrow ml={4} direction="right" size={3} thickness={3} color="malibu" />
      </Styled.Next>
    </Styled.Root>
  );
};

export default Intro;
