import { Filters } from './types';

export const defaultFilters: Filters = {
  boolean: {
    types: {
      house: true,
      condo: true,
      townhome: true,
      lot: true,
    },
    perks: {
      pool: false,
      communityPool: false,
      guestHouse: false,
      gate: false,
      golfCourse: false,
      loft: false,
      guard: false,
    },
    statuses: {
      ShortSales: false,
      Active: true,
      ActiveUnderContract: false,
    },
  },
  rules: {
    bedrooms: [
      { rule: 'gteq', value: 1 },
      { rule: 'lteq', value: 6 },
    ],
    bathrooms: [
      { rule: 'gteq', value: 1 },
      { rule: 'lteq', value: 3 },
    ],
    budget: [
      { rule: 'gteq', value: 50000 },
      { rule: 'lteq', value: 750000 },
    ],
    squareFeet: [
      { rule: 'gteq', value: 500 },
      { rule: 'lteq', value: 9000 },
    ],
    lotSize: [
      { rule: 'gteq', value: 500 },
      { rule: 'lteq', value: 9000 },
    ],
    stories: [
      { rule: 'gteq', value: 1 },
      { rule: 'lteq', value: 3 },
    ],
    garage: [
      { rule: 'gteq', value: 1 },
      { rule: 'lteq', value: 3 },
    ],
    daysOnMarket: { rule: 'lt', value: 90 },
    yearBuilt: [
      { rule: 'gteq', value: 1948 },
      { rule: 'lteq', value: 2016 },
    ],
    monthlyHOAFees: [
      { rule: 'gteq', value: 102 },
      { rule: 'lteq', value: 2000 },
    ],
    pricePerSquareFeet: [
      { rule: 'gteq', value: 102 },
      { rule: 'lteq', value: 2000 },
    ],
  },
};
