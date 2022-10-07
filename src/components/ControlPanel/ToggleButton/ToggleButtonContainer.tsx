import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { hideControlPanelToggled } from '../../../store/UI/reducer';
import {
    selectAnimationMode,
    selectShouldHideControlPanel,
} from '../../../store/UI/selectors';
import ToggleButton from './ToggleButton';

const ToggleButtonContainer = () => {
    const dispatch = useDispatch();

    const animationMode = useSelector(selectAnimationMode);

    const hideControlPanel = useSelector(selectShouldHideControlPanel);

    if (animationMode) {
        return null;
    }

    return (
        <ToggleButton
            hideControlPanel={hideControlPanel}
            onClickHandler={() => {
                dispatch(hideControlPanelToggled());
            }}
        />
    );
};

export default ToggleButtonContainer;
