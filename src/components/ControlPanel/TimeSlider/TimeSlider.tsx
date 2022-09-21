import './style.css';
import React, { useRef, useEffect } from 'react';
// import ISlider from 'esri/widgets/Slider';
import ITimeSlider from 'esri/widgets/TimeSlider';
import { loadModules } from 'esri-loader';

const TimeSlider = () => {
    const containerRef = useRef<HTMLDivElement>();

    const sliderRef = useRef<ITimeSlider>();

    const debounceDelay = useRef<NodeJS.Timeout>();

    const init = async () => {
        type Modules = [typeof ITimeSlider];

        try {
            const [TimeSlider] = await (loadModules([
                'esri/widgets/TimeSlider',
            ]) as Promise<Modules>);

            const years = [
                new Date(2017, 0, 1),
                new Date(2018, 0, 1),
                new Date(2019, 0, 1),
                new Date(2020, 0, 1),
                new Date(2021, 0, 1),
            ];

            sliderRef.current = new TimeSlider({
                container: containerRef.current,
                mode: 'time-window',
                fullTimeExtent: {
                    start: new Date(2017, 0, 1),
                    end: new Date(2021, 0, 1),
                },
                stops: { dates: years },
                tickConfigs: [
                    {
                        mode: 'position',
                        values: years.map((year) => year.getTime()),
                        labelsVisible: true,
                        labelFormatFunction: (value: any) => {
                            return new Date(value).getUTCFullYear();
                        },
                    } as any,
                ],
            });

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

    return <div ref={containerRef} className=" max-w-md px-4"></div>;
};

export default TimeSlider;
