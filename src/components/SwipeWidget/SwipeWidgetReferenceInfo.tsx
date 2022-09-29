import classNames from 'classnames';
import React, { useEffect, FC } from 'react';
import { useSelector } from 'react-redux';
import {
    selectShouldShowSentinel2Layer,
    selectSwipePosition,
    selectYearsForSwipeWidgetLayers,
} from '../../store/Map/selectors';
import { selectShowSwipeWidgetYearIndicator } from '../../store/UI/selectors';

type Props = {
    /**
     * If true, map view is in process of update (e.g. fetch layer data, render layer)
     */
    isUpdating: boolean;
};

const SwipeWidgetReferenceInfo: FC<Props> = ({ isUpdating }: Props) => {
    const position = useSelector(selectSwipePosition);

    const showSwipeWidgetYearIndicator = useSelector(
        selectShowSwipeWidgetYearIndicator
    );

    const shouldShowSentinel2Layer = useSelector(
        selectShouldShowSentinel2Layer
    );

    const [year4LeadingLayer, year4TrailingLayer] = useSelector(
        selectYearsForSwipeWidgetLayers
    );

    return (
        <div
            className={classNames(
                'absolute top-0 bottom-0 left-0 w-full z-10 pointer-events-none'
            )}
        >
            <div
                className="absolute top-0 bottom-0 left-0 flex items-center"
                style={{
                    width: `${position}%`,
                }}
            >
                {isUpdating && shouldShowSentinel2Layer && (
                    <calcite-loader active scale="s"></calcite-loader>
                )}

                {showSwipeWidgetYearIndicator && (
                    <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-end">
                        <div className="relative theme-background-diagnol-pattern text-custom-light-blue text-sm mr-8 py-1 px-2">
                            {year4LeadingLayer}
                        </div>
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
                    <div className="relative theme-background-diagnol-pattern text-custom-light-blue text-sm ml-8 py-1 px-2">
                        {year4TrailingLayer}
                    </div>
                )}

                {isUpdating && shouldShowSentinel2Layer && (
                    <calcite-loader active scale="s"></calcite-loader>
                )}
            </div>
        </div>
    );
};

export default SwipeWidgetReferenceInfo;
