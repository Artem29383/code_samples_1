export const chunks = <T>(array: T[], sizes: number) => {
  const particlesArray = [];
  let particles = Math.ceil(array.length / sizes);
  let start = 0;
  while (particles > 0) {
    particlesArray.push(array.slice(start, start + sizes));
    particles -= 1;
    start += sizes;
  }
  return particlesArray;
};
