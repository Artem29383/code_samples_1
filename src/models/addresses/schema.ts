import * as normalizr from 'normalizr';

import { Address } from './types';

type AddressEntities = { addresses: Record<number, Address> };

export const schema = [new normalizr.schema.Entity<Address>('addresses', {})];

export const normalize = (input: Address[]) => {
  const normalized = normalizr.normalize<Address, AddressEntities, number[]>(
    input,
    schema
  );

  return {
    ids: {
      addresses: normalized.result,
    },
    collections: {
      addresses: normalized.entities.addresses,
    },
  };
};

export const denormalize = (
  collection: Record<string, Address>,
  ids: (number | string)[]
): Address[] =>
  normalizr.denormalize(ids, schema, {
    addresses: collection,
  });
