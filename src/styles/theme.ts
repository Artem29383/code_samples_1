import { Viewport, ViewportShorthands } from './media';

const breakpoints = Object.values(Viewport)
  .filter(item => typeof item === 'number')
  .map(item => `${Number(item) + 1}px`);

const theme = {
  space: [],
  breakpoints: breakpoints as Array<string> & ViewportShorthands,
};

const [tablet, desktop, bigDesktop] = breakpoints;

theme.breakpoints.t = tablet;
theme.breakpoints.d = desktop;
theme.breakpoints.bd = bigDesktop;

export default theme;
