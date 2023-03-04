import { selector } from 'recoil';
import { themeAtom } from './atoms';

export const themeSelector = selector({
    key: 'themeSelector',
    get: ({ get }) => {
        const state = get(themeAtom);
        return state.theme;
    },
});
