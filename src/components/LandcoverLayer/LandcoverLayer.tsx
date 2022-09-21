import React, { FC, useEffect, useRef } from 'react';

import IMapView from 'esri/views/MapView';
import IImageryLayer from 'esri/layers/ImageryLayer';
import { loadModules } from 'esri-loader';
import { SENTINEL_2_LANDCOVER_10M_IMAGE_SERVICE_URL } from '../../services/sentinel-2-10m-landcover/config';
import ITimeExtent from 'esri/TimeExtent';
import { TimeExtentData } from '../../services/sentinel-2-10m-landcover/timeInfo';

type Props = {
    /**
     * Layer's time extent
     */
    timeExtent: TimeExtentData;
    /**
     * Map view that contains this layer
     */
    mapView?: IMapView;
};

/**
 * Sentinel-2 10m land cover time series of the world from 2017-2021. Produced by Impact Observatory, Microsoft, and Esri.
 *
 * https://arcgis-content.maps.arcgis.com/home/item.html?id=d3da5dd386d140cf93fc9ecbf8da5e31
 * @returns
 */
const LandcoverLayer: FC<Props> = ({ timeExtent, mapView }: Props) => {
    const layerRef = useRef<IImageryLayer>();

    const init = async () => {
        type Modules = [typeof IImageryLayer];

        const [ImageryLayer] = await (loadModules([
            'esri/layers/ImageryLayer',
        ]) as Promise<Modules>);

        layerRef.current = new ImageryLayer({
            // URL to the imagery service
            url: SENTINEL_2_LANDCOVER_10M_IMAGE_SERVICE_URL,
            timeExtent,
        });

        mapView.map.add(layerRef.current);
    };

    useEffect(() => {
        if (mapView) {
            init();
        }
    }, [mapView]);

    useEffect(() => {
        if (timeExtent && layerRef.current) {
            // layerRef.current.timeExtent = timeExtent
        }
    }, [timeExtent]);

    return null;
};

export default LandcoverLayer;
