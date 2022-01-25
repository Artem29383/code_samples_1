import React from 'react';

import SignIn from './SignIn';

import { actions } from 'models/user';
import { useActionWithPayload } from 'hooks/useAction';

const SignInContainer = () => {
  const handleSignIn = useActionWithPayload(actions.signInUser);

  return <SignIn onSignIn={handleSignIn} />;
};

export default SignInContainer;
