import React from 'react';
import { useDispatch } from 'react-redux';
import { batch } from 'react-redux';
import { useSelector } from 'react-redux';
import { WEB_MAP_ID } from '../../constants/map';
import { identifyLandcoverClassificationsByLocation } from '../../services/sentinel-2-10m-landcover/identifyTask';
import {
    extentUpdated,
    MapExtent,
    resolutionUpdated,
    swipePositionChanged,
} from '../../store/Map/reducer';
import {
    selectSelectedLandCover,
    selectShouldShowSentinel2Layer,
    selectYearsForSwipeWidgetLayers,
} from '../../store/Map/selectors';
import SwipeWidget from '../SwipeWidget/SwipeWidget';
// import LandcoverLayer from '../LandcoverLayer/LandcoverLayerContainer';
import MapView from './MapView';
import MapViewEventHandlers from './MapViewEventHandler';
import IPoint from 'esri/geometry/Point';
import Popup from '../Popup/Popup';
import SwipeWidgetReferenceInfo from '../SwipeWidget/SwipeWidgetReferenceInfo';

const MapViewContainer = () => {
    const dispatch = useDispatch();

    const [year4LeadingLayer, year4TrailingLayer] = useSelector(
        selectYearsForSwipeWidgetLayers
    );

    const shouldShowSentinel2Layer = useSelector(
        selectShouldShowSentinel2Layer
    );

    const selectedLandCover = useSelector(selectSelectedLandCover);

    const fetchLandCoverData = async (point: IPoint) => {
        const res = await identifyLandcoverClassificationsByLocation(point);
        console.log(res);
    };

    return (
        <>
            <MapView webmapId={WEB_MAP_ID} center={[-117.2, 34.06]} zoom={12}>
                <SwipeWidget
                    shouldShowSentinel2Layer={shouldShowSentinel2Layer}
                    yearForLeadingLayer={year4LeadingLayer}
                    yearForTailingLayer={year4TrailingLayer}
                    selectedLandCover={selectedLandCover}
                    positionOnChange={(position) => {
                        dispatch(swipePositionChanged(position));
                    }}
                />
                <MapViewEventHandlers
                    extentOnChange={(extent, resolution) => {
                        batch(() => {
                            dispatch(resolutionUpdated(resolution));
                            dispatch(extentUpdated(extent));
                        });
                    }}
                    mapViewOnClick={fetchLandCoverData}
                />
                <Popup />
            </MapView>

            <SwipeWidgetReferenceInfo />
        </>
    );
};

export default MapViewContainer;
