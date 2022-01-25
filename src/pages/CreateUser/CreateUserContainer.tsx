import React from 'react';
import { useParams } from 'react-router-dom';

import CreateUser from './CreateUser';

import { actions } from 'models/user';
import { useActionWithPayload } from 'hooks/useAction';
import { CreateUserValues } from 'models/user/types';

const CreateUserContainer = () => {
  const params = useParams<{ token: string }>();
  const signUpAction = useActionWithPayload(actions.signUpUser);

  const handleSignUp = (values: CreateUserValues) => {
    signUpAction({ ...values, token: params.token });
  };

  return <CreateUser onCreateUser={handleSignUp} />;
};

export default CreateUserContainer;
