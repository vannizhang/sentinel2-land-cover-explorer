import React from 'react';

import { loadModules } from 'esri-loader';
import IMapView from 'esri/views/MapView';
import IExtent from 'esri/geometry/Extent';
import IGraphic from 'esri/Graphic';
import ISearchWidget from 'esri/widgets/Search';

type SearchResult = {
    extent: IExtent;
    feature: IGraphic;
    name: string;
    target: string;
};

type Props = {
    containerId?: string;
    mapView?: IMapView;
    searchCompletedHandler?: (result: SearchResult) => void;
};

const SearchWidget: React.FC<Props> = ({
    containerId,
    mapView,
    searchCompletedHandler,
}: Props) => {
    const init = async () => {
        type Modules = [typeof ISearchWidget];

        try {
            const [Search] = await (loadModules([
                'esri/widgets/Search',
            ]) as Promise<Modules>);

            const searchWidget = new Search({
                view: mapView,
                resultGraphicEnabled: false,
                popupEnabled: false,
                container: containerId,
            });

            mapView.ui.add(searchWidget, 'top-right');

            if (searchCompletedHandler) {
                searchWidget.on('search-complete', (evt) => {
                    if (
                        searchWidget.results[0] &&
                        searchWidget?.results[0]?.results[0]
                    ) {
                        const searchResult: SearchResult =
                            searchWidget.results[0].results[0];
                        // console.log(searchResultGeom);
                        searchCompletedHandler(searchResult);
                    }
                });
            }
        } catch (err) {
            console.error(err);
        }
    };

    React.useEffect(() => {
        if (mapView) {
            init();
        }
    }, [mapView]);

    return null;
};

export default SearchWidget;
