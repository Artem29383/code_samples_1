import { Image } from '../images/types';
import { ColorsStrings } from '@types';

export type PropertyType = 'house' | 'condo' | 'townhome' | 'lot';

export type RoomTypes = 'Loft';

export type OtherStructures = 'GuestHouse';

export type Frequency =
  | 'Annually'
  | 'BiMonthly'
  | 'BiWeekly'
  | 'SemiMonthly'
  | 'Daily'
  | 'Monthly'
  | 'Quarterly'
  | 'Seasonal'
  | 'SemiAnnually'
  | 'Weekly';

export type View =
  | 'map'
  | 'to-map-list'
  | 'map-list-to-map'
  | 'map-list'
  | 'map-filters'
  | 'to-list-filters'
  | 'list-filters'
  | 'to-list'
  | 'list'
  | 'map-cycle'
  | 'to-map-list-up'
  | 'to-map-list-down';

export const propertyTypesTitles: Record<PropertyType, string> = {
  house: 'House',
  condo: 'Condo',
  townhome: 'Townhome',
  lot: 'Lot',
};

export const propertyStatusTitles: Record<string, string> = {
  Active: 'Active',
  ActiveUnderContract: 'Pending',
};

export const propertyStatusColors: Record<string, ColorsStrings> = {
  Active: 'dodgerBlue',
  ActiveUnderContract: 'mauve',
};

export type Perks =
  | 'pool'
  | 'guestHouse'
  | 'loft'
  | 'communityPool'
  | 'golfCourse'
  | 'guard'
  | 'gate'
  | 'rvParking'
  | 'washer'
  | 'washerDryer'
  | 'refrigerator';

export type ApiPerk = {
  key: string;
  title: string;
};

export type PerkItem = {
  key: Perks;
  title: string;
};

export const perksApiPerksMatch: PartialRecord<Perks, string[]> = {
  pool: ['pool_private#pool_private_yn_field'],
  communityPool: [
    'indoor_pool#association_amenities_field',
    'pool#association_amenities_field',
  ],
  gate: ['gated#association_amenities_field'],
  guard: ['security_guard#association_amenities_field'],
  golfCourse: ['golf_course#association_amenities_field'],
  rvParking: ['rv_parking#association_amenities_field'],
  refrigerator: ['refrigerator#appliances_field'],
  washer: [
    'washer#appliances_field',
    'energystar_qualified_washer#appliances_field',
  ],
  washerDryer: [
    'washer_dryer#appliances_field',
    'washer_dryer_stacked#appliances_field',
  ],
};

export const perksTitles: Record<Perks, string> = {
  pool: 'Pool',
  guestHouse: 'Guest House',
  loft: 'Loft',
  communityPool: 'Commnuity Pool',
  golfCourse: 'Golf course',
  guard: 'Guarded',
  gate: 'Gated',
  rvParking: 'Rv Parking',
  washer: 'Washer',
  washerDryer: 'Washer Dryer',
  refrigerator: 'Fridge',
};

export const perks: Record<Perks, string> = {
  pool: 'Pool',
  guestHouse: 'Guest House',
  loft: 'Loft',
  communityPool: 'Commnuity Pool',
  golfCourse: 'Golf course',
  guard: 'Guarded',
  gate: 'Gated',
  rvParking: 'Rv Parking',
  washer: 'Washer',
  washerDryer: 'Washer Dryer',
  refrigerator: 'Fridge',
};

export type Boundings = {
  northEastCorner: [number, number];
  southWestCorner: [number, number];
  northWestCorner: [number, number];
  southEastCorner: [number, number];
};

export type DistanceFrom = [number, number];

export type MockProperty = 'mock';

export type MockId = { requestId: string };

export type GreaterThanRuleOptions = 'gteq' | 'gt';
export type LessThanRuleOptions = 'lteq' | 'lt';
export type RuleOption = 'eq' | GreaterThanRuleOptions | LessThanRuleOptions;

export type RuleValue = {
  value: number;
  rule: RuleOption;
};

export type RuleValuesPair = [
  RuleValue & { rule: GreaterThanRuleOptions },
  RuleValue & { rule: LessThanRuleOptions }
];

export type Tag = 'shortSales';

export type Rule =
  | 'budget'
  | 'bedrooms'
  | 'bathrooms'
  | 'stories'
  | 'garage'
  | 'squareFeet'
  | 'lotSize'
  | 'daysOnMarket'
  | 'yearBuilt'
  | 'monthlyHOAFees'
  | 'pricePerSquareFeet';

