import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getHistoricalLandCoverDataByClassification } from '../../../services/sentinel-2-10m-landcover/computeHistograms';
import {
    selectMapExtent,
    selectMapResolution,
} from '../../../store/Map/selectors';
import {
    QuickD3ChartData,
    QuickD3ChartDataItem,
} from '../../QuickD3Chart/types';
import LandcoverGraph from './LandcoverGraph';

import { numberFns } from 'helper-toolkit-ts';

const LandcoverGraphContainer = () => {
    const resolution = useSelector(selectMapResolution);

    const extent = useSelector(selectMapExtent);

    const [chartData, setChartData] = useState<QuickD3ChartData>();

    const loadChartData = async () => {
        try {
            const res = await getHistoricalLandCoverDataByClassification(
                extent,
                resolution
            );
            console.log(res);

            const data: QuickD3ChartDataItem[] = [];

            for (const item of res) {
                const { acresByYear, landCoverClassificationData } = item;

                const numberOfYearsWithoutData = acresByYear.filter(
                    (d) => d.value === 0
                ).length;

                if (
                    numberOfYearsWithoutData === acresByYear.length ||
                    landCoverClassificationData.ClassName === 'No Data'
                ) {
                    continue;
                }

                const { ClassName, Color } = landCoverClassificationData;

                const [R, G, B] = Color;

                for (const { value, year } of acresByYear) {
                    data.push({
                        key: `${ClassName}-${year}`,
                        value,
                        label: numberFns.abbreviateNumber(value),
                        labelOnTop: year.toString(),
                        fill: `rgb(${R}, ${G}, ${B})`,
                    });
                }
            }

            setChartData(data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (resolution && extent) {
            loadChartData();
        }
    }, [resolution, extent]);

    return <LandcoverGraph data={chartData} />;
};

export default LandcoverGraphContainer;
