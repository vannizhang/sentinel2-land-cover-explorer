import classNames from 'classnames';
import React, { useEffect } from 'react';
import { batch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getAvailableYears } from '../../../services/sentinel-2-10m-landcover/timeInfo';
import {
    year4LeadingLayerUpdated,
    year4TrailingLayerUpdated,
    yearUpdated,
} from '../../../store/Map/reducer';
import {
    selectIsFilterbyTime4Sentinel2LayerDisabled,
    selectMapMode,
    selectShouldShowSentinel2Layer,
    selectYear,
    selectYearsForSwipeWidgetLayers,
} from '../../../store/Map/selectors';
import { selectAnimationMode } from '../../../store/UI/selectors';
import {
    saveActiveYearToHashParams,
    saveTimeExtentToHashParams,
} from '../../../utils/URLHashParams';
import HeaderText from '../HeaderText/HeaderText';
import AnimationButton from './AnimationButton';
import ModeSelector from './ModeSelector';
import MonthPicker from './MonthPicker';
import TimeSliderWidget from './TimeSliderWidget';

const TimeSliderContainer = () => {
    const dispatch = useDispatch();

    const animationMode = useSelector(selectAnimationMode);

    const mode = useSelector(selectMapMode);

    const years = getAvailableYears();

    const isFilterbyTime4Sentinel2LayerDisabled = useSelector(
        selectIsFilterbyTime4Sentinel2LayerDisabled
    );

    const shouldShowSentinel2Layer = useSelector(
        selectShouldShowSentinel2Layer
    );
    const { year4LeadingLayer, year4TrailingLayer } = useSelector(
        selectYearsForSwipeWidgetLayers
    );

    const year = useSelector(selectYear);

    const shouldShowMonthPicker =
        shouldShowSentinel2Layer &&
        isFilterbyTime4Sentinel2LayerDisabled === false;

    const timeRangeSliderVisibility =
        mode === 'swipe' && isFilterbyTime4Sentinel2LayerDisabled === false;

    const timeStepSliderVisibility =
        mode === 'step' && isFilterbyTime4Sentinel2LayerDisabled === false;

    useEffect(() => {
        saveTimeExtentToHashParams(year4LeadingLayer, year4TrailingLayer);
    }, [year4LeadingLayer, year4TrailingLayer]);

    useEffect(() => {
        saveActiveYearToHashParams(mode === 'step' ? year : null);
    }, [year, mode]);

    return (
        <div className="text-center w-full lg:w-auto">
            <HeaderText
                title={`${
                    shouldShowSentinel2Layer
                        ? 'Sentinel-2 Imagery'
                        : '10m Land Cover'
                }`}
                subTitle={
                    mode === 'swipe'
                        ? 'Choose Two Years to Compare'
                        : 'Choose a Year to View'
                }
            />

            <ModeSelector disabled={animationMode !== null} />

            <div className={classNames('relative w-full md:max-w-md mt-2')}>
                <div
                    className={classNames('w-full', {
                        'pointer-events-none': animationMode !== null,
                    })}
                >
                    <TimeSliderWidget
                        years={years}
                        initialTimeExtent={{
                            start: new Date(year4LeadingLayer, 0, 1),
                            end: new Date(year4TrailingLayer, 0, 1),
                        }}
                        visible={timeRangeSliderVisibility}
                        timeExtentOnChange={(startYear, endYear) => {
                            // console.log(startYear, endYear)

                            if (startYear === endYear) {
                                console.log(
                                    'start year and end year cannot be same'
                                );
                                return;
                            }

                            batch(() => {
                                dispatch(year4LeadingLayerUpdated(startYear));
                                dispatch(year4TrailingLayerUpdated(endYear));
                            });
                        }}
                    />

                    <TimeSliderWidget
                        mode="instant"
                        years={years}
                        initialTimeExtent={{
                            start: new Date(year, 0, 1),
                            end: new Date(year, 0, 1),
                        }}
                        visible={timeStepSliderVisibility}
                        timeExtentOnChange={(startYear) => {
                            // console.log(startYear)

                            batch(() => {
                                dispatch(yearUpdated(startYear));
                            });
                        }}
                        selectedYear={year}
                    />
                </div>

                {isFilterbyTime4Sentinel2LayerDisabled === false && (
                    <div
                        className="absolute hidden lg:block"
                        style={{
                            right: -40,
                            bottom: 11,
                            width: 55,
                        }}
                    >
                        {mode === 'step' && (
                            <div className="mb-3">
                                <AnimationButton />
                            </div>
                        )}

                        <div
                            className="w-full"
                            style={{
                                height: 26,
                            }}
                        >
                            {shouldShowMonthPicker && (
                                <MonthPicker
                                    disabled={animationMode !== null}
                                />
                            )}
                        </div>
                    </div>
                )}
            </div>

            {isFilterbyTime4Sentinel2LayerDisabled && (
                <div className="mt-9 text-center text-sm opacity-50">
                    <p>
                        {mode === 'swipe'
                            ? 'Zoom in to compare Sentinel-2 Imagery Layers'
                            : 'Zoom in to enable time slider'}
                    </p>
                </div>
            )}
        </div>
    );
};

export default TimeSliderContainer;
