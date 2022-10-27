import {
    IQueryFeaturesResponse,
    queryFeatures,
} from '@esri/arcgis-rest-feature-service';
import { HistoricalLandCoverData } from '../sentinel-2-10m-landcover/computeHistograms';

import { LAND_COVER_STATISTICS_SERVICE_URL, FIELD_NAMES } from './config';

const {
    COUNTRY,
    ISO_CODE,
    NAME,
    YEAR,
    WATER,
    TREE,
    FLOODED_VEG,
    CROPS,
    BUILT,
    BARE,
    SNOW,
    CLOUD,
    RANGE,
} = FIELD_NAMES;

export type SubRegion = {
    /**
     * ISO Code of the sub-region (e.g. 'JP01')
     */
    ISOCode: string;
    /**
     * Name of the sub-region (e.g. 'Hokkaidô')
     */
    name: string;
};

/**
 * Get unique list of country names
 *
 * @returns array of country names sorted in alphabetical order
 *
 * @example
 * ```
 * const res = await getCountries() // ['Australia', 'Austria', 'Azerbaijan', 'Bahamas'...]
 * ```
 */
export const getCountries = async (): Promise<string[]> => {
    try {
        const res = (await queryFeatures({
            url: LAND_COVER_STATISTICS_SERVICE_URL,
            where: '1=1',
            outFields: [COUNTRY],
            orderByFields: COUNTRY,
            returnDistinctValues: true,
        })) as IQueryFeaturesResponse;

        return res.features.map((feature) => {
            const { attributes } = feature;
            return attributes[COUNTRY];
        });
    } catch (err) {
        console.log(err);
        return null;
    }
};

/**
 * Get list of unique sub-regions of the input country
 * @param country name of the country
 */
export const getSubRegions = async (country: string): Promise<SubRegion[]> => {
    try {
        const res = (await queryFeatures({
            url: LAND_COVER_STATISTICS_SERVICE_URL,
            where: `${COUNTRY}='${country}'`,
            outFields: [ISO_CODE, NAME],
            orderByFields: NAME,
            returnDistinctValues: true,
        })) as IQueryFeaturesResponse;

        return res.features.map((feature) => {
            const { attributes } = feature;
            return {
                ISOCode: attributes[ISO_CODE],
                name: attributes[NAME],
            };
        });
    } catch (err) {
        console.log(err);
        return null;
    }
};

export const getHistoricalLandCoverDataByCountry = async (
    countryName: string
): Promise<HistoricalLandCoverData[]> => {
    try {
        const res = (await queryFeatures({
            url: LAND_COVER_STATISTICS_SERVICE_URL,
            where: `${COUNTRY}='${countryName}'`,
            groupByFieldsForStatistics: `${COUNTRY}, ${YEAR}`,
            outStatistics: [
                {
                    statisticType: 'sum',
                    onStatisticField: WATER,
                    outStatisticFieldName: WATER,
                },
                {
                    statisticType: 'sum',
                    onStatisticField: TREE,
                    outStatisticFieldName: TREE,
                },
                {
                    statisticType: 'sum',
                    onStatisticField: FLOODED_VEG,
                    outStatisticFieldName: FLOODED_VEG,
                },
                {
                    statisticType: 'sum',
                    onStatisticField: CROPS,
                    outStatisticFieldName: CROPS,
                },
                {
                    statisticType: 'sum',
                    onStatisticField: BUILT,
                    outStatisticFieldName: BUILT,
                },
                {
                    statisticType: 'sum',
                    onStatisticField: BARE,
                    outStatisticFieldName: BARE,
                },
                {
                    statisticType: 'sum',
                    onStatisticField: SNOW,
                    outStatisticFieldName: SNOW,
                },
                {
                    statisticType: 'sum',
                    onStatisticField: CLOUD,
                    outStatisticFieldName: CLOUD,
                },
                {
                    statisticType: 'sum',
                    onStatisticField: RANGE,
                    outStatisticFieldName: RANGE,
                },
            ],
        })) as IQueryFeaturesResponse;

        console.log(res);
    } catch (err) {
        console.log(err);
    }

    return null;
};

export const getHistoricalLandCoverDataBySubRegion = async (
    subRegionISOCode: string
): Promise<HistoricalLandCoverData[]> => {
    try {
        const res = (await queryFeatures({
            url: LAND_COVER_STATISTICS_SERVICE_URL,
            where: `${ISO_CODE}='${subRegionISOCode}'`,
            outFields: [
                COUNTRY,
                NAME,
                YEAR,
                WATER,
                TREE,
                FLOODED_VEG,
                CROPS,
                BUILT,
                BARE,
                SNOW,
                CLOUD,
                RANGE,
            ],
            orderByFields: YEAR,
        })) as IQueryFeaturesResponse;

        console.log(res);
    } catch (err) {
        console.log(err);
    }

    return null;
};
