import { PropertyMarkerInterface } from './property-marker';

import history from 'utils/history';

export const createClusterOptions = (
  fromSize: number,
  count: number,
  interval: number,
  className = 'custom-clustericon'
) =>
  [...new Array<number>(count - 1)]
    .reduce(acc => [...acc, acc[acc.length - 1] + interval], [fromSize])
    .map((size, i) => ({
      width: size,
      height: size,
      className: `${className}-${i + 1}`,
    }));

export const setMapCenterQuery = (center: [number, number]) => {
  const query = new URLSearchParams(history.location.search);
  query.delete('center');
  query.append('center', String(center[0]));
  query.append('center', String(center[1]));

  history.replace(`${history.location.pathname}?${query}`);
};

export const setZoomLevelQuery = (zoom: number) => {
  const query = new URLSearchParams(history.location.search);
  query.delete('z');
  query.append('z', String(zoom));
  history.replace(`${history.location.pathname}?${query}`);
};

export const createClusterCalculator = (
  clusterOptions: ReturnType<typeof createClusterOptions>
) => (markers: PropertyMarkerInterface[]) => {
  const cluster = {
    title: String(markers.length),
    text: String(markers.length),
  };

  const hasFavorite = markers.some(({ favorite }) => favorite);

  const index = clusterOptions[Math.ceil(markers.length / 2) - 1]
    ? Math.ceil(markers.length / 2) - 1
    : clusterOptions.length - 1;

  return {
    ...cluster,
    index,
    className: hasFavorite ? 'cluster-favorite' : '',
  };
};
