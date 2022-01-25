import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import { useSelector } from 'hooks/useSelector';
import { authorizedSelector } from 'models/user/selectors';
import { useAction, useActionWithPayload } from 'hooks/useAction';
import { actions } from 'models/user';

import AvatarUploader from 'components/AvatarUploader';
import Text from 'components/Text';
import EditInformation from 'pages/EditProfile/EditInformation';

import useWindowResize from 'hooks/useWindowResize';

import * as Styled from './EditProfile.styled';

import { BackArrowIcon } from 'styles/icons';

const EditProfile = () => {
  const user = useSelector(authorizedSelector);
  const updateAvatar = useActionWithPayload(actions.updateUserAvatar);
  const removeAvatar = useAction(actions.removeUserAvatar);
  const emitUpdateUserInfo = useActionWithPayload(actions.emitUpdateUserInfo);
  const { width: windowWidth } = useWindowResize();
  const history = useHistory();

  const handleBack = useCallback(() => {
    history.goBack();
  }, [history]);

  return (
    <Styled.Root>
      {windowWidth < 1025 && (
        <Styled.Controls>
          <BackArrowIcon onClick={handleBack} />
        </Styled.Controls>
      )}
      <Styled.HeaderUser>
        <AvatarUploader
          avatar={user!.avatarUrl}
          onUpload={updateAvatar}
          onRemove={removeAvatar}
        />
        <Styled.Wrapper>
          <Text
            paddingTop={windowWidth < 1025 ? 25 : 0}
            ml={windowWidth > 1024 ? 'auto' : 'initial'}
            align={windowWidth > 1024 ? 'left' : 'center'}
            fontSize={{ m: 30, d: 22 }}
            mb={7}
          >
            {user!.firstName}
          </Text>
          <Text
            ml={windowWidth > 1024 ? 'auto' : 'initial'}
            align={windowWidth > 1024 ? 'left' : 'center'}
            fontSize={{ m: 30, d: 22 }}
          >
            {user!.lastName}
          </Text>
        </Styled.Wrapper>
      </Styled.HeaderUser>
      <Styled.Form>
        <EditInformation
          firstName={user!.firstName}
          lastName={user!.lastName}
          email={user!.email}
          phone={user!.phone}
          onSubmitField={emitUpdateUserInfo}
        />
      </Styled.Form>
    </Styled.Root>
  );
};

export default EditProfile;
