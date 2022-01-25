import history from 'utils/history';

export const createClustersSizesOptions = (
  fromSize: number,
  count: number,
  interval: number
) =>
  [...new Array<number>(count - 1)].reduce(
    acc => [...acc, acc[acc.length - 1] + interval],
    [fromSize]
  );

export const getClusterOptionsIndexByCapacity = (
  clusterOptions: ReturnType<typeof createClustersSizesOptions>,
  length: number,
  capacity: number
) =>
  clusterOptions[Math.ceil(length / capacity) - 1]
    ? Math.ceil(length / 2) - 1
    : clusterOptions.length - 1;

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
