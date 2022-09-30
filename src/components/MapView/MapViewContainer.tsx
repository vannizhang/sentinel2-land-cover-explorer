import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { batch } from 'react-redux';
import { useSelector } from 'react-redux';
import { WEB_MAP_ID } from '../../constants/map';
import { identifyLandcoverClassificationsByLocation } from '../../services/sentinel-2-10m-landcover/identifyTask';
import {
    extentUpdated,
    mapCenterUpdated,
    MapExtent,
    resolutionUpdated,
    swipePositionChanged,
    zoomUpdated,
} from '../../store/Map/reducer';
import {
    selectMapCenterAndZoom,
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
// import { showSwipeWidgetYearIndicatorToggled } from '../../store/UI/reducer';
import { selectShouldHideControlPanel } from '../../store/UI/selectors';
import classNames from 'classnames';
import ToggleAttribution from './ToggleAttribution';
import { toggleShowSwipeWidgetYearIndicator } from '../../store/UI/thunks';
import SearchWidget from './SearchWidget';
import ReferenceLayersToggleControl from '../ReferenceLayersToggleControl/ReferenceLayersToggleControl';
import ReferenceLayers from './ReferenceLayers';
import { saveMapCenterToHashParams } from '../../utils/URLHashParams';

const MapViewContainer = () => {
    const dispatch = useDispatch();

    const hideControlPanel = useSelector(selectShouldHideControlPanel);

    const { year4LeadingLayer, year4TrailingLayer } = useSelector(
        selectYearsForSwipeWidgetLayers
    );

    const shouldShowSentinel2Layer = useSelector(
        selectShouldShowSentinel2Layer
    );

    const selectedLandCover = useSelector(selectSelectedLandCover);

    const [isUpdating, setIsUpdating] = useState<boolean>(true);

    const { center, zoom } = useSelector(selectMapCenterAndZoom);

    useEffect(() => {
        saveMapCenterToHashParams(center, zoom);
    }, [center, zoom]);

    return (
        <div
            className={classNames('absolute top-0 left-0 w-full', {
                'bottom-control-panel-height': hideControlPanel === false,
                'bottom-0': hideControlPanel,
            })}
        >
            <MapView
                webmapId={WEB_MAP_ID}
                center={[center.lon, center.lat]}
                zoom={zoom}
            >
                <SwipeWidget
                    shouldShowSentinel2Layer={shouldShowSentinel2Layer}
                    yearForLeadingLayer={year4LeadingLayer}
                    yearForTailingLayer={year4TrailingLayer}
                    selectedLandCover={selectedLandCover}
                    positionOnChange={(position) => {
                        dispatch(swipePositionChanged(position));
                    }}
                    referenceInfoOnToggle={(shouldDisplay) => {
                        dispatch(
                            toggleShowSwipeWidgetYearIndicator(shouldDisplay)
                        );
                    }}
                />
                <MapViewEventHandlers
                    extentOnChange={(extent, resolution, center, zoom) => {
                        batch(() => {
                            dispatch(resolutionUpdated(resolution));
                            dispatch(extentUpdated(extent));
                            dispatch(mapCenterUpdated(center));
                            dispatch(zoomUpdated(zoom));
                        });
                    }}
                    // mapViewOnClick={fetchLandCoverData}
                    mapViewUpdatingOnChange={(val: boolean) => {
                        setIsUpdating(val);
                    }}
                />
                <Popup />

                <SearchWidget />

                <ReferenceLayers />
            </MapView>

            <ReferenceLayersToggleControl />

            <SwipeWidgetReferenceInfo isUpdating={isUpdating} />

            {/* <ToggleAttribution /> */}
        </div>
    );
};

export default MapViewContainer;
