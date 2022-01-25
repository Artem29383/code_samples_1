export const objectToArray = (state: {
  [key: number]: { active: boolean; serverValue: string; humanText: string };
}) =>
  Object.values(state).reduce((acc: string[], value) => {
    return value.active ? [...acc, value.serverValue] : acc;
  }, []);
