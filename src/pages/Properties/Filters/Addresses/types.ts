import { MarginProps } from 'styled-system';

export type CommonProps = {
  setActive?: boolean;
  maxAddresses?: number;
  addTitle?: string;
  mapLoaded: boolean;
} & MarginProps;
