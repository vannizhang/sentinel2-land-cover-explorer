import React, { FC, useRef } from 'react';
import useGetTooltipPositionOnHover from '../../../../hooks/useGetTooltipPositionOnHover';
import BarChart from '../../../QuickD3Chart/BarChart/BarChart';
import { MARGIN } from '../../../QuickD3Chart/constants';

import DivergingBarChart from '../../../QuickD3Chart/DivergingBarChart/DivergingBarChart';
import { QuickD3ChartData } from '../../../QuickD3Chart/types';

type Props = {
    data: QuickD3ChartData;
    itemOnHover: (index: number) => void;
};

const TotalAreaGraph: FC<Props> = ({ data, itemOnHover }: Props) => {
    const containerRef = useRef<HTMLDivElement>();

    useGetTooltipPositionOnHover(containerRef);

    const getContent = () => {
        if (!data) {
            return (
                <div className="w-full flex justify-center items-center">
                    <calcite-loader active scale="s"></calcite-loader>
                </div>
            );
        }

        return (
            <BarChart
                data4Bars={data}
                showAxis={true}
                showLabelOnTop={true}
                showXAxisLine={true}
                // itemOnHover={itemOnHover}
            />
        );
    };

    return (
        <div className="relative first-letter:w-full h-full" ref={containerRef}>
            {getContent()}
        </div>
    );
};

export default TotalAreaGraph;
