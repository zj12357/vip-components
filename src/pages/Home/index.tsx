import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { toggleTheme } from '@/config/theme';
import { changeLanguage } from '@/config/locale';
import { useTranslation } from 'react-i18next';
import { LocaleEnum } from '@/enums/appEnum';

type HomeProps = {};

const Home: FC<HomeProps> = (props) => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    return (
        <div>
            <div className="flex justify-center items-center">
                <div onClick={toggleTheme} className="mx-[10px]">
                    切换主题
                </div>
                <div
                    onClick={() => changeLanguage(LocaleEnum.EN)}
                    className="mx-[10px]"
                >
                    语切换言
                </div>
            </div>

            <div className="bg-base w-full h-[200px]"></div>
            <div>{t('app.abnormal.403')}</div>
            <div className="" onClick={() => navigate('/test')}>
                去测试页面
            </div>
        </div>
    );
};

export default Home;
