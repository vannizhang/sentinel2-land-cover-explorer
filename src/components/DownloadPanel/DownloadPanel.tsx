import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { DWONLOAD_MODE_WEB_MAP_ID } from '../../constants/map';
import { selectMapCenterAndZoom } from '../../store/Map/selectors';
import { showDownloadPanelToggled } from '../../store/UI/reducer';
import { selectShowDownloadPanel } from '../../store/UI/selectors';
import MapView from '../MapView/MapView';
import Header from './Header';

const DownloadPanel = () => {
    const dispatch = useDispatch();

    const showDownloadPanel = useSelector(selectShowDownloadPanel);

    const { center, zoom } = useSelector(selectMapCenterAndZoom);

    if (showDownloadPanel === false) {
        return null;
    }

    return (
        <div className="absolute top-0 left-0 w-screen h-screen flex justify-center items-center bg-custom-background-95 z-20">
            <div
                className="h-2/3 w-full px-10 flex flex-col"
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
                    />
                </div>
            </div>
        </div>
    );
};

export default DownloadPanel;
