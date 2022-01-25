/* eslint-disable no-param-reassign */

import React, { useCallback, MutableRefObject } from 'react';

import {
  PropertyType,
  PropertyTypeFilters,
  RuleValuesPair,
  RuleFilters,
} from 'models/properties/types';

import Badge from 'components/Badge';
import MultiSlider from 'components/MultiSlider';
import ItemsSlider from 'components/ItemsSliderFilters';
import Button from 'components/Button';

import { handleRangeInputValue } from '../utils';

import * as CommonStyled from '../Common.styled';
import * as S from 'pages/Sell/FormSteps/Steps.styled';

type Props = {
  propertyTypesFilters: PropertyTypeFilters;
  onPropertyTypesFilterChange: (payload: PropertyType) => void;
  rulesFiltersValues: MutableRefObject<RuleFilters>;
  pickerSize: number;
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

const Size = ({
  propertyTypesFilters,
  onPropertyTypesFilterChange,
  rulesFiltersValues,
  toggleSaveModal,
  onResetFilters,
}: Props) => {
  const bedroomsCallback = useCallback(
    values => {
      rulesFiltersValues.current.bedrooms = values;
    },
    [rulesFiltersValues]
  );

  const bathroomsCallback = useCallback(
    values => {
      rulesFiltersValues.current.bathrooms = values;
    },
    [rulesFiltersValues]
  );

  const storiesCallback = useCallback(
    values => {
      rulesFiltersValues.current.stories = values;
    },
    [rulesFiltersValues]
  );

  return (
    <React.Fragment>
      <CommonStyled.Section>
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
        <MultiSlider
          leftBorder={30000}
          rightBorder={3000000}
          div={1000}
          minValueInitial={
            (rulesFiltersValues.current.budget as RuleValuesPair)[0].value
          }
          maxValueInitial={
            (rulesFiltersValues.current.budget as RuleValuesPair)[1].value
          }
          maxWidth="100%"
          padding="0 56px"
          onChange={values => {
            rulesFiltersValues.current.budget = handleRangeInputValue(
              values,
              value => value
            );
          }}
        />
      </CommonStyled.Section>
      <CommonStyled.Section>
        <CommonStyled.Header>Square Feet</CommonStyled.Header>
        <MultiSlider
          leftBorder={100}
          rightBorder={10000}
          div={1000}
          minValueInitial={
            (rulesFiltersValues.current.squareFeet as RuleValuesPair)[0].value
          }
          maxValueInitial={
            (rulesFiltersValues.current.squareFeet as RuleValuesPair)[1].value
          }
          maxWidth="100%"
          padding="0 56px"
          STEP={100}
          onChange={values => {
            rulesFiltersValues.current.squareFeet = handleRangeInputValue(
              values,
              value => value
            );
          }}
        />
      </CommonStyled.Section>
      <CommonStyled.SectionSlider justifyContent="space-between">
        <S.ItemBox maxWidth={190}>
          <CommonStyled.HeaderTitle>Bedrooms</CommonStyled.HeaderTitle>
          <ItemsSlider
            initialValue={rulesFiltersValues.current.bedrooms}
            callback={bedroomsCallback}
            minWidthElement="20px"
            elements={commonPickerElements}
          />
        </S.ItemBox>
        <S.ItemBox maxWidth={190}>
          <CommonStyled.HeaderTitle>Bathrooms</CommonStyled.HeaderTitle>
          <ItemsSlider
            initialValue={rulesFiltersValues.current.bathrooms}
            callback={bathroomsCallback}
            minWidthElement="20px"
            elements={commonPickerElements}
          />
        </S.ItemBox>
        <S.ItemBox maxWidth={190}>
          <CommonStyled.HeaderTitle>Stories</CommonStyled.HeaderTitle>
          <ItemsSlider
            initialValue={rulesFiltersValues.current.stories}
            callback={storiesCallback}
            minWidthElement="20px"
            elements={commonPickerElements}
          />
        </S.ItemBox>
      </CommonStyled.SectionSlider>
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

export default Size;
