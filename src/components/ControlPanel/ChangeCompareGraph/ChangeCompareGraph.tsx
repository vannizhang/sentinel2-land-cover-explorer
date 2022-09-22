import React from 'react';

import DivergingBarChart from '../../QuickD3Chart/DivergingBarChart/DivergingBarChart';

const fakeData = [
    {
        key: 2017,
        value: -50,
        label: 'Tree',
        fill: 'red',
    },
    {
        key: 2018,
        value: 20,
        label: 'Water',
        fill: 'blue',
    },
    {
        key: 2019,
        value: 50,
        label: 'Built Area',
        fill: 'green',
    },
    {
        key: 2020,
        value: 100,
        label: 'Flooded Vegetation',
        fill: 'orange',
    },
];

const ChangeCompareGraph = () => {
    return (
        <div className=" h- w-96">
            <DivergingBarChart
                // timeFormatSpecifier='%b %d'
                // barColor={BAR_COLOR}
                data4Bars={fakeData}
                showAxis={false}
            />
        </div>
    );
};

export default ChangeCompareGraph;
