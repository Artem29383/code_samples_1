import pickToCamelCase from 'utils/pickToCamelCase';
import { Property } from 'models/properties/types';

export const toCamelCaseFavorites = (response: {
  data: {
    user_favorites: Property[];
  };
}) => {
  return response.data.user_favorites.map(item =>
    pickToCamelCase(item, ['property'])
  );
};
