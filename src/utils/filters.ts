import {
  Rule,
  RuleValue,
  RuleValuesPair,
  Filters,
  PropertyType,
  Perks,
  propertyTypesTitles,
  perksTitles,
} from 'models/properties/types';

const getRuleValue = (
  rule: string,
  ruleValue: RuleValue | RuleValuesPair,
  postfix = ''
) => {
  if (Array.isArray(ruleValue)) {
    return {
      [`${rule}_${ruleValue[0].rule}${postfix}`]: ruleValue[0].value,
      [`${rule}_${ruleValue[1].rule}${postfix}`]: ruleValue[1].value,
    };
  }

  return {
    [`${rule}_${ruleValue.rule}${postfix}`]: ruleValue.value,
  };
};

const createArrayValue = <T extends string>(props: Record<T, boolean>) =>
  Object.keys(props).filter(key => props[key as T]);

export const getQuery = (filters: Filters) => {
  const amenities = {
    'pool_private#pool_private_yn_field': filters.boolean.perks.pool,
    'pool#association_amenities_field': filters.boolean.perks.communityPool,
    'golf_course#association_amenities_field': filters.boolean.perks.golfCourse,
    'security_guard#association_amenities_field': filters.boolean.perks.guard,
    'gated#association_amenities_field': filters.boolean.perks.gate,
  };

  const rooms = {
    Loft: filters.boolean.perks.loft,
  };

  const otherStructures = {
    GuestHouse: filters.boolean.perks.guestHouse,
  };

  return {
    ...getRuleValue('list_price', filters.rules.budget, '_or_null'),
    ...getRuleValue('bedrooms_total', filters.rules.bedrooms, '_or_null'),
    ...getRuleValue('bathrooms_total', filters.rules.bathrooms, '_or_null'),
    ...getRuleValue('garage_spaces', filters.rules.garage, '_or_null'),
    ...getRuleValue(
      'living_area_total_square_feet',
      filters.rules.squareFeet,
      '_or_null'
    ),
    ...getRuleValue('stories', filters.rules.stories, '_or_null'),
    ...getRuleValue('year_built', filters.rules.yearBuilt, '_or_null'),
    ...getRuleValue('lot_size_square_feet', filters.rules.lotSize, '_or_null'),
    ...getRuleValue('days_on_market', filters.rules.daysOnMarket, '_or_null'),
    // days_on_market_gteq_or_null: 600,
    ...getRuleValue(
      'monthly_hoa_fee',
      filters.rules.monthlyHOAFees,
      '_or_null'
    ),
    ...getRuleValue(
      'price_per_square_foot',
      filters.rules.pricePerSquareFeet,
      '_or_null'
    ),
    amenities_key_match_array: createArrayValue(amenities),
    room_types_match_array: createArrayValue(rooms),
    other_structures_match_array: createArrayValue(otherStructures),
    property_type_in: Object.keys(filters.boolean.types).filter(
      key => filters.boolean.types[key as PropertyType]
    ),
  };
};

export const addFiltersToUrlQuery = (
  query: URLSearchParams,
  filters: Filters
) => {
  query.delete('pt');
  query.delete('pk');

  Object.keys(filters.boolean.types).forEach(key => {
    if (filters.boolean.types[key as PropertyType]) {
      query.append('pt', key);
    }
  });

  Object.keys(filters.boolean.perks).forEach(key => {
    if (filters.boolean.perks[key as Perks]) {
      query.append('pk', key);
    }
  });

  Object.keys(filters.rules).forEach(key => {
    const valueItem = filters.rules[key as Rule];

    query.delete(key);

    if (Array.isArray(valueItem)) {
      query.set(`${key}-${valueItem[0].rule}`, String(valueItem[0].value));
      query.set(`${key}-${valueItem[1].rule}`, String(valueItem[1].value));
    } else {
      query.set(`${key}-${valueItem.rule}`, String(valueItem.value));
    }
  });

  return query;
};

export const addLocationToUrlQuery = (
  query: URLSearchParams,
  location: [number, number]
) => {
  query.delete('center');
  query.append('center', `${location[0]}`);
  query.append('center', `${location[1]}`);

  return query;
};

export const getFormattedFiltersValues = (
  filters: Filters
): {
  types: string;
  perks: string;
} & Record<Rule, string> => {
  return {
    types: Object.keys(filters.boolean.types)
      .filter(item => filters.boolean.types[item as PropertyType])
      .map(item => propertyTypesTitles[item as PropertyType])
      .join(', '),
    perks: Object.keys(filters.boolean.perks)
      .filter(item => filters.boolean.perks[item as Perks])
      .map(item => perksTitles[item as Perks])
      .join(', '),
    budget: Array.isArray(filters.rules.budget)
      ? `${filters.rules.budget[0].value}k - ${filters.rules.budget[1].value}k`
      : `${filters.rules.budget.value}k`,
    bedrooms: Array.isArray(filters.rules.bedrooms)
      ? `${filters.rules.bedrooms[0].value} - ${filters.rules.bedrooms[1].value}`
      : `${filters.rules.bedrooms.value}${
          filters.rules.bedrooms.value === 7 ? '+' : ''
        }`,
    bathrooms: Array.isArray(filters.rules.bathrooms)
      ? `${filters.rules.bathrooms[0].value} - ${filters.rules.bathrooms[1].value}`
      : `${filters.rules.bathrooms.value}${
          filters.rules.bathrooms.value === 4 ? '+' : ''
        }`,
    stories: Array.isArray(filters.rules.stories)
      ? `${filters.rules.stories[0].value} - ${filters.rules.stories[1].value}`
      : `${filters.rules.stories.value}`,
    squareFeet: Array.isArray(filters.rules.squareFeet)
      ? `${filters.rules.squareFeet[0].value} - ${filters.rules.squareFeet[1].value}`
      : `${filters.rules.squareFeet.value}`,
    lotSize: Array.isArray(filters.rules.lotSize)
      ? `${filters.rules.lotSize[0].value} - ${filters.rules.lotSize[1].value}`
      : `${filters.rules.lotSize.value}`,
    garage: Array.isArray(filters.rules.garage)
      ? `${filters.rules.garage[0].value} - ${filters.rules.garage[1].value}`
      : `${filters.rules.garage.value}${
          filters.rules.garage.value === 4 ? '+' : ''
        }`,
    yearBuilt: Array.isArray(filters.rules.yearBuilt)
      ? `${filters.rules.yearBuilt[0].value} - ${filters.rules.yearBuilt[1].value}`
      : `${filters.rules.yearBuilt.value}`,
    monthlyHOAFees: Array.isArray(filters.rules.monthlyHOAFees)
      ? `$${filters.rules.monthlyHOAFees[0].value} - $${filters.rules.monthlyHOAFees[1].value}`
      : `$${filters.rules.monthlyHOAFees.value}`,
    pricePerSquareFeet: Array.isArray(filters.rules.pricePerSquareFeet)
      ? `$${filters.rules.pricePerSquareFeet[0].value} - $${filters.rules.pricePerSquareFeet[1].value}`
      : `$${filters.rules.pricePerSquareFeet.value}`,
    daysOnMarket: `< ${(filters.rules.daysOnMarket as RuleValue).value}`,
  };
};
