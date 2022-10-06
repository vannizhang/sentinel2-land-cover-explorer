import { SENTINEL_2_LANDCOVER_10M_IMAGE_SERVICE_URL } from './config';
import { MapExtent } from '../../store/Map/reducer';
import { DEFAULT_RENDERING_RULE } from './config';
import {
    getDistinctLandCoverClassificationPixelValues,
    getLandCoverClassificationByPixelValue,
    LandcoverClassificationData,
} from './rasterAttributeTable';
import { getAvailableYears } from './timeInfo';

type ComputeHistogramsParams = {
    extent: MapExtent;
    resolution: number;
    year: number;
};

type Histogram = {
    size: number;
    min: number;
    /**
     *
     */
    max: number;
    /**
     * counts of pxiels in each classification
     */
    counts: number[];
};

type ComputeHistogramsResponse = {
    histograms: Histogram[];
};

type GetLandCoverChangeParams = {
    /**
     * Map Extent to be used as input geomerty
     */
    extent: MapExtent;
    /**
     * Map resolution
     */
    resolution: number;
    /**
     * the year that is earlier than the later year
     */
    earlierYear: number;
    /**
     * the year that is later than the earlier year
     */
    laterYear: number;
};

type GetLandCoverAreaInAcresByYearParams = {
    /**
     * Map Extent to be used as input geomerty
     */
    extent: MapExtent;
    /**
     * Map resolution
     */
    resolution: number;
    /**
     * the year that will be used to query land cover data
     */
    year: number;
};

export type LandCoverChangeInAcres = {
    /**
     * Area (in acres) of a specific land cover in earlier year
     */
    earlierYearAreaInAcres: number;
    /**
     * Area (in acres) of a specific land cover in later year
     */
    laterYearAreaInAcres: number;
    /**
     * Difference (in acres) of a specific land cover type between two years
     */
    differenceInAcres: number;
    /**
     * Detailed Land Cover Classification Data
     */
    landcoverClassificationData: LandcoverClassificationData;
};

export type LandCoverArea = {
    /**
     * area (in acres) of a specific land cover type between two years
     */
    area: number;
    /**
     * Detailed Land Cover Classification Data
     */
    landcoverClassificationData: LandcoverClassificationData;
};

type AcresByYear = {
    year: number;
    value: number;
};

export type HistoricalLandCoverData = {
    /**
     * area of a specific land cover classification in acres by year
     */
    acresByYear: AcresByYear[];
    /**
     * data of a specific land cover
     */
    landCoverClassificationData: LandcoverClassificationData;
};

/**
 * There are 4046.8564224 square meters in 1 acre
 */
const SQUARE_METERS_IN_ONE_ACRE = 4047;

/**
 * 1 square meter equals to 0.000247105 acre
 */
const ACRE_PER_SQ_METER = 0.000247105;

/**
 * get acres per pxiel based on the current map resolution,
 * and we can then multiple this number by total number of pixels to get the area in acres
 *
 * @param count count of pixels
 * @param pixelSizeInMeters use resolution of map view as pixel size in meters
 * @returns
 */
export const convertNumOfPixel2Acres = (
    count: number,
    pixelSizeInMeters: number
): number => {
    const squareMetersPerPixel = pixelSizeInMeters ** 2;
    const acresPerPixel = squareMetersPerPixel * ACRE_PER_SQ_METER;
    return Math.round(count * acresPerPixel);
};

/**
 * Computes histograms based on the provided params, the result of this operation contains histograms computed for the given extent.
 *
 * https://developers.arcgis.com/rest/services-reference/enterprise/compute-histograms.htm
 *
 */
const computeHistograms = async ({
    extent,
    resolution,
    year,
}: ComputeHistogramsParams): Promise<ComputeHistogramsResponse> => {
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

        const data = (await res.json()) as ComputeHistogramsResponse;

        return data;
    } catch (err) {
        console.log(err);
    }

    return null;
};

