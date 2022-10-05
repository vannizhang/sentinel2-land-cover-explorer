import './style.css';
import React, { useRef, useEffect, FC, useMemo } from 'react';
// import ISlider from 'esri/widgets/Slider';
import ITimeSlider from 'esri/widgets/TimeSlider';
import IReactiveUtils from 'esri/core/reactiveUtils';
import { loadModules } from 'esri-loader';
import HeaderText from '../HeaderText/HeaderText';
import classNames from 'classnames';
import MonthPicker from './MonthPicker';

type Props = {
    /**
     * Available years
     *
     * @example
     * ```js
     * [2017, 2018, 2019, 2020, 2021]
     * ```
     */
    years: number[];
    /**
     * The time extent that will be used when initiate the time slider
     */
    initialTimeExtent?: {
        start: Date;
        end: Date;
    };
    /**
     * Visibility of Time Slider, no need to show this slider when is step mode, or viewing Sentinel-2 Imagery layer at zoom level 10 or less
     */
    visible?: boolean;
    /**
     * Fires when the time extent of the Time Slider is changed
     *
     * @param startYear new start year
     * @param endYear ned end year
     */
    timeExtentOnChange: (startYear: number, endYear: number) => void;
};

const TimeRangeSlider: FC<Props> = ({
    years,
    initialTimeExtent,
    visible,
    timeExtentOnChange,
}: Props) => {
    const containerRef = useRef<HTMLDivElement>();

    const sliderRef = useRef<ITimeSlider>();

    const debounceDelay = useRef<NodeJS.Timeout>();

    const init = async () => {
        type Modules = [typeof ITimeSlider, typeof IReactiveUtils];

        try {
            const [TimeSlider, reactiveUtils] = await (loadModules([
                'esri/widgets/TimeSlider',
                'esri/core/reactiveUtils',
            ]) as Promise<Modules>);

            // get an array of Date objects represent the input years, use Jan 1st as month and day when create the Date obj
            const yearsAsDateObj: Date[] = years.map((year) => {
                return new Date(year, 0, 1);
            });

            const startYear = years[0];
            const endYear = years[years.length - 1];

            sliderRef.current = new TimeSlider({
                container: containerRef.current,
                mode: 'time-window',
                fullTimeExtent: {
                    start: new Date(startYear, 0, 1),
                    end: new Date(endYear, 0, 1),
                },
                timeExtent: initialTimeExtent,
                stops: { dates: yearsAsDateObj },
                tickConfigs: [
                    {
                        mode: 'position',
                        values: yearsAsDateObj.map((year) => year.getTime()),
                        labelsVisible: true,
                        labelFormatFunction: (value: any) => {
                            return new Date(value).getUTCFullYear();
                        },
                    } as any,
                ],
                visible,
            });

            // console.log(sliderRef.current);

            reactiveUtils.watch(
                () => sliderRef.current.timeExtent,
                (timeExtent) => {
                    clearTimeout(debounceDelay.current);

                    debounceDelay.current = setTimeout(() => {
                        timeExtentOnChange(
                            timeExtent.start.getFullYear(),
                            timeExtent.end.getFullYear()
                        );
                    }, 500);
                }
            );

            // sliderRef.current.on('thumb-drag', (evt) => {
            //     clearTimeout(debounceDelay.current);

            // });
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        init();

        return () => {
            sliderRef.current.destroy();
            console.log(sliderRef.current.destroyed);
        };
    }, []);

    useEffect(() => {
        if (sliderRef.current) {
            sliderRef.current.visible = visible;
        }
    }, [visible]);

    return (
        <div
            id="timeSliderDiv"
            ref={containerRef}
            className={classNames('time-slider-container')}
        ></div>
    );
};

export default TimeRangeSlider;
