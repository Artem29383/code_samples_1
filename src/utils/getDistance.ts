const rad = (x: number) => {
  return (x * Math.PI) / 180;
};

export const getDistance = (
  p1: { lat: number; lng: number },
  p2: { lat: () => number; lng: () => number }
) => {
  const R = 6378137; // Earth’s mean radius in meter
  const dLat = rad(p2.lat() - p1.lat);
  const dLong = rad(p2.lng() - p1.lng);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(rad(p1.lat)) *
      Math.cos(rad(p2.lat())) *
      Math.sin(dLong / 2) *
      Math.sin(dLong / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return { m: R * c, miles: R * c * 0.00062137 };
};

export const reformatMiles = (m: string) => {
  const split = m.split('.');
  if (String(split[0]) === '0') {
    return `.${split[1]}`;
  }
  if (String(split[1]) === '0') {
    return split[0];
  }
  return m;
};
