import { normalize, schema } from 'normalizr';

export const toNormalize = <T>(data: T, field: string) => {
  const temp = new schema.Entity(field);
  const mySchema = { [field]: [temp] };
  return normalize(data, mySchema);
};
