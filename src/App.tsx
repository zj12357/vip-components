import React, { useEffect, ComponentType } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import RenderRouter from './router';
import { compose } from '@/utils/tools';
import {
    WithRecoilRoot,
    WithErrorScreen,
    WithQueryClientProvider,
    WithOfflineMask,
} from '@/components/HOC';
import { initTheme } from '@/config/theme';

function App() {
    const RouteComponent = () => {
        return (
            <Router>
                <RenderRouter></RenderRouter>
            </Router>
        );
    };

    const renderer: (c: ComponentType) => ComponentType = compose(
        WithRecoilRoot,
        WithErrorScreen,
        WithQueryClientProvider,
        WithOfflineMask,
    );

    const Main = renderer(RouteComponent);

    useEffect(() => {
        initTheme();
    }, []);

    return <Main></Main>;
}

export default App;
