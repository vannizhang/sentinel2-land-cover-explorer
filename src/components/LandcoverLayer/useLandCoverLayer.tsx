import React, { useEffect, useState } from 'react';
import {
    getTimeExtentByYear,
    TimeExtentData,
} from '../../services/sentinel-2-10m-landcover/timeInfo';
import IImageryLayer from 'esri/layers/ImageryLayer';
import { loadModules } from 'esri-loader';
import { SENTINEL_2_LANDCOVER_10M_IMAGE_SERVICE_URL } from '../../constants/map';
import IMapView from 'esri/views/MapView';

type UseLandCoverLayerParams = {
    year: number;
    mapView?: IMapView;
};

const useLandCoverLayer = ({ year, mapView }: UseLandCoverLayerParams) => {
    const [landCoverLayer, setLandCoverLayer] = useState<IImageryLayer>();

    /**
     * get land cover layer using time extent for the input year
     */
    const getLandCoverLayer = async () => {
        const timeExtent = await getTimeExtentByYear(year);

        type Modules = [typeof IImageryLayer];

        const [ImageryLayer] = await (loadModules([
            'esri/layers/ImageryLayer',
        ]) as Promise<Modules>);

        const layer = new ImageryLayer({
            // URL to the imagery service
            url: SENTINEL_2_LANDCOVER_10M_IMAGE_SERVICE_URL,
            timeExtent,
        });

        setLandCoverLayer(layer);
    };

    const getHistogramStats = () => {
        console.log('calc histogram');
    };

    useEffect(() => {
        if (year) {
            getLandCoverLayer();
        }
    }, [year]);

    useEffect(() => {
        if (landCoverLayer) {
            getHistogramStats();
        }
    }, [landCoverLayer]);

    return landCoverLayer;
};

export default useLandCoverLayer;