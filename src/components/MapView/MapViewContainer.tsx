import React from 'react';
import { useSelector } from 'react-redux';
import { WEB_MAP_ID } from '../../constants/map';
import { selectYearsForSwipeWidgetLayers } from '../../store/Map/selectors';
import SwipeWidget from '../SwipeWidget/SwipeWidget';
// import LandcoverLayer from '../LandcoverLayer/LandcoverLayerContainer';
import MapView from './MapView';

const MapViewContainer = () => {
    const [year4LeadingLayer, year4TrailingLayer] = useSelector(
        selectYearsForSwipeWidgetLayers
    );

    return (
        <MapView webmapId={WEB_MAP_ID} center={[-117.2, 34.06]} zoom={10}>
            <SwipeWidget
                yearForLeadingLayer={year4LeadingLayer}
                yearForTailingLayer={year4TrailingLayer}
            />
        </MapView>
    );
};

export default MapViewContainer;
