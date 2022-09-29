import React, { FC, useEffect, useRef } from 'react';

import IMapView from 'esri/views/MapView';
import { useSelector } from 'react-redux';
import {
    selectShowMapLabel,
    selectShowTerrain,
} from '../../store/Map/selectors';
import {
    MAP_LABELS_LAYER_TITLE,
    TERRAIN_LAYER_TITLE,
} from '../../constants/map';

type Props = {
    mapView?: IMapView;
};

const ReferenceLayers: FC<Props> = ({ mapView }: Props) => {
    const mapLabelLayerRef = useRef<__esri.Layer>();
    const terrainLayerRef = useRef<__esri.Layer>();

    const showMapLabel = useSelector(selectShowMapLabel);
    const showTerrain = useSelector(selectShowTerrain);

    const init = () => {
        mapLabelLayerRef.current = mapView.map.allLayers.find(
            (layer) => layer.title === MAP_LABELS_LAYER_TITLE
        );

        terrainLayerRef.current = mapView.map.allLayers.find(
            (layer) => layer.title === TERRAIN_LAYER_TITLE
        );
    };

    useEffect(() => {
        if (mapView) {
            init();
        }
    }, [mapView]);

    useEffect(() => {
        if (mapLabelLayerRef.current) {
            mapLabelLayerRef.current.visible = showMapLabel;
        }
    }, [showMapLabel]);

    useEffect(() => {
        if (terrainLayerRef.current) {
            terrainLayerRef.current.visible = showTerrain;
        }
    }, [showTerrain]);

    return null;
};

export default ReferenceLayers;
