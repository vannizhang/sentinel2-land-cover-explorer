import './XAxis.css';
import React, { useEffect } from 'react';

import { select, axisBottom, timeFormat, AxisScale } from 'd3';

import { SvgContainerData } from '../types';

import { AXIS_TEXT_COLOR, AXIS_LINE_COLOR } from '../constants';
import { THEME_COLOR_LIGHT_BLUE } from '../../../constants/style';

type Props = {
    scale: AxisScale<string | number>;
    svgContainerData?: SvgContainerData;
    tickValues?: (string | number)[];
    timeFormatSpecifier?: string;
    showAxisLine?: boolean;
};

const YAxis: React.FC<Props> = ({
    scale,
    svgContainerData,
    tickValues,
    timeFormatSpecifier,
    showAxisLine,
}) => {
    // const containerGroup = useRef<SVGGElement>();

    const formatTime = timeFormatSpecifier
        ? timeFormat(timeFormatSpecifier)
        : null;

    const drawXAxis = () => {
        const { rootGroup, dimension } = svgContainerData;

        const { height } = dimension;

        let xAxisGenerator = null;

        xAxisGenerator = axisBottom(scale);

        if (tickValues) {
            xAxisGenerator.tickValues(tickValues);
        }

        if (formatTime) {
            xAxisGenerator.tickFormat((d: number) => {
                const date = new Date(+d);
                return formatTime(date);
            });
        }

        const xAxisLabel = select(rootGroup).selectAll('.x.axis');

        if (!xAxisLabel.size()) {
            select(rootGroup)
                .append('g')
                .attr('class', 'x axis')
                .attr('transform', `translate(0,${height})`)
                .call(xAxisGenerator);

            const xAxisG = select(rootGroup).select('.x.axis');

            xAxisG
                .selectAll('.domain, .tick line')
                .attr('opacity', 0.2)
                .attr(
                    'stroke',
                    showAxisLine ? THEME_COLOR_LIGHT_BLUE : 'tansparent'
                );

            xAxisG
                .selectAll('.tick text')
                .style('fill', AXIS_TEXT_COLOR)
                .attr('dy', '.75rem')
                // .attr('transform', 'rotate(-20)')
                .style('text-anchor', 'middle');
        } else {
            xAxisLabel
                .attr('transform', `translate(0,${height})`)
                .call(xAxisGenerator);
        }
    };

    useEffect(() => {
        if (svgContainerData) {
            drawXAxis();
        }
    }, [scale, svgContainerData]);

    return null;
};

export default YAxis;
