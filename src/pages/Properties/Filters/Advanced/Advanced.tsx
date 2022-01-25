/* eslint-disable no-param-reassign */

import React, { useCallback, MutableRefObject } from 'react';

import {
  RuleValuesPair,
  RuleFilters,
  StatusesFilters,
  minMaxRuleValues,
  Tag,
  TagsFilters,
} from 'models/properties/types';

import MultiSlider from 'components/MultiSlider/MultiSlider';
import ItemsSlider from 'components/ItemsSliderFilters';
import Button from 'components/Button';
import CheckBox from '../CheckBox';

import { handleRangeInputValue } from '../utils';

import * as CommonStyled from '../Common.styled';

type Props = {
  statusesFilters: StatusesFilters;
  tagsFilters: TagsFilters;
  onStatusFilterChange: (item: string) => void;
  onTagFilterChange: (item: Tag) => void;
  rulesFiltersValues: MutableRefObject<RuleFilters>;
  toggleSaveModal: () => void;
  onResetFilters: () => void;
};

const commonPickerElements = ['Any', '<3', '<7', '<14', '<30', '<60', '90+'];

const Advanced = ({
  rulesFiltersValues,
  statusesFilters,
  tagsFilters,
  onStatusFilterChange,
  onTagFilterChange,
  toggleSaveModal,
  onResetFilters,
}: Props) => {
  const daysCallback = useCallback(
    values => {
      rulesFiltersValues.current.daysOnMarket = values;
    },
    [rulesFiltersValues]
  );

  return (
    <React.Fragment>
      <CommonStyled.Section display="flex" justifyContent="space-around">
        <CommonStyled.ItemBox maxWidth={200}>
          <CommonStyled.HeaderAdvanced mb={70}>
            Year built
          </CommonStyled.HeaderAdvanced>
          <MultiSlider
            suffixThousand=""
            min={minMaxRuleValues.yearBuilt[0]}
            max={minMaxRuleValues.yearBuilt[1]}
            leftBorder={minMaxRuleValues.yearBuilt[0]}
            rightBorder={minMaxRuleValues.yearBuilt[1]}
            div={1}
            minValueInitial={
              (rulesFiltersValues.current.yearBuilt as RuleValuesPair)[0].value
            }
            maxValueInitial={
              (rulesFiltersValues.current.yearBuilt as RuleValuesPair)[1].value
            }
            maxWidth="100%"
            STEP={1}
            onChange={values => {
              rulesFiltersValues.current.yearBuilt = handleRangeInputValue(
                values,
                value => value
              );
            }}
          />
        </CommonStyled.ItemBox>
        <CommonStyled.ItemBox maxWidth={200}>
          <CommonStyled.HeaderAdvanced mb={70}>
            Monthly HOA Fees
          </CommonStyled.HeaderAdvanced>
          <MultiSlider
            leftBorder={100}
            rightBorder={10000}
            div={1000}
            minValueInitial={
              (rulesFiltersValues.current.monthlyHOAFees as RuleValuesPair)[0]
                .value
            }
            maxValueInitial={
              (rulesFiltersValues.current.monthlyHOAFees as RuleValuesPair)[1]
                .value
            }
            maxWidth="100%"
            STEP={100}
            onChange={values => {
              rulesFiltersValues.current.monthlyHOAFees = handleRangeInputValue(
                values,
                value => value
              );
            }}
          />
        </CommonStyled.ItemBox>
      </CommonStyled.Section>
      <CommonStyled.Section>
        <CommonStyled.HeaderAdvanced mb={70}>
          Price Per Sq Ft
        </CommonStyled.HeaderAdvanced>
        <MultiSlider
          leftBorder={100}
          rightBorder={10000}
          div={1000}
          minValueInitial={
            (rulesFiltersValues.current.pricePerSquareFeet as RuleValuesPair)[0]
              .value
          }
          maxValueInitial={
            (rulesFiltersValues.current.pricePerSquareFeet as RuleValuesPair)[1]
              .value
          }
          maxWidth="100%"
          padding="0 56px"
          STEP={100}
          onChange={values => {
            rulesFiltersValues.current.pricePerSquareFeet = handleRangeInputValue(
              values,
              value => value
            );
          }}
        />
      </CommonStyled.Section>
      <CommonStyled.Section display="flex" justifyContent="center">
        <CommonStyled.ItemBox maxWidth={190}>
          <CommonStyled.HeaderAdvanced mb={20}>
            Days on Market
          </CommonStyled.HeaderAdvanced>
          <ItemsSlider
            isDays
            initialValue={rulesFiltersValues.current.daysOnMarket}
            callback={daysCallback}
            minWidthElement="20px"
            elements={commonPickerElements}
          />
        </CommonStyled.ItemBox>
      </CommonStyled.Section>
      <CommonStyled.Section display="flex" justifyContent="center">
        <CommonStyled.Checker width={208} mr={12}>
          <CheckBox
            isActive={statusesFilters.ActiveUnderContract}
            title="ActiveUnderContract"
            onChange={onStatusFilterChange}
          />
          <CommonStyled.Label>Show pending</CommonStyled.Label>
        </CommonStyled.Checker>
        <CommonStyled.Checker width={228}>
          <CheckBox
            isActive={tagsFilters.shortSales}
            title="shortSales"
            onChange={onTagFilterChange}
          />
          <CommonStyled.Label>Show short sales</CommonStyled.Label>
        </CommonStyled.Checker>
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

export default Advanced;
