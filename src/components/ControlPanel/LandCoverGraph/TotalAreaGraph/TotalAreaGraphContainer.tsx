import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {
    getLandCoverAreaByYear,
    // getLandCoverChangeInAcres,
    LandCoverArea,
} from '@landcover-explorer/services/sentinel-2-10m-landcover/computeHistograms';
import { getLandCoverClassificationShortName } from '@landcover-explorer/services/sentinel-2-10m-landcover/rasterAttributeTable';
import {
    selectMapCenterAndZoom,
    selectMapExtent,
    // selectMapMode,
    selectMapResolution,
    selectYear,
    // selectYearsForSwipeWidgetLayers,
} from '@landcover-explorer/store/Map/selectors';
// import { showInfoPanelToggled } from '@landcover-explorer/store/UI/reducer';
import { updateTooltipData } from '@landcover-explorer/store/UI/thunks';
// import {
//     QuickD3ChartData,
//     QuickD3ChartDataItem,
// } from '@landcover-explorer/QuickD3Chart/types';
import TotalsGraph from './TotalAreaGraph';
import { numberFns } from 'helper-toolkit-ts';
// import {
//     DEFAULT_MAP_ZOOM,
//     MIN_MAP_ZOOM_FOR_COMPUTE_HISTOGRAM,
// } from '@landcover-explorer/constants/map';
// import { abbreviateNumber } from '@landcover-explorer/utils/number';
import { BarChartDataItem } from '@vannizhang/react-d3-charts/dist/BarChart/types';

const TotalAreaGraphContainer = () => {
    const dispatch = useDispatch();

    const { zoom } = useSelector(selectMapCenterAndZoom);

    const resolution = useSelector(selectMapResolution);

    const extent = useSelector(selectMapExtent);

    const year = useSelector(selectYear);

    const [chartData, setChartData] = useState<BarChartDataItem[]>();

    const [landCoverTotalsData, setLandCoverTotalsData] =
        useState<LandCoverArea[]>();

    const landCoverTotalsDataRef = useRef<LandCoverArea[]>();

    const fetchData = async (): Promise<void> => {
        if (!resolution || !extent || !year) {
            return undefined;
        }

        try {
            const res = await getLandCoverAreaByYear({
                extent,
                resolution,
                year,
            });

            setLandCoverTotalsData(res);
        } catch (err) {
            console.log(err);
        }

        // setLandCoverChangeData(res);
    };

    const getChartData = () => {
        const data: BarChartDataItem[] = landCoverTotalsData.map((d) => {
            const { area, areaInPercentage, landcoverClassificationData } = d;

            const { ClassName, Description, Color } =
                landcoverClassificationData;

            const [R, G, B] = Color;

            // const formatedArea = abbreviateNumber(area);

            return {
                x: getLandCoverClassificationShortName(ClassName),
                y: area,
                fill: `rgb(${R}, ${G}, ${B})`,
                label: ClassName,
                labelOnTop: `${areaInPercentage}%`,
            };
        });

        setChartData(data);
    };

    const openTooltipForItemOnHover = (idx: number) => {
        if (
            !landCoverTotalsDataRef.current ||
            !landCoverTotalsDataRef.current[idx]
        ) {
            dispatch(updateTooltipData(null));
            return;
        }

        const data = landCoverTotalsDataRef.current[idx];

        const { area } = data;

        // const { ClassName } = landcoverClassificationData;

        const tooltipData = {
            content: `${numberFns.numberWithCommas(area)} acres in ${year}`,
        };

        dispatch(updateTooltipData(tooltipData));
    };

    useEffect(() => {
        if (landCoverTotalsData) {
            getChartData();
        }

        landCoverTotalsDataRef.current = landCoverTotalsData;
    }, [landCoverTotalsData]);

    useEffect(() => {
        // if (zoom < MIN_MAP_ZOOM_FOR_COMPUTE_HISTOGRAM) {
        //     return;
        // }

        fetchData();
    }, [resolution, extent, year, zoom]);

    return (
        <TotalsGraph data={chartData} itemOnHover={openTooltipForItemOnHover} />
    );
};

export default TotalAreaGraphContainer;
