import React, { FC, useRef } from 'react';
import useGetTooltipPositionOnHover from '../../../../hooks/useGetTooltipPositionOnHover';
import { BarChartBasic } from '@vannizhang/react-d3-charts';
import { BarChartDataItem } from '@vannizhang/react-d3-charts/dist/BarChart/types';
// import BarChart from '../../../QuickD3Chart/BarChart/BarChart';
// import { MARGIN } from '../../../QuickD3Chart/constants';

// import DivergingBarChart from '../../../QuickD3Chart/DivergingBarChart/DivergingBarChart';
// import { QuickD3ChartData } from '../../../QuickD3Chart/types';

type Props = {
    data: BarChartDataItem[];
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
            // <BarChart
            //     data4Bars={data}
            //     showAxis={true}
            //     showLabelOnTop={true}
            //     showXAxisLine={true}
            //     // itemOnHover={itemOnHover}
            // />

            <BarChartBasic data={data} showStickyLabelText={true} />
        );
    };

    return (
        <div className="relative first-letter:w-full h-full" ref={containerRef}>
            {getContent()}
        </div>
    );
};

export default TotalAreaGraph;
