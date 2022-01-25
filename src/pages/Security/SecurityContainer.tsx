import React from 'react';

import { PasswordConfirmPayload } from 'models/user/types';

import { useAction, useActionWithPayload } from 'hooks/useAction';
import { actions } from 'models/user';
import { useSelector } from 'hooks/useSelector';
import {
  profilePrequalitorSelector,
  profileProofOfFundsSelector,
} from 'models/user/selectors';

import Security from 'pages/Security/Security';

const SecurityContainer = () => {
  const uploadPrequalitor = useActionWithPayload<File>(
    actions.uploadPrequalitor
  );
  const prequalitor = useSelector(profilePrequalitorSelector);
  const removePrequalitor = useAction(actions.removePrequalitor);
  const uploadProofOfFund = useActionWithPayload<File>(
    actions.uploadProofOfFunds
  );
  const proofOfFund = useSelector(profileProofOfFundsSelector);
  const removeProofOfFund = useAction(actions.removeProofOfFunds);
  const changeUserPassword = useActionWithPayload<PasswordConfirmPayload>(
    actions.updateUserPassword
  );

  return (
    <Security
      changeUserPassword={changeUserPassword}
      prequalitor={prequalitor}
      proofOfFund={proofOfFund}
      removePrequalitor={removePrequalitor}
      removeProofOfFund={removeProofOfFund}
      uploadPrequalitor={uploadPrequalitor}
      uploadProofOfFund={uploadProofOfFund}
    />
  );
};

export default SecurityContainer;
