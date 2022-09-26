import './ControlPanel.css';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { year4LeadingLayerUpdated } from '../../store/Map/reducer';
import ChangeCompareGraph from './ChangeCompareGraph/ChangeCompareGraphContainer';
import ClassificationsList from './ClassificationsList/ClassificationsListContainer';
import LayerSelector from './LayerSelector/LayerSelectorContainer';
import TimeSlider from './TimeSlider/TimeSliderContainer';
import { selectShouldShowSentinel2Layer } from '../../store/Map/selectors';

const ControlPanel = () => {
    // const dispatch = useDispatch();

    const shouldShowSentinel2Layer = useSelector(
        selectShouldShowSentinel2Layer
    );

    return (
        <div className="control-panel absolute bottom-0 left-0 w-full h-control-panel-height z-10">
            <div className="control-panel-background absolute top-0 left-0 w-full h-full bg-custom-background"></div>
            <div className="relative w-full h-full p-2 pt-4 md:flex text-custom-light-blue justify-between overflow-y-auto">
                <div className="flex">
                    <LayerSelector />
                    <TimeSlider />
                </div>

                <div className="md:flex">
                    {shouldShowSentinel2Layer === false && (
                        <ClassificationsList />
                    )}
                    <ChangeCompareGraph />
                </div>
            </div>
        </div>
    );
};

export default ControlPanel;
