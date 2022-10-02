import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import BarChart from '../../QuickD3Chart/BarChart/BarChart';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Example/BarChart',
    component: BarChart,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {},
} as ComponentMeta<typeof BarChart>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof BarChart> = (args) => (
    <div className=" bg-gray-800 h-48 max-w-md">
        <BarChart {...args} />
    </div>
);

export const LandCoverByClassificationAndYear = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
LandCoverByClassificationAndYear.args = {
    margin: {
        left: 10,
        right: 10,
        top: 25,
        bottom: 25,
    },
    data4Bars: [
        {
            key: 'Water',
            value: 10,
            label: '10',
            labelOnTop: '2017',
            fill: 'blue',
        },
        {
            key: 'Water-2018',
            value: 20,
            label: '20',
            labelOnTop: '2018',
            fill: 'blue',
        },
        {
            key: 'Water-2019',
            value: 50,
            label: '50',
            labelOnTop: '2019',
            fill: 'blue',
        },
        {
            key: 'Trees',
            value: 100,
            label: '100',
            labelOnTop: '2017',
            fill: 'green',
        },
        {
            key: 'Trees-2018',
            value: 70,
            label: '70',
            labelOnTop: '2018',
            fill: 'green',
        },
        {
            key: 'Trees-2019',
            value: 5,
            label: '5',
            labelOnTop: '2019',
            fill: 'green',
        },
        {
            key: 'Built',
            value: 26,
            label: '26',
            labelOnTop: '2017',
            fill: 'red',
        },
        {
            key: 'Built-2018',
            value: 120,
            label: '120',
            labelOnTop: '2018',
            fill: 'red',
        },
        {
            key: 'Built-2019',
            value: 300,
            label: '300',
            labelOnTop: '2019',
            fill: 'red',
        },
    ],
    showAxis: false,
    showVerticalDividerLines: true,
    showLabelOnTop: true,
    showValueLabel: true,
};
