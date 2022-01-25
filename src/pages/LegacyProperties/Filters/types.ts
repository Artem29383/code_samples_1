import { Rule, RuleValue, RuleValuesPair } from 'models/properties/types';

export type CommonProps = {
  mapLoaded: boolean;
  saveTitle: React.ReactNode;
  onSave: () => void;
};

export type MultiplePickerItem = {
  value: number;
  active: boolean;
  suffix?: string;
  prefix?: string;
};
