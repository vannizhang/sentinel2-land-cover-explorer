import React, { useRef, useEffect } from 'react';

import { select, ScaleBand, ScaleLinear } from 'd3';

// import { BAR_COLOR } from '../constants';

import { QuickD3ChartData, SvgContainerData } from '../types';
import { THEME_COLOR_LIGHT_BLUE } from '../../../constants/style';

type Props = {
    xScale: ScaleBand<string | number>;
    yScale: ScaleLinear<number, number>;
    svgContainerData?: SvgContainerData;
    data: QuickD3ChartData;
    /**
     * use this value to adjust the style (height, opacity) of divider line to make it easier to separate groups visualy
     */
    numberOfBarsPerGroup?: number;
};

const VerticalDividerLine4Bars: React.FC<Props> = ({
    xScale,
    yScale,
    data,
    svgContainerData,
    numberOfBarsPerGroup = 1,
}) => {
    const groupRef = useRef<SVGGElement>();

    const draw = () => {
        const { dimension } = svgContainerData;

        const { height } = dimension;

        const existingText = select(groupRef.current).selectAll('line');

        if (existingText.size()) {
            existingText.remove();
        }

        const paddingOnX =
            (xScale.bandwidth() * (1 - xScale.paddingInner())) / 2;

        select(groupRef.current)
            .selectAll(`line`)
            .data(data)
            .enter()
            .append('line')
            .attr('x1', (d) => xScale(d.key) - paddingOnX)
            .attr('y1', (d, index) => {
                // return '.2';
                return index % numberOfBarsPerGroup === 0 ? -20 : 0;
            })
            .attr('x2', (d) => xScale(d.key) - paddingOnX)
            .attr('y2', height)
            .attr('stroke-width', 1)
            .attr('stroke', THEME_COLOR_LIGHT_BLUE)
            .style('opacity', (d, index) => {
                // return '.2';
                return index % numberOfBarsPerGroup === 0 ? '.6' : '.2';
            })
            .style('fill', 'none');
    };

    useEffect(() => {
        if (svgContainerData && xScale && yScale && data) {
            draw();
        }
    }, [xScale, yScale, data]);

    return <g ref={groupRef} className="bar-vertical-divider-lines-group"></g>;
};

export default VerticalDividerLine4Bars;
