import React from 'react';

import DivergingBarChart from '../../QuickD3Chart/DivergingBarChart/DivergingBarChart';

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

const ChangeCompareGraph = () => {
    return (
        <div className=" h- w-96">
            <DivergingBarChart
                // timeFormatSpecifier='%b %d'
                // barColor={BAR_COLOR}
                data4Bars={fakeData}
                showAxis={true}
            />
        </div>
    );
};

export default ChangeCompareGraph;