export type RuleFilters = Record<Rule, RuleValuesPair | RuleValue>;
export type PropertyTypeFilters = Record<PropertyType, boolean>;
export type PerksFilters = PartialRecord<Perks, boolean>;
export type StatusesFilters = Record<string, boolean>;
export type TagsFilters = Record<Tag, boolean>;

export type Fee = {
  value: number;
  frequency: Frequency;
};

export type Filters = {
  boolean: {
    types: PropertyTypeFilters;
    perks: PerksFilters;
    statuses: StatusesFilters;
    tags: TagsFilters;
  };
  rules: RuleFilters;
};

export type PropertyShorthand = Pick<Property, 'id' | 'favorite'>;

export interface AllPropertiesIds {
  id: number;
  favorite: boolean;
}

export type SortingField = keyof Pick<
  Property,
  'listPrice' | 'distance' | 'daysOnMarket' | 'propertyType'
>;

export type ActiveSortingField = Exclude<SortingField, 'distance'>;

export type Sortings = Record<
  SortingField,
  { direction: 'ASC' | 'DESC'; active: boolean }
>;

export interface Property {
  globalListingId: string;
  id: number;
  propertyType: string;
  address: string;
  description: string;
  listPrice: number;
  position: [number, number] | null;
  fullAddress: {
    postal_city: string;
    postal_code: string;
    state_or_province: string;
    unparsed_address: string;
    postalCity: string;
    postalCode: string;
    stateOrProvince: string;
    unparsedAddress: string;
  };
  favorite: boolean;
  viewed: boolean;
  bedrooms: number | null;
  bathrooms: number | null;
  livingSquareFeet: number;
  bedroomsTotal?: number;
  bathroomsTotal: number;
  images: number[];
  daysOnMarket?: number;
  lotSizeSquareFeet: number;
  livingAreaTotalSquareFeet: number;
  hasFireplace?: boolean;
  distance?: number;
  homePerks: Perks[];
  communityPerks: Perks[];
  roomTypes: RoomTypes[];
  otherStructures: OtherStructures[];
  photos: {
    id: number;
    image_url: string;
    width: number;
  }[];
  photo: {
    id: number;
    imageUrl: string;
    width: number;
  };
  standardStatus: string;
  stories: number;
  yearBuilt: number;
  annualTaxAmount: string;
  hoaFee: Fee | null;
  hoaFee2: Fee | null;
  masterPlanFee: Fee | null;
  hidden: boolean;
  longitude: string;
  latitude: string;
  listAgentFullName: string;
  listAgentStateLicense: string;
  listOfficeMlsId: string;
  listOfficeName: string;
}

export type AreasType = { [key: string]: { lat: number; lng: number }[] };

export interface PropertiesState {
  page: number;
  perPage: number;
  total: number;
  areas: AreasType;
  fetchedTotal: number | null;
  pinItem: Property | null;
  collection: Record<string, Property>;
  ids: (number | MockId)[];
  distanceFrom: DistanceFrom;
  boundings: Boundings;
  fetchedMoreItems: boolean;
  fetchingItem: boolean;
  fetchingPinItem: boolean;
  newItemsFetched: boolean;
  newItemsFetching: boolean;
  clusters: Cluster[];
  filters: Filters;
  mapPropertyPoints: number[];
  mapBubbledProperty: number | null;
  mapPointsSet: boolean;
  sortings: Sortings;
  view: View;
  mapSettings: {
    center: [number, number];
    zoom: number;
  };
  paginationProperty: {
    collections: {
      properties: {
        [key: string]: Property;
      };
      images?: {
        [key: string]: { id: number; url: string };
      };
    };
    ids: {
      properties: number[];
    };
    page: number;
    total: number;
  };
  paginationPropertySimilar: {
    collections: {
      properties: {
        [key: string]: Property;
      };
      images?: {
        [key: string]: { id: number; url: string };
      };
    };
    ids: {
      properties: number[];
    };
    page: number;
    total: number;
  };
  userFavorites: { property: Property }[];
  isLoadFav: boolean;
  isLoadSimilar: boolean;
  disabledPeriodFields: string[];
}

export interface ApiFee {
  value: string;
  frequency: Frequency;
}

