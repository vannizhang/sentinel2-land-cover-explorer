import React, { FC, useEffect, useState } from 'react';

import { QuickD3ChartData } from '../../QuickD3Chart/types';

import BarChart from '../../QuickD3Chart/BarChart/BarChart';
import { getAvailableYears } from '../../../services/sentinel-2-10m-landcover/timeInfo';
import { MARGIN } from '../../QuickD3Chart/constants';

const margin = {
    ...MARGIN,
    bottom: 25,
};

type Props = {
    chartData: QuickD3ChartData;
    uniqueLandCoverClasses: string[];
};

const LandcoverGraphContainer: FC<Props> = ({
    chartData,
    uniqueLandCoverClasses,
}: Props) => {
    const years = getAvailableYears();

    if (!chartData) {
        return (
            <div
                className="w-full h-full flex justify-center items-center"
                style={{
                    height: '60vh',
                }}
            >
                <calcite-loader active scale="s"></calcite-loader>
            </div>
        );
    }

    return (
        <div
            className="relative w-full h-full overflow-x-auto"
            style={{
                minWidth: 1500,
                height: '50vh',
            }}
        >
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
                                        (1 / uniqueLandCoverClasses.length) *
                                        100
                                    }%`,
                                }}
                            >
                                <span>{className}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default LandcoverGraphContainer;
