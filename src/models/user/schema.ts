import * as normalizr from 'normalizr';

import { User, ApiUser } from './types';

import { schema as addresessSchema } from 'models/addresses/schema';
import { Address } from 'models/addresses/types';

type UserEntities = {
  users: Record<number, User>;
  addresses: Record<number, Address>;
};

type PickedProperty = Omit<User, 'addresses'> & { addresses: Address[] };

export const pickProps = (item: ApiUser): PickedProperty => ({
  id: item.id,
  firstName: item.first_name,
  email: item.email,
  lastName: item.last_name,
  phone: item.phone,
  avatarUrl: item.avatar_url,
  passedIntro: item.passed_intro,
  addresses: item.addresses.map(address => ({
    id: address.id,
    title: address.full_address,
    location: [Number(address.latitude), Number(address.longitude)],
    active: address.active,
  })),
  proofOfFundsUrl: item.proof_of_funds_url,
  prequalitorUrl: item.prequalitor_url,
  notificationsSettings: item.notifications_settings,
});

export const schema = new normalizr.schema.Entity<PickedProperty>(
  'users',
  {
    addresses: addresessSchema,
  },
  {
    // @ts-ignore
    processStrategy: pickProps,
  }
);

export const normalize = (input: ApiUser) => {
  const normalized = normalizr.normalize<User, UserEntities, number>(
    input,
    schema
  );

  return {
    ids: {
      users: [normalized.result],
      addresses: normalized.entities.addresses
        ? Object.keys(normalized.entities.addresses).map(key => Number(key))
        : [],
    },
    collections: {
      users: normalized.entities.users,
      addresses: normalized.entities.addresses || {},
    },
  };
};

export const denormalize = (
  collection: Record<string, User>,
  ids: (number | string)[]
): User[] =>
  normalizr.denormalize(ids, schema, {
    addresses: collection,
  });

export type NormalizedUser = ReturnType<typeof normalize>;
