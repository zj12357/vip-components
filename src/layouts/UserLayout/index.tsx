import React, { FC, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Loading from '@/components/vip-ui/Loading';

type UserLayoutProps = {};

const UserLayout: FC<UserLayoutProps> = (props) => {
    return (
        <Suspense fallback={<Loading />}>
            <Outlet></Outlet>
        </Suspense>
    );
};

export default UserLayout;
