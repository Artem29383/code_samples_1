import React from 'react';

import { PasswordConfirmPayload } from 'models/user/types';

import RetractableMenu from 'components/RetractableMenu';
import PasswordChange from 'pages/Security/PasswordChange';
import UploadFile from 'pages/Security/UploadFile';

import * as Styled from './Security.styled';

type Props = {
  prequalitor: {
    fileName: string;
    url: string;
  };
  removePrequalitor: () => void;
  uploadPrequalitor: (e: any, fileList?: Array<string> | null) => void;
  proofOfFund: {
    fileName: string;
    url: string;
  };
  removeProofOfFund: () => void;
  uploadProofOfFund: (e: any, fileList?: Array<string> | null) => void;
  changeUserPassword: (payload: PasswordConfirmPayload) => void;
};

const Security = ({
  uploadPrequalitor,
  removePrequalitor,
  prequalitor,
  uploadProofOfFund,
  removeProofOfFund,
  proofOfFund,
  changeUserPassword,
}: Props) => (
  <Styled.List>
    <RetractableMenu label="Change Password">
      <PasswordChange onChange={changeUserPassword} />
    </RetractableMenu>
    <RetractableMenu label="Upload Prequalitor">
      <UploadFile
        fileName={prequalitor.fileName}
        url={prequalitor.url}
        type="pdf"
        onUpload={uploadPrequalitor}
        onRemove={removePrequalitor}
      />
    </RetractableMenu>
    <RetractableMenu label="Proof of Funds">
      <UploadFile
        fileName={proofOfFund.fileName}
        url={proofOfFund?.url}
        type="pdf"
        onUpload={uploadProofOfFund}
        onRemove={removeProofOfFund}
      />
    </RetractableMenu>
  </Styled.List>
);

export default Security;