export const getLandCoverAreaByYear = async ({
    extent,
    resolution,
    year,
}: GetLandCoverAreaInAcresByYearParams): Promise<LandCoverArea[]> => {
    try {
        const res = await computeHistograms({
            extent,
            resolution,
            year,
        });

        const counts = res?.histograms[0]?.counts || [];

        const output: LandCoverArea[] = [];

        for (let i = 0; i < counts.length; i++) {
            const areaInAcres = convertNumOfPixel2Acres(counts[i], resolution);

            if (areaInAcres < 1) {
                continue;
            }

            output.push({
                area: areaInAcres,
                landcoverClassificationData:
                    getLandCoverClassificationByPixelValue(i),
            });
        }

        return output;
    } catch (err) {
        console.log(err);
        return null;
    }
};

/**
 * Compute histograms for ealier and later years, then calculate difference in each land cover classification
 * between these two years and convert the number in acres.
 */
export const getLandCoverChangeInAcres = async ({
    extent,
    resolution,
    earlierYear,
    laterYear,
}: GetLandCoverChangeParams): Promise<LandCoverChangeInAcres[]> => {
    try {
        const histograms4EarlierYear = await computeHistograms({
            extent,
            resolution,
            year: earlierYear,
        });

        const histograms4LaterYear = await computeHistograms({
            extent,
            resolution,
            year: laterYear,
        });

        const countsFromEarlierYear =
            histograms4EarlierYear?.histograms[0]?.counts || [];
        const countsFromLaterYear =
            histograms4LaterYear?.histograms[0]?.counts || [];

        const output: LandCoverChangeInAcres[] = [];

        for (let i = 0; i < countsFromEarlierYear.length; i++) {
            const countEarlierYear = countsFromEarlierYear[i];
            const countLaterYear = countsFromLaterYear[i];

            // diff in number of pixels
            const diff = countLaterYear - countEarlierYear;

            // convert difference in number of pixels to acres
            const diffInAcres = convertNumOfPixel2Acres(diff, resolution);

            if (Math.abs(diffInAcres) < 1) {
                continue;
            }

            output.push({
                landcoverClassificationData:
                    getLandCoverClassificationByPixelValue(i),
                earlierYearAreaInAcres: convertNumOfPixel2Acres(
                    countEarlierYear,
                    resolution
                ),
                laterYearAreaInAcres: convertNumOfPixel2Acres(
                    countLaterYear,
                    resolution
                ),
                differenceInAcres: diffInAcres,
            });
        }

        return output;
    } catch (err) {
        console.log('failed to getLandCoverChangeInAcres', err);
        return null;
    }
};

export const getHistoricalLandCoverDataByClassification = async (
    extent: MapExtent,
    resolution: number
): Promise<HistoricalLandCoverData[]> => {
    const availableYears = getAvailableYears();

    const distinctLandCoverClassificationPixelValues =
        getDistinctLandCoverClassificationPixelValues();

    const historicalLandCoverDataByLandCoverId = new Map<
        number,
        HistoricalLandCoverData
    >();

    for (const pixelValue of distinctLandCoverClassificationPixelValues) {
        const acresByYear: AcresByYear[] = availableYears.map((year) => {
            return {
                year,
                value: 0,
            };
        });

        historicalLandCoverDataByLandCoverId.set(pixelValue, {
            acresByYear,
            landCoverClassificationData:
                getLandCoverClassificationByPixelValue(pixelValue),
        });
    }

    try {
        const computeHistogramsRequest = availableYears.map((year) => {
            return computeHistograms({
                extent,
                resolution,
                year,
            });
        });

        const computeHistogramsResults = await Promise.all(
            computeHistogramsRequest
        );

        for (let i = 0; i < availableYears.length; i++) {
            const result: ComputeHistogramsResponse =
                computeHistogramsResults[i];

            const counts = result.histograms[0].counts;

            for (let j = 0; j < counts.length; j++) {
                if (historicalLandCoverDataByLandCoverId.has(j) === false) {
                    continue;
                }

                const numOfPixels = counts[j];
                historicalLandCoverDataByLandCoverId.get(j).acresByYear[
                    i
                ].value = convertNumOfPixel2Acres(numOfPixels, resolution);
            }
        }

        return [...historicalLandCoverDataByLandCoverId.values()];
    } catch (err) {
        console.log('failed to getLandCoverChangeInAcres', err);
        return null;
    }
};
