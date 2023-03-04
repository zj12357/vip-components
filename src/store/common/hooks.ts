import { useSetRecoilState } from 'recoil';
import { setStorage } from '@/utils/storage';
import { themeAtom } from './atoms';
import { ThemeEnum } from '@/enums/appEnum';

export const useSetTheme = () => {
    const setTheme = useSetRecoilState(themeAtom);

    return (info: ThemeEnum) => {
        setStorage('theme', info);
        setTheme((prev) => ({
            ...prev,
            theme: info,
        }));
    };
};
