import React, { FC, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectAnimationMode } from '../../store/UI/selectors';

import IMapView from 'esri/views/MapView';
import IMediaLayer from 'esri/layers/MediaLayer';
import IImageElement from 'esri/layers/support/ImageElement';
import IExtentAndRotationGeoreference from 'esri/layers/support/ExtentAndRotationGeoreference';
import { loadModules } from 'esri-loader';
import { exportImage as exportImageFromLandCoverLayer } from '../LandcoverLayer/exportImage';
import { exportImage as exportImageFromSentinel2Layer } from '../Sentinel2Layer/exportImage';
import {
    selectActiveLandCoverType,
    selectSentinel2AquisitionMonth,
    selectSentinel2RasterFunction,
    selectShouldShowSentinel2Layer,
    selectYear,
} from '../../store/Map/selectors';
import { getRasterFunctionByLandCoverClassName } from '../../services/sentinel-2-10m-landcover/rasterAttributeTable';
import { getAvailableYears } from '../../services/sentinel-2-10m-landcover/timeInfo';
import { useDispatch } from 'react-redux';
import { yearUpdated } from '../../store/Map/reducer';
import classNames from 'classnames';
import { animationModeUpdated } from '../../store/UI/reducer';

type Props = {
    mapView?: IMapView;
};

const ANIMATION_SPEED_IN_MILLISECONDS = 1000;

const AnimationPanel: FC<Props> = ({ mapView }: Props) => {
    const dispatch = useDispatch();

    const years = getAvailableYears();

    const year = useSelector(selectYear);

    const sentinel2AquisitionMonth = useSelector(
        selectSentinel2AquisitionMonth
    );

    const sentinel2RasterFunction = useSelector(selectSentinel2RasterFunction);

    const shouldShowSentinel2Layer = useSelector(
        selectShouldShowSentinel2Layer
    );

    const animationMode = useSelector(selectAnimationMode);

    const activeLandCoverType = useSelector(selectActiveLandCoverType);

    const mediaLayerRef = useRef<IMediaLayer>();

    const imageElementsRef = useRef<IImageElement[]>();

    const isPlayingRef = useRef<boolean>(false);

    const timeLastFrameDisplayed = useRef<number>(performance.now());

    const indexOfCurrentFrame = useRef<number>(0);

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

        try {
            const [ImageElement, ExtentAndRotationGeoreference] =
                await (loadModules([
                    'esri/layers/support/ImageElement',
                    'esri/layers/support/ExtentAndRotationGeoreference',
                ]) as Promise<Modules>);

            const { extent, width, height } = mapView;

            const { xmin, ymin, xmax, ymax } = extent;

            const requests = years.map((year) => {
                return shouldShowSentinel2Layer
                    ? exportImageFromSentinel2Layer({
                          extent,
                          width,
                          height,
                          year,
                          month: sentinel2AquisitionMonth,
                          rasterFunctionName: sentinel2RasterFunction,
                      })
                    : exportImageFromLandCoverLayer({
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

            dispatch(animationModeUpdated('playing'));
        } catch (err) {
            console.error(err);
        }
    };

    const showCurrentFrame = () => {
        if (!isPlayingRef.current) {
            return;
        }

        const now = performance.now();

        const millisecondsSinceLastFrame = now - timeLastFrameDisplayed.current;

        if (millisecondsSinceLastFrame < ANIMATION_SPEED_IN_MILLISECONDS) {
            requestAnimationFrame(showCurrentFrame);
            return;
        }

        timeLastFrameDisplayed.current = now;

        const year = years[indexOfCurrentFrame.current];

        dispatch(yearUpdated(year));

        const imageElements: IImageElement[] = imageElementsRef.current;

        for (let i = 0; i < imageElements.length; i++) {
            const opacity = i === indexOfCurrentFrame.current ? 1 : 0;
            imageElements[i].opacity = opacity;
        }

        const nextIdx =
            indexOfCurrentFrame.current + 1 === imageElements.length
                ? 0
                : indexOfCurrentFrame.current + 1;

        indexOfCurrentFrame.current = nextIdx;

        requestAnimationFrame(showCurrentFrame);
    };

    const stopAnimation = () => {
        for (const elem of imageElementsRef.current) {
            URL.revokeObjectURL(elem.image as string);
        }

        imageElementsRef.current = null;

        mediaLayerRef.current.source.elements.removeAll();
    };

    useEffect(() => {
        // console.log(animationMode)

        if (!mediaLayerRef.current) {
            return;
        }

        isPlayingRef.current = animationMode === 'playing';

        if (animationMode === 'loading') {
            loadFrameData();
        } else if (animationMode === 'playing') {
            indexOfCurrentFrame.current = years.indexOf(year);
            requestAnimationFrame(showCurrentFrame);
        } else if (animationMode === 'pausing') {
            // clearInterval(animationInterval.current);
            // isPlayingRef.current = false;
        } else {
            stopAnimation();
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
                'absolute top-0 left-0 bottom-0 right-0 z-50 flex items-center justify-center'
            )}
        >
            {animationMode === 'loading' && (
                <calcite-loader active scale="l">
                    Loading Images
                </calcite-loader>
            )}
        </div>
    );
};

export default AnimationPanel;
