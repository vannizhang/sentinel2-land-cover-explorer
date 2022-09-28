import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
    selectSwipePosition,
    selectYearsForSwipeWidgetLayers,
} from '../../store/Map/selectors';
import { selectShowSwipeWidgetYearIndicator } from '../../store/UI/selectors';

const SwipeWidgetReferenceInfo = () => {
    const position = useSelector(selectSwipePosition);

    const showSwipeWidgetYearIndicator = useSelector(
        selectShowSwipeWidgetYearIndicator
    );

    const isLoadingLeadingImageryLayer = false;
    const isLoadingTrailingImageryLayer = false;

    const [year4LeadingLayer, year4TrailingLayer] = useSelector(
        selectYearsForSwipeWidgetLayers
    );

    return (
        <div className="absolute top-0 left-0 bottom-control-panel-height w-full z-10 pointer-events-none ">
            <div
                className="absolute top-0 bottom-0 left-0 flex items-center"
                style={{
                    width: `${position}%`,
                }}
            >
                {isLoadingLeadingImageryLayer && (
                    <calcite-loader active scale="s"></calcite-loader>
                )}

                {showSwipeWidgetYearIndicator && (
                    <div className="bg-custom-background-850 text-custom-light-blue text-sm mr-8 py-1 px-2">
                        {year4LeadingLayer}
                    </div>
                )}
            </div>

            <div
                className="absolute top-0 bottom-0 right-0 flex items-center"
                style={{
                    width: `${100 - position}%`,
                }}
            >
                {showSwipeWidgetYearIndicator && (
                    <div className=" bg-custom-background-850 text-custom-light-blue text-sm ml-8 py-1 px-2">
                        {year4TrailingLayer}
                    </div>
                )}

                {isLoadingTrailingImageryLayer && (
                    <calcite-loader active scale="s"></calcite-loader>
                )}
            </div>
        </div>
    );
};

export default SwipeWidgetReferenceInfo;
