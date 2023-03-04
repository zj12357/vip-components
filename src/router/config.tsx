import React, { FC, Suspense } from 'react';
import { RouteProps } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import PrivateRoute from './privateRoute';
import Loading from '@/components/vip-ui/Loading';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { localeAtom } from '@/store/common/atoms';
import { API_URL } from '@/common/constants';

export type WrapperRouteProps = RouteProps & {
    title?: string;
    auth?: boolean;
};

const PublicRoute = (props: any) => {
    return props.element;
};

const WrapperRouteComponent: FC<WrapperRouteProps> = ({
    title,
    auth,
    ...props
}) => {
    const data = useRecoilValue(localeAtom);

    const WitchRoute = auth ? PrivateRoute : PublicRoute;

    if (title) {
        document.title = title;
    }

    return (
        <HelmetProvider>
            <Helmet>
                <html lang={data.locale} />
                <title>{title}</title>
                <meta property="og:title" content={title} />
                <link rel="canonical" href={API_URL} />
            </Helmet>
            <WitchRoute {...props} />
        </HelmetProvider>
    );
};

const WrapperRouteWithOutLayoutComponent: FC<WrapperRouteProps> = ({
    auth,
    ...props
}) => {
    return <Suspense fallback={<Loading />}>{props.element}</Suspense>;
};

export { WrapperRouteComponent, WrapperRouteWithOutLayoutComponent };
