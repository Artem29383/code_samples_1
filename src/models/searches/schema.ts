import * as normalizr from 'normalizr';

import { Search, ApiSearch, ApiSearchQuery } from './types';
import { RuleOption, RuleValuesPair, RuleValue } from 'models/properties/types';

type SearchesEntities = {
  searches: Record<number, Search>;
};

const getQueryRuleValue = (
  rule: string,
  ruleOption: RuleOption,
  query: ApiSearchQuery,
  postfix: string
) => {
  const value =
    query[`${rule}_${ruleOption}${postfix}` as keyof ApiSearchQuery];

  return value === null || value === undefined ? null : Number(value);
};

const getRuleValue = (
  query: ApiSearchQuery,
  rule: string,
  postfix = ''
): RuleValuesPair | RuleValue => {
  const ruleValues: Record<RuleOption, number | null> = {
    gt: getQueryRuleValue(rule, 'gt', query, postfix),
    gteq: getQueryRuleValue(rule, 'gteq', query, postfix),
    lt: getQueryRuleValue(rule, 'lt', query, postfix),
    lteq: getQueryRuleValue(rule, 'lteq', query, postfix),
    eq: getQueryRuleValue(rule, 'eq', query, postfix),
  };

  const isRuleValuesPair =
    (ruleValues.lt !== null || ruleValues.lteq !== null) &&
    (ruleValues.gt !== null || ruleValues.gteq !== null);

  if (isRuleValuesPair) {
    return [
      {
        rule: ruleValues.gt !== null ? 'gt' : 'gteq',
        value: ruleValues.gt !== null ? ruleValues.gt : ruleValues.gteq!,
      },
      {
        rule: ruleValues.lt !== null ? 'lt' : 'lteq',
        value: ruleValues.lt !== null ? ruleValues.lt : ruleValues.lteq!,
      },
    ];
  }

  const notNullRuleOption = Object.keys(ruleValues).find(
    key => ruleValues[key as RuleOption] !== null
  ) as RuleOption;

  return { rule: notNullRuleOption, value: ruleValues[notNullRuleOption]! };
};

export const pickProps = (item: ApiSearch): Search => ({
  id: item.id,
  title: item.title,
  address:
    item.addresses.length > 0
      ? {
          title: item.addresses[0].full_address,
          location: [
            Number(item.addresses[0].latitude),
            Number(item.addresses[0].longitude),
          ],
        }
      : null,
  query: {
    boolean: {
      types: {
        condo: item.query.property_type_in.includes('condo'),
        townhome: item.query.property_type_in.includes('townhome'),
        lot: item.query.property_type_in.includes('lot'),
        house: item.query.property_type_in.includes('house'),
      },
      perks: {
        loft: item.query.room_types_match_array.includes('Loft'),
        guestHouse: item.query.other_structures_match_array.includes(
          'GuestHouse'
        ),
        guard: item.query.amenities_key_match_array.includes(
          'security_guard#association_amenities_field'
        ),
        golfCourse: item.query.amenities_key_match_array.includes(
          'golf_course#association_amenities_field'
        ),
        pool: item.query.amenities_key_match_array.includes(
          'pool_private#pool_private_yn_field'
        ),
        communityPool: item.query.amenities_key_match_array.includes(
          'pool_private#pool_private_yn_field'
        ),
        gate: item.query.amenities_key_match_array.includes(
          'gated#association_amenities_field'
        ),
      },
    },
    rules: {
      budget: getRuleValue(item.query, 'list_price', '_or_null'),
      bedrooms: getRuleValue(item.query, 'bedrooms_total', '_or_null'),
      bathrooms: getRuleValue(item.query, 'bathrooms_total', '_or_null'),
      stories: getRuleValue(item.query, 'stories', '_or_null'),
      garage: getRuleValue(item.query, 'garage_spaces', '_or_null'),
      lotSize: getRuleValue(item.query, 'lot_size_square_feet', '_or_null'),
      squareFeet: getRuleValue(
        item.query,
        'living_area_total_square_feet',
        '_or_null'
      ),
      yearBuilt: getRuleValue(item.query, 'year_built', '_or_null'),
      daysOnMarket: getRuleValue(item.query, 'days_on_market', '_or_null'),
      monthlyHOAFees: getRuleValue(item.query, 'monthly_hoa_fee', '_or_null'),
      pricePerSquareFeet: getRuleValue(
        item.query,
        'price_per_square_foot',
        '_or_null'
      ),
    },
  },
});

export const schema = [
  new normalizr.schema.Entity<Search>(
    'searches',
    {},
    {
      // @ts-ignore
      processStrategy: pickProps,
    }
  ),
];

export const normalize = (input: ApiSearch[]) => {
  const normalized = normalizr.normalize<ApiSearch, SearchesEntities, number[]>(
    input,
    schema
  );

  return {
    ids: {
      searches: normalized.result,
    },
    collections: {
      searches: normalized.entities.searches,
    },
  };
};

export const denormalize = (
  collection: Record<string, Search>,
  ids: (number | string)[]
): Search[] =>
  normalizr.denormalize(ids, schema, {
    searches: collection,
  });

export type NormalizedSearches = ReturnType<typeof normalize>;
