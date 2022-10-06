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

const LandCoverGraphContainer = () => {
    const dispatch = useDispatch();

    const mode = useSelector(selectMapMode);

    const { zoom } = useSelector(selectMapCenterAndZoom);

    const { year4LeadingLayer, year4TrailingLayer } = useSelector(
        selectYearsForSwipeWidgetLayers
    );

    const year = useSelector(selectYear);

    const outOfValidZoomLevel = zoom < MIN_MAP_ZOOM_FOR_COMPUTE_HISTOGRAM;

    const getSubtitle = () => {
        if (mode === 'swipe') {
            return `from ${year4LeadingLayer} to ${year4TrailingLayer}`;
        }

        return `at ${year}`;
    };

    return (
        <div className="h-40 md:w-96 text-center mx-6 mt-4 md:mt-0">
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

            {outOfValidZoomLevel && (
                <div className="w-full flex justify-center items-center text-sm opacity-50 mt-16">
                    <p>
                        Zoom in to see Land Cover{' '}
                        {mode === 'swipe' ? 'Change' : 'Totals'} Graph
                    </p>
                </div>
            )}

            {outOfValidZoomLevel === false && mode === 'swipe' && (
                <ChangeCompareGraph />
            )}

            {outOfValidZoomLevel === false && mode === 'step' && (
                <TotalAreaGraph />
            )}
        </div>
    );
};

export default LandCoverGraphContainer;
