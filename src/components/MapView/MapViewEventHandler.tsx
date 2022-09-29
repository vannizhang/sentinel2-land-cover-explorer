import React, { FC, useEffect, useRef } from 'react';
import IMapView from 'esri/views/MapView';
import IReactiveUtils from 'esri/core/reactiveUtils';
import { loadModules } from 'esri-loader';
import IPoint from 'esri/geometry/Point';
import { MapCenter, MapExtent } from '../../store/Map/reducer';

type Props = {
    mapView?: IMapView;
    /**
     * Fires when Map View's extent changes
     *
     * @param extent extent of map view
     * @param resolution resolution of map view
     */
    extentOnChange?: (
        extent: MapExtent,
        resolution: number,
        center: MapCenter,
        zoom: number
    ) => void;
    /**
     * Fires when user click on map view
     *
     * @param mapPoint point represents that location that the user clicked on
     */
    mapViewOnClick?: (mapPoint: IPoint) => void;
    /**
     * Fires when Map View starts/stops updating
     */
    mapViewUpdatingOnChange?: (isUpdating: boolean) => void;
};

const MapViewEventHandlers: FC<Props> = ({
    mapView,
    extentOnChange,
    mapViewOnClick,
    mapViewUpdatingOnChange,
}: Props) => {
    const stringifiedMapExtentRef = useRef<string>();
    const resolutionRef = useRef<number>();

    const mapExtentOnChangeHandler = () => {
        extentOnChange(
            mapView.extent.toJSON(),
            mapView.resolution,
            {
                lon: +mapView.center.longitude.toFixed(3),
                lat: +mapView.center.latitude.toFixed(3),
            },
            mapView.zoom
        );
    };

    const init = async () => {
        try {
            type Modules = [typeof IReactiveUtils];

            const [reactiveUtils] = await (loadModules([
                'esri/core/reactiveUtils',
            ]) as Promise<Modules>);

            /**
             * Observe for when a boolean property becomes true
             * Equivalent to watchUtils.whenTrue()
             * learn more here: https://developers.arcgis.com/javascript/latest/api-reference/esri-core-reactiveUtils.html#when
             */
            reactiveUtils.when(
                () => mapView.stationary === true,
                () => {
                    const mapExtent = mapView.extent.toJSON();
                    const stringifiedMapExtent = JSON.stringify(mapExtent);

                    if (
                        stringifiedMapExtentRef.current !==
                            stringifiedMapExtent ||
                        resolutionRef.current !== mapView.resolution
                    ) {
                        stringifiedMapExtentRef.current = stringifiedMapExtent;
                        resolutionRef.current = mapView.resolution;

                        mapExtentOnChangeHandler();
                    }
                }
            );

            reactiveUtils.watch(
                () => mapView.updating,
                () => {
                    // console.log('mapview is updating')
                    mapViewUpdatingOnChange(mapView.updating);
                }
            );

            mapView.on('click', async (evt) => {
                if (mapViewOnClick) {
                    mapViewOnClick(evt.mapPoint.toJSON());
                }
            });

            // the stationary handler only get triggered after first time the user interactive with the view, therefore need to call this manually
            mapExtentOnChangeHandler();
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        if (mapView) {
            init();
        }
    }, [mapView]);

    return null;
};

export default MapViewEventHandlers;
