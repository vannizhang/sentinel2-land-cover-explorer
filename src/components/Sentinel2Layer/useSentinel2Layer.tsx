import React, { useEffect, useRef, useState } from 'react';
import IImageryLayer from 'esri/layers/ImageryLayer';
import { loadModules } from 'esri-loader';
// import IMapView from 'esri/views/MapView';
import {
    SENTINEL_2_IMAGE_SERVICE_FIELD_NAMES,
    SENTINEL_2_IMAGE_SERVICE_URL,
} from './config';
import { useSelector } from 'react-redux';
import {
    selectSentinel2AquisitionMonth,
    selectSentinel2RasterFunction,
} from '../../store/Map/selectors';
import { getMosaicRuleByAcquisitionDate } from './exportImage';

type UseLandCoverLayerParams = {
    year: number;
    visible?: boolean;
    // mapView?: IMapView;
};

const { AcquisitionDate, CloudCover } = SENTINEL_2_IMAGE_SERVICE_FIELD_NAMES;

export const createMosaicRuleByYear = (year: number, month: number) => {
    // const monthStr = month < 10 ? '0' + month : month.toString();

    const { where, sortField, sortValue, ascending } =
        getMosaicRuleByAcquisitionDate(year, month);

    return {
        method: `attribute`,
        where,
        sortField,
        sortValue,
        ascending,
    };
};

const useSentinel2Layer = ({
    year,
    visible = true,
}: UseLandCoverLayerParams) => {
    const layerRef = useRef<IImageryLayer>();

    const [sentinel2Layer, setSentinel2Layer] = useState<IImageryLayer>();

    const selectedRasterFunction = useSelector(selectSentinel2RasterFunction);

    const aquisitionMonth = useSelector(selectSentinel2AquisitionMonth);

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
            mosaicRule: createMosaicRuleByYear(year, aquisitionMonth) as any,
            renderingRule: {
                functionName: selectedRasterFunction,
            },
            visible,
            // blendMode: 'multiply'
        });

        setSentinel2Layer(layerRef.current);
    };

    useEffect(() => {
        if (!layerRef.current) {
            getSentinel2Layer();
        } else {
            layerRef.current.mosaicRule = createMosaicRuleByYear(
                year,
                aquisitionMonth
            ) as any;
        }
    }, [year, aquisitionMonth]);

    useEffect(() => {
        // console.log(selectedRasterFunction);

        if (layerRef.current) {
            layerRef.current.renderingRule = {
                functionName: selectedRasterFunction || '',
            } as any;
        }
    }, [selectedRasterFunction]);

    useEffect(() => {
        if (!layerRef.current) {
            return;
        }

        layerRef.current.visible = visible;
    }, [visible]);

    return sentinel2Layer;
};

export default useSentinel2Layer;
