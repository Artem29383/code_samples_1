export const getFormatted = (
  number: number,
  step: number,
  min: number,
  max: number,
  div: number,
  suffixThousand: string
) => {
  if (number <= min) {
    return 'Any';
  }
  if (number >= max) {
    return 'Any';
  }
  if (number < 1000000) {
    return `${number / div}${suffixThousand}`;
  }
  if (number > 1000000) {
    const string = String(number);
    return `${string[0]}.${string[1]}m`;
  }
  return number;
};
