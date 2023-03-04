import cssVars from 'css-vars-ponyfill'; // css var 的垫片
import { ThemeEnum, ThemeColorEnum } from '@/enums/appEnum';
import { getStorage, setStorage } from '@/utils/storage';

export const themeOptions: Record<string, Record<string, string>> = {
    // 浅色
    light: {
        '--theme-primary': ThemeColorEnum.LIGHT,
    },
    // 深色
    dark: {
        '--theme-primary': ThemeColorEnum.DARK,
    },
};

export const themeColorOptions: Record<string, string> = {
    // 浅色
    light: ThemeColorEnum.LIGHT,
    // 深色
    dark: ThemeColorEnum.DARK,
};

const handleVars = (theme: string) => {
    cssVars({
        rootElement: document,
        silent: true,
        watch: true,
        // variables 自定义属性名/值对的集合
        variables: themeOptions[theme],
        // 当添加，删除或修改其<link>或<style>元素的禁用或href属性时，ponyfill将自行调用
        onlyLegacy: false, // false 默认将css变量编译为浏览器识别的css样式 true 当浏览器不支持css变量的时候将css变量编译为识别的css
    });
};

export const initTheme = () => {
    const theme = getStorage<string>('theme') ?? ThemeEnum.LIGHT;
    document.documentElement.setAttribute('data-theme', theme);
    handleVars(theme);
};

export const changeTheme = (theme: ThemeEnum) => {
    document.documentElement.setAttribute('data-theme', theme);
    handleVars(theme);
    setStorage('theme', theme);
};

export const toggleTheme = () => {
    const theme =
        (getStorage<string>('theme') ?? ThemeEnum.LIGHT) === 'dark'
            ? 'light'
            : 'dark';
    document.documentElement.setAttribute('data-theme', theme);
    handleVars(theme);
    setStorage('theme', theme);
};

export const getTheme = () => {
    return getStorage<string>('theme') ?? ThemeEnum.LIGHT;
};

export const getThemeColor = () => {
    return themeColorOptions[getStorage<string>('theme') ?? ThemeEnum.LIGHT];
};
