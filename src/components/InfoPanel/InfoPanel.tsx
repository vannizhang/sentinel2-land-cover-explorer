import React, { useEffect, useState } from 'react';
import LandcoverGraph from './LandcoverGraph/LandcoverGraphContainer';
import { useSelector } from 'react-redux';
import { selectShowInfoPanel } from '../../store/UI/selectors';
import Header from './Header/Header';
import { useDispatch } from 'react-redux';
import { showInfoPanelToggled } from '../../store/UI/reducer';

import {
    getHistoricalLandCoverDataByClassification,
    HistoricalLandCoverData,
} from '../../services/sentinel-2-10m-landcover/computeHistograms';
import {
    selectMapExtent,
    selectMapResolution,
} from '../../store/Map/selectors';
import { QuickD3ChartData, QuickD3ChartDataItem } from '../QuickD3Chart/types';
import CountrySelector from './Header/CountrySelector';
import SubRegionSelector from './Header/SubRegionSelector';

// import { numberFns } from 'helper-toolkit-ts';
// import { saveHistoricalLandCoverDataAsCSV } from './helper';
// import { abbreviateNumber } from '../../utils/number';

const InfoPanel = () => {
    const dispatch = useDispatch();

    const showInfoPanel = useSelector(selectShowInfoPanel);

    const resolution = useSelector(selectMapResolution);

    const extent = useSelector(selectMapExtent);

    /**
     * If selected country is defined (and selectedSubRegion is not defined), show land cover stats for selected country
     */
    const [selectedCountry, setSelectedCountry] = useState<string>('');

    /**
     * If selected sub region is defined, show land cover stats for selected sub region
     */
    const [selectedSubRegion, setSelectedSubRegin] = useState<string>('');

    const [historicalLandCoverData, setHistoricalLandCoverData] =
        useState<HistoricalLandCoverData[]>();

    const [chartData, setChartData] = useState<QuickD3ChartData>();

    const [uniqueLandCoverClasses, setUniqueLandCoverClasses] = useState<
        string[]
    >([]);

    const loadHistoricalLandCoverData = async () => {
        try {
            const res = await getHistoricalLandCoverDataByClassification(
                extent,
                resolution
            );

            setHistoricalLandCoverData(res);
        } catch (err) {
            console.log(err);
        }
    };

    const getChartData = () => {
        const data: QuickD3ChartDataItem[] = [];

        const landcoverClassNames: string[] = [];

        for (const item of historicalLandCoverData) {
            const { areaByYear, landCoverClassificationData } = item;

            const numberOfYearsWithoutData = areaByYear.filter(
                (d) => d.area === 0
            ).length;

            if (
                numberOfYearsWithoutData === areaByYear.length ||
                landCoverClassificationData.ClassName === 'No Data'
            ) {
                continue;
            }

            const { ClassName, Color } = landCoverClassificationData;

            const [R, G, B] = Color;

            for (const { area, areaInPercentage, year } of areaByYear) {
                data.push({
                    key: `${ClassName}-${year}`,
                    value: area,
                    label: `${areaInPercentage}%`, //abbreviateNumber(area),
                    labelOnTop: year.toString(),
                    fill: `rgb(${R}, ${G}, ${B})`,
                });
            }

            landcoverClassNames.push(ClassName);
        }

        setChartData(data);

        setUniqueLandCoverClasses(landcoverClassNames);
    };

    useEffect(() => {
        // info panel is closed, clean the chart data
        if (!showInfoPanel) {
            setChartData(undefined);
            setUniqueLandCoverClasses(undefined);
            return;
        }

        if (resolution && extent && showInfoPanel) {
            loadHistoricalLandCoverData();
        }
    }, [resolution, extent, showInfoPanel]);

    useEffect(() => {
        if (historicalLandCoverData) {
            getChartData();
        }
    }, [historicalLandCoverData]);

    if (!showInfoPanel) {
        return null;
    }

    return (
        <div className="absolute top-0 left-0 w-screen h-screen flex justify-center items-center bg-custom-background-95 z-20">
            <div
                className="h-1/2 w-full px-10"
                style={{
                    maxWidth: 1600,
                }}
            >
                <Header
                    closeButtonOnClick={() => {
                        dispatch(showInfoPanelToggled(false));
                    }}
                >
                    <CountrySelector
                        selectedCountry={selectedCountry}
                        onChange={(val) => {
                            setSelectedCountry(val);

                            if (!val) {
                                setSelectedSubRegin('');
                            }
                        }}
                    />

                    {selectedCountry && (
                        <SubRegionSelector
                            selectedCountry={selectedCountry}
                            selectedSubRegion={selectedSubRegion}
                            onChange={setSelectedSubRegin}
                        />
                    )}
                </Header>

                <LandcoverGraph
                    chartData={chartData}
                    uniqueLandCoverClasses={uniqueLandCoverClasses}
                />
            </div>
        </div>
    );
};

export default InfoPanel;
