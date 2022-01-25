import React from 'react';

export type CommonProps = {
  mapLoaded: boolean;
  saveTitle: React.ReactNode;
  onSave: () => void;
  reference: React.RefObject<any>;
  view: string;
  onResetFilters?: () => void;
};

export type MultiplePickerItem = {
  value: number;
  active: boolean;
  suffix?: string;
  prefix?: string;
};
