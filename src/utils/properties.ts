import { getPropertyItem } from 'models/properties/selectors';

export const renderSquareFeet = (item: ReturnType<typeof getPropertyItem>) => {
  if (item.propertyType === 'lot') {
    return item.formattedLotSizeSquareFeet || '-';
  }

  return item.formattedLivingSquareFeet || '-';
};
