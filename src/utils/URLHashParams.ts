import { LandCoverClassification } from '../services/sentinel-2-10m-landcover/rasterAttributeTable';
import { MapCenter, MapMode } from '../store/Map/reducer';

type UrlHashParamKey =
    | 'mapCenter'
    | 'timeExtent'
    | 'landCover'
    | 'downloadMode'
    | 'showImageryLayer'
    | 'mode'
    | 'year';

const hashParams = new URLSearchParams(window.location.hash.slice(1));

/**
 * update Hash Params in the URL using data from hashParams
 */
export const updateHashParams = (key: UrlHashParamKey, value: string) => {
    if (value === undefined || value === null) {
        hashParams.delete(key);
    } else {
        hashParams.set(key, value);
    }

    window.location.hash = hashParams.toString();
};

export const getHashParamValueByKey = (key: UrlHashParamKey): string => {
    if (!hashParams.has(key)) {
        return null;
    }

    return hashParams.get(key);
};

export const saveMapCenterToHashParams = (center: MapCenter, zoom: number) => {
    const { lon, lat } = center;
    const value = `${lon},${lat},${zoom}`;
    updateHashParams('mapCenter', value);
};

export const getMapCenterFromHashParams = () => {
    const value = getHashParamValueByKey('mapCenter');

    if (!value) {
        return null;
    }

    const [lon, lat, zoom] = value.split(',').map((d) => +d);

    return {
        center: {
            lon,
            lat,
        },
        zoom,
    };
};

export const saveTimeExtentToHashParams = (
    startYear: number,
    endYear: number
) => {
    const value = `${startYear},${endYear}`;
    updateHashParams('timeExtent', value);
};

export const getTimeExtentFromHashParams = () => {
    const value = getHashParamValueByKey('timeExtent');

    if (!value) {
        return null;
    }

    const [startYear, endYear] = value.split(',').map((d) => +d);

    return {
        startYear,
        endYear,
    };
};

export const saveSelectedLandCoverToHashParams = (
    landCoverType: LandCoverClassification
) => {
    updateHashParams('landCover', landCoverType);
};

export const getSelectedLandCoverFromHashParams = () => {
    return getHashParamValueByKey('landCover');
};

export const saveDonwloadModeToHashParams = (showDownloadPanel: boolean) => {
    updateHashParams('downloadMode', showDownloadPanel ? 'true' : null);
};

export const getDonwloadModeFromHashParams = () => {
    return getHashParamValueByKey('downloadMode') === 'true';
};

export const saveshowImageryLayerToHashParams = (showImageryLayer: boolean) => {
    updateHashParams('showImageryLayer', showImageryLayer ? 'true' : null);
};

export const getShowImageryLayerFromHashParams = () => {
    return getHashParamValueByKey('showImageryLayer') === 'true';
};

export const saveMapModeToHashParams = (mode: MapMode) => {
    updateHashParams('mode', mode);
};

export const getMapModeFromHashParams = () => {
    return getHashParamValueByKey('mode');
};

export const saveActiveYearToHashParams = (year: number) => {
    updateHashParams('year', year?.toString());
};

export const getActiveYearFromHashParams = () => {
    return getHashParamValueByKey('year');
};
