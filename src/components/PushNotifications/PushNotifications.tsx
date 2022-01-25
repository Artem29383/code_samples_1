import React from 'react';
import { useDispatch } from 'react-redux';

import { actions } from 'models/pushes';
import { pushesSelector } from 'models/pushes/selectors';
import { useSelector } from 'hooks/useSelector';

import * as Styled from './PushNotifications.styled';

const PushNotifications = () => {
  const pushes = useSelector(pushesSelector);
  const dispatch = useDispatch();

  return (
    <Styled.Root>
      {pushes.reverse().map(({ id, show, vanish, title, message, type }) => (
        <Styled.Push
          type={type}
          fadeOut={vanish}
          slideIn={show}
          key={id}
          onClick={() => dispatch(actions.vanishPush(id))}
        >
          <Styled.Header>{title}</Styled.Header>
          <Styled.Content>{message}</Styled.Content>
        </Styled.Push>
      ))}
    </Styled.Root>
  );
};

export default PushNotifications;
