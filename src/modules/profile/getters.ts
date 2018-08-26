import { GetterTree } from 'vuex';
import { RootState } from '@/store';

import {
  ProfileState,
  PROFILE_AUTHORIZED,
  PROFILE_SETTINGS_THEME_GET,
  PROFILE_REFRESH_TOKEN
} from './types';

export const getters: GetterTree<ProfileState, RootState> = {
  [PROFILE_AUTHORIZED]: (state) => {
    return (
      state.accessToken !== undefined &&
      state.accessTokenDecoded !== undefined &&
      state.accessTokenDecoded.exp
    );
  },

  [PROFILE_REFRESH_TOKEN]: (state) => {
    return state.refreshToken;
  },

  [PROFILE_SETTINGS_THEME_GET]: (state) => {
    return state.settings.theme;
  }
};