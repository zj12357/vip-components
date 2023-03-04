import React from 'react';
import { ComponentType } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import Error from '@/components/ResultPage/Error';

interface WithErrorScreenProps {}
export default function WithErrorScreen<Props extends WithErrorScreenProps>(
    WrappedComponent: ComponentType<Props>,
) {
    const Component: ComponentType<Props> = (props) => (
        <ErrorBoundary
            fallbackRender={({ error, resetErrorBoundary }) => (
                <Error
                    message={error.message}
                    handleError={resetErrorBoundary}
                ></Error>
            )}
        >
            <WrappedComponent {...props} />
        </ErrorBoundary>
    );

    Component.displayName = `WithErrorScreen(${
        WrappedComponent.displayName || WrappedComponent.name
    })`;

    return Component;
}
