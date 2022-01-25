import toCamelCase from 'utils/toCamelCase';

export function parseQuery(queryString: string) {
  const query: {
    [key: string]: string;
  } = {};
  const pairs = (queryString.startsWith('?')
    ? queryString.substr(1)
    : queryString
  ).split('&');
  /* eslint-disable */
  for (let i = 0; i < pairs.length; i++) {
    const pair = pairs[i].split('=');
    query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
  }
  return toCamelCase(query);
}
