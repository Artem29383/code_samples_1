export const cutStr = (string = '', maxStr = 35) => {
  const stringLength = string.length;
  if (stringLength > maxStr) {
    return `${string.substr(0, maxStr)}...`;
  }
  return string;
};
