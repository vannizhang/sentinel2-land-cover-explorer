import React from 'react';

import {
    TOOLTIP_BACKGROUND_COLOR,
    TOOLTIP_TEXT_COLOR,
    TOOLTIP_PADDING,
} from '../constants';
import { QuickD3ChartDataItem } from '../types';
import { numberWithCommas } from 'helper-toolkit-ts/dist/number';

type Props = {
    index4ItemOnHover?: number;
    barDataOnHover?: QuickD3ChartDataItem;
    lineDataOnHover?: QuickD3ChartDataItem;
};

const TooltipContent: React.FC<Props> = ({
    index4ItemOnHover,
    barDataOnHover,
    lineDataOnHover,
}) => {
    if (!barDataOnHover) {
        return null;
    }

    return (
        <div
            style={{
                padding: TOOLTIP_PADDING,
                background: TOOLTIP_BACKGROUND_COLOR,
                color: TOOLTIP_TEXT_COLOR,
                fontSize: '.8rem',
            }}
        >
            <div>
                <span className=" text-gray-300">
                    {barDataOnHover && barDataOnHover.label
                        ? barDataOnHover.label
                        : null}
                </span>
            </div>

            <div>
                <span>
                    {barDataOnHover
                        ? numberWithCommas(barDataOnHover.value)
                        : 'n/a'}
                </span>

                {barDataOnHover.additionalValue && (
                    <span className="ml-2">
                        {barDataOnHover.additionalValue}
                    </span>
                )}
            </div>
        </div>
    );
};

export default TooltipContent;
