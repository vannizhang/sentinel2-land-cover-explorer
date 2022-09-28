import React, { FC } from 'react';
import { TooltipData } from '../../../store/UI/reducer';

type Props = {
    data: TooltipData;
};

const Tooltip: FC<Props> = ({ data }: Props) => {
    return (
        <div className=" bg-custom-background-850 text-custom-light-blue-900 text-sm p-2 max-w-xs">
            {data.title && <h4 className="text-base mb-1">{data.title}</h4>}
            <p>{data.content}</p>
        </div>
    );
};

export default Tooltip;
