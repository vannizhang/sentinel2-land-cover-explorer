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

import { numberFns } from 'helper-toolkit-ts';
import BarChart from '../../QuickD3Chart/BarChart/BarChart';
import { getAvailableYears } from '../../../services/sentinel-2-10m-landcover/timeInfo';

const LandcoverGraphContainer = () => {
    const resolution = useSelector(selectMapResolution);

    const extent = useSelector(selectMapExtent);

    const [chartData, setChartData] = useState<QuickD3ChartData>();

    const years = getAvailableYears();

    const loadChartData = async () => {
        try {
            const res = await getHistoricalLandCoverDataByClassification(
                extent,
                resolution
            );

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

    return (
        <div className="w-full h-full">
            {chartData ? (
                <BarChart
                    data4Bars={chartData}
                    numberOfBarsPerGroup={years.length}
                    showAxis={false}
                    showVerticalDividerLines={true}
                    showLabelOnTop={true}
                    showValueLabel={true}
                />
            ) : (
                <div className="w-full h-full flex justify-center items-center">
                    <calcite-loader active scale="s"></calcite-loader>
                </div>
            )}
        </div>
    );
};

export default LandcoverGraphContainer;
