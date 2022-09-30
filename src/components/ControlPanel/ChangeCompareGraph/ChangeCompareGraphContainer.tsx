import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {
    getLandCoverChangeInAcres,
    LandCoverChangeInAcres,
} from '../../../services/sentinel-2-10m-landcover/computeHistograms';
import { getLandCoverClassificationShortName } from '../../../services/sentinel-2-10m-landcover/rasterAttributeTable';
import {
    selectMapExtent,
    selectMapResolution,
    selectYearsForSwipeWidgetLayers,
} from '../../../store/Map/selectors';
import { showInfoPanelToggled } from '../../../store/UI/reducer';
import { updateTooltipData } from '../../../store/UI/thunks';
import {
    QuickD3ChartData,
    QuickD3ChartDataItem,
} from '../../QuickD3Chart/types';
import ChangeCompareGraph from './ChangeCompareGraph';
import { numberFns } from 'helper-toolkit-ts';

const ChangeCompareGraphContainer = () => {
    const dispatch = useDispatch();

    const resolution = useSelector(selectMapResolution);

    const extent = useSelector(selectMapExtent);

    const { year4LeadingLayer, year4TrailingLayer } = useSelector(
        selectYearsForSwipeWidgetLayers
    );

    const [chartData, setChartData] = useState<QuickD3ChartData>();

    const [landCoverChangeData, setLandCoverChangeData] =
        useState<LandCoverChangeInAcres[]>();

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
            const { differenceInAcres, landcoverClassificationData } = d;

            const { ClassName, Description, Color } =
                landcoverClassificationData;

            const [R, G, B] = Color;

            return {
                key: getLandCoverClassificationShortName(ClassName),
                label: ClassName,
                value: differenceInAcres,
                fill: `rgb(${R}, ${G}, ${B})`,
                labelOnTop:
                    differenceInAcres > 0
                        ? '+' + differenceInAcres
                        : differenceInAcres.toString(),
            };
        });

        setChartData(data);
    };

    const openTooltipForItemOnHover = (idx: number) => {
        if (!landCoverChangeData || !landCoverChangeData[idx]) {
            dispatch(updateTooltipData(null));
            return;
        }

        const data = landCoverChangeData[idx];

        const {
            // landcoverClassificationData,
            laterYearAreaInAcres,
            earlierYearAreaInAcres,
            differenceInAcres,
        } = data;

        // const { ClassName } = landcoverClassificationData;

        const tooltipData = {
            content: `${numberFns.numberWithCommas(
                earlierYearAreaInAcres
            )} acres in ${year4LeadingLayer} and ${numberFns.numberWithCommas(
                laterYearAreaInAcres
            )} acres in ${year4TrailingLayer}, a change of ${
                differenceInAcres >= 0 ? '+' : ''
            }${numberFns.numberWithCommas(differenceInAcres)} acres`,
        };

        dispatch(updateTooltipData(tooltipData));
    };

    useEffect(() => {
        if (landCoverChangeData) {
            getChartData();
        }
    }, [landCoverChangeData]);

    useEffect(() => {
        fetchData();
    }, [resolution, extent, year4LeadingLayer, year4TrailingLayer]);

    return (
        <ChangeCompareGraph
            earlierYear={year4LeadingLayer}
            laterYear={year4TrailingLayer}
            data={chartData}
            openButtonOnClick={() => {
                dispatch(showInfoPanelToggled(true));
            }}
            itemOnHover={openTooltipForItemOnHover}
        />
    );
};

export default ChangeCompareGraphContainer;
