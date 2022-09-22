import React, { FC } from 'react';

import DivergingBarChart from '../../QuickD3Chart/DivergingBarChart/DivergingBarChart';
import { QuickD3ChartData } from '../../QuickD3Chart/types';
import HeaderText from '../HeaderText/HeaderText';

const fakeData = [
    {
        key: 'Tree',
        value: -50,
        label: 'Tree',
        fill: 'red',
    },
    {
        key: 'Water',
        value: 20,
        label: 'Water',
        fill: 'blue',
    },
    {
        key: 'Built',
        value: 50,
        label: 'Built Area',
        fill: 'green',
    },
    {
        key: 'Flooded Veg',
        value: 100,
        label: 'Flooded Veg',
        fill: 'orange',
    },
    {
        key: 'Crops',
        value: -70,
        label: 'Crops',
        fill: 'blue',
    },
    {
        key: 'Bare Ground',
        value: 50,
        label: 'Bare Ground',
        fill: 'green',
    },
    {
        key: 'Snow/Ice',
        value: 100,
        label: 'Snow/Ice',
        fill: 'orange',
    },
];

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
        <div className="h-40 w-96 text-center mx-6">
            <HeaderText
                text={`Land Cover Change (Acres) from ${earlierYear} to ${laterYear}`}
            />

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

export default ChangeCompareGraph;
