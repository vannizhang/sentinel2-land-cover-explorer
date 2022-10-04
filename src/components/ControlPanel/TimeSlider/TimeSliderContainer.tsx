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
    selectShouldHideSwipeWidget,
    selectShouldShowSentinel2Layer,
    selectYearsForSwipeWidgetLayers,
} from '../../../store/Map/selectors';
import { saveTimeExtentToHashParams } from '../../../utils/URLHashParams';
import TimeSlider from './TimeSlider';

const TimeSliderContainer = () => {
    const dispatch = useDispatch();

    const years = getAvailableYears();

    const shouldHideSwipeWidget = useSelector(selectShouldHideSwipeWidget);

    const shouldShowSentinel2Layer = useSelector(
        selectShouldShowSentinel2Layer
    );
    const { year4LeadingLayer, year4TrailingLayer } = useSelector(
        selectYearsForSwipeWidgetLayers
    );

    useEffect(() => {
        saveTimeExtentToHashParams(year4LeadingLayer, year4TrailingLayer);
    }, [year4LeadingLayer, year4TrailingLayer]);

    return (
        <TimeSlider
            years={years}
            initialTimeExtent={{
                start: new Date(year4LeadingLayer, 0, 1),
                end: new Date(year4TrailingLayer, 0, 1),
            }}
            shouldShowSentinel2Layer={shouldShowSentinel2Layer}
            shouldDisableTimeSlider={shouldHideSwipeWidget}
            timeExtentOnChange={(startYear, endYear) => {
                // console.log(startYear, endYear)

                if (startYear === endYear) {
                    console.log('start year and end year cannot be same');
                    return;
                }

                batch(() => {
                    dispatch(year4LeadingLayerUpdated(startYear));
                    dispatch(year4TrailingLayerUpdated(endYear));
                });
            }}
        />
    );
};

export default TimeSliderContainer;
