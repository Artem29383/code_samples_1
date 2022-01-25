import { Methods, request } from './request';

import {
  ApiUser,
  PasswordConfirmPayload,
  SendInvitationPayload,
  SignInPayload,
  SignUpPayload,
  ResetPasswordPayload,
} from 'models/user/types';
import { Address } from 'src/models/addresses/types';

export const fetchCurrentUser = () =>
  request<ApiUser>(Methods.GET, {
    url: '/users/current',
  });

export const sendInvitation = (data: SendInvitationPayload) =>
  request(Methods.POST, { url: '/customers/invitations', data });

export const signUp = ({
  token,
  firstName,
  lastName,
  phone,
  password,
  passwordConfirm,
}: SignUpPayload) =>
  request(Methods.POST, {
    url: '/users/signup',
    data: {
      phone,
      password,
      password_confirmation: passwordConfirm,
      invitation_token: token,
      first_name: firstName,
      last_name: lastName,
    },
  });

export const signIn = (data: SignInPayload) => {
  return request(Methods.POST, {
    url: '/users/signin',
    data,
  });
};

export const signOut = () =>
  request(Methods.DELETE, {
    url: '/users/signout',
  });

export const uploadUserAvatar = (data: File) => {
  const formData = new FormData();
  formData.append('avatar', data);
  return request(Methods.PUT, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    url: '/users/current',
    data: formData,
  });
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const removeUserAvatar = (data: object) => {
  const formData = new FormData();
  formData.append('avatar', '_destroy');
  return request(Methods.PUT, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    url: '/users/current',
    data: formData,
  });
};

export const addUserAddress = (data: Omit<Address, 'id'>) =>
  request(Methods.PUT, {
    url: `/users/current`,
    data: {
      addresses: [
        {
          title: 'Address',
          full_address: data.title,
          address_category: 'work',
          latitude: data.location[0],
          longitude: data.location[1],
          active: true,
        },
      ],
    },
  });

export const deleteUserAddress = (id: number) =>
  request(Methods.PUT, {
    url: `/users/current`,
    data: {
      addresses: [
        {
          id,
          destroy: true,
        },
      ],
    },
  });

export const updateUserAddresses = (
  data: ({ id: number } & Partial<Address>)[]
) =>
  request(Methods.PUT, {
    url: `/users/current`,
    data: {
      addresses: data,
    },
  });

export const updateUserPassedIntro = (value: boolean) =>
  request(Methods.PUT, {
    url: `/users/current`,
    data: {
      passed_intro: value,
    },
  });

export const updateUserData = (data: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}) =>
  request(Methods.PUT, {
    url: `/users/current`,
    data: {
      first_name: data.firstName,
      last_name: data.lastName,
      phone: data.phone,
      email: data.email,
      // secondary_contact: {
      //   first_name: data.secondaryFirstName,
      //   last_name: data.secondaryLastName,
      //   phone: data.secondaryPhone,
      // },
    },
  });

export const recoverUserPassword = (email: string) =>
  request(Methods.POST, {
    url: `/users/recover_password`,
    data: {
      email,
    },
  });

export const resetUserPassword = (data: ResetPasswordPayload) =>
  request(Methods.POST, {
    url: `/users/reset_password`,
    data: {
      reset_password_token: data.token,
      password: data.password,
      password_confirmation: data.confirm,
    },
  });

export const updateUserPassword = (data: PasswordConfirmPayload) =>
  request(Methods.PUT, {
    headers: {
      'Content-Type': 'application/json',
    },
    url: `/users/current`,
    data: {
      current_password: data.oldPassword,
      password: data.password,
      password_confirmation: data.confirm,
    },
  });

export const uploadUserPrequalitor = (data: File) => {
  const formData = new FormData();
  formData.append('prequalitor', data);
  return request(Methods.PUT, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    url: '/users/current',
    data: formData,
  });
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const userPrequalitorRemove = (data: object) => {
  const formData = new FormData();
  formData.append('prequalitor', '_destroy');
  return request(Methods.PUT, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    url: '/users/current',
    data: formData,
  });
};

export const uploadUserProofOfFund = (data: File) => {
  const formData = new FormData();
  formData.append('proof_of_funds', data);
  return request(Methods.PUT, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    url: '/users/current',
    data: formData,
  });
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const userProofOfFundRemove = (data: object) => {
  const formData = new FormData();
  formData.append('proof_of_funds', '_destroy');
  return request(Methods.PUT, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    url: '/users/current',
    data: formData,
  });
};

export const notificationSwitch = (data: {
  email: {
    favorite_sold: boolean;
    favorite_price_reduce: boolean;
  };
  push: {
    favorite_sold: boolean;
    favorite_price_reduce: boolean;
  };
}) =>
  request(Methods.PUT, {
    headers: {
      'Content-Type': 'application/json',
    },
    url: `/users/current`,
    data: {
      notifications_settings: data,
    },
  });

export const setTokenApi = (data: string) =>
  request(Methods.POST, {
    headers: {
      'Content-Type': 'application/json',
    },
    url: `/users/current/device_token`,
    data: {
      token: data,
    },
  });
