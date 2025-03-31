import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const searchViewState = atom({
  key: 'searchViewState',
  default: 'list',
  effects_UNSTABLE: [persistAtom],
});
export const searchHitState = atom({
  key: 'searchHitState',
  default: {},
  effects_UNSTABLE: [persistAtom],
});
export const searchLocationState = atom({
  key: 'searchLocationState',
  default: { country: "", state: "", city: "" },
  effects_UNSTABLE: [persistAtom],
});
export const searchQueryState = atom({
  key: 'searchQueryState',
  default: {
    query: '',
    refinementList: {
    },
  },
  effects_UNSTABLE: [persistAtom],
});
export const userLoginState = atom({
  key: 'userLoginState',
  default: {
    authenticated: false,
    username: 'anonymous',
    name: 'anonymous',
    email: 'anonymous',
    refreshToken: ''
  },
  effects_UNSTABLE: [persistAtom],
});
export const currentBusinessState = atom({
  key: 'currentBusinessState',
  default: {},
  effects_UNSTABLE: [persistAtom],
});

export const currentVideoModalState = atom({
  key: 'currentVideoModalState',
  default: { open: false, link: '' },
  effects_UNSTABLE: [persistAtom],
});
export const currentBussinessCategory = atom({
  key: 'currentBussinessCategory',
  default: '',
  effects_UNSTABLE: [persistAtom],
});
export const localeState = atom({
  key: 'localeState',
  default: "en",
  effects_UNSTABLE: [persistAtom],
});
export const globalSearchFocusState = atom({
  key: 'globalSearchFocusState',
  default: false,
  effects_UNSTABLE: [persistAtom]
});
export const algoliaAnalyticsTags = atom({
  key: 'algoliaAnalyticsTags',
  default: [],
  effects_UNSTABLE: [persistAtom]
});