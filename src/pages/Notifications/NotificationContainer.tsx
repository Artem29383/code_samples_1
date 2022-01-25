import React, { useCallback, useEffect, useState } from 'react';
import uniqueId from 'lodash/uniqueId';

import { useSelector } from 'hooks/useSelector';
import {
  authorizedSelector,
  notificationSelector,
} from 'models/user/selectors';
import { useActionWithPayload } from 'hooks/useAction';
import { actions } from 'models/user';
import { actions as actionsPush } from 'models/pushes';

import Notifications from 'pages/Notifications/Notifications';

type permissionType = 'denied' | 'default' | 'granted';

const NotificationContainer = () => {
  const [token, setToken] = useState<boolean | string>(false);
  const [perm, setPerm] = useState('granted');
  const user = useSelector(authorizedSelector);
  const { email } = useSelector(notificationSelector);
  const [isSold, setSold] = useState(email.favorite_sold);
  const [isReduced, setReduced] = useState(email.favorite_price_reduce);
  const switchNotification = useActionWithPayload(actions.switchNotification);
  const setTokenApi = useActionWithPayload(actions.setTokenApi);
  const addPush = useActionWithPayload(actionsPush.addPush);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const win: {
        showNativePrompt: () => void;
        getUserId: () => Promise<string>;
        registerForPushNotifications: () => void;
        setSubscription: (p: boolean) => void;
        push: (p: any) => void;
        on: (p: string, fn: Function) => void;
        // @ts-ignore
      } = window.OneSignal;
      win.push([
        'getNotificationPermission',
        (permission: permissionType) => {
          setPerm(permission);
          if (permission === 'granted') {
            win.getUserId().then((userId: string) => {
              setToken(userId);
            });
          } else {
            win.showNativePrompt();
          }
        },
      ]);

      win.push(() => {
        win.on(
          'notificationPermissionChange',
          (permissionChange: { to: string }) => {
            const currentPermission = permissionChange.to;
            setPerm(currentPermission);
            if (currentPermission === 'granted') {
              win.setSubscription(true);
              win.registerForPushNotifications();
            } else {
              win.setSubscription(false);
            }
          }
        );
      });

      win.push(() => {
        win.on('subscriptionChange', () => {
          win.getUserId().then((userId: string) => {
            setToken(userId);
          });
        });
      });
    }
    return () => {
      setToken(false);
    };
  }, []);

  useEffect(() => {
    if (perm !== 'granted') {
      setSold(false);
      setReduced(false);
      switchNotification({
        email: {
          favorite_sold: false,
          favorite_price_reduce: false,
        },
        push: {
          favorite_sold: false,
          favorite_price_reduce: false,
        },
      });
    }
  }, [perm, switchNotification]);

  useEffect(() => {
    if (token) {
      setTokenApi((token as unknown) as string);
    }
  }, [setTokenApi, token]);

  const handleChangeSold = useCallback(() => {
    setSold(!isSold);
    switchNotification({
      email: {
        favorite_sold: !isSold,
        favorite_price_reduce: isReduced,
      },
      push: {
        favorite_sold: !isSold,
        favorite_price_reduce: isReduced,
      },
    });
  }, [isReduced, isSold, switchNotification]);

  const handleChangeReduced = useCallback(() => {
    setReduced(!isReduced);
    switchNotification({
      email: {
        favorite_sold: isSold,
        favorite_price_reduce: !isReduced,
      },
      push: {
        favorite_sold: !isSold,
        favorite_price_reduce: isReduced,
      },
    });
  }, [isReduced, isSold, switchNotification]);

  const handleErrorSubscribe = useCallback(() => {
    addPush({
      id: uniqueId('info'),
      type: 'error',
      title: 'Warning',
      message: 'To subscribe allow notifications',
    });
  }, [addPush]);

  return (
    <Notifications
      phone={user!.phone}
      email={user!.email}
      isReduced={perm === 'granted' ? isReduced : false}
      isSold={perm === 'granted' ? isSold : false}
      onChangeReduce={
        perm === 'granted' ? handleChangeReduced : handleErrorSubscribe
      }
      onChangeSold={
        perm === 'granted' ? handleChangeSold : handleErrorSubscribe
      }
    />
  );
};

export default NotificationContainer;
