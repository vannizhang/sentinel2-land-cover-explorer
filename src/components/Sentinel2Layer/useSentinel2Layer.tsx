import React, { useEffect, useState } from 'react';
import {
    getTimeExtentByYear,
    // TimeExtentData,
} from '../../services/sentinel-2-10m-landcover/timeInfo';
import IImageryLayer from 'esri/layers/ImageryLayer';
import { loadModules } from 'esri-loader';
import { SENTINEL_2_LANDCOVER_10M_IMAGE_SERVICE_URL } from '../../services/sentinel-2-10m-landcover/config';
import IMapView from 'esri/views/MapView';
import { SENTINEL_2_IMAGE_SERVICE_URL } from './config';

type UseLandCoverLayerParams = {
    year: number;
    mapView?: IMapView;
};

const useSentinel2Layer = ({ year, mapView }: UseLandCoverLayerParams) => {
    const [sentinel2Layer, setSentinel2Layer] = useState<IImageryLayer>();

    /**
     * get land cover layer using time extent for the input year
     */
    const getSentinel2Layer = async () => {
        const timeExtent = await getTimeExtentByYear(year);

        type Modules = [typeof IImageryLayer];

        const [ImageryLayer] = await (loadModules([
            'esri/layers/ImageryLayer',
        ]) as Promise<Modules>);

        const layer = new ImageryLayer({
            // URL to the imagery service
            url: SENTINEL_2_IMAGE_SERVICE_URL,
            timeExtent,
        });
        console.log(layer);

        setSentinel2Layer(layer);
    };

    useEffect(() => {
        if (year) {
            getSentinel2Layer();
        }
    }, [year]);

    // useEffect(() => {
    //     if (landCoverLayer) {

    //     }
    // }, [landCoverLayer]);

    return sentinel2Layer;
};

export default useSentinel2Layer;
