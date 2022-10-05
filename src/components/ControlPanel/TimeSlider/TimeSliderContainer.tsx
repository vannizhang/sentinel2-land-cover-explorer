import React, { useEffect } from 'react';
import { batch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getAvailableYears } from '../../../services/sentinel-2-10m-landcover/timeInfo';
import {
    year4LeadingLayerUpdated,
    year4TrailingLayerUpdated,
} from '../../../store/Map/reducer';
import {
    selectShouldSwipeWidgetBeDisabled,
    selectShouldShowSentinel2Layer,
    selectYearsForSwipeWidgetLayers,
} from '../../../store/Map/selectors';
import { saveTimeExtentToHashParams } from '../../../utils/URLHashParams';
import HeaderText from '../HeaderText/HeaderText';
import MonthPicker from './MonthPicker';
import TimeRangeSlider from './TimeRangeSlider';

const TimeSliderContainer = () => {
    const dispatch = useDispatch();

    const years = getAvailableYears();

    const shouldSwipeWidgetBeDisabled = useSelector(
        selectShouldSwipeWidgetBeDisabled
    );

    const shouldShowSentinel2Layer = useSelector(
        selectShouldShowSentinel2Layer
    );
    const { year4LeadingLayer, year4TrailingLayer } = useSelector(
        selectYearsForSwipeWidgetLayers
    );

    const shouldShowMonthPicker =
        shouldShowSentinel2Layer && shouldSwipeWidgetBeDisabled === false;

    const timeRangeSliderVisibility = shouldSwipeWidgetBeDisabled === false;

    useEffect(() => {
        saveTimeExtentToHashParams(year4LeadingLayer, year4TrailingLayer);
    }, [year4LeadingLayer, year4TrailingLayer]);

    return (
        <div className="text-center">
            <HeaderText
                title={`${
                    shouldShowSentinel2Layer
                        ? 'Sentinel-2 Imagery'
                        : '10m Land Cover'
                }`}
                subTitle={'Choose Two Years to Compare'}
            />

            <div className="relative max-w-md mt-2">
                <TimeRangeSlider
                    years={years}
                    initialTimeExtent={{
                        start: new Date(year4LeadingLayer, 0, 1),
                        end: new Date(year4TrailingLayer, 0, 1),
                    }}
                    visible={timeRangeSliderVisibility}
                    timeExtentOnChange={(startYear, endYear) => {
                        // console.log(startYear, endYear)

                        if (startYear === endYear) {
                            console.log(
                                'start year and end year cannot be same'
                            );
                            return;
                        }

                        batch(() => {
                            dispatch(year4LeadingLayerUpdated(startYear));
                            dispatch(year4TrailingLayerUpdated(endYear));
                        });
                    }}
                />

                {shouldShowMonthPicker && <MonthPicker />}
            </div>

            {shouldSwipeWidgetBeDisabled && (
                <div className="mt-16 text-center text-sm opacity-50">
                    <p>Zoom in to compare Sentinel-2 Imagery Layers</p>
                </div>
            )}
        </div>
    );
};

export default TimeSliderContainer;
