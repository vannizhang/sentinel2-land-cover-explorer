import React, { FC } from 'react';

import DivergingBarChart from '../../QuickD3Chart/DivergingBarChart/DivergingBarChart';
import { QuickD3ChartData } from '../../QuickD3Chart/types';

type Props = {
    data: QuickD3ChartData;
};

const LandcoverGraph: FC<Props> = ({ data }: Props) => {
    return (
        <div className="">
            {data ? (
                <DivergingBarChart data4Bars={data} showAxis={true} />
            ) : (
                <div className="w-full h-full flex justify-center items-center">
                    <calcite-loader active scale="s"></calcite-loader>
                </div>
            )}
        </div>
    );
};

export default LandcoverGraph;
