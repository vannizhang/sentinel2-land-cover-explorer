export const TIER =
    window.location.host === 'livingatlas.arcgis.com'
        ? 'production'
        : 'development';

/**
 * Client ID that will be used by ArcGIS OAuth
 *
 * @see https://www.arcgis.com/home/item.html?id=756a77b878134263925ec88d6e2b4115
 */
export const APP_ID = 'QdeB9AWYjgtqMWQt';
