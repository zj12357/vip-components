import React from 'react';
import { ComponentType } from 'react';
import { RecoilRoot } from 'recoil';

interface WithRecoilRootProps {}
export default function WithRecoilRoot<Props extends WithRecoilRootProps>(
    WrappedComponent: ComponentType<Props>,
) {
    const Component: ComponentType<Props> = (props) => (
        <RecoilRoot>
            <WrappedComponent {...props} />
        </RecoilRoot>
    );

    Component.displayName = `WithRecoilRoot(${
        WrappedComponent.displayName || WrappedComponent.name
    })`;

    return Component;
}
