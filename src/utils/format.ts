import numeral from 'numeral';

export const commonValueFormat = (
  value: number,
  round: (value: number) => number = v => v
) => {
  return value >= 1
    ? numeral(round(value)).format('0,0')
    : numeral(value).format('0.00');
};
