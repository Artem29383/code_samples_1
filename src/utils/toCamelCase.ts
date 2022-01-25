import _toCamelCase from 'lodash/camelCase';
import _isObject from 'lodash/isObject';

/* TODO Find out how to properly type this func */
function toCamelCase(
  data: Record<string, any> | Array<any> | string | number
): any {
  if (_isObject(data) && !Array.isArray(data)) {
    return Object.keys(data).reduce(
      (acc, key) => ({
        ...acc,
        [_toCamelCase(key)]: toCamelCase(data[key]),
      }),
      {}
    );
  }

  return data;
}

export default toCamelCase;
