import { SENTINEL_2_LANDCOVER_10M_IMAGE_SERVICE_URL } from './config';
import { DEFAULT_RENDERING_RULE } from './config';

/**
 * Feature from Attribute Table
 */
type RasterAttributeTableFeature = {
    attributes: {
        OBJECTID: number;
        Blue: number;
        Green: number;
        Red: number;
        ClassName: string;
        Count: number;
        Description: string;
        Examples: string;
        PopupText: string;
        UlcPopupText: string;
        Value: number;
    };
};

/**
 * The rasterAttributeTable resource returns categorical mapping of pixel values (for example, a class, group, category, or membership).
 * This resource is supported if the hasRasterAttributeTable property of the service is true.
 *
 * https://developers.arcgis.com/rest/services-reference/enterprise/raster-attribute-table.htm
 *
 * @example
 *
 * Get Attribute Table of Sentinel2_10m_LandCover
 * ```js
 * https://env1.arcgis.com/arcgis/rest/services/Sentinel2_10m_LandCover/ImageServer/rasterAttributeTable?renderingRule=%7B%22rasterFunction%22%3A%22Cartographic%20Renderer%20-%20Legend%20and%20Attribute%20Table%22%7D&f=json
 * ```
 *
 * Returns
 * ```js
 * {
 *   features: [
 *     ...
 *      {
 *           OBJECTID: 3,
 *           Value: 2,
 *           Count: 292251633,
 *           ClassName: "Trees",
 *           Red: 53,
 *           Green: 130,
 *           Blue: 33,
 *           UlcPopupText: "Trees",
 *           PopupText: "trees",
 *           Description: "Any significant clustering of tall (~15-m or higher) dense vegetation...",
 *           Examples: "Wooded vegetation,  clusters of dense tall vegetation within savannas..."
 *       }
 *   ]
 * }
 * ```
 *
 */
export const getRasterAttributeTable = async () => {
    const params = new URLSearchParams({
        renderingRule: JSON.stringify(DEFAULT_RENDERING_RULE),
        f: 'json',
    });

    const requestURL =
        SENTINEL_2_LANDCOVER_10M_IMAGE_SERVICE_URL +
        `/rasterAttributeTable?${params.toString()}`;

    const res = await fetch(requestURL);

    const data = await res.json();
    console.log(data);

    return data;
};
