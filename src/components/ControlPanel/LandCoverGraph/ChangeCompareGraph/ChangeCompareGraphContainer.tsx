import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {
    formatAreaPercentage,
    getLandCoverChangeInAcres,
    LandCoverChangeInAcres,
} from '../../../../services/sentinel-2-10m-landcover/computeHistograms';
import { getLandCoverClassificationShortName } from '../../../../services/sentinel-2-10m-landcover/rasterAttributeTable';
import {
    selectMapCenterAndZoom,
    selectMapExtent,
    selectMapMode,
    selectMapResolution,
    selectYearsForSwipeWidgetLayers,
} from '../../../../store/Map/selectors';
// import { showInfoPanelToggled } from '../../../../store/UI/reducer';
import { updateTooltipData } from '../../../../store/UI/thunks';
import {
    QuickD3ChartData,
    QuickD3ChartDataItem,
} from '../../../QuickD3Chart/types';
import ChangeCompareGraph from './ChangeCompareGraph';
// import { numberFns } from 'helper-toolkit-ts';
import {
    // DEFAULT_MAP_ZOOM,
    MIN_MAP_ZOOM_FOR_COMPUTE_HISTOGRAM,
} from '../../../../constants/map';
import { TooltipData } from '../../../../store/UI/reducer';
// import { abbreviateNumber } from '../../../../utils/number';

const ChangeCompareGraphContainer = () => {
    const dispatch = useDispatch();

    const { zoom } = useSelector(selectMapCenterAndZoom);

    const resolution = useSelector(selectMapResolution);

    const extent = useSelector(selectMapExtent);

    const { year4LeadingLayer, year4TrailingLayer } = useSelector(
        selectYearsForSwipeWidgetLayers
    );

    const [chartData, setChartData] = useState<QuickD3ChartData>();

    const [landCoverChangeData, setLandCoverChangeData] =
        useState<LandCoverChangeInAcres[]>();

    const landCoverChangeDataRef = useRef<LandCoverChangeInAcres[]>();

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

        setLandCoverChangeData(res);
    };

    const getChartData = () => {
        const data: QuickD3ChartDataItem[] = landCoverChangeData.map((d) => {
            const {
                differenceInAcres,
                differenceInPercentage,
                landcoverClassificationData,
            } = d;

            const { ClassName, Description, Color } =
                landcoverClassificationData;

            const [R, G, B] = Color;

            // const formatedDiffInAcres = abbreviateNumber(differenceInAcres);

            return {
                key: getLandCoverClassificationShortName(ClassName),
                label: ClassName,
                value: differenceInPercentage,
                fill: `rgb(${R}, ${G}, ${B})`,
                labelOnTop:
                    differenceInAcres > 0
                        ? `+${differenceInPercentage}%`
                        : `${differenceInPercentage}%`,
            };
        });

        setChartData(data);
    };

    const openTooltipForItemOnHover = (idx: number) => {
        if (
            !landCoverChangeDataRef.current ||
            !landCoverChangeDataRef.current[idx]
        ) {
            dispatch(updateTooltipData(null));
            return;
        }

        const data = landCoverChangeDataRef.current[idx];

        const {
            landcoverClassificationData,
            // laterYearAreaInAcres,
            laterYearAreaInPercentage,
            // earlierYearAreaInAcres,
            earlierYearAreaInPercentage,
            // differenceInAcres,
            differenceInPercentage,
        } = data;

        const { ClassName } = landcoverClassificationData;

        const tooltipData = {
            title: ClassName,
            content: `${formatAreaPercentage(
                earlierYearAreaInPercentage
            )}% in ${year4LeadingLayer} and ${formatAreaPercentage(
                laterYearAreaInPercentage
            )}% in ${year4TrailingLayer}, a change of ${
                differenceInPercentage >= 0 ? '+' : ''
            }${formatAreaPercentage(
                differenceInPercentage
            )}%  of the total area.`,
        } as TooltipData;

        dispatch(updateTooltipData(tooltipData));
    };

    useEffect(() => {
        if (landCoverChangeData) {
            getChartData();
        }

        landCoverChangeDataRef.current = landCoverChangeData;
    }, [landCoverChangeData]);

    useEffect(() => {
        // if (zoom < MIN_MAP_ZOOM_FOR_COMPUTE_HISTOGRAM) {
        //     return;
        // }

        fetchData();
    }, [resolution, extent, year4LeadingLayer, year4TrailingLayer, zoom]);

    return (
        <ChangeCompareGraph
            data={chartData}
            itemOnHover={openTooltipForItemOnHover}
        />
    );
};

export default ChangeCompareGraphContainer;
