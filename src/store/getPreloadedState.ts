import { PartialRootState } from './configureStore';

import { initialMapState, MapState } from '../store/Map/reducer';
import { initialUIState, UIState } from './UI/reducer';
import {
    getMapCenterFromHashParams,
    getSelectedLandCoverFromHashParams,
    getTimeExtentFromHashParams,
} from '../utils/URLHashParams';
import { DEFAULT_MAP_CENTER, DEFAULT_MAP_ZOOM } from '../constants/map';
import { LandCoverClassification } from '../services/sentinel-2-10m-landcover/rasterAttributeTable';
import { getAvailableYears } from '../services/sentinel-2-10m-landcover/timeInfo';

const getPreloadedMapState = (): MapState => {
    const availableYears = getAvailableYears();

    const mapCenterInfo = getMapCenterFromHashParams();
    const timeExtent = getTimeExtentFromHashParams();
    const selectedLandCover = getSelectedLandCoverFromHashParams();

    const startYear = timeExtent?.startYear || availableYears[0];
    const endYear =
        timeExtent?.endYear || availableYears[availableYears.length - 1];

    return {
        ...initialMapState,
        zoom: mapCenterInfo?.zoom || DEFAULT_MAP_ZOOM,
        center: mapCenterInfo?.center || DEFAULT_MAP_CENTER,
        selectedLandCover: selectedLandCover as LandCoverClassification,
        swipeWidget: {
            year4LeadingLayer: startYear,
            year4TrailingLayer: endYear,
            position: 50,
        },
    };
};

const getPreloadedUIState = (): UIState => {
    return {
        ...initialUIState,
    };
};

const getPreloadedState = (): PartialRootState => {
    return {
        Map: getPreloadedMapState(),
        UI: getPreloadedUIState(),
    };
};

export default getPreloadedState;
