import { Filters, PropertyType } from 'models/properties/types';
import { ApiAddress } from 'models/addresses/types';

export interface Search {
  id: number;
  title: string;
  query: Filters;
  address: {
    title: string;
    location: [number, number];
  } | null;
}

export interface ApiSearchQuery {
  list_price_gteq?: string;
  list_price_gt?: string;
  list_price_lteq?: string;
  list_price_lt?: string;
  bedrooms_total_gteq?: number;
  bedrooms_total_gt?: number;
  bedrooms_total_lteq?: number;
  bedrooms_total_lt?: number;
  bedrooms_total_eq?: number;
  bathrooms_total_gteq?: number;
  bathrooms_total_gt?: number;
  bathrooms_total_lteq?: number;
  bathrooms_total_lt?: number;
  bathrooms_total_eq?: number;
  stories_gteq?: number;
  stories_gt?: number;
  stories_lteq?: number;
  stories_lt?: number;
  stories_eq?: number;
  living_area_total_square_feet_gteq?: string;
  living_area_total_square_feet_gt?: string;
  living_area_total_square_feet_lteq?: string;
  living_area_total_square_feet_lt?: string;
  garage_spaces_gteq?: number;
  garage_spaces_gt?: number;
  garage_spaces_lteq?: number;
  garage_spaces_lt?: number;
  garage_spaces_eq?: number;
  lot_size_square_feet_gteq?: string;
  lot_size_square_feet_gt?: string;
  lot_size_square_feet_lteq?: string;
  lot_size_square_feet_lt?: string;
  year_built_gteq?: number;
  year_built_gt?: number;
  year_built_lteq?: number;
  year_built_lt?: number;
  price_per_square_foot_gteq_or_null?: string;
  price_per_square_foot_gt_or_null?: string;
  price_per_square_foot_lteq_or_null?: string;
  price_per_square_foot_lt_or_null?: string;
  days_on_market_lt?: number;
  days_on_market_gteq?: number;
  monthly_hoa_fee_gteq_or_null?: string;
  monthly_hoa_fee_lteq_or_null?: string;
  property_type_in: PropertyType[];
  other_structures_match_array: 'GuestHouse'[];
  room_types_match_array: 'Loft'[];
  amenities_key_match_array: (
    | 'pool_private#pool_private_yn_field'
    | 'pool#association_amenities_field'
    | 'golf_course#association_amenities_field'
    | 'security_guard#association_amenities_field'
    | 'gated#association_amenities_field'
  )[];
}

export interface ApiSearch {
  id: number;
  title: string;
  addresses: ApiAddress[];
  query: ApiSearchQuery;
}

export interface SearchesState {
  fetchingList: boolean;
  fetchingItem: boolean;
  collection: Record<string, Search>;
  ids: number[];
}

export interface SaveSearchPayload {
  title: string;
  query: Filters;
}

export type SaveSearchParams = SaveSearchPayload & {
  address: { title: string; location: [number, number] } | null;
};
