import { toNormalize } from 'utils/toNormalize';
import pickToCamelCase from 'utils/pickToCamelCase';
import { getUniqID } from 'utils/getUniqID';

export const toNormalizeWithCamelCaseFavorites = <T>(response: T[]) => {
  const data = response.map(req => {
    // @ts-ignore
    if (req.id) {
      return pickToCamelCase(req, ['id', 'property']);
    }
    // @ts-ignore
    const tempReq = { ...req, id: getUniqID(1, 564789366) };
    return pickToCamelCase(tempReq, ['id', 'property']);
  });
  const { entities, result } = toNormalize({ favorites: data }, 'favorites');
  return { entities, result };
};
