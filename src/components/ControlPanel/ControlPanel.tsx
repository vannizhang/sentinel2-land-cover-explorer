import './ControlPanel.css';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { year4LeadingLayerUpdated } from '../../store/Map/reducer';
import ChangeCompareGraph from './ChangeCompareGraph/ChangeCompareGraphContainer';
import ClassificationsList from './ClassificationsList/ClassificationsListContainer';
import LayerSelector from './LayerSelector/LayerSelectorContainer';
import TimeSlider from './TimeSlider/TimeSliderContainer';
import { selectShouldShowSentinel2Layer } from '../../store/Map/selectors';
import Tooltip from './Tooltip/TooltipContainer';
import ToggleButton from './ToggleButton/ToggleButtonContainer';
import { selectShouldHideControlPanel } from '../../store/UI/selectors';
import ActionBar from './ActionBar/ActionBar';
import Sentinel2LayerRasterFunctionsList from './Sentinel2LayerRasterFunctionsList/Sentinel2LayerRasterFunctionsListContainer';

const ControlPanel = () => {
    // const dispatch = useDispatch();

    const hideControlPanel = useSelector(selectShouldHideControlPanel);

    const shouldShowSentinel2Layer = useSelector(
        selectShouldShowSentinel2Layer
    );

    return (
        <>
            {hideControlPanel === false && (
                <div className="control-panel absolute bottom-0 left-0 w-full h-control-panel-height z-10">
                    <div className="theme-background absolute top-0 left-0 w-full h-full"></div>

                    <div className="control-panel-top-shadow absolute top-0 left-0 w-full"></div>

                    <div className="relative w-full h-full p-2 pt-4 md:flex text-custom-light-blue justify-around overflow-y-auto z-10">
                        <div className="flex">
                            <LayerSelector />
                            <TimeSlider />
                        </div>

                        <div className="md:flex">
                            {shouldShowSentinel2Layer === false && (
                                <ClassificationsList />
                            )}

                            {shouldShowSentinel2Layer && (
                                <Sentinel2LayerRasterFunctionsList />
                            )}
                            <ChangeCompareGraph />
                        </div>
                    </div>

                    <Tooltip />

                    <ActionBar />
                </div>
            )}

            <ToggleButton />
        </>
    );
};

export default ControlPanel;
