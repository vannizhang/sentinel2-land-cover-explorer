import React, { FC, useEffect } from 'react';

import IMapView from 'esri/views/MapView';
import useSentinel2Layer from './useSentinel2Layer';
import { useSelector } from 'react-redux';
import {
    selectMapMode,
    selectShouldShowSentinel2Layer,
    selectShouldSwipeWidgetBeDisabled,
    selectYear,
} from '../../store/Map/selectors';

type Props = {
    mapView?: IMapView;
};

const Sentinel2Layer: FC<Props> = ({ mapView }: Props) => {
    const year = useSelector(selectYear);

    const mode = useSelector(selectMapMode);

    const shouldShowSentinel2Layer = useSelector(
        selectShouldShowSentinel2Layer
    );

    const shouldSwipeWidgetBeDisabled = useSelector(
        selectShouldSwipeWidgetBeDisabled
    );

    const getVisibility = () => {
        if (!shouldShowSentinel2Layer) {
            return false;
        }

        return mode === 'step' || shouldSwipeWidgetBeDisabled;
    };

    const layer = useSentinel2Layer({
        year,
        visible: getVisibility(),
    });

    useEffect(() => {
        if (mapView && layer) {
            mapView.map.add(layer);
        }
    }, [mapView, layer]);

    return null;
};

export default Sentinel2Layer;
