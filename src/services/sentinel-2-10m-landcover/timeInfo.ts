import { addYears } from 'date-fns';
import { SENTINEL_2_LANDCOVER_10M_IMAGE_SERVICE_URL } from '../../constants/map';

type TimeInfo = {
    timeExtent: number[];
    defaultTimeInterval: number;
    defaultTimeIntervalUnits: string;
};

export type TimeExtentData = {
    /**
     * start time in unix time stampe
     */
    start: number;
    /**
     * end time in unix time stamp
     */
    end: number;
};

/**
 * Sentinel2_10m_LandCover's Time Info
 */
let timeInfo: TimeInfo;

/**
 * Load Time Info from Sentinel2_10m_LandCover's JSON
 *
 * https://env1.arcgis.com/arcgis/rest/services/Sentinel2_10m_LandCover/ImageServer?f=json
 * @returns
 */
const loadTimeInfo = async (): Promise<TimeInfo> => {
    const requestURL = SENTINEL_2_LANDCOVER_10M_IMAGE_SERVICE_URL + '?f=json';

    const res = await fetch(requestURL);

    const data = await res.json();

    return (timeInfo = data?.timeInfo);
};

/**
 * Get Time Extent data for Sentinel2_10m_LandCover that matches the input target year
 *
 * @param year
 * @returns
 */
export const getTimeExtentByYear = async (
    targetYear: number
): Promise<TimeExtentData> => {
    if (!timeInfo) {
        await loadTimeInfo();
    }

    const [startTimeInUnixTimestamp, endTimeInUnixTimestamp] =
        timeInfo.timeExtent;

    const fullYearFromStartTime = new Date(
        startTimeInUnixTimestamp
    ).getFullYear();
    const fullYearFromEndTime = new Date(endTimeInUnixTimestamp).getFullYear();

    // target year is smaller than layer's start time, use layer's start time instead
    if (targetYear <= fullYearFromStartTime) {
        return {
            start: startTimeInUnixTimestamp,
            end: startTimeInUnixTimestamp,
        };
    }

    // target year is bigger than layer's end time, use layer's end time instead
    if (targetYear >= fullYearFromEndTime) {
        return {
            start: endTimeInUnixTimestamp,
            end: endTimeInUnixTimestamp,
        };
    }

    const diffInYear = targetYear - fullYearFromStartTime;

    const targetYearInUnixTimestamp = addYears(
        startTimeInUnixTimestamp,
        diffInYear
    ).getTime();

    return {
        start: targetYearInUnixTimestamp,
        end: targetYearInUnixTimestamp,
    };
};
