import { getToken } from '../../utils/esriOAuth';
import { getSignedInUser } from '../../utils/esriOAuth';

type createWebMapOptions = {
    title: string;
    tags: string;
    description?: string;
};

const getRequestText = () => {
    const requestText = {
        operationalLayers: [
            {
                opacity: 0.5,
                title: 'World Imagery',
                url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer',
                visibility: true,
                itemId: '10df2279f9684e4a9f6a7f08febac2a9',
                layerType: 'ArcGISTiledMapServiceLayer',
                effect: [
                    {
                        type: 'saturate',
                        amount: 0,
                    },
                ],
            },
        ],
        baseMap: {
            baseMapLayers: [
                {
                    // "id": "185a7028af5-layer-101",
                    opacity: 1,
                    title: 'World Hillshade',
                    url: 'https://services.arcgisonline.com/arcgis/rest/services/Elevation/World_Hillshade/MapServer',
                    itemId: '1b243539f4514b6ba35e7d995890db1d',
                    layerType: 'ArcGISTiledMapServiceLayer',
                    blendMode: 'multiply',
                },
                {
                    // "id": "186191aacdd-layer-201",
                    opacity: 1,
                    title: 'LandCoverAppOceans',
                    visibility: true,
                    itemId: '63a17bca8ef941618bf03ce1dd717e9a',
                    layerType: 'VectorTileLayer',
                    effect: [
                        {
                            type: 'brightness',
                            amount: 3,
                        },
                        {
                            type: 'contrast',
                            amount: 3,
                        },
                    ],
                    styleUrl:
                        'https://www.arcgis.com/sharing/rest/content/items/63a17bca8ef941618bf03ce1dd717e9a/resources/styles/root.json',
                },
                {
                    // "id": "186191fc82e-layer-202",
                    opacity: 0.75,
                    title: 'Human Geography Dark Detail Dry',
                    itemId: '92cb9830a1f34398b32f8b52fc1f3312',
                    layerType: 'VectorTileLayer',
                    styleUrl:
                        'https://www.arcgis.com/sharing/rest/content/items/92cb9830a1f34398b32f8b52fc1f3312/resources/styles/root.json',
                    isReference: true,
                },
                {
                    // "id": "185ac967115-layer-55",
                    title: 'Human Geography Dark Label',
                    itemId: '4a3922d6d15f405d8c2b7a448a7fbad2',
                    layerType: 'VectorTileLayer',
                    styleUrl:
                        'https://www.arcgis.com/sharing/rest/content/items/4a3922d6d15f405d8c2b7a448a7fbad2/resources/styles/root.json',
                    isReference: true,
                },
            ],
            title: 'Community Map',
        },
        spatialReference: { wkid: 102100, latestWkid: 3857 },
        version: '2.26',
        authoringApp: 'EsriLandcoverExplorer',
        authoringAppVersion: '1.0.0',
    };

    return JSON.stringify(requestText);
};

export const createWebMap = async ({
    title,
    tags,
    description,
}: createWebMapOptions) => {
    const user = getSignedInUser();
    const requestURL = `https://www.arcgis.com/sharing/rest/content/users/${user.username}/addItem`;

    const formData = new FormData();

    formData.append('title', title);
    formData.append('description', description || '');
    formData.append('tags', tags);
    formData.append(
        'extent',
        '[-989072.1380697651, 5327470.239509263, -769239.244721514, 5473159.215420865]'
    );
    // formData.append('snippet', '')
    formData.append('text', getRequestText());
    formData.append('type', 'Web Map');
    formData.append('overwrite', 'true');
    formData.append('f', 'json');
    formData.append('token', getToken());

    const res = await fetch(requestURL, {
        method: 'POST',
        body: formData,
    });

    const data = await res.json();
};
