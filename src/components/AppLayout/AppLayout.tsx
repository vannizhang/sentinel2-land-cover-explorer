import React from 'react';
import ControlPanel from '../ControlPanel/ControlPanel';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import MapView from '../MapView/MapViewContainer';

const AppLayout = () => {
    return (
        <ErrorBoundary>
            <MapView />
            <ControlPanel />
        </ErrorBoundary>
    );
};

export default AppLayout;
