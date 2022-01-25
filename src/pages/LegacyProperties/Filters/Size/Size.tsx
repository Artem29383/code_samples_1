/* eslint-disable no-param-reassign */

import React, { useState, useCallback, useMemo, MutableRefObject } from 'react';

import {
  PropertyType,
  PropertyTypeFilters,
  RuleValuesPair,
  RuleFilters,
  minMaxRuleValues,
} from 'models/properties/types';
import { Viewport } from 'src/styles/media';

import useWindowResize from 'hooks/useWindowResize';

import * as CommonStyled from '../Common.styled';
import MultiplePicker from 'components/MultiplePicker';
import Badge from 'components/Badge';
import RangeInput from 'components/RangeInput';

import {
  createInitialMultiplePickerState,
  handleMultipleItemsPickerValue,
  handleRangeInputValue,
} from '../utils';

type Props = {
  propertyTypesFilters: PropertyTypeFilters;
  onPropertyTypesFilterChange: (payload: PropertyType) => void;
  rulesFiltersValues: MutableRefObject<RuleFilters>;
  pickerSize: number;
};

const bathroomsNumber = 4;
const storiesNumber = 4;

const Size = ({
  propertyTypesFilters,
  onPropertyTypesFilterChange,
  rulesFiltersValues,
  pickerSize,
}: Props) => {
  const { width: windowWidth } = useWindowResize();

  const bedrooms = useMemo(
    () =>
      createInitialMultiplePickerState(
        rulesFiltersValues.current.bedrooms,
        minMaxRuleValues.bedrooms[1],
        ['', '', '', '', '', '', '+']
      ),
    [rulesFiltersValues]
  );

  const bathrooms = useMemo(
    () =>
      createInitialMultiplePickerState(
        rulesFiltersValues.current.bathrooms,
        bathroomsNumber,
        ['', '', '', '+']
      ),
    [rulesFiltersValues]
  );

  const stories = useMemo(
    () =>
      createInitialMultiplePickerState(
        rulesFiltersValues.current.stories,
        storiesNumber,
        ['', '', '', '+']
      ),
    [rulesFiltersValues]
  );

  const [storiesPickerRightMargin, setStoriesPickerRightMargin] = useState(
    stories[stories.length - 1].active ? 0 : 18
  );

  const handleStoriesChange = useCallback(
    (value: number | number[]) => {
      if (Array.isArray(value)) {
        setStoriesPickerRightMargin(
          value[value.length - 1] === storiesNumber ? 0 : 18
        );
      } else {
        setStoriesPickerRightMargin(value === storiesNumber ? 0 : 18);
      }

      rulesFiltersValues.current.stories = handleMultipleItemsPickerValue(
        value,
        stories
      );
    },
    [rulesFiltersValues, stories]
  );

  const isMobile = windowWidth <= Viewport.mobile;

  return (
    <React.Fragment>
      <CommonStyled.Section>
        <CommonStyled.Header>Property type</CommonStyled.Header>
        <CommonStyled.Badges>
          <Badge
            title="House"
            id="house"
            disabled={!propertyTypesFilters.house}
            onClick={() => onPropertyTypesFilterChange('house')}
          />
          <Badge
            title="Condo"
            id="condo"
            disabled={!propertyTypesFilters.condo}
            onClick={() => onPropertyTypesFilterChange('condo')}
          />
          <Badge
            title="Townhome"
            id="townhome"
            disabled={!propertyTypesFilters.townhome}
            onClick={() => onPropertyTypesFilterChange('townhome')}
          />
          <Badge
            title="Lot"
            id="lot"
            disabled={!propertyTypesFilters.lot}
            onClick={() => onPropertyTypesFilterChange('lot')}
          />
        </CommonStyled.Badges>
      </CommonStyled.Section>
      <CommonStyled.Section>
        <CommonStyled.Header>Budget</CommonStyled.Header>
        <RangeInput
          id="budget-range-input"
          min={minMaxRuleValues.budget[0] / 1000}
          max={minMaxRuleValues.budget[1] / 1000}
          step={1}
          margin={1}
          suffix="k"
          prefix="$"
          pickerWidth={70}
          pickerHeight={pickerSize}
          start={[
            (rulesFiltersValues.current.budget as RuleValuesPair)[0].value /
              1000,
            (rulesFiltersValues.current.budget as RuleValuesPair)[1].value /
              1000,
          ]}
          onChange={values => {
            rulesFiltersValues.current.budget = handleRangeInputValue(
              values,
              value => value * 1000
            );
          }}
        />
      </CommonStyled.Section>
      <CommonStyled.Section>
        <CommonStyled.Header>Bedrooms</CommonStyled.Header>
        <MultiplePicker
          size={pickerSize}
          onChange={values => {
            rulesFiltersValues.current.bedrooms = handleMultipleItemsPickerValue(
              values,
              bedrooms
            );
          }}
          items={bedrooms}
        />
      </CommonStyled.Section>
      <CommonStyled.Section display="flex" justifyContent="space-between">
        <div>
          <CommonStyled.Header>Bathrooms</CommonStyled.Header>
          <MultiplePicker
            size={pickerSize}
            items={bathrooms}
            onChange={values => {
              rulesFiltersValues.current.bathrooms = handleMultipleItemsPickerValue(
                values,
                bathrooms
              );
            }}
          />
        </div>
        {windowWidth > Viewport.mobile && (
          <div>
            <CommonStyled.Header>Stories</CommonStyled.Header>
            <MultiplePicker
              size={pickerSize}
              items={stories}
              mr={storiesPickerRightMargin}
              onChange={handleStoriesChange}
            />
          </div>
        )}
      </CommonStyled.Section>
      {isMobile && (
        <CommonStyled.Section>
          <CommonStyled.Header>Stories</CommonStyled.Header>
          <MultiplePicker
            size={pickerSize}
            items={stories}
            mr={storiesPickerRightMargin}
            onChange={handleStoriesChange}
          />
        </CommonStyled.Section>
      )}
      <CommonStyled.Section>
        <CommonStyled.Header>Square Feet</CommonStyled.Header>
        <RangeInput
          id="squarefeet-range-input"
          min={minMaxRuleValues.squareFeet[0]}
          max={minMaxRuleValues.squareFeet[1]}
          step={1}
          margin={1}
          pickerWidth={70}
          pickerHeight={pickerSize}
          start={[
            (rulesFiltersValues.current.squareFeet as RuleValuesPair)[0].value,
            (rulesFiltersValues.current.squareFeet as RuleValuesPair)[1].value,
          ]}
          onChange={values => {
            rulesFiltersValues.current.squareFeet = handleRangeInputValue(
              values,
              value => value
            );
          }}
        />
      </CommonStyled.Section>
    </React.Fragment>
  );
};

export default Size;
