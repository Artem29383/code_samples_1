import uniq from 'lodash/uniq';

export default <T>(items: T[], concatItems: T[]) =>
  uniq(items.concat(concatItems));
