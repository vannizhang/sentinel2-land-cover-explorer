import React, { FC } from 'react';
import BarChart from '../../QuickD3Chart/BarChart/BarChart';
import { QuickD3ChartData } from '../../QuickD3Chart/types';

type Props = {
    data: QuickD3ChartData;
};

const LandcoverGraph: FC<Props> = ({ data }: Props) => {
    return (
        <div className="w-full h-full">
            {data ? (
                <BarChart
                    data4Bars={data}
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

export default LandcoverGraph;
