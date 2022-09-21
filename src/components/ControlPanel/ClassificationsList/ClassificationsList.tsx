import React, { FC } from 'react';
import { LandcoverClassificationData } from '../../../services/sentinel-2-10m-landcover/rasterAttributeTable';

type Props = {
    /**
     * array of Land Cover classifications data (from Sentinel2_10m_LandCover layer) that contains Name, Color and Description of each land cover type
     */
    data: LandcoverClassificationData[];
};

const ClassificationsList: FC<Props> = ({ data }: Props) => {
    return (
        <div className="text-center mx-4">
            <h5 className="uppercase opacity-50 text-sm mb-8">
                land Cover Categories, Click to Toggle Visibility
            </h5>

            <div className="grid grid-cols-3 h-28 text-sm">
                {data
                    .filter((d) => d.ClassName !== 'No Data')
                    .map((d: LandcoverClassificationData) => {
                        const { Value, ClassName, Color } = d;

                        const [Red, Green, Blue] = Color;

                        return (
                            <div
                                key={Value}
                                className="flex items-center cursor-pointer"
                            >
                                <div
                                    className="w-4 h-4 border-2 border-white rounded-full"
                                    style={{
                                        background: `rgb(${Red}, ${Green}, ${Blue})`,
                                    }}
                                ></div>

                                <span className="ml-2">{ClassName}</span>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
};

export default ClassificationsList;
