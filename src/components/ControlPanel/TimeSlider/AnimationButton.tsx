import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { animationModeToggled } from '../../../store/UI/reducer';
import { selectAnimationMode } from '../../../store/UI/selectors';

const AnimationButton = () => {
    const dispatch = useDispatch();

    const animationMode = useSelector(selectAnimationMode);

    return (
        <div
            onClick={() => {
                dispatch(animationModeToggled(!animationMode));
            }}
        >
            {animationMode ? 'pause' : 'play'}
        </div>
    );
};

export default AnimationButton;
