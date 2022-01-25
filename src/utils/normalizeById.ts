/* TODO type these as generics after response body typing */

export const normalize = (list: Array<{ id: number }>) =>
  list.reduce(
    (acc, { id, ...rest }) => ({
      ...acc,
      [id]: {
        id,
        ...rest,
      },
    }),
    {}
  );

export const denormalize = <T>(collection: Record<string, T>) =>
  Object.keys(collection).map(id => ({ id: Number(id), ...collection[id] }));
