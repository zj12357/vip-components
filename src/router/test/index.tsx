import React, { FC } from 'react';
import { RouteObject } from 'react-router-dom';
import Redirect from '../Redirect';
import { WrapperRouteComponent } from '../config';

const Test = React.lazy(() => import('@/pages/TestPage'));
const TestDetail = React.lazy(() => import('@/pages/TestPage/Detail'));

const TestRoute = () => {
    const routeList: RouteObject[] = [
        {
            path: '/test',
            element: <Redirect to="/test/demo" />,
        },
        {
            path: '/test/demo',
            element: (
                <WrapperRouteComponent element={<Test />} title="测试" auth />
            ),
        },
        {
            path: '/test/detail',
            element: (
                <WrapperRouteComponent
                    element={<TestDetail />}
                    title="测试详情"
                    auth
                />
            ),
        },
    ];
    return routeList;
};

export default TestRoute;
