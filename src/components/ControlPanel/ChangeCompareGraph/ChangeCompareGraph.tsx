import React, { FC } from 'react';

import DivergingBarChart from '../../QuickD3Chart/DivergingBarChart/DivergingBarChart';
import { QuickD3ChartData } from '../../QuickD3Chart/types';
import HeaderText from '../HeaderText/HeaderText';

type Props = {
    earlierYear: number;
    laterYear: number;
    data: QuickD3ChartData;
};

const ChangeCompareGraph: FC<Props> = ({
    earlierYear,
    laterYear,
    data,
}: Props) => {
    return (
        <div className="h-40 md:w-96 text-center mx-6 mt-4 md:mt-0">
            <HeaderText
                text={`Land Cover Change (Acres) from ${earlierYear} to ${laterYear}`}
                openButtonOnClick={() => {
                    console.log('launch detailed chart');
                }}
            />

            {data ? (
                <DivergingBarChart
                    data4Bars={data}
                    showAxis={true}
                    showLabelOnTop={true}
                />
            ) : (
                <div className="w-full h-full flex justify-center items-center">
                    <calcite-loader active scale="s"></calcite-loader>
                </div>
            )}
        </div>
    );
};

export default ChangeCompareGraph;
