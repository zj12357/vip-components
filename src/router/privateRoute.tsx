import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import UserToken from '@/common/token';

const PrivateRoute = (props: any) => {
    const location = useLocation();
    const { pathname } = location;

    const token = UserToken.getToken();

    return token ? (
        pathname === '/' ? (
            <Navigate to={{ pathname: '/home' }} replace />
        ) : (
            props.element
        )
    ) : (
        <Navigate to={{ pathname: '/user/login' }} replace />
    );
};

export default PrivateRoute;
