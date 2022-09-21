import React from 'react';
import { batch } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getAvailableYears } from '../../../services/sentinel-2-10m-landcover/timeInfo';
import {
    year4LeadingLayerUpdated,
    year4TrailingLayerUpdated,
} from '../../../store/Map/reducer';
import TimeSlider from './TimeSlider';

const TimeSliderContainer = () => {
    const dispatch = useDispatch();

    const years = getAvailableYears();

    return (
        <TimeSlider
            years={years}
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
