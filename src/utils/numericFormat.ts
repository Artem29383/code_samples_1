export const numericFormat = (number: string): string => {
  const diviner = /,|\./.exec(number);
  let result: string;
  if (diviner) {
    const splitString = number.split(diviner[0]);
    if (Number(splitString[1].replace(',', '.')) > 0) {
      const isZero = Number(splitString[1][0]) === 0;
      result = `${splitString[0]}${isZero ? '' : diviner[0]}${
        isZero ? '' : splitString[1][0]
      }`;
    } else {
      // eslint-disable-next-line
      result = splitString[0];
    }
  } else {
    result = number;
  }

  return result;
};

// console.info(numericFormat('123.3123'));
// console.info(numericFormat('123,3123'));
// console.info(numericFormat('123.0'));
// console.info(numericFormat('123.30'));
// console.info(numericFormat('123,0'));
// console.info(numericFormat('123,30'));
// console.info(numericFormat('123'));
// console.info(numericFormat('123,30.44'));
// console.info(numericFormat('123,030'));
// console.info(numericFormat('123.030'));
