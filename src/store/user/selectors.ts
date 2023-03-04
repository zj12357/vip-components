import { selector } from 'recoil';
import { userAtom } from './atoms';

export const tokenSelector = selector({
    key: 'tokenSelector',
    get: ({ get }) => {
        const state = get(userAtom);
        return state.token;
    },
});
