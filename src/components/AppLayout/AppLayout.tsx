import React from 'react';
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
        </ErrorBoundary>
    );
};

export default AppLayout;
