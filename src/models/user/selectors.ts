import { createSelector } from 'reselect';
import { RootState } from '../index';

export const rootSelector = createSelector(
  (state: RootState) => state,
  state => state.user
);

export const authorizedSelector = createSelector(
  rootSelector,
  state => state.current
);

export const notificationSelector = createSelector(
  rootSelector,
  state => state.current!.notificationsSettings
);

export const profileAvatarSelector = createSelector(
  authorizedSelector,
  state => state!.avatarUrl
);

export const profilePrequalitorSelector = createSelector(
  authorizedSelector,
  state => {
    const array = state!.prequalitorUrl?.split('/');
    const fileName = array ? array[array.length - 1] : '';
    return {
      url: state!.prequalitorUrl || '',
      fileName,
    };
  }
);

export const profileProofOfFundsSelector = createSelector(
  authorizedSelector,
  state => {
    const array = state!.proofOfFundsUrl?.split('/');
    const fileName = array ? array[array.length - 1] : '';
    return {
      url: state!.proofOfFundsUrl || '',
      fileName,
    };
  }
);

export type Authorized = ReturnType<typeof authorizedSelector>;
