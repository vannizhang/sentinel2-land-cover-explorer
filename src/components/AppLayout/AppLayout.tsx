import React from 'react';
import ControlPanel from '../ControlPanel/ControlPanel';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import InfoPanel from '../InfoPanel/InfoPanel';
import MapView from '../MapView/MapViewContainer';

const AppLayout = () => {
    return (
        <ErrorBoundary>
            <MapView />
            <ControlPanel />
            <InfoPanel />
        </ErrorBoundary>
    );
};

export default AppLayout;
