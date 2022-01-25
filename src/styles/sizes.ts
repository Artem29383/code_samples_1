import {
  ViewportShorthands,
  isMobile,
  isTablet,
  isDesktop,
  isBigDesktop,
  isLargeDesktop,
} from './media';

const getSize = <
  T extends Record<string, ViewportShorthands | string | number>
>(
  sizes: T,
  size: keyof T
) => {
  if (typeof sizes[size] === 'string' || typeof sizes[size] === 'number') {
    return sizes[size];
  }

  if (isMobile() && (sizes[size] as ViewportShorthands).m) {
    return (sizes[size] as ViewportShorthands).m;
  }

  if (isTablet() && (sizes[size] as ViewportShorthands).t) {
    return (sizes[size] as ViewportShorthands).t;
  }

  if (isDesktop() && (sizes[size] as ViewportShorthands).d) {
    return (sizes[size] as ViewportShorthands).d;
  }

  if (
    (isBigDesktop() || isLargeDesktop()) &&
    (sizes[size] as ViewportShorthands).bd
  ) {
    return (sizes[size] as ViewportShorthands).bd;
  }

  return sizes[size];
};

export const LayoutSizes = {
  headerHeight: { m: 50, t: 70 },
  footerHeight: 64,
  searchInputHeight: 50,
  searchInputTopOffset: 25,
  searchInputMarginBottom: 10,
};

export const layoutSize = (size: keyof typeof LayoutSizes) =>
  getSize(LayoutSizes, size);
