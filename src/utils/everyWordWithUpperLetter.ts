export const everyWordWithUpperLetter = (string: string): string => {
  const split = string.split(' ');
  return split.reduce((acc, word) => {
    const upWord = word[0].toUpperCase() + word.slice(1);
    // eslint-disable-next-line no-param-reassign
    acc += upWord;
    return acc;
  }, '');
};
