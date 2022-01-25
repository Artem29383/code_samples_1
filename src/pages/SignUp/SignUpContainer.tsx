import React from 'react';

import SignUp from './SignUp';

import { actions } from 'models/user';
import { useActionWithPayload } from 'hooks/useAction';

const SignUpContainer = () => {
  const handleSignUp = useActionWithPayload(actions.sendInvitation);

  return <SignUp onSendInvitation={handleSignUp} />;
};

export default SignUpContainer;
