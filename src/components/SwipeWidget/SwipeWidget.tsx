import React, { FC, useEffect, useMemo, useRef } from 'react';

import ISwipe from 'esri/widgets/Swipe';
import IMapView from 'esri/views/MapView';
import { loadModules } from 'esri-loader';
import useLandCoverLayer from '../LandcoverLayer/useLandCoverLayer';
import IImageryLayer from 'esri/layers/ImageryLayer';
import useSentinel2Layer from '../Sentinel2Layer/useSentinel2Layer';

type Props = {
    /**
     * If true, display sentinel 2 imagery layer
     */
    shouldShowSentinel2Layer: boolean;
    /**
     * The year that will be used to get the leading layer
     */
    yearForLeadingLayer: number;
    /**
     * The year that will be used to get the trailing layer
     */
    yearForTailingLayer: number;
    /**
     * Map view that contains Swipe Widget
     */
    mapView?: IMapView;
};

/**
 * Swipe Widget to compare land cover layers from two different years
 */
const SwipeWidget: FC<Props> = ({
    shouldShowSentinel2Layer,
    yearForLeadingLayer,
    yearForTailingLayer,
    mapView,
}: Props) => {
    const swipeWidgetRef = useRef<ISwipe>();

    const leadingLayer = shouldShowSentinel2Layer
        ? useSentinel2Layer({
              year: yearForLeadingLayer,
          })
        : useLandCoverLayer({
              year: yearForLeadingLayer,
          });

    // const leadingLayer = shouldShowSentinel2Layer
    //     ? useSentinel2Layer({
    //         year: yearForLeadingLayer
    //     })
    //     : useLandCoverLayer({
    //         year: yearForLeadingLayer,
    //     });

    const prevLeadingLayerRef = useRef<IImageryLayer>();

    const trailingLayer = shouldShowSentinel2Layer
        ? useSentinel2Layer({
              year: yearForTailingLayer,
          })
        : useLandCoverLayer({
              year: yearForTailingLayer,
          });

    const prevTrailingLayerRef = useRef<IImageryLayer>();

    const init = async () => {
        type Modules = [typeof ISwipe];

        const [Swipe] = await (loadModules([
            'esri/widgets/Swipe',
        ]) as Promise<Modules>);

        // mapView.map.addMany([leadingLayer, trailingLayer]);

        swipeWidgetRef.current = new Swipe({
            view: mapView,
            leadingLayers: [],
            trailingLayers: [],
            direction: 'horizontal',
            position: 50, // position set to middle of the view (50%)
        });

        // console.log(swipeWidgetRef.current)
        mapView.ui.add(swipeWidgetRef.current);

        // swipe widget is ready, add leading layer if it's ready
        if (leadingLayer) {
            updateLayer(prevLeadingLayerRef.current, leadingLayer);
        }

        // swipe widget is ready, add trailing layer if it's ready
        if (trailingLayer) {
            updateLayer(prevTrailingLayerRef.current, trailingLayer, true);
        }
    };

    /**
     * Update Leading/Trailing layer in Swipe Widget, the previous layer will be removed from map view and new layer will be added to map view,
     *
     * The new layer will also be added to the targeting layer collection (leading/trailing) of swipe widget
     *
     * @param previousLayer old layer that need to removed
     * @param currentLayer  new layer that will be used
     * @param isTrailLayer if true, the new layer will be added to the trailing layers collection
     */
    const updateLayer = (
        previousLayer: IImageryLayer,
        currentLayer: IImageryLayer,
        isTrailLayer = false
    ) => {
        if (previousLayer) {
            mapView.map.remove(previousLayer);
        }

        mapView.map.add(currentLayer);

        const layersCollection = isTrailLayer
            ? swipeWidgetRef.current.trailingLayers
            : swipeWidgetRef.current.leadingLayers;

        layersCollection.removeAll();
        layersCollection.add(currentLayer);

        if (isTrailLayer) {
            prevTrailingLayerRef.current = currentLayer;
        } else {
            prevLeadingLayerRef.current = currentLayer;
        }
    };

    useEffect(() => {
        // initiate swipe widget when both leading layer and trailer layer are ready
        if (!swipeWidgetRef.current && leadingLayer && trailingLayer) {
            init();
        }
    }, [mapView, leadingLayer, trailingLayer]);

    useEffect(() => {
        if (!swipeWidgetRef.current || !leadingLayer) {
            return;
        }

        updateLayer(prevLeadingLayerRef.current, leadingLayer);
    }, [leadingLayer]);

    useEffect(() => {
        if (!swipeWidgetRef.current || !trailingLayer) {
            return;
        }

        updateLayer(prevTrailingLayerRef.current, trailingLayer, true);
    }, [trailingLayer]);

    return null;
};

export default SwipeWidget;
