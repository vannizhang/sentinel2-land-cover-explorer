import React from 'react';
import { useDispatch } from 'react-redux';
import { year4LeadingLayerUpdated } from '../../store/Map/reducer';

const years = [2017, 2018, 2019, 2020, 2021];

const ControlPanel = () => {
    const dispatch = useDispatch();

    return (
        <div className="absolute bottom-0 left-0 w-full h-56 bg-gray-900 text-white z-10">
            <div className="flex">
                {years.map((year) => {
                    return (
                        <div
                            className="mx-2"
                            key={year}
                            onClick={() => {
                                dispatch(year4LeadingLayerUpdated(year));
                            }}
                        >
                            {year}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ControlPanel;
