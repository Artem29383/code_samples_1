import { ApiAddress, Address } from 'models/addresses/types';

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatarUrl: string;
  addresses: number[];
  passedIntro: boolean;
  prequalitorUrl: string | null;
  proofOfFundsUrl: string | null;
  notificationsSettings: {
    email: {
      favorite_sold: boolean;
      favorite_price_reduce: boolean;
    };
    phone: {
      favorite_sold: boolean;
      favorite_price_reduce: boolean;
    };
  };
}

export interface ApiUser {
  id: number;
  auth_token: string;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  avatar_url: string;
  addresses: ApiAddress[];
  prequalitor_url: string | null;
  proof_of_funds_url: string | null;
  passed_intro: boolean;
  notifications_settings: {
    email: {
      favorite_sold: boolean;
      favorite_price_reduce: boolean;
    };
    phone: {
      favorite_sold: boolean;
      favorite_price_reduce: boolean;
    };
  };
}

export interface UsersState {
  signinigIn: boolean;
  signingUp: boolean;
  current?: User | null;
}

export interface CreateUserValues {
  firstName: string;
  lastName: string;
  phone: string;
  password: string;
  passwordConfirm: string;
}

export interface SignUpPayload extends CreateUserValues {
  token: string;
}

export interface SignInPayload {
  email: string;
  password: string;
}

export interface SendInvitationPayload {
  email: string;
}

export interface ImagePayload {
  image: File;
}

export interface PasswordConfirmPayload {
  oldPassword: string;
  password: string;
  confirm: string;
}

export interface ResetPasswordPayload {
  token: string;
  password: string;
  confirm: string;
}

export type AddUserAddressPayload = Omit<Address, 'id'>;
