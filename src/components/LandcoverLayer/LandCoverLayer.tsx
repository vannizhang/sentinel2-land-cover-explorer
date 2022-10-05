import React, { FC, useEffect } from 'react';

import IMapView from 'esri/views/MapView';
import { useSelector } from 'react-redux';
import {
    selectMapMode,
    selectShouldHideSwipeWidget,
    selectShouldShowSentinel2Layer,
    selectYear,
} from '../../store/Map/selectors';
import useLandCoverLayer from './useLandCoverLayer';

type Props = {
    mapView?: IMapView;
};

const LandcoverLayer: FC<Props> = ({ mapView }: Props) => {
    const year = useSelector(selectYear);

    const mode = useSelector(selectMapMode);

    const shouldHideSwipeWidget = useSelector(selectShouldHideSwipeWidget);

    const shouldShowSentinel2Layer = useSelector(
        selectShouldShowSentinel2Layer
    );

    const getVisibility = () => {
        if (shouldShowSentinel2Layer) {
            return false;
        }

        return mode === 'step' || shouldHideSwipeWidget;
    };

    const layer = useLandCoverLayer({
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

export default LandcoverLayer;
