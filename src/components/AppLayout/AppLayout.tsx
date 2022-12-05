import React from 'react';
import About from '../About/About';
import AppTitle from '../AppTitle/AppTitle';
import ControlPanel from '../ControlPanel/ControlPanel';
import DownloadPanel from '../DownloadPanel/DownloadPanel';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import InfoPanel from '../InfoPanel/InfoPanel';
import MapView from '../MapView/MapViewContainer';

const AppLayout = () => {
    return (
        <ErrorBoundary>
            <MapView />
            <ControlPanel />
            <InfoPanel />
            <DownloadPanel />
            <AppTitle />
            <About />
        </ErrorBoundary>
    );
};

export default AppLayout;
