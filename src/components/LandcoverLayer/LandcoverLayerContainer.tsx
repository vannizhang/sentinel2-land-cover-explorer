import React, { FC, useEffect, useState } from 'react';

import IMapView from 'esri/views/MapView';
import LandcoverLayer from './LandcoverLayer';
import {
    getTimeExtentByYear,
    TimeExtentData,
} from '../../services/sentinel-2-10m-landcover/timeInfo';

type Props = {
    /**
     * Available values as of 2022: 2017, 2018, 2019, 2020, 2021
     */
    targetYear: number;
    /**
     * Map view that contains this layer
     */
    mapView?: IMapView;
};

const LandcoverLayerContainer: FC<Props> = ({ targetYear, mapView }) => {
    const [timeExtent, setTimeExtent] = useState<TimeExtentData>();

    useEffect(() => {
        // load time extent by year
        (async () => {
            if (targetYear && mapView) {
                const data = await getTimeExtentByYear(targetYear);
                setTimeExtent(data);
            }
        })();
    }, [targetYear]);

    return timeExtent ? (
        <LandcoverLayer mapView={mapView} timeExtent={timeExtent} />
    ) : null;
};

export default LandcoverLayerContainer;