export interface ApiProperty {
  id: number;
  property_type: PropertyType;
  description: string;
  list_price: string;
  address: string;
  fireplace_yn: boolean;
  viewed: boolean;
  full_address: {
    postal_city: string;
    postal_code: string;
    state_or_province: string;
    unparsed_address: string;
  };
  bathrooms_total?: number;
  bedrooms_total?: number;
  living_area_total_square_feet: number;
  my_favorite_property: boolean;
  list_agent_full_name: string;
  list_agent_state_license: string;
  list_office_mls_id: string;
  list_office_name: string;
  distance?: number;
  days_on_market?: number;
  home_perks?: ApiPerk[];
  community_perks?: ApiPerk[];
  photos: {
    id: number;
    image_url: string;
    original: { image_url: string };
    v470: { image_url: string };
    width: number;
    height: number;
  }[];
  standard_status: string;
  lot_size_square_feet: string;
  stories: number;
  year_built: number;
  annual_tax_amount: string;
  hoa_fee: ApiFee | null;
  hoa_fee2: ApiFee | null;
  master_plan_fee: ApiFee | null;
  global_listing_id: string;
  my_hidden_property: boolean;
  longitude?: string;
  latitude?: string;
  other_structures: string[];
  room_types: string[];
}

export interface ApiProperties {
  properties: ApiProperty[];
  meta: {
    current_page: number;
    total_count: number;
  };
}

export interface ApiPropertiesShorthands {
  properties_ids: {
    id: number;
    my_favorite_property: boolean;
  }[];
}

export interface MapPoint {
  coordinates: [number, number];
  propertyId: number;
  propertyType: PropertyType;
  active: boolean;
  favorite: boolean;
}

export interface ApiGeoPoints {
  features: {
    geometry: { coordinates: string[] };
    properties: {
      property_id: number;
      property_address: string;
      property_type: PropertyType;
    };
  }[];
}

export interface FetchPropertiesShorthandsParams extends Partial<Boundings> {
  distanceFrom: DistanceFrom;
  query: Filters;
  areas?: { [key: string]: { lat: number; lng: number }[] };
}

export interface FetchPropertiesParams extends FetchPropertiesShorthandsParams {
  requestId?: string;
  page: number;
  perPage: number;
  areas?: { [key: string]: { lat: number; lng: number }[] };
  sorting: {
    field: SortingField;
    direction: 'ASC' | 'DESC';
  };
}

export interface NormalizedProperties {
  total: number;
  ids: {
    properties: number[];
    images: number[];
  };
  collections: {
    properties: Record<string, Property>;
    images: Record<string, Image>;
  };
}

export type FetchItemSuccessPayload = Omit<NormalizedProperties, 'total'>;

export type SetMapPropertyPointsPayload = Omit<NormalizedProperties, 'total'>;

export interface FetchByBoundingsPayload {
  perPage?: number;
  boundings?: Boundings;
}

export interface SetMapSettingsPayload {
  center?: [number, number];
  zoom?: number;
}

export interface SetTypesFiltersPayload {
  type: PropertyType;
  active: boolean;
}

export interface SetPerksFiltersPayload {
  perk: Perks;
  active: boolean;
}

export interface FetchByBoundingsSuccessPayload extends NormalizedProperties {
  page: number;
}

export interface FetchMoreItemsSuccessPayload extends NormalizedProperties {
  page: number;
  requestId: string;
}

export interface ShowingPost {
  property_id: number;
  tour_date: string;
  showing_type: string;
  preferred_time_slot: string;
}

export const minMaxRuleValues: Record<Rule, [number, number]> = {
  budget: [30000, 3000000],
  bedrooms: [1, 7],
  bathrooms: [1, 4],
  stories: [1, 4],
  garage: [1, 4],
  squareFeet: [100, 10000],
  lotSize: [100, 10000],
  yearBuilt: [1900, new Date().getFullYear()],
  pricePerSquareFeet: [1, 10000],
  monthlyHOAFees: [0, 10000],
  daysOnMarket: [3, 90],
};

export interface FetchClustersPayload {
  boundings?: Boundings;
  areas?: { [key: string]: { lat: number; lng: number }[] };
}

export interface FetchClustersParams extends FetchClustersPayload {
  query: Filters;
}

export interface FetchInBoundingsPayload {
  boundings: Boundings;
  areas?: { [key: string]: { lat: number; lng: number }[] };
}

export interface FetchInBoundingsParams extends FetchInBoundingsPayload {
  distanceFrom: DistanceFrom;
  query: Filters;
}

export interface ApiCluster {
  ids: number[];
  has_favorite: boolean;
  position: {
    latitude: string;
    longitude: string;
  };
}

export interface Cluster {
  ids: number[];
  favorite: boolean;
  position: [number, number];
}
