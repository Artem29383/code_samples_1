import React from 'react';

import ResetPassword from './ResetPassword';

import { actions } from 'models/user';
import { useActionWithPayload } from 'hooks/useAction';

const ResetPasswordContainer = () => {
  const handleReset = useActionWithPayload(actions.resetPassword);

  return <ResetPassword onReset={handleReset} />;
};

export default ResetPasswordContainer;
