import { SENTINEL_2_LANDCOVER_10M_IMAGE_SERVICE_URL } from './config';
import { MapExtent } from '../../store/Map/reducer';
import { DEFAULT_RENDERING_RULE } from './config';

type ComputeHistogramsParams = {
    extent: MapExtent;
    resolution: number;
    year: number;
};

/**
 * Computes histograms based on the provided params, the result of this operation contains histograms computed for the given extent.
 *
 * https://developers.arcgis.com/rest/services-reference/enterprise/compute-histograms.htm
 *
 */
export const computeHistograms = async ({
    extent,
    resolution,
    year,
}: ComputeHistogramsParams) => {
    const params = new URLSearchParams({
        f: 'json',
        geometryType: 'esriGeometryEnvelope',
        geometry: JSON.stringify(extent),
        mosaicRule: JSON.stringify({
            ascending: true,
            mosaicMethod: 'esriMosaicAttribute',
            sortValue: null,
            where: `(Year = ${year})`,
        }),
        renderingRule: JSON.stringify(DEFAULT_RENDERING_RULE),
        pixelSize: JSON.stringify({
            x: resolution,
            y: resolution,
            spatialReference: { latestWkid: 3857, wkid: 102100 },
        }),
    });

    const requestURL =
        SENTINEL_2_LANDCOVER_10M_IMAGE_SERVICE_URL +
        `/computeHistograms?${params.toString()}`;

    try {
        const res = await fetch(requestURL);

        const data = await res.json();

        return data;
    } catch (err) {
        console.log(err);
    }

    return null;
};
