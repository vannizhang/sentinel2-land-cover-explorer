import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { sentinel2AquisitionMonthChanged } from '../../../store/Map/reducer';
import { selectSentinel2AquisitionMonth } from '../../../store/Map/selectors';

const MONTH_ABBR = [
    'JAN',
    'FEB',
    'MAR',
    'APR',
    'MAY',
    'JUN',
    'JUL',
    'AUG',
    'SEP',
    'OCT',
    'NOV',
    'DEC',
];

const MonthPicker = () => {
    const dispatch = useDispatch();

    const month = useSelector(selectSentinel2AquisitionMonth);

    const [shouldShowOptions, setShouldShowOptions] = useState(false);

    const containerRef = useRef<HTMLDivElement>();

    return (
        <div
            className="absolute top-3"
            style={{
                right: -15,
            }}
            ref={containerRef}
        >
            <div
                className="border border-custom-light-blue-90 opacity-80 p-1 text-xs cursor-pointer"
                onClick={() => {
                    setShouldShowOptions(true);
                }}
            >
                <span>{MONTH_ABBR[month - 1]}</span>
            </div>

            {shouldShowOptions && (
                <div className="absolute bottom-0 right-0 bg-custom-background border border-custom-light-blue-50 border-b-0 text-xs">
                    {MONTH_ABBR.map((monthAbbr, index) => {
                        return (
                            <div
                                className="p-1 border-custom-light-blue-50 border-b cursor-pointer"
                                key={monthAbbr}
                                onClick={() => {
                                    dispatch(
                                        sentinel2AquisitionMonthChanged(
                                            index + 1
                                        )
                                    );
                                    setShouldShowOptions(false);
                                }}
                            >
                                {monthAbbr}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default MonthPicker;
