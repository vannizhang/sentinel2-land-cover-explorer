import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import DivergingBarChart from '../../QuickD3Chart/DivergingBarChart/DivergingBarChart';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Example/DivergingBarChart',
    component: DivergingBarChart,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {},
} as ComponentMeta<typeof DivergingBarChart>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof DivergingBarChart> = (args) => (
    <div className=" bg-gray-800 h-48 max-w-md">
        <DivergingBarChart {...args} />
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
            value: -50,
            label: 'Water',
            labelOnTop: '2017',
            fill: 'blue',
        },
        {
            key: 'Water-2018',
            value: 20,
            label: 'Water',
            labelOnTop: '2018',
            fill: 'blue',
        },
        {
            key: 'Water-2019',
            value: 50,
            label: 'Water',
            labelOnTop: '2019',
            fill: 'blue',
        },
        {
            key: 'Trees',
            value: 100,
            label: 'Trees',
            labelOnTop: '2017',
            fill: 'green',
        },
        {
            key: 'Trees-2018',
            value: -70,
            label: 'Trees',
            labelOnTop: '2018',
            fill: 'green',
        },
        {
            key: 'Trees-2019',
            value: 50,
            label: 'Trees',
            labelOnTop: '2019',
            fill: 'green',
        },
        {
            key: 'Built',
            value: 50,
            label: 'Built',
            labelOnTop: '2017',
            fill: 'red',
        },
        {
            key: 'Built-2018',
            value: -70,
            label: 'Built',
            labelOnTop: '2018',
            fill: 'red',
        },
        {
            key: 'Built-2019',
            value: 300,
            label: 'Built',
            labelOnTop: '2019',
            fill: 'red',
        },
    ],
    showAxis: false,
    showVerticalDividerLines: true,
};
