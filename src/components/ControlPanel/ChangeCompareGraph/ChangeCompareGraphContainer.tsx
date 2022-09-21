import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { computeHistograms } from '../../../services/sentinel-2-10m-landcover/computeHistograms';
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

    const data = useMemo(async () => {
        if (
            !resolution ||
            !extent ||
            !year4LeadingLayer ||
            !year4TrailingLayer
        ) {
            return undefined;
        }

        // const res = await computeHistograms({
        //     extent,
        //     resolution,
        //     year: year4LeadingLayer,
        // });

        // console.log(res);
    }, [resolution, extent, year4LeadingLayer, year4TrailingLayer]);

    return <div>ChangeCompareGraphContainer</div>;
};

export default ChangeCompareGraphContainer;
