export const getBoundsPoints = (map: google.maps.Map) => {
  const bounds = map.getBounds();

  const northEast = bounds!.getNorthEast();
  const southWest = bounds!.getSouthWest();

  const northEastCorner: [number, number] = [northEast.lat(), northEast.lng()];
  const southWestCorner: [number, number] = [southWest.lat(), southWest.lng()];
  const northWestCorner: [number, number] = [northEast.lat(), southWest.lng()];
  const southEastCorner: [number, number] = [southWest.lat(), northEast.lng()];

  return {
    northEastCorner,
    southWestCorner,
    northWestCorner,
    southEastCorner,
  };
};
