import React, { FC, useEffect } from 'react';
import { useNavigate, NavigateProps } from 'react-router-dom';

type RedirectProps = NavigateProps;

const Redirect: FC<RedirectProps> = ({ to }) => {
    const navigate = useNavigate();

    useEffect(() => {
        navigate(to, { replace: true });
    });
    return null;
};

export default Redirect;
