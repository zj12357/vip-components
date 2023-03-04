import React, { FC, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Loading from '@/components/Loading';

import Header from '../Components/Header';
import Footer from '../Components/Footer';

type UserLayoutProps = {};

const UserLayout: FC<UserLayoutProps> = (props) => {
    return (
        <main>
            <Header></Header>
            <Suspense fallback={<Loading />}>
                <Outlet></Outlet>
            </Suspense>
            <Footer></Footer>
        </main>
    );
};

export default UserLayout;
