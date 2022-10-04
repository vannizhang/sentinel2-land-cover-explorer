import React, { useEffect, useRef, useState } from 'react';
import IImageryLayer from 'esri/layers/ImageryLayer';
import { loadModules } from 'esri-loader';
// import IMapView from 'esri/views/MapView';
import { SENTINEL_2_IMAGE_SERVICE_URL } from './config';
import { useSelector } from 'react-redux';
import { selectSentinel2RasterFunction } from '../../store/Map/selectors';

type UseLandCoverLayerParams = {
    year: number;
    // mapView?: IMapView;
};

const useSentinel2Layer = ({ year }: UseLandCoverLayerParams) => {
    const layerRef = useRef<IImageryLayer>();

    const [sentinel2Layer, setSentinel2Layer] = useState<IImageryLayer>();

    const selectedRasterFunction = useSelector(selectSentinel2RasterFunction);

    const createMosaicRuleByYear = (year: number) => {
        return {
            method: `attribute`,
            where: `(category = 2) OR (CloudCover < 0.1)`,
            sortField: `AcquisitionDate`,
            sortValue: `${year}/09/15`,
            ascending: true,
        };
    };

    /**
     * get sentinel 2 layer using mosaic created using the input year
     */
    const getSentinel2Layer = async () => {
        type Modules = [typeof IImageryLayer];

        const [ImageryLayer] = await (loadModules([
            'esri/layers/ImageryLayer',
        ]) as Promise<Modules>);

        layerRef.current = new ImageryLayer({
            // URL to the imagery service
            url: SENTINEL_2_IMAGE_SERVICE_URL,
            mosaicRule: createMosaicRuleByYear(year) as any,
            // renderingRule: {
            //     functionName: ''
            // }
        });

        setSentinel2Layer(layerRef.current);
    };

    useEffect(() => {
        if (!layerRef.current) {
            getSentinel2Layer();
        } else {
            layerRef.current.mosaicRule = createMosaicRuleByYear(year) as any;
        }
    }, [year]);

    useEffect(() => {
        console.log(selectedRasterFunction);

        if (layerRef.current) {
            layerRef.current.renderingRule = {
                functionName: selectedRasterFunction || '',
            } as any;
        }
    }, [selectedRasterFunction]);

    return sentinel2Layer;
};

export default useSentinel2Layer;
