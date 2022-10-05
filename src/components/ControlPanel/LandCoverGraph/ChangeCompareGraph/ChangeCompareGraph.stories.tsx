import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import DivergingBarChart from '../../../QuickD3Chart/DivergingBarChart/DivergingBarChart';

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

export const LandCoverByClassification = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
LandCoverByClassification.args = {
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
            fill: 'blue',
            labelOnTop: '-50',
        },
        // {
        //     key: 'Water-2018',
        //     value: 20,
        //     label: 'Water',
        //     fill: 'blue',
        // },
        // {
        //     key: 'Water-2019',
        //     value: 50,
        //     label: 'Water',
        //     fill: 'blue',
        // },
        {
            key: 'Trees',
            value: 100,
            label: 'Trees',
            fill: 'green',
            labelOnTop: '+100',
        },
        // {
        //     key: 'Trees-2018',
        //     value: -70,
        //     label: 'Trees',
        //     fill: 'green',
        // },
        // {
        //     key: 'Trees-2019',
        //     value: 50,
        //     label: 'Trees',
        //     fill: 'green',
        // },
        {
            key: 'Built',
            value: 50,
            label: 'Built',
            fill: 'red',
            labelOnTop: '+50',
        },
        // {
        //     key: 'Built-2018',
        //     value: -70,
        //     label: 'Built',
        //     fill: 'red',
        // },
        // {
        //     key: 'Built-2019',
        //     value: 300,
        //     label: 'Built',
        //     fill: 'red',
        // }
    ],
    showAxis: true,
    showVerticalDividerLines: false,
    showLabelOnTop: true,
};
