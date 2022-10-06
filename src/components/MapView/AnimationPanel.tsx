import React, { FC, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { selectAnimationMode } from '../../store/UI/selectors';

import IMapView from 'esri/views/MapView';
import IMediaLayer from 'esri/layers/MediaLayer';
import IImageElement from 'esri/layers/support/ImageElement';
import IExtentAndRotationGeoreference from 'esri/layers/support/ExtentAndRotationGeoreference';
import { loadModules } from 'esri-loader';

type Props = {
    mapView?: IMapView;
};

const AnimationPanel: FC<Props> = ({ mapView }: Props) => {
    const animationMode = useSelector(selectAnimationMode);

    const mediaLayerRef = useRef<IMediaLayer>();

    const init = async () => {
        type Modules = [typeof IMediaLayer];

        try {
            const [MediaLayer] = await (loadModules([
                'esri/layers/MediaLayer',
            ]) as Promise<Modules>);

            mediaLayerRef.current = new MediaLayer({
                visible: true,
            });

            mapView.map.add(mediaLayerRef.current);
        } catch (err) {
            console.error(err);
        }
    };

    const loadData = async () => {
        type Modules = [
            typeof IImageElement,
            typeof IExtentAndRotationGeoreference
        ];

        try {
            const [ImageElement, ExtentAndRotationGeoreference] =
                await (loadModules([
                    'esri/layers/support/ImageElement',
                    'esri/layers/support/ExtentAndRotationGeoreference',
                ]) as Promise<Modules>);

            const extent = mapView.extent;

            const { xmin, xmax, ymin, ymax } = extent;

            const res = await fetch(
                'https://icdev.imagery1.arcgis.com/arcgis/rest/services/Sentinel2_10m_LandCover/ImageServer/exportImage?f=image&bbox=-13088351.635108855%2C4017785.5744985836%2C-13002933.256000191%2C4053787.414820892&bboxSR=102100&imageSR=102100&size=2235%2C942&format=jpgpng&mosaicRule=%7B%22ascending%22%3Atrue%2C%22mosaicMethod%22%3A%22esriMosaicNorthwest%22%2C%22mosaicOperation%22%3A%22MT_FIRST%22%7D&renderingRule=%7B%22rasterFunction%22%3A%22Trees%20Only%22%7D&time=1483272000000'
            );

            const blob = await res.blob();

            const imageElement = new ImageElement({
                image: URL.createObjectURL(blob),
                georeference: new ExtentAndRotationGeoreference({
                    extent: {
                        spatialReference: {
                            wkid: 102100,
                        },
                        xmin,
                        ymin,
                        xmax,
                        ymax,
                    },
                }),
            });

            mediaLayerRef.current.source.elements.add(imageElement);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        // console.log(animationMode)

        if (!mediaLayerRef.current) {
            return;
        }

        if (animationMode) {
            loadData();
        } else {
            mediaLayerRef.current.source.elements.removeAll();
        }
    }, [animationMode]);

    useEffect(() => {
        init();
    }, [mapView]);

    if (!animationMode) {
        return null;
    }

    return <div className="absolute top-0 left-0 bottom-0 right-0 z-50"></div>;
};

export default AnimationPanel;
