import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { shouldShowSentinel2LayerToggled } from '../../../store/Map/reducer';
import { selectShouldShowSentinel2Layer } from '../../../store/Map/selectors';
import LayerSelector from './LayerSelector';

const LayerSelectorContainer = () => {
    const dispatch = useDispatch();

    const shouldShowSentinel2Layer = useSelector(
        selectShouldShowSentinel2Layer
    );

    return (
        <LayerSelector
            shouldShowSentinel2Layer={shouldShowSentinel2Layer}
            imageryButtonOnClick={() => {
                dispatch(shouldShowSentinel2LayerToggled(true));
            }}
            landcoverButtonOnClick={() => {
                dispatch(shouldShowSentinel2LayerToggled(false));
            }}
        />
    );
};

export default LayerSelectorContainer;
