import './style.css';
import React, { FC, useEffect } from 'react';
import IMapView from 'esri/views/MapView';
import IPoint from 'esri/geometry/Point';
import { LandcoverClassificationData } from '../../services/sentinel-2-10m-landcover/rasterAttributeTable';
import {
    identifyLandcoverClassificationsByLocation,
    LandcoverClassificationsByYear,
} from '../../services/sentinel-2-10m-landcover/identifyTask';

type Props = {
    mapView?: IMapView;
};

const Popup: FC<Props> = ({ mapView }: Props) => {
    const getLoadingIndicator = () => {
        const popupDiv = document.createElement('div');
        popupDiv.innerHTML = `<calcite-loader active scale="s"></calcite-loader>`;
        return popupDiv;
    };

    const getMainContent = (items: LandcoverClassificationsByYear[]) => {
        const popupDiv = document.createElement('div');

        const elementsAsHtmlString: string[] = items
            .sort((a, b) => b.year - a.year)
            .map((item) => {
                const { year, data } = item;

                const [R, G, B] = data.Color;

                const backgroundColor = `rgb(${R}, ${G}, ${B})`;

                return `
                <div class='flex text-custom-light-blue my-2 items-center'>
                    <span>${year}</span>
                    <div class='rounded-full w-4 h-4 border-2 border-white mx-2' style="background-color:${backgroundColor};"></div>
                    <span>${data.ClassName}</span>
                </div>
            `;
            });

        popupDiv.innerHTML = `
            <div class='flex justify-center'>
                <div>
                    ${elementsAsHtmlString.join('')}
                </div>
            </div>
        `;

        return popupDiv;
    };

    const openPopup4LandCoverData = async (mapPoint: IPoint) => {
        const lat = Math.round(mapPoint.latitude * 1000) / 1000;
        const lon = Math.round(mapPoint.longitude * 1000) / 1000;
        const title = `Lat ${lat}, Lon ${lon}`;

        mapView.popup.open({
            title,
            location: mapPoint,
            content: getLoadingIndicator(),
        });

        const res = await identifyLandcoverClassificationsByLocation(mapPoint);

        mapView.popup.open({
            // Set the popup's title to the coordinates of the location
            title,
            location: mapPoint, // Set the location of the popup to the clicked location
            content: getMainContent(res),
        });
    };

    const init = async () => {
        // It's necessary to overwrite the default click for the popup
        // behavior in order to display your own popup
        mapView.popup.autoOpenEnabled = false;
        mapView.popup.dockEnabled = false;

        mapView.on('click', async (evt) => {
            openPopup4LandCoverData(evt.mapPoint);
        });
    };

    useEffect(() => {
        if (mapView) {
            init();
        }
    }, [mapView]);

    return null;
};

export default Popup;
