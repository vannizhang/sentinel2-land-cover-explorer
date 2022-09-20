import { SENTINEL_2_LANDCOVER_10M_IMAGE_SERVICE_URL } from '../../constants/map';
import { MapExtent } from '../../store/Map/reducer';

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
export const computeHistograms = ({
    extent,
    resolution,
    year,
}: ComputeHistogramsParams) => {
    const requestURL =
        SENTINEL_2_LANDCOVER_10M_IMAGE_SERVICE_URL + '/computeHistograms';
};
