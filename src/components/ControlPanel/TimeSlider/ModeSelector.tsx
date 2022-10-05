import classNames from 'classnames';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { modeChanged } from '../../../store/Map/reducer';
import { selectMapMode } from '../../../store/Map/selectors';
import { saveMapModeToHashParams } from '../../../utils/URLHashParams';

const BTN_CLASSNAMES =
    'p-1 mx-2 cursor-pointer uppercase border-custom-light-blue-80 flex items-center';

const ModeSelector = () => {
    const dispatch = useDispatch();

    const activeMode = useSelector(selectMapMode);

    const isSwipeBtnActive = activeMode === 'swipe';
    const isStepBtnActive = activeMode === 'step';

    useEffect(() => {
        saveMapModeToHashParams(activeMode);
    }, [activeMode]);

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
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    height="16"
                    width="16"
                >
                    <path
                        fill="currentColor"
                        d="M12 9v1.746L14.296 8.5 12 6.254V8h-2V2h6v13h-6V9zm-4 7h1V1H8zm-7-1h6v-1H2V3h5V2H1zm4-8.45L2.95 8.5 5 10.45V9h2V8H5z"
                    />
                    <path fill="none" d="M0 0h16v16H0z" />
                </svg>
                <span className="ml-1">swipe mode</span>
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
