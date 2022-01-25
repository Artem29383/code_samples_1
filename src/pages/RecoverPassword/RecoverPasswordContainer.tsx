import React from 'react';

import RecoverPassword from './RecoverPassword';

import { actions } from 'models/user';
import { useActionWithPayload } from 'hooks/useAction';

const RecoverPasswordContainer = () => {
  const handleRecover = useActionWithPayload(actions.recoverPassword);

  return <RecoverPassword onRecover={handleRecover} />;
};

export default RecoverPasswordContainer;
