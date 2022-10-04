import './style.css';
import React, { useRef, useEffect, FC } from 'react';
// import ISlider from 'esri/widgets/Slider';
import ITimeSlider from 'esri/widgets/TimeSlider';
import IReactiveUtils from 'esri/core/reactiveUtils';
import { loadModules } from 'esri-loader';
import HeaderText from '../HeaderText/HeaderText';
import classNames from 'classnames';

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
     * If it is currently showing Sentinel 2 layer instead of Land Cover layer
     */
    shouldShowSentinel2Layer?: boolean;
    /**
     * If true, Time Slider will be hidden, need to do this when viewing Sentinel-2 Imagery layer at zoom level 10 or less
     */
    shouldDisableTimeSlider?: boolean;
    /**
     * Fires when the time extent of the Time Slider is changed
     *
     * @param startYear new start year
     * @param endYear ned end year
     */
    timeExtentOnChange: (startYear: number, endYear: number) => void;
};

const TimeSlider: FC<Props> = ({
    years,
    initialTimeExtent,
    shouldShowSentinel2Layer,
    shouldDisableTimeSlider,
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
                visible: shouldDisableTimeSlider === false,
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
            console.log(
                'sliderRef.current.destroyed',
                sliderRef.current.destroyed
            );
        };
    }, []);

    useEffect(() => {
        if (sliderRef.current) {
            sliderRef.current.visible = shouldDisableTimeSlider === false;
        }
    }, [shouldDisableTimeSlider]);

    return (
        <div className="text-center">
            <HeaderText
                title={`${
                    shouldShowSentinel2Layer
                        ? 'Sentinel-2 Imagery'
                        : '10m Land Cover'
                }`}
                subTitle={'Choose Two Years to Compare'}
            />

            <div className="relative max-w-md mt-10">
                <div
                    id="timeSliderDiv"
                    ref={containerRef}
                    className={classNames('time-slider-container')}
                ></div>

                {shouldDisableTimeSlider && (
                    <div className="absolute top-0 left-0 w-full h-full text-center text-sm opacity-50">
                        <p className="mt-6">
                            Zoom in to compare Sentinel-2 Imagery Layers
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TimeSlider;
