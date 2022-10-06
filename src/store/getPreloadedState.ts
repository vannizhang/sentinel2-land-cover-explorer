import { PartialRootState } from './configureStore';

import { initialMapState, MapMode, MapState } from '../store/Map/reducer';
import { initialUIState, UIState } from './UI/reducer';
import {
    getActiveYearFromHashParams,
    getDonwloadModeFromHashParams,
    getMapCenterFromHashParams,
    getMapModeFromHashParams,
    getActiveLandCoverTypeFromHashParams,
    getShowImageryLayerFromHashParams,
    getTimeExtentFromHashParams,
    getSentinel2RasterFunctionFromHashParams,
} from '../utils/URLHashParams';
import { DEFAULT_MAP_CENTERS, DEFAULT_MAP_ZOOM } from '../constants/map';
import { LandCoverClassification } from '../services/sentinel-2-10m-landcover/rasterAttributeTable';
import { getAvailableYears } from '../services/sentinel-2-10m-landcover/timeInfo';
import { Sentinel2RasterFunction } from '../components/ControlPanel/Sentinel2LayerRasterFunctionsList/Sentinel2LayerRasterFunctionsListContainer';

/**
 * Get a map center from list of default map centers randomly
 */
const getMapCenterFromDefaultLocations = () => {
    const randomIdx = Math.floor(Math.random() * DEFAULT_MAP_CENTERS.length);
    const [lon, lat] = DEFAULT_MAP_CENTERS[randomIdx];
    return {
        lon,
        lat,
    };
};

const getPreloadedMapState = (): MapState => {
    const availableYears = getAvailableYears();

    const mapCenterInfo = getMapCenterFromHashParams();
    const timeExtent = getTimeExtentFromHashParams();
    const activelandCoverType = getActiveLandCoverTypeFromHashParams();
    const shouldShowSentinel2Layer = getShowImageryLayerFromHashParams();

    const mode = (getMapModeFromHashParams() as MapMode) || 'step';

    const year = getActiveYearFromHashParams();
    const sentinel2RasterFunction =
        (getSentinel2RasterFunctionFromHashParams() as Sentinel2RasterFunction) ||
        'Natural Color with DRA';

    const startYear = timeExtent?.startYear || availableYears[0];
    const endYear =
        timeExtent?.endYear || availableYears[availableYears.length - 1];

    return {
        ...initialMapState,
        mode,
        year: year ? +year : availableYears[0],
        zoom: mapCenterInfo?.zoom || DEFAULT_MAP_ZOOM,
        center: mapCenterInfo?.center || getMapCenterFromDefaultLocations(),
        activeLandCoverType: activelandCoverType as LandCoverClassification,
        shouldShowSentinel2Layer,
        swipeWidget: {
            year4LeadingLayer: startYear,
            year4TrailingLayer: endYear,
            position: 50,
        },
        sentinel2RasterFunction,
    };
};

const getPreloadedUIState = (): UIState => {
    const showDownloadPanel = getDonwloadModeFromHashParams();

    return {
        ...initialUIState,
        showDownloadPanel,
    };
};

const getPreloadedState = (): PartialRootState => {
    return {
        Map: getPreloadedMapState(),
        UI: getPreloadedUIState(),
    };
};

export default getPreloadedState;
