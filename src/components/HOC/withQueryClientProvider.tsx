import React, { ComponentType } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

interface WithQueryClientProviderProps {}
export default function WithQueryClientProvider<
    Props extends WithQueryClientProviderProps,
>(WrappedComponent: ComponentType<Props>) {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: 0,
                suspense: true,
                refetchOnMount: false,
                refetchOnWindowFocus: false,
                refetchOnReconnect: true,
                refetchInterval: false,
            },
        },
    });
    const Component: ComponentType<Props> = (props) => (
        <QueryClientProvider client={queryClient}>
            <WrappedComponent {...props} />
            <ReactQueryDevtools initialIsOpen={true} />
        </QueryClientProvider>
    );

    Component.displayName = `WithQueryClientProvider(${
        WrappedComponent.displayName || WrappedComponent.name
    })`;

    return Component;
}
