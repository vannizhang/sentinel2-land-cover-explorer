import './BarTextLabel.css';

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
    /**
     * If true, place the text label on top of chart container
     */
    stickToTop?: boolean;
    /**
     * If true, rotate label text
     */
    shouldRotate?: boolean;
};

const BarTextLabel: React.FC<Props> = ({
    xScale,
    yScale,
    data,
    svgContainerData,
    stickToTop,
    shouldRotate,
}) => {
    const barsLabelTextGroup = useRef<SVGGElement>();

    const draw = () => {
        const { dimension } = svgContainerData;

        // const { height } = dimension;

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
            // .attr('class', ()=>{
            //     return shouldRotate ? 'rotate' : ''
            // })
            .text(function (d) {
                if (stickToTop) {
                    return d.labelOnTop;
                }

                return d.label || d.value;
            })
            .attr('x', (d) => xScale(d.key) + xScale.bandwidth() / 2)
            .attr('y', (d) => {
                // use a fixed y value, no need to calculate y position
                if (stickToTop) {
                    return -10;
                }

                const yPos = yScale(d.value);

                // add this offset value to y position to make the text element not to overlap with the bar rect
                const yPosOffset = d.value < 0 ? 15 : -5;

                return yPos + yPosOffset;
            })
            .attr('font-size', '11px')
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

export default BarTextLabel;
