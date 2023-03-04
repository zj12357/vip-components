import React, { lazy, FC, useEffect } from 'react';
import { useRoutes, RouteObject } from 'react-router-dom';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import {
    WrapperRouteComponent,
    WrapperRouteWithOutLayoutComponent,
} from './config';
import Redirect from './Redirect';
import BasicLayout from '../layouts/BasicLayout';
import UserLayout from '../layouts/UserLayout';
import test from './test';

NProgress.configure({ showSpinner: false });
const Login = lazy(() => import('@/pages/Login'));
const Home = lazy(() => import('@/pages/Home'));
const NotAuthority = lazy(() => import('@/components/ResultPage/NotAuthority'));
const NotFound = lazy(() => import('@/components/ResultPage/NotFound'));

const routeList: RouteObject[] = [
    {
        path: '/',
        element: <WrapperRouteComponent element={<BasicLayout />} />,
        children: [
            {
                path: '/',
                element: <Redirect to="/home" />,
            },
            {
                path: '/home',
                element: (
                    <WrapperRouteComponent
                        element={<Home />}
                        title="首页"
                        auth
                    />
                ),
            },
        ],
    },

    {
        path: '/test',
        element: (
            <WrapperRouteComponent
                element={<BasicLayout />}
                title="测试"
                auth
            />
        ),
        children: [...test()],
    },
    {
        path: '/user',
        element: (
            <WrapperRouteWithOutLayoutComponent element={<UserLayout />} />
        ),
        children: [
            {
                path: '/user/login',
                element: (
                    <WrapperRouteWithOutLayoutComponent
                        element={<Login />}
                        title="登录"
                    />
                ),
            },
        ],
    },
    {
        path: '*' || '/404',
        element: (
            <WrapperRouteWithOutLayoutComponent
                element={<NotFound />}
                title="404"
            />
        ),
    },
    {
        path: '/403',
        element: (
            <WrapperRouteWithOutLayoutComponent
                element={<NotAuthority />}
                title="403"
            />
        ),
    },
];

const RenderRouter: FC = () => {
    useEffect(() => {
        NProgress.done();
        return () => {
            NProgress.start();
        };
    });
    const element = useRoutes(routeList);
    return element;
};

export default RenderRouter;
