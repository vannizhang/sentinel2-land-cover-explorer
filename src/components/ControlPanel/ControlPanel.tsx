import './ControlPanel.css';
import React from 'react';
import { useDispatch } from 'react-redux';
import { year4LeadingLayerUpdated } from '../../store/Map/reducer';
import ChangeCompareGraph from './ChangeCompareGraph/ChangeCompareGraphContainer';
import ClassificationsList from './ClassificationsList/ClassificationsListContainer';
import LayerSelector from './LayerSelector/LayerSelectorContainer';
import TimeSlider from './TimeSlider/TimeSliderContainer';

const ControlPanel = () => {
    const dispatch = useDispatch();

    return (
        <div className="control-panel absolute bottom-0 left-0 w-full h-56 z-10">
            <div className="control-panel-background absolute top-0 left-0 w-full h-full bg-custom-background"></div>
            <div className="relative w-full h-full p-2 flex text-custom-light-blue">
                <LayerSelector />
                <TimeSlider />
                <ClassificationsList />
                <ChangeCompareGraph />
            </div>
        </div>
    );
};

export default ControlPanel;
