import React, { FC, useRef } from 'react';
import useGetTooltipPositionOnHover from '../../../../hooks/useGetTooltipPositionOnHover';
import { DivergingBarChart } from '@vannizhang/react-d3-charts';
import { DivergingBarChartDataItem } from '@vannizhang/react-d3-charts/dist/DivergingBarChart/types';

// import DivergingBarChart from '../../../QuickD3Chart/DivergingBarChart/DivergingBarChart';
// import { QuickD3ChartData } from '../../../QuickD3Chart/types';

type Props = {
    data: DivergingBarChartDataItem[];
    itemOnHover: (index: number) => void;
};

const ChangeCompareGraph: FC<Props> = ({ data, itemOnHover }: Props) => {
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
            <DivergingBarChart
                data={data}
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

export default ChangeCompareGraph;
