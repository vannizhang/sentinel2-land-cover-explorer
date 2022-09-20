import React, { FC, useEffect, useRef } from 'react';

import ISwipe from 'esri/widgets/Swipe';
import IMapView from 'esri/views/MapView';
import { loadModules } from 'esri-loader';
import useLandCoverLayer from '../LandcoverLayer/useLandCoverLayer';
import IImageryLayer from 'esri/layers/ImageryLayer';

type Props = {
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
    yearForLeadingLayer,
    yearForTailingLayer,
    mapView,
}: Props) => {
    const swipeWidgetRef = useRef<ISwipe>();

    const leadingLayer = useLandCoverLayer({
        year: yearForLeadingLayer,
        mapView,
    });

    const prevLeadingLayerRef = useRef<IImageryLayer>();

    const trailingLayer = useLandCoverLayer({
        year: yearForTailingLayer,
        mapView,
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
        if (!swipeWidgetRef.current) {
            init();
        }
    }, [mapView]);

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
