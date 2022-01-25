/* eslint-disable no-param-reassign, @typescript-eslint/no-unused-vars  */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type PushType = 'info' | 'error';

export interface Push {
  id: string;
  title: string;
  message: string;
  type: PushType;
  show?: boolean;
  vanish?: boolean;
}

export interface PushesState {
  collection: Record<string, Push>;
  ids: string[];
}

const initialState: PushesState = {
  collection: {},
  ids: [],
};

const pushesSlide = createSlice({
  name: 'pushes',
  initialState,
  reducers: {
    addPush: (state, { payload }: PayloadAction<Push>) => {
      state.ids.push(payload.id);
      state.collection[payload.id] = {
        ...payload,
        show: false,
        vanish: false,
      };
    },
    showPush: (state, { payload }: PayloadAction<Push>) => {
      state.collection[payload.id].show = true;
    },
    vanishPush: (state, { payload }: PayloadAction<string>) => {
      state.collection[payload].vanish = true;
    },
    removePush: (state, { payload }: PayloadAction<string>) => {
      state.ids = state.ids.filter(id => id !== payload);
    },
  },
});

export const { actions } = pushesSlide;

export default pushesSlide.reducer;
