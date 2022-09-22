import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { getLandCoverChangeInAcres } from '../../../services/sentinel-2-10m-landcover/computeHistograms';
import { getLandCoverClassificationShortName } from '../../../services/sentinel-2-10m-landcover/rasterAttributeTable';
import {
    selectMapExtent,
    selectMapResolution,
    selectYearsForSwipeWidgetLayers,
} from '../../../store/Map/selectors';
import {
    QuickD3ChartData,
    QuickD3ChartDataItem,
} from '../../QuickD3Chart/types';
import ChangeCompareGraph from './ChangeCompareGraph';

const ChangeCompareGraphContainer = () => {
    const resolution = useSelector(selectMapResolution);

    const extent = useSelector(selectMapExtent);

    const [year4LeadingLayer, year4TrailingLayer] = useSelector(
        selectYearsForSwipeWidgetLayers
    );

    const [chartData, setChartData] = useState<QuickD3ChartData>();

    const fetchData = async (): Promise<void> => {
        if (
            !resolution ||
            !extent ||
            !year4LeadingLayer ||
            !year4TrailingLayer
        ) {
            return undefined;
        }

        const res = await getLandCoverChangeInAcres({
            extent,
            resolution,
            earlierYear: year4LeadingLayer,
            laterYear: year4TrailingLayer,
        });

        const data: QuickD3ChartDataItem[] = res.map((d) => {
            const { differenceInAcres, landcoverClassificationData } = d;

            const { ClassName, Description, Color } =
                landcoverClassificationData;

            const [R, G, B] = Color;

            return {
                key: getLandCoverClassificationShortName(ClassName),
                label: ClassName,
                value: differenceInAcres,
                fill: `rgb(${R}, ${G}, ${B})`,
            };
        });

        setChartData(data);
    };

    useEffect(() => {
        fetchData();
    }, [resolution, extent, year4LeadingLayer, year4TrailingLayer]);

    return (
        <ChangeCompareGraph
            earlierYear={year4LeadingLayer}
            laterYear={year4TrailingLayer}
            data={chartData}
        />
    );
};

export default ChangeCompareGraphContainer;
