import { Methods, request } from 'api/request';
import { InitialState } from 'models/steps/types';

export const sellRequestCreate = (data: {
  property_form: InitialState;
  unregistered_user: {
    email: string;
    first_name: string;
    last_name: string;
    phone: string;
  };
}) =>
  request(Methods.POST, {
    url: `/requests/sales`,
    data,
    headers: { 'Content-Type': 'application/json', 'X-Api-Version': '1.0' },
  });

export const sellRequestUpdate = (data: {
  requestId: number;
  property_form: InitialState;
  unregistered_user_identy_token: string;
  unregistered_user: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
}) => {
  return request(Methods.PUT, {
    url: `/requests/sales/${data.requestId}`,
    data: {
      unregistered_user_identy_token: data.unregistered_user_identy_token,
      property_form: data.property_form,
      unregistered_user: data.unregistered_user,
    },
    headers: { 'Content-Type': 'application/json', 'X-Api-Version': '1.0' },
  });
};

export const sellRequestFormData = (data: {
  payload: FormData;
  requestId: number;
  unregistered_user_identy_token: string;
}) => {
  return request(Methods.PUT, {
    url: `/requests/sales/${data.requestId}`,
    data: data.payload,
    headers: { 'Content-Type': 'multipart/form-data', 'X-Api-Version': '1.0' },
  });
};

export const sendInvitation = (data: {
  email: string;
  full_name: string;
  phone: string;
  id: string;
}) =>
  request(Methods.POST, {
    url: `/requests/sales/${data.id}/agent_invitation`,
    data: {
      email: data.email,
      full_name: data.full_name,
      phone: data.phone,
    },
  });
