import i18next from 'i18next';
import { LocaleEnum } from '@/enums/appEnum';

export const changeLanguage = (lang: LocaleEnum) => {
    i18next.changeLanguage(lang);
};

export const getLanguage = () => {
    return i18next.language;
};
