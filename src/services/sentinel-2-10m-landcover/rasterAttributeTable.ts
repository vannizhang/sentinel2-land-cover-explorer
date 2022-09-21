import { SENTINEL_2_LANDCOVER_10M_IMAGE_SERVICE_URL } from '../../constants/map';
import { DEFAULT_RENDERING_RULE } from './config';

/**
 * https://env1.arcgis.com/arcgis/rest/services/Sentinel2_10m_LandCover/ImageServer/rasterAttributeTable?renderingRule=%7B%22rasterFunction%22%3A%22Cartographic%20Renderer%20-%20Legend%20and%20Attribute%20Table%22%7D&f=json
 * 
 * @example
 *  {
        OBJECTID: 3,
        Value: 2,
        Count: 292251633,
        ClassName: "Trees",
        Red: 53,
        Green: 130,
        Blue: 33,
        UlcPopupText: "Trees",
        PopupText: "trees",
        Description: "Any significant clustering of tall (~15-m or higher) dense vegetation, typically with a closed or dense canopy.",
        Examples: "Wooded vegetation,  clusters of dense tall vegetation within savannas, plantations, swamp or mangroves (dense/tall vegetation with ephemeral water or canopy too thick to detect water underneath)."
    }
 *
 */
const getRasterAttributeTable = async () => {
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
};
