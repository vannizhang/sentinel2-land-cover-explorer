import React, { FC, useEffect, useRef } from 'react';

import IMapView from 'esri/views/MapView';
import IFeatureLayer from 'esri/layers/FeatureLayer';
import IPoint from 'esri/geometry/Point';
import IGraphic from 'esri/Graphic';

type Props = {
    availableYears?: number[];
    mapView?: IMapView;
};

const LulcFootprintsLayer: FC<Props> = ({ availableYears, mapView }: Props) => {
    const layerRef = useRef<IFeatureLayer>();

    const init = () => {
        layerRef.current = mapView.map.allLayers.find(
            (layer) => layer.title === 'LULC Footprints'
        ) as IFeatureLayer;

        // It's necessary to overwrite the default click for the popup
        // behavior in order to display your own popup
        mapView.popup.autoOpenEnabled = false;
        mapView.popup.dockEnabled = false;

        mapView.on('click', (evt) => {
            queryFeature(evt.mapPoint);
        });
    };

    const getMainContent = (feature: IGraphic) => {
        const popupDiv = document.createElement('div');

        const { attributes } = feature;

        const size = (attributes.FileSize / 1000).toFixed(0);
        const imageName = attributes.ImageName;

        const links = availableYears
            .sort((a, b) => b - a)
            .map((year) => {
                return `
                    <div class='mb-1 text-sm'>
                        <a href="" target="_blank">
                            <div class="flex items-center group">
                                <svg xmlns="http://www.w3.org/2000/svg" class="opacity-0 group-hover:opacity-95" viewBox="0 0 16 16" height="16" width="16"><path fill="currentColor" d="M9 2v7.293l1.618-1.619.707.707-2.808 2.81-2.81-2.81.707-.707L8 9.26V2zM4 14h9v-1H4z"/><path fill="none" d="M0 0h16v16H0z"/></svg>
                                <span class='ml-2'>${year}</span>
                            </div>
                        </a>
                    </div>
                `;
            })
            .join('');

        popupDiv.innerHTML = `
            <div class="text-custom-light-blue">
                <div class="my-2">
                    <p>Approximate Size: ${size} MB</p>
                </div>
                <div class='flex'>
                    <div class='mt-2 ml-2'>
                        ${links}
                    </div>
                </div>
            </div>
        `;

        return popupDiv;
    };

    const queryFeature = async (mapPoint: IPoint) => {
        if (!layerRef.current) {
            return;
        }

        const featureSet = await layerRef.current.queryFeatures({
            geometry: mapPoint,
            spatialRelationship: 'intersects',
            returnGeometry: false,
            returnQueryGeometry: true,
            outFields: ['*'],
            num: 1,
        });

        if (!featureSet || !featureSet.features.length) {
            return;
        }

        mapView.popup.open({
            location: mapPoint,
            // features: featureSet.features,
            // featureMenuOpen: true
            title: 'Download',
            content: getMainContent(featureSet?.features[0]),
        });

        console.log(featureSet);
    };

    useEffect(() => {
        if (mapView) {
            init();
        }
    }, [mapView]);

    return null;
};

export default LulcFootprintsLayer;
