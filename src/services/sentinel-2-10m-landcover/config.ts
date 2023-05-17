/**
 * Sentinel-2 10m land cover time series of the world. Produced by Impact Observatory, Microsoft, and Esri.
 *
 * https://env1.arcgis.com/arcgis/rest/services/Sentinel2_10m_LandCover/ImageServer
 */
// export const SENTINEL_2_LANDCOVER_10M_IMAGE_SERVICE_URL =
//     'https://env1.arcgis.com/arcgis/rest/services/Sentinel2_10m_LandCover/ImageServer';

import { TIER } from '../../constants';

// import { LandCoverClassification } from './rasterAttributeTable';

export const SENTINEL_2_LANDCOVER_10M_IMAGE_SERVICE_URL_DEV =
    'https://icdev.imagery1.arcgis.com/arcgis/rest/services/Sentinel2_10m_LandCover/ImageServer';

export const SENTINEL_2_LANDCOVER_10M_IMAGE_SERVICE_URL_PROD =
    'https://ic.imagery1.arcgis.com/arcgis/rest/services/Sentinel2_10m_LandCover/ImageServer';

export const SENTINEL_2_LANDCOVER_10M_IMAGE_SERVICE_URL =
    TIER === 'development'
        ? SENTINEL_2_LANDCOVER_10M_IMAGE_SERVICE_URL_DEV
        : SENTINEL_2_LANDCOVER_10M_IMAGE_SERVICE_URL_PROD;

// export const SENTINEL_2_LANDCOVER_10M_IMAGE_SERVICE_URL =
//     SENTINEL_2_LANDCOVER_10M_IMAGE_SERVICE_URL_PROD;

export const DEFAULT_RENDERING_RULE = {
    rasterFunction: 'Cartographic Renderer - Legend and Attribute Table',
};
