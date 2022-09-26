import React, { useRef, useEffect } from 'react';

import { select, ScaleBand, ScaleLinear } from 'd3';

import { BAR_COLOR } from '../constants';

import { QuickD3ChartData, SvgContainerData } from '../types';
import { THEME_COLOR_LIGHT_BLUE } from '../../../constants/style';

type Props = {
    xScale: ScaleBand<string | number>;
    yScale: ScaleLinear<number, number>;
    svgContainerData?: SvgContainerData;
    data: QuickD3ChartData;
};

/**
 * Add plus sign to numeric value
 *
 * @param val numberic value
 * @returns stirng
 */
const formatVal = (val: number) => {
    return val < 0 ? val.toString() : '+' + val;
};

const DivergingBarLabel: React.FC<Props> = ({
    xScale,
    yScale,
    data,
    svgContainerData,
}) => {
    const barsLabelTextGroup = useRef<SVGGElement>();

    const draw = () => {
        const { dimension } = svgContainerData;

        const { height } = dimension;

        const existingText = select(barsLabelTextGroup.current).selectAll(
            'text'
        );

        if (existingText.size()) {
            existingText.remove();
        }

        select(barsLabelTextGroup.current)
            .selectAll(`text`)
            .data(data)
            .enter()
            .append('text')
            .text(function (d) {
                return d.labelOnTop || formatVal(d.value);
            })
            .attr('x', (d) => xScale(d.key) + xScale.bandwidth() / 2)
            .attr('y', (d) => {
                return -10;
            })
            .attr('font-size', '10px')
            .attr('fill', THEME_COLOR_LIGHT_BLUE)
            .attr('text-anchor', 'middle');
    };

    useEffect(() => {
        if (svgContainerData && xScale && yScale && data) {
            draw();
        }
    }, [xScale, yScale, data]);

    return <g ref={barsLabelTextGroup} className="bar-label-text-group"></g>;
};

export default DivergingBarLabel;
