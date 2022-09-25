import React, { useRef, useEffect } from 'react';

import { select, ScaleBand, ScaleLinear, ScaleTime } from 'd3';

import { SvgContainerData } from '../types';
import { THEME_COLOR_LIGHT_BLUE } from '../../../constants/style';

export type PointerPositionOnHover = {
    // index of the item on hover
    index4ItemOnHover: number;
    // position on x axis for the item on hover
    xPosition: number;
};

type Props = {
    xScale:
        | ScaleBand<string | number>
        | ScaleLinear<number, number>
        | ScaleTime<number, number>;
    yScale: ScaleLinear<number, number>;
    xDomain?: (string | number)[];
    svgContainerData?: SvgContainerData;
};

const HorizontalDividerLine4DivergingBars: React.FC<Props> = ({
    yScale,
    svgContainerData,
}) => {
    const containerG = useRef<SVGGElement>();

    const init = () => {
        const { dimension } = svgContainerData;

        const { width } = dimension;

        const container = select(containerG.current);

        const refLine = container.selectAll('line');

        if (!refLine.size()) {
            container
                .append('line')
                .attr('x1', -10)
                .attr('y1', yScale(0))
                .attr('x2', width + 10)
                .attr('y2', yScale(0))
                .attr('stroke-width', 1)
                .attr('stroke', THEME_COLOR_LIGHT_BLUE)
                .style('opacity', '.2')
                .style('fill', 'none');
        }
    };

    useEffect(() => {
        if (svgContainerData) {
            init();
        }
    }, [svgContainerData]);

    return <g className="divider-line-group" ref={containerG} />;
};

export default HorizontalDividerLine4DivergingBars;
