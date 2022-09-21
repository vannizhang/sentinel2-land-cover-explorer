import './style.css';
import React, { useRef, useEffect, FC } from 'react';
// import ISlider from 'esri/widgets/Slider';
import ITimeSlider from 'esri/widgets/TimeSlider';
import IReactiveUtils from 'esri/core/reactiveUtils';
import { loadModules } from 'esri-loader';

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
     * Fires when the time extent of the Time Slider is changed
     *
     * @param startYear new start year
     * @param endYear ned end year
     */
    timeExtentOnChange: (startYear: number, endYear: number) => void;
};

const TimeSlider: FC<Props> = ({ years, timeExtentOnChange }: Props) => {
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

            sliderRef.current = new TimeSlider({
                container: containerRef.current,
                mode: 'time-window',
                fullTimeExtent: {
                    start: new Date(2017, 0, 1),
                    end: new Date(2021, 0, 1),
                },
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
            });

            reactiveUtils.watch(
                () => sliderRef.current.timeExtent,
                (timeExtent) => {
                    clearTimeout(debounceDelay.current);

                    debounceDelay.current = setTimeout(() => {
                        // console.log(timeExtent)
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
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="time-slider-container max-w-md px-4"
        ></div>
    );
};

export default TimeSlider;
