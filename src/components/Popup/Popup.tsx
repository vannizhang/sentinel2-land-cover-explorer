import './style.css';
import React, { FC, useCallback, useEffect, useRef } from 'react';
import IMapView from 'esri/views/MapView';
import IPoint from 'esri/geometry/Point';
import { LandcoverClassificationData } from '../../services/sentinel-2-10m-landcover/rasterAttributeTable';
import {
    identifyLandcoverClassificationsByLocation,
    LandcoverClassificationsByYear,
} from '../../services/sentinel-2-10m-landcover/identifyTask';
import { identify } from '../Sentinel2Layer/identify';
import { useSelector } from 'react-redux';
import {
    selectIsFilterbyTime4Sentinel2LayerDisabled,
    selectSentinel2AquisitionMonth,
    selectSentinel2RasterFunction,
    selectShouldShowSentinel2Layer,
    selectYear,
} from '../../store/Map/selectors';
import { format } from 'date-fns';

type Props = {
    mapView?: IMapView;
};

type MapViewOnClickHandler = (mapPoint: IPoint) => void;

const Popup: FC<Props> = ({ mapView }: Props) => {
    const isFilterbyTime4Sentinel2LayerDisabled = useSelector(
        selectIsFilterbyTime4Sentinel2LayerDisabled
    );

    const shouldShowSentinel2Layer = useSelector(
        selectShouldShowSentinel2Layer
    );

    const rasterFunction = useSelector(selectSentinel2RasterFunction);

    const aquisitionMonth = useSelector(selectSentinel2AquisitionMonth);

    const aquisitionYear = useSelector(selectYear);

    const mapViewOnClickHandlerRef = useRef<MapViewOnClickHandler>();

    const getLoadingIndicator = () => {
        const popupDiv = document.createElement('div');
        popupDiv.innerHTML = `<calcite-loader active scale="s"></calcite-loader>`;
        return popupDiv;
    };

    const getMainContent = (
        landCoverData: LandcoverClassificationsByYear[],
        acquisitionDate?: number
    ) => {
        const popupDiv = document.createElement('div');

        const htmlString4AcquisitionDate = acquisitionDate
            ? `
            <div class='mx-5 mt-2 text-center pb-2 mb-2 border-b border-custom-light-blue-50'>
                <span>Sentinel-2 L2A image acquired ${format(
                    acquisitionDate,
                    'MMM dd, yyyy'
                )}</span>
            </div>
        `
            : '';

        const htmlString4LandCoverData: string[] = landCoverData
            .sort((a, b) => b.year - a.year)
            .map((item) => {
                const { year, data } = item;

                const [R, G, B] = data.Color;

                const backgroundColor = `rgb(${R}, ${G}, ${B})`;

                return `
                <div class='flex my-2 items-center'>
                    <div class='active-year-indicator rounded-full mr-2 bg-custom-light-blue-80 ${
                        year !== aquisitionYear ? 'opacity-0' : ''
                    }'></div>
                    <span>${year}</span>
                    <div class='rounded-full w-4 h-4 border-2 border-white mx-2' style="background-color:${backgroundColor};"></div>
                    <span>${data.ClassName}</span>
                </div>
            `;
            });

        popupDiv.innerHTML = `
            <div class='text-custom-light-blue'>
                ${htmlString4AcquisitionDate}
                <div class='flex justify-center'>
                    <div>
                        ${htmlString4LandCoverData.join('')}
                    </div>
                </div>
            </div>
        `;

        return popupDiv;
    };

    // const openPopup4LandCoverData = async (mapPoint: IPoint) => {
    //     const lat = Math.round(mapPoint.latitude * 1000) / 1000;
    //     const lon = Math.round(mapPoint.longitude * 1000) / 1000;
    //     const title = `Lat ${lat}, Lon ${lon}`;

    //     mapView.popup.open({
    //         title,
    //         location: mapPoint,
    //         content: getLoadingIndicator(),
    //     });

    //     const res = await identifyLandcoverClassificationsByLocation(mapPoint);

    //     mapView.popup.open({
    //         // Set the popup's title to the coordinates of the location
    //         title,
    //         location: mapPoint, // Set the location of the popup to the clicked location
    //         content: getMainContent(res),
    //     });
    // };

    mapViewOnClickHandlerRef.current = async (mapPoint: IPoint) => {
        const lat = Math.round(mapPoint.latitude * 1000) / 1000;
        const lon = Math.round(mapPoint.longitude * 1000) / 1000;
        const title = `Lat ${lat}, Lon ${lon}`;

        mapView.popup.open({
            title,
            location: mapPoint,
            content: getLoadingIndicator(),
        });

        const landCoverData = await identifyLandcoverClassificationsByLocation(
            mapPoint
        );

        // acquisition date (in unix timestamp) of sentinel-2 imagery this is displayed on map
        let acquisitionDate: number = null;

        if (
            shouldShowSentinel2Layer &&
            !isFilterbyTime4Sentinel2LayerDisabled
        ) {
            const identifyTaskRes = await identify({
                geometry: mapPoint,
                resolution: mapView.resolution,
                rasterFunction,
                year: aquisitionYear,
                month: aquisitionMonth,
            });

            if (
                identifyTaskRes.catalogItems &&
                identifyTaskRes.catalogItems.features
            ) {
                acquisitionDate =
                    identifyTaskRes?.catalogItems?.features[0]?.attributes
                        .acquisitiondate;
            }
        }

        mapView.popup.open({
            // Set the popup's title to the coordinates of the location
            title,
            location: mapPoint, // Set the location of the popup to the clicked location
            content: getMainContent(landCoverData, acquisitionDate),
        });
    };

    const init = async () => {
        // It's necessary to overwrite the default click for the popup
        // behavior in order to display your own popup
        mapView.popup.autoOpenEnabled = false;
        mapView.popup.dockEnabled = false;

        mapView.on('click', async (evt) => {
            mapViewOnClickHandlerRef.current(evt.mapPoint);
        });
    };

    useEffect(() => {
        if (mapView) {
            init();
        }
    }, [mapView]);

    useEffect(() => {
        if (mapView) {
            mapView.popup.close();
        }
    }, [
        aquisitionYear,
        aquisitionMonth,
        shouldShowSentinel2Layer,
        isFilterbyTime4Sentinel2LayerDisabled,
    ]);

    return null;
};

export default Popup;
