/* eslint-disable no-param-reassign */

import React, { useMemo, useCallback, MutableRefObject } from 'react';
import _takeWhile from 'lodash/takeWhile';
import _takeRightWhile from 'lodash/takeRightWhile';

import {
  RuleValuesPair,
  RuleFilters,
  StatusesFilters,
  minMaxRuleValues,
  Tag,
  TagsFilters,
} from 'models/properties/types';
import { Colors } from '@types';

import * as CommonStyled from '../Common.styled';
import MultiplePicker from 'components/MultiplePicker';
import RangeInput from 'components/RangeInput';
import Button from 'components/Button';
import { defaultVerticalPadding } from 'components/Button/Button.styled';

import { handleRangeInputValue } from '../utils';

type Props = {
  statusesFilters: StatusesFilters;
  tagsFilters: TagsFilters;
  onStatusFilterChange: (item: string) => void;
  onTagFilterChange: (item: Tag) => void;
  rulesFiltersValues: MutableRefObject<RuleFilters>;
};

const daysOnMarketItems = [
  minMaxRuleValues.daysOnMarket[0],
  7,
  14,
  30,
  60,
  minMaxRuleValues.daysOnMarket[1],
];

/* TODO create common gradient color for all filters controls */
const buttonGradient = `linear-gradient(
  180deg,
  ${Colors.melrose},
  ${Colors.malibu},
  ${Colors.dodgerBlue}
)`;

const statusesTitles: Record<string, string> = {
  Active: 'Active',
  ActiveUnderContract: 'Pending',
};

const tagsTitles: Record<Tag, string> = {
  shortSales: 'Only Short Sales',
};

const renderStatusButton = (
  statuses: Record<string | Tag, boolean>,
  titles: Record<string | Tag, string>,
  onChange: (item: Tag | string) => void,
  status: string,
  mr = 0,
  width = '100%'
) => {
  if (statuses[status]) {
    return (
      <Button
        width={width}
        marginRight={mr}
        onClick={() => onChange(status)}
        customColor={buttonGradient}
      >
        {titles[status]}
      </Button>
    );
  }

  return (
    <Button
      width={width}
      onClick={() => onChange(status)}
      marginRight={mr}
      customColor="transparent"
      border="1px solid"
      padding={`${defaultVerticalPadding - 1}px 0`}
      borderColor={Colors.malibu}
      textColor="malibu"
    >
      {titles[status]}
    </Button>
  );
};

const Advanced = ({
  rulesFiltersValues,
  statusesFilters,
  tagsFilters,
  onStatusFilterChange,
  onTagFilterChange,
}: Props) => {
  const daysOnMarket = useMemo(() => {
    if (!Array.isArray(rulesFiltersValues.current.daysOnMarket)) {
      const ruleValue = rulesFiltersValues.current.daysOnMarket;
      return daysOnMarketItems.map((item, i) => {
        return {
          value: item,
          active: item === ruleValue.value,
          prefix: i === daysOnMarketItems.length - 1 ? '' : '< ',
          suffix: i === daysOnMarketItems.length - 1 ? '+' : '',
        };
      });
    }

    const ruleValuesPair = rulesFiltersValues.current
      .daysOnMarket as RuleValuesPair;

    const initialItems = daysOnMarketItems.map((item, i) => ({
      value: item,
      prefix: i === daysOnMarketItems.length - 1 ? '' : '< ',
      suffix: i === daysOnMarketItems.length - 1 ? '+' : '',
      active: true,
    }));

    return [
      ..._takeWhile(
        initialItems,
        item => item.value !== ruleValuesPair[0].value
      ).map(item => ({ ...item, active: false })),
      ...initialItems.filter(
        item =>
          item.value >= ruleValuesPair[0].value &&
          item.value <= ruleValuesPair[1].value
      ),
      ..._takeRightWhile(
        initialItems,
        item => item.value !== ruleValuesPair[1].value
      ).map(item => ({ ...item, active: false })),
    ];
  }, [rulesFiltersValues]);

  const handleDaysOnMarketChange = useCallback(
    (value: number | number[]) => {
      if (!Array.isArray(value)) {
        rulesFiltersValues.current.daysOnMarket = {
          rule: 'lt',
          value,
        };
      }
    },
    [rulesFiltersValues]
  );

  return (
    <React.Fragment>
      <CommonStyled.Section>
        <CommonStyled.Header>Year built</CommonStyled.Header>
        <RangeInput
          id="year-range-input"
          min={minMaxRuleValues.yearBuilt[0]}
          max={minMaxRuleValues.yearBuilt[1]}
          step={1}
          margin={1}
          pickerWidth={70}
          start={[
            (rulesFiltersValues.current.yearBuilt as RuleValuesPair)[0].value,
            (rulesFiltersValues.current.yearBuilt as RuleValuesPair)[1].value,
          ]}
          onChange={values => {
            rulesFiltersValues.current.yearBuilt = handleRangeInputValue(
              values,
              value => value
            );
          }}
        />
      </CommonStyled.Section>
      <CommonStyled.Section>
        <CommonStyled.Header>Monthly HOA Fees</CommonStyled.Header>
        <RangeInput
          id="hoa-fees-range-input"
          min={minMaxRuleValues.monthlyHOAFees[0]}
          max={minMaxRuleValues.monthlyHOAFees[1]}
          step={1}
          margin={1}
          pickerWidth={70}
          prefix="$"
          start={[
            (rulesFiltersValues.current.monthlyHOAFees as RuleValuesPair)[0]
              .value,
            (rulesFiltersValues.current.monthlyHOAFees as RuleValuesPair)[1]
              .value,
          ]}
          onChange={values => {
            rulesFiltersValues.current.monthlyHOAFees = handleRangeInputValue(
              values,
              value => value
            );
          }}
        />
      </CommonStyled.Section>
      <CommonStyled.Section>
        <CommonStyled.Header>Price Per Square Feet</CommonStyled.Header>
        <RangeInput
          id="price-feet-range-input"
          min={minMaxRuleValues.pricePerSquareFeet[0]}
          max={minMaxRuleValues.pricePerSquareFeet[1]}
          step={1}
          margin={1}
          pickerWidth={70}
          prefix="$"
          start={[
            (rulesFiltersValues.current.pricePerSquareFeet as RuleValuesPair)[0]
              .value,
            (rulesFiltersValues.current.pricePerSquareFeet as RuleValuesPair)[1]
              .value,
          ]}
          onChange={values => {
            rulesFiltersValues.current.pricePerSquareFeet = handleRangeInputValue(
              values,
              value => value
            );
          }}
        />
      </CommonStyled.Section>
      <CommonStyled.Section>
        <CommonStyled.Header>Days on Market</CommonStyled.Header>
        <MultiplePicker
          multiple={false}
          items={daysOnMarket}
          onChange={handleDaysOnMarketChange}
        />
      </CommonStyled.Section>
      <CommonStyled.Header>Status</CommonStyled.Header>
      <CommonStyled.Section display="flex">
        {renderStatusButton(
          statusesFilters,
          statusesTitles,
          onStatusFilterChange,
          'Active',
          25,
          '200px'
        )}
        {renderStatusButton(
          statusesFilters,
          statusesTitles,
          onStatusFilterChange,
          'ActiveUnderContract',
          0,
          '200px'
        )}
      </CommonStyled.Section>
      {renderStatusButton(
        tagsFilters,
        tagsTitles,
        /* TODO Remove after status type fixing */
        // @ts-ignore
        onTagFilterChange,
        'shortSales',
        0
      )}
    </React.Fragment>
  );
};

export default Advanced;
