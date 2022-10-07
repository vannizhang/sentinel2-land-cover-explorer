import React, { FC, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectAnimationMode } from '../../store/UI/selectors';

import IMapView from 'esri/views/MapView';
import IMediaLayer from 'esri/layers/MediaLayer';
import IImageElement from 'esri/layers/support/ImageElement';
import IExtentAndRotationGeoreference from 'esri/layers/support/ExtentAndRotationGeoreference';
import { loadModules } from 'esri-loader';
import { exportImage as exportImageFromLandCoverLayer } from '../LandcoverLayer/exportImage';
import {
    selectActiveLandCoverType,
    selectYear,
} from '../../store/Map/selectors';
import { getRasterFunctionByLandCoverClassName } from '../../services/sentinel-2-10m-landcover/rasterAttributeTable';
import { getAvailableYears } from '../../services/sentinel-2-10m-landcover/timeInfo';
import { useDispatch } from 'react-redux';
import { yearUpdated } from '../../store/Map/reducer';
import classNames from 'classnames';

type Props = {
    mapView?: IMapView;
};

const AnimationPanel: FC<Props> = ({ mapView }: Props) => {
    const dispatch = useDispatch();

    const years = getAvailableYears();

    const animationMode = useSelector(selectAnimationMode);

    const activeLandCoverType = useSelector(selectActiveLandCoverType);

    const mediaLayerRef = useRef<IMediaLayer>();

    const imageElementsRef = useRef<IImageElement[]>();

    const animationInterval = useRef<NodeJS.Timeout>();

    const indexOfCurrentFrame = useRef<number>(0);

    const [isLoading, setIsLoading] = useState(true);

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

    const loadFrameData = async () => {
        type Modules = [
            typeof IImageElement,
            typeof IExtentAndRotationGeoreference
        ];

        setIsLoading(true);

        try {
            const [ImageElement, ExtentAndRotationGeoreference] =
                await (loadModules([
                    'esri/layers/support/ImageElement',
                    'esri/layers/support/ExtentAndRotationGeoreference',
                ]) as Promise<Modules>);

            const { extent, width, height } = mapView;

            const { xmin, ymin, xmax, ymax } = extent;

            const requests = years.map((year) => {
                return exportImageFromLandCoverLayer({
                    extent,
                    width,
                    height,
                    year,
                    rasterFunctionName:
                        getRasterFunctionByLandCoverClassName(
                            activeLandCoverType
                        ),
                });
            });

            const responses = await Promise.all(requests);

            imageElementsRef.current = responses.map((blob) => {
                return new ImageElement({
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
                    opacity: 0,
                });
            });

            mediaLayerRef.current.source.elements.addMany(
                imageElementsRef.current
            );

            setIsLoading(false);

            startAnimation(imageElementsRef.current);
        } catch (err) {
            console.error(err);
        }
    };

    const startAnimation = (imageElements: IImageElement[]) => {
        animationInterval.current = setInterval(() => {
            const year = years[indexOfCurrentFrame.current];

            dispatch(yearUpdated(year));

            const prevIdx =
                indexOfCurrentFrame.current === 0
                    ? imageElements.length - 1
                    : indexOfCurrentFrame.current - 1;

            const elem2show = imageElements[indexOfCurrentFrame.current];
            const elem2hide = imageElements[prevIdx];

            elem2show.opacity = 1;
            elem2hide.opacity = 0;

            const nextIdx =
                indexOfCurrentFrame.current + 1 === imageElements.length
                    ? 0
                    : indexOfCurrentFrame.current + 1;

            indexOfCurrentFrame.current = nextIdx;
        }, 500);
    };

    const animationModeOnOffHandler = () => {
        clearInterval(animationInterval.current);

        mediaLayerRef.current.source.elements.removeAll();

        // setImageElements(null)
        for (const elem of imageElementsRef.current) {
            URL.revokeObjectURL(elem.image as string);
        }

        indexOfCurrentFrame.current = 0;

        imageElementsRef.current = null;
    };

    useEffect(() => {
        // console.log(animationMode)

        if (!mediaLayerRef.current) {
            return;
        }

        if (animationMode) {
            loadFrameData();
        } else {
            animationModeOnOffHandler();
        }
    }, [animationMode]);

    useEffect(() => {
        init();
    }, [mapView]);

    if (!animationMode) {
        return null;
    }

    return (
        <div
            className={classNames(
                'absolute top-0 left-0 bottom-0 right-0 z-50 flex items-center justify-center',
                {
                    ' bg-custom-background-90': isLoading,
                    // 'opacity-50': isLoading
                }
            )}
        >
            {isLoading && (
                <calcite-loader active scale="l">
                    Loading Images
                </calcite-loader>
            )}
        </div>
    );
};

export default AnimationPanel;
