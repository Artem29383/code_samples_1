import * as normalizr from 'normalizr';
import _sortBy from 'lodash/sortBy';

import {
  ApiProperty,
  ApiFee,
  Property,
  Fee,
  Perks,
  perksApiPerksMatch,
  ApiPerk,
  ApiCluster,
  Cluster,
} from './types';
import { Image } from '../images/types';

import { schema as imagesSchema } from '../images/schema';
import { numericFormat } from 'utils/numericFormat';

type PropertiesEntities = {
  properties: Record<number, Property>;
  images: Record<number, Image>;
};

type PickedProperty = Omit<Property, 'images'> & { images: Image[] };

const getConvertedFeeValue = (item: ApiFee | null): Fee | null =>
  item ? { value: Number(item.value), frequency: item.frequency } : null;

const processPerks = (items: ApiPerk[]) =>
  (Object.keys(perksApiPerksMatch) as Perks[]).filter(perk =>
    perksApiPerksMatch[perk]!.some(key => items.some(item => item.key === key))
  );

/* TODO Fix the return type */
export const pickProps = (item: ApiProperty) => ({
  id: item.id,
  propertyType: item.property_type,
  address: item.address,
  fullAddress: item.full_address,
  distance: item.distance,
  description: item.description,
  hasFireplace: item.fireplace_yn,
  position:
    item.latitude && item.longitude
      ? [Number(item.latitude), Number(item.longitude)]
      : null,
  images: item.photos.map((image, i) => ({
    id: image.id,
    url: image.original.image_url,
    url470: image.v470.image_url,
    width: image.width,
    height: image.height,
    position: i,
  })),
  listPrice: Number(item.list_price).toFixed(0),
  livingSquareFeet: Number(item.living_area_total_square_feet),
  lotSizeSquareFeet: Number(item.lot_size_square_feet),
  roomTypes: item.room_types,
  otherStructures: item.other_structures,
  bedrooms: item.bedrooms_total || null,
  bathrooms: item.bathrooms_total || null,
  favorite: item.my_favorite_property,
  viewed: item.viewed,
  homePerks: processPerks(item.home_perks || []),
  communityPerks: processPerks(item.community_perks || []),
  standardStatus: item.standard_status,
  stories: item.stories,
  yearBuilt: item.year_built,
  annualTaxAmount: numericFormat(String(item.annual_tax_amount)),
  hoaFee: getConvertedFeeValue(item.hoa_fee),
  hoaFee2: getConvertedFeeValue(item.hoa_fee2),
  masterPlanFee: getConvertedFeeValue(item.master_plan_fee),
  globalListingId: item.global_listing_id,
  hidden: item.my_hidden_property,
  longitude: item.longitude,
  latitude: item.latitude,
  listAgentFullName: item.list_agent_full_name,
  listAgentStateLicense: item.list_agent_state_license,
  listOfficeMlsId: item.list_office_mls_id,
  listOfficeName: item.list_office_name,
  daysOnMarket: item.days_on_market,
});

export const pickCluster = (item: ApiCluster): Cluster => ({
  ids: item.ids,
  position: [Number(item.position.latitude), Number(item.position.longitude)],
  favorite: item.has_favorite,
});

export const schema = [
  new normalizr.schema.Entity<PickedProperty>(
    'properties',
    {
      images: imagesSchema,
    },
    // @ts-ignore
    {
      // @ts-ignore
      processStrategy: pickProps,
    }
  ),
];

export const normalize = (input: ApiProperty[]) => {
  const normalized = normalizr.normalize<
    ApiProperty,
    PropertiesEntities,
    number[]
  >(input, schema);

  return {
    ids: {
      properties: normalized.result,
      images: normalized.entities.images
        ? _sortBy(Object.values(normalized.entities.images), 'position').map(
            ({ id }) => id
          )
        : [],
    },
    collections: {
      properties: normalized.entities.properties,
      images: normalized.entities.images || {},
    },
  };
};

export const denormalize = (
  collection: Record<string, Property>,
  ids: (number | string)[]
): Property[] =>
  normalizr.denormalize(ids, schema, {
    properties: collection,
  });
