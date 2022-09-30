import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { DWONLOAD_MODE_WEB_MAP_ID } from '../../constants/map';
import { getAvailableYears } from '../../services/sentinel-2-10m-landcover/timeInfo';
import { selectMapCenterAndZoom } from '../../store/Map/selectors';
import { showDownloadPanelToggled } from '../../store/UI/reducer';
import { selectShowDownloadPanel } from '../../store/UI/selectors';
import { saveDonwloadModeToHashParams } from '../../utils/URLHashParams';
import MapView from '../MapView/MapView';
import Header from './Header';
import LulcFootprintsLayer from './LulcFootprintsLayer';

const DownloadPanel = () => {
    const dispatch = useDispatch();

    const showDownloadPanel = useSelector(selectShowDownloadPanel);

    const { center } = useSelector(selectMapCenterAndZoom);

    const availableYears = getAvailableYears();

    useEffect(() => {
        saveDonwloadModeToHashParams(showDownloadPanel);
    }, [showDownloadPanel]);

    if (showDownloadPanel === false) {
        return null;
    }

    return (
        <div className="download-panel absolute top-0 left-0 w-screen h-screen flex justify-center items-center bg-custom-background-95 z-20">
            <div
                className="h-4/5 w-full px-10 flex flex-col"
                style={{
                    maxWidth: 1600,
                }}
            >
                <Header
                    closeButtonOnClick={() => {
                        dispatch(showDownloadPanelToggled(false));
                    }}
                />

                <div className="relative w-full flex-grow">
                    <MapView
                        webmapId={DWONLOAD_MODE_WEB_MAP_ID}
                        center={[center.lon, center.lat]}
                        zoom={5}
                    >
                        <LulcFootprintsLayer availableYears={availableYears} />
                    </MapView>
                </div>
            </div>
        </div>
    );
};

export default DownloadPanel;
