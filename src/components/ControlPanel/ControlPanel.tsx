import React from 'react';
import { useDispatch } from 'react-redux';
import { year4LeadingLayerUpdated } from '../../store/Map/reducer';
import ChangeCompareGraph from './ChangeCompareGraph/ChangeCompareGraphContainer';
import TimeSlider from './TimeSlider/TimeSliderContainer';

const ControlPanel = () => {
    const dispatch = useDispatch();

    return (
        <div className="absolute bottom-0 left-0 w-full h-56 bg-gray-900 text-white z-10 flex">
            <TimeSlider />
            <ChangeCompareGraph />
        </div>
    );
};

export default ControlPanel;
