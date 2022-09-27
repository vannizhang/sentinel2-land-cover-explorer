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
import { MARGIN } from '../../QuickD3Chart/constants';

const margin = {
    ...MARGIN,
    bottom: 25,
};

const LandcoverGraphContainer = () => {
    const resolution = useSelector(selectMapResolution);

    const extent = useSelector(selectMapExtent);

    const [chartData, setChartData] = useState<QuickD3ChartData>();

    const [uniqueLandCoverClasses, setUniqueLandCoverClasses] = useState<
        string[]
    >([]);

    const years = getAvailableYears();

    const loadChartData = async () => {
        try {
            const res = await getHistoricalLandCoverDataByClassification(
                extent,
                resolution
            );

            const data: QuickD3ChartDataItem[] = [];

            const landcoverClassNames: string[] = [];

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

                landcoverClassNames.push(ClassName);
            }

            setChartData(data);

            setUniqueLandCoverClasses(landcoverClassNames);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (resolution && extent) {
            loadChartData();
        }
    }, [resolution, extent]);

    if (!chartData) {
        return (
            <div className="w-full h-full flex justify-center items-center">
                <calcite-loader active scale="s"></calcite-loader>
            </div>
        );
    }

    return (
        <div className="w-full h-full flex flex-col relative">
            <div className="grow">
                <BarChart
                    data4Bars={chartData}
                    numberOfBarsPerGroup={years.length}
                    showAxis={false}
                    showVerticalDividerLines={true}
                    showLabelOnTop={true}
                    showValueLabel={true}
                    margin={margin}
                />
            </div>

            <div
                className="w-full text-white flex"
                style={{
                    paddingLeft: margin.left,
                    paddingRight: margin.right,
                }}
            >
                {uniqueLandCoverClasses.map((className) => {
                    return (
                        <div
                            className="text-center text-custom-light-blue shrink-0 text-sm"
                            key={className}
                            style={{
                                width: `${
                                    (1 / uniqueLandCoverClasses.length) * 100
                                }%`,
                            }}
                        >
                            <span>{className}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default LandcoverGraphContainer;
