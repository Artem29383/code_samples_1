export interface Address {
  id: number;
  title: string;
  location: [number, number];
  active: boolean;
}

export interface ApiAddress {
  id: number;
  full_address: string;
  latitude: string;
  longitude: string;
  active: boolean;
}

export interface AddressesState {
  collection: Record<string, Address>;
  ids: number[];
}
