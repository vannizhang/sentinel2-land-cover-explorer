import classNames from 'classnames';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { modeChanged } from '../../../store/Map/reducer';
import { selectMapMode } from '../../../store/Map/selectors';

const BTN_CLASSNAMES =
    'p-1 mx-2 cursor-pointer uppercase border-custom-light-blue-80';

const ModeSelector = () => {
    const dispatch = useDispatch();

    const activeMode = useSelector(selectMapMode);

    const isSwipeBtnActive = activeMode === 'swipe';
    const isStepBtnActive = activeMode === 'step';

    return (
        <div className="flex justify-center text-xs mt-4">
            <div
                className={classNames(BTN_CLASSNAMES, {
                    'opacity-50': !isSwipeBtnActive,
                    'border-b': isSwipeBtnActive,
                })}
                onClick={() => {
                    dispatch(modeChanged('swipe'));
                }}
            >
                <span>swipe mode</span>
            </div>

            <div
                className={classNames(BTN_CLASSNAMES, {
                    'opacity-50': !isStepBtnActive,
                    'border-b': isStepBtnActive,
                })}
                onClick={() => {
                    dispatch(modeChanged('step'));
                }}
            >
                <span>step mode</span>
            </div>
        </div>
    );
};

export default ModeSelector;
