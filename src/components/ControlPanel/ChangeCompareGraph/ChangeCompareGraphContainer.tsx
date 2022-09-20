import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import {
    selectMapExtent,
    selectMapResolution,
    selectYearsForSwipeWidgetLayers,
} from '../../../store/Map/selectors';

const ChangeCompareGraphContainer = () => {
    const resolution = useSelector(selectMapResolution);
    const extent = useSelector(selectMapExtent);
    const [year4LeadingLayer, year4TrailingLayer] = useSelector(
        selectYearsForSwipeWidgetLayers
    );

    const data = useMemo(() => {
        if (
            !resolution ||
            !extent ||
            !year4LeadingLayer ||
            !year4TrailingLayer
        ) {
            return undefined;
        }

        console.log(resolution, extent, year4LeadingLayer, year4TrailingLayer);
    }, [resolution, extent, year4LeadingLayer, year4TrailingLayer]);

    return <div>ChangeCompareGraphContainer</div>;
};

export default ChangeCompareGraphContainer;
