import { Property } from 'models/properties/types';

export interface InitialStateTypes {
  tours: {
    collection: {
      [key: string]: {
        sender: { email: string; firstName: string; lastName: string };
      };
    };
    ids: Array<number>;
  };
  groupTours: {
    [key: number]: Tour;
  };
  requests: {
    collection: {
      [key: number]: Request;
    };
    ids: string[];
  };
  isLoad: boolean;
}

export interface Request {
  id: number;
  propertyTour: {
    note: null | string;
    preferredTimeSlot: string;
    rate: null | string;
    showingType: string;
    tourDate: Date | string;
    property: {
      forShowing: boolean;
      address: string;
      bathroomsTotal: number;
      bedroomsTotal: number;
      id: number;
      listPrice: string;
      livingAreaTotalSquareFeet: string;
      photo: {
        id: number;
        imageUrl: string;
        position: number;
      };
      standardStatus: string;
    };
  };
}

export interface Tour {
  timeRange?: string;
  startTourRequest: {
    agent: {
      email: string;
      firstName: string;
      id: number;
      lastName: string;
    };
    propertyTour: {
      preferredTimeSlot: string;
      tourDate: string;
    };
  };
  tourRequestsCount: number | string;
}
