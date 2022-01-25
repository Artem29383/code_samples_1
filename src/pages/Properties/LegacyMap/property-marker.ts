import { PropertyType } from 'models/properties/types';

export interface PropertyMarkerInterface extends google.maps.Marker {
  propertyId: number;
  favorite: boolean;
  propertyType: PropertyType;
}

export default () =>
  class PropertyMarker extends google.maps.Marker {
    constructor(
      opts: google.maps.ReadonlyMarkerOptions & {
        propertyId: number;
        favorite: boolean;
        propertyType: PropertyType;
      }
    ) {
      super(opts);
      this.propertyId = opts.propertyId;
      this.favorite = opts.favorite;
      this.propertyType = opts.propertyType;
    }

    propertyId: number;

    favorite: boolean;

    propertyType: PropertyType;
  };
