import { RuleValuesPair, RuleValue } from 'models/properties/types';
import _takeWhile from 'lodash/takeWhile';
import _takeRightWhile from 'lodash/takeRightWhile';

import { MultiplePickerItem } from './types';

export type Suffixes = string | string[];

export const addSuffixes = (
  items: Omit<MultiplePickerItem, 'suffix'>[],
  suffixes: Suffixes
) => {
  if (Array.isArray(suffixes)) {
    return items.map((item, i) => ({
      ...item,
      suffix: suffixes[i],
    }));
  }

  return items.map(item => ({
    ...item,
    suffix: suffixes,
  }));
};

export const createInitialMultiplePickerState = (
  rules: RuleValue | RuleValuesPair,
  max: number,
  suffixes: Suffixes
) => {
  /* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
  if (!Array.isArray(rules)) {
    const ruleValue = rules as RuleValue;

    const initialItems = [...new Array(max)].map((_, i) => ({
      value: i + 1,
      active: i + 1 === ruleValue.value,
    }));

    return addSuffixes(initialItems, suffixes);
  }

  const ruleValuesPair = rules as RuleValuesPair;

  const initialItems = [...new Array(max)].map((_, i) => ({
    value: i + 1,
    suffix: i === max - 1 ? '+' : '',
    active: true,
  }));

  const items = [
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

  return addSuffixes(items, suffixes);
  /* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
};

export const handleMultipleItemsPickerValue = (
  value: number | number[],
  items: MultiplePickerItem[]
) => {
  if (!Array.isArray(value)) {
    if (value === items[items.length - 1].value) {
      return { rule: 'gteq', value } as RuleValue;
    }

    return { rule: 'eq', value } as RuleValue;
  }

  if (value[1] === items[items.length - 1].value) {
    return { rule: 'gteq', value: value[0] } as RuleValue;
  }

  return [
    { rule: 'gteq', value: value[0] },
    { rule: 'lteq', value: value[value.length - 1] },
  ] as RuleValuesPair;
};

export const handleRangeInputValue = (
  value: number[],
  proceedValue: (value: number) => number
) => {
  return [
    { rule: 'gteq', value: proceedValue(value[0]) },
    { rule: 'lteq', value: proceedValue(value[1]) },
  ] as RuleValuesPair;
};
