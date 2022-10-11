import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { MIN_MAP_ZOOM_FOR_COMPUTE_HISTOGRAM } from '../../../constants/map';
import {
    selectMapCenterAndZoom,
    selectMapMode,
    selectYear,
    selectYearsForSwipeWidgetLayers,
} from '../../../store/Map/selectors';
import { showInfoPanelToggled } from '../../../store/UI/reducer';
import ChangeCompareGraph from './ChangeCompareGraph/ChangeCompareGraphContainer';
import HeaderText from '../HeaderText/HeaderText';
import TotalAreaGraph from './TotalAreaGraph/TotalAreaGraphContainer';
import { selectAnimationMode } from '../../../store/UI/selectors';

const LandCoverGraphContainer = () => {
    const dispatch = useDispatch();

    const mode = useSelector(selectMapMode);

    const { zoom } = useSelector(selectMapCenterAndZoom);

    const animationMode = useSelector(selectAnimationMode);

    const { year4LeadingLayer, year4TrailingLayer } = useSelector(
        selectYearsForSwipeWidgetLayers
    );

    const year = useSelector(selectYear);

    const outOfValidZoomLevel = zoom < MIN_MAP_ZOOM_FOR_COMPUTE_HISTOGRAM;

    const shouldShowChart = outOfValidZoomLevel === false && !animationMode;

    const getSubtitle = () => {
        if (mode === 'swipe') {
            return `from ${year4LeadingLayer} to ${year4TrailingLayer}`;
        }

        return `at ${year}`;
    };

    return (
        <div className="h-40 md:w-96 text-center mx-6 my-4 md:my-0">
            <HeaderText
                title={`${
                    mode === 'swipe'
                        ? 'Land Cover Change (Acres)'
                        : 'Land Cover Totals (Acres)'
                }`}
                subTitle={getSubtitle()}
                expandButtonOnClick={() => {
                    dispatch(showInfoPanelToggled(true));
                }}
            />

            {shouldShowChart === false && (
                <div className="w-full flex justify-center items-center text-sm opacity-50 mt-16">
                    {animationMode ? (
                        <p> Graph is disabled when animation is on</p>
                    ) : (
                        <p>
                            Zoom in to see Land Cover{' '}
                            {mode === 'swipe' ? 'Change' : 'Totals'} Graph
                        </p>
                    )}
                </div>
            )}

            {shouldShowChart && mode === 'swipe' && <ChangeCompareGraph />}

            {shouldShowChart && mode === 'step' && <TotalAreaGraph />}
        </div>
    );
};

export default LandCoverGraphContainer;
