import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { batch } from 'react-redux';
import { useSelector } from 'react-redux';
import { WEB_MAP_ID } from '../../constants/map';
import { identifyLandcoverClassificationsByLocation } from '../../services/sentinel-2-10m-landcover/identifyTask';
import {
    extentUpdated,
    mapCenterUpdated,
    // MapExtent,
    resolutionUpdated,
    swipePositionChanged,
    zoomUpdated,
} from '../../store/Map/reducer';
import {
    selectMapCenterAndZoom,
    selectIsSentinel2LayerOutOfVisibleRange,
    selectShouldShowSentinel2Layer,
    selectYearsForSwipeWidgetLayers,
    selectMapMode,
} from '../../store/Map/selectors';
import SwipeWidget from '../SwipeWidget/SwipeWidget';
// import LandcoverLayer from '../LandcoverLayer/LandcoverLayerContainer';
import MapView from './MapView';
import MapViewEventHandlers from './MapViewEventHandler';
import IPoint from 'esri/geometry/Point';
import Popup from '../Popup/Popup';
// import SwipeWidgetReferenceInfo from '../SwipeWidget/SwipeWidgetReferenceInfo';
// import { showSwipeWidgetYearIndicatorToggled } from '../../store/UI/reducer';
import {
    selectAnimationMode,
    selectShouldHideControlPanel,
} from '../../store/UI/selectors';
import classNames from 'classnames';
// import ToggleAttribution from './ToggleAttribution';
import { toggleShowSwipeWidgetYearIndicator } from '../../store/UI/thunks';
import SearchWidget from './SearchWidget';
import ReferenceLayersToggleControl from '../ReferenceLayersToggleControl/ReferenceLayersToggleControl';
import ReferenceLayers from './ReferenceLayers';
import { saveMapCenterToHashParams } from '../../utils/URLHashParams';
import CustomMapArrtribution from '../CustomMapArrtribution/CustomMapArrtribution';
import Sentinel2Layer from '../Sentinel2Layer/Sentinel2Layer';
import LandcoverLayer from '../LandcoverLayer/LandCoverLayer';
import AnimationPanel from '../AnimationPanel/AnimationPanel';
import MapInfoIndicators from './MapReferenceInfo';

const MapViewContainer = () => {
    const dispatch = useDispatch();

    const mode = useSelector(selectMapMode);

    const animationMode = useSelector(selectAnimationMode);

    const hideControlPanel = useSelector(selectShouldHideControlPanel);

    const isSentinel2LayerOutOfVisibleRange = useSelector(
        selectIsSentinel2LayerOutOfVisibleRange
    );

    const { year4LeadingLayer, year4TrailingLayer } = useSelector(
        selectYearsForSwipeWidgetLayers
    );

    const shouldShowSentinel2Layer = useSelector(
        selectShouldShowSentinel2Layer
    );

    const [isUpdating, setIsUpdating] = useState<boolean>(true);

    const { center, zoom } = useSelector(selectMapCenterAndZoom);

    /**
     * Show Swipe Widget when in swipe mode
     * if viewing sentinel 2 layer, swipe widget can only be used if sentinel-2 layer is within visisble zoom levels,
     * which requires map zoom to be 11 or bigger
     */
    const isSwipeWidgetVisible =
        mode === 'swipe' && isSentinel2LayerOutOfVisibleRange === false;

    useEffect(() => {
        saveMapCenterToHashParams(center, zoom);
    }, [center, zoom]);

    useEffect(() => {
        // adding this class will hide map zoom widget when animation mode is on
        document.body.classList.toggle(
            'hide-map-control',
            animationMode !== null
        );
    }, [animationMode]);

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
                    visible={isSwipeWidgetVisible}
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

                {/* sentinel 2 layer that will be displayed in step mode, or when swipe widget is disabled */}
                <Sentinel2Layer />

                {/* land cover 2 layer that will be displayed in step mode */}
                <LandcoverLayer />

                <Popup />

                <SearchWidget hide={animationMode !== null} />

                <ReferenceLayers />

                <CustomMapArrtribution />

                <AnimationPanel />
            </MapView>

            <ReferenceLayersToggleControl />

            <MapInfoIndicators
                isUpdating={isUpdating}
                isSwipeWidgetVisible={isSwipeWidgetVisible}
            />

            {/* <ToggleAttribution /> */}
        </div>
    );
};

export default MapViewContainer;
