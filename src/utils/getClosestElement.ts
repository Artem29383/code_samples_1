export const getClosest = (points: number[], goal: number) => {
  const point = points.reduce((prev, curr) => {
    return Math.abs(curr - goal) < Math.abs(prev - goal) ? curr : prev;
  });
  const index = points.findIndex(p => p === point);
  return { point, index };
};
