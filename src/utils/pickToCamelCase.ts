import _pick from 'lodash/pick';
import toCamelCase from './toCamelCase';

export default <T>(item: T, props: string[]) => ({
  ...toCamelCase(_pick<T>(item, props) as T),
});
