import { ISpatialReference } from '@esri/arcgis-rest-request';
import { PORTAL_ROOT } from '../../constants';
import { WEB_MAP_ID } from '../../constants/map';
import { getToken } from '../../utils/esriOAuth';
import { getSignedInUser } from '../../utils/esriOAuth';

type CreateWebMapOptions = {
    title: string;
    tags: string;
    description?: string;
};

type CreateWebMapResponse = {
    /**
     * The folder in which the item was created
     */
    folder: string;
    /**
     * The ID of the created item
     */
    id: string;
    /**
     * 	Indicates if the operation was successful
     */
    success: boolean;
};

type LayerInfo = {
    id: string;
    itemId: string;
    layerType: string;
    opacity: number;
    title: string;
    url: string;
    visibility: boolean;
};

type WebMapData = {
    version: string;
    spatialReference: ISpatialReference;
    operationalLayers: LayerInfo[];
    baseMap: {
        title: string;
        baseMapLayers: LayerInfo[];
    };
};

/**
 * Retrieves the data of the Web Map with a Grayscale imagery basemap that is used in the Land Cover Explorer application.
 * The basemap layers will be utilized in the creation of a new web map by the user.
 * @returns {Promise<WebMapData>} A promise that resolves to the web map data.
 */
const getDataOfLandcoverAppWebmap = async (): Promise<WebMapData> => {
    const requestURL = `${PORTAL_ROOT}/sharing/rest/content/items/${WEB_MAP_ID}/data?f=json`;

    const res = await fetch(requestURL);

    if (!res.ok) {
        throw new Error('failed to fetch web map data');
    }

    const data = await res.json();

    return data;
};

/**
 * Get the JSON content for the web map item to be submitted.
 * @returns
 */
const getWebMapContent = async () => {
    const data = await getDataOfLandcoverAppWebmap();

    const requestText = {
        operationalLayers: data?.operationalLayers || [],
        baseMap: {
            baseMapLayers: data?.baseMap?.baseMapLayers || [],
            title: data?.baseMap?.title,
        },
        spatialReference: data?.spatialReference,
        version: data?.version,
        authoringApp: 'EsriLandcoverExplorer',
        authoringAppVersion: '1.0.0',
    };

    return JSON.stringify(requestText);
};

/**
 * Create a Web Map item using `addItem` operation of ArcGIS Rest API.
 * @param param0
 * @returns
 *
 * @see https://developers.arcgis.com/rest/users-groups-and-items/add-item.htm
 */
export const createWebMap = async ({
    title,
    tags,
    description,
}: CreateWebMapOptions): Promise<CreateWebMapResponse> => {
    const textContent = await getWebMapContent();

    const formData = new FormData();

    formData.append('title', title);
    formData.append('description', description || '');
    formData.append('tags', tags);
    formData.append(
        'extent',
        '[-989072.1380697651, 5327470.239509263, -769239.244721514, 5473159.215420865]'
    );
    // formData.append('snippet', '')
    formData.append('text', textContent);
    formData.append('type', 'Web Map');
    formData.append('overwrite', 'true');
    formData.append('f', 'json');
    formData.append('token', getToken());

    const user = getSignedInUser();
    const requestURL = `${PORTAL_ROOT}/sharing/rest/content/users/${user.username}/addItem`;

    const res = await fetch(requestURL, {
        method: 'POST',
        body: formData,
    });

    const data = await res.json();

    return data as CreateWebMapResponse;
};
