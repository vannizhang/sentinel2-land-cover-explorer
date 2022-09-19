import React from 'react';
import { WEB_MAP_ID } from '../../constants/map';
import LandcoverLayer from '../LandcoverLayer/LandcoverLayerContainer';
import MapView from './MapView';

const MapViewContainer = () => {
    return (
        <MapView webmapId={WEB_MAP_ID} center={[-117.2, 34.06]} zoom={10}>
            <LandcoverLayer targetYear={2019} />
        </MapView>
    );
};

export default MapViewContainer;
