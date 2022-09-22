import React, { useRef, useEffect } from 'react';

import { select, ScaleBand, ScaleLinear } from 'd3';

import { BAR_COLOR } from '../constants';

import { QuickD3ChartData, SvgContainerData } from '../types';

type Props = {
    xScale: ScaleBand<string | number>;
    yScale: ScaleLinear<number, number>;
    svgContainerData?: SvgContainerData;
    data: QuickD3ChartData;
};

const DiveringBarBottomLabel: React.FC<Props> = ({
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
                return d.label;
            })
            .attr('x', (d) => xScale(d.key) + xScale.bandwidth() / 2)
            .attr('y', (d) => {
                return height;
            })
            .attr('font-size', '11px')
            .attr('fill', '#fff')
            .style('text-anchor', 'middle');
        // .attr("transform", "rotate(-65)");
        // .attr('y', (d) => yScale(d.value))
        // .attr('height', (d) => {
        //     return height - yScale(d.value);
        // });
    };

    useEffect(() => {
        if (svgContainerData && xScale && yScale && data) {
            draw();
        }
    }, [xScale, yScale, data]);

    return <g ref={barsLabelTextGroup} className="bar-label-text-group"></g>;
};

export default DiveringBarBottomLabel;
