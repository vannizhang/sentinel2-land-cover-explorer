import './styles/index.css';

import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider as ReduxProvider } from 'react-redux';

import configureAppStore, { getPreloadedState } from './store/configureStore';

import AppContextProvider from './contexts/AppContextProvider';
import AppLayout from './components/AppLayout/AppLayout';
import { loadServiceInfo } from './services/sentinel-2-10m-landcover/loadServiceInfo';

(async () => {
    // Load service information (Raster Attributes, Time Extent and etc) of Sentinel-2-10m-Landcover layer
    await loadServiceInfo();

    const preloadedState = getPreloadedState();

    const root = createRoot(document.getElementById('root'));

    root.render(
        <ReduxProvider store={configureAppStore(preloadedState)}>
            <AppContextProvider>
                <AppLayout />
            </AppContextProvider>
        </ReduxProvider>
    );
})();
