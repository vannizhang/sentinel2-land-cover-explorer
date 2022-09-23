import React, { useEffect, useRef, useState } from 'react';
import {
    getTimeExtentByYear,
    // TimeExtentData,
} from '../../services/sentinel-2-10m-landcover/timeInfo';
import IImageryLayer from 'esri/layers/ImageryLayer';
import { loadModules } from 'esri-loader';
import { SENTINEL_2_LANDCOVER_10M_IMAGE_SERVICE_URL } from '../../services/sentinel-2-10m-landcover/config';
// import IMapView from 'esri/views/MapView';

type UseLandCoverLayerParams = {
    year: number;
    // mapView?: IMapView;
};

const useLandCoverLayer = ({ year }: UseLandCoverLayerParams) => {
    const layerRef = useRef<IImageryLayer>();

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

        layerRef.current = new ImageryLayer({
            // URL to the imagery service
            url: SENTINEL_2_LANDCOVER_10M_IMAGE_SERVICE_URL,
            timeExtent,
        });

        setLandCoverLayer(layerRef.current);
    };

    const updateTimeExtent = async () => {
        const timeExtent = await getTimeExtentByYear(year);
        layerRef.current.timeExtent = timeExtent as any;
    };

    useEffect(() => {
        if (!layerRef.current) {
            getLandCoverLayer();
        } else {
            updateTimeExtent();
        }
    }, [year]);

    return landCoverLayer;
};

export default useLandCoverLayer;
