import { atom } from 'recoil';
import { ThemeStateType, LocaleStateType } from './types';
import { ThemeEnum, LocaleEnum } from '@/enums/appEnum';
import { getStorage } from '@/utils/storage';

export const themeAtom = atom<ThemeStateType>({
    key: 'themeAtom',
    default: {
        theme: getStorage('theme') ?? ThemeEnum.LIGHT,
    },
});

export const localeAtom = atom<LocaleStateType>({
    key: 'localeAtom',
    default: {
        locale:
            (localStorage.getItem('i18nextLng') as LocaleEnum) ?? LocaleEnum.CN,
    },
});
