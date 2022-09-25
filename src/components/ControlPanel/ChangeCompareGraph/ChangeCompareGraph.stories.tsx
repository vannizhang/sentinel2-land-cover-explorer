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

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
    margin: {
        left: 10,
        right: 10,
        top: 25,
        bottom: 25,
    },
    data4Bars: [
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
    ],
    showAxis: true,
    showVerticalDividerLines: true,
};
