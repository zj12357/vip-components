import React, { FC, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import UserToken from '@/common/token';
import { useSetToken } from '@/store/user/hooks';

type LoginProps = {};

const Login: FC<LoginProps> = (props) => {
    const navigate = useNavigate();
    const location = useLocation();
    const token = UserToken.getToken();
    const setToken = useSetToken();

    const userLogin = async (values: any) => {
        setToken('token');
        navigate('/', { replace: true });
    };

    useEffect(() => {
        if (location.pathname === '/user/login' && token) {
            navigate('/', { replace: true });
        }
    }, [location.pathname, navigate, token]);

    return (
        <div className="w-full h-full">
            <div>登录页</div>
            <button onClick={userLogin}>登录</button>
        </div>
    );
};
export default Login;
