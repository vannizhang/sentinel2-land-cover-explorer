import React from 'react';
import LandcoverGraph from './LandcoverGraph/LandcoverGraphContainer';
import { useSelector } from 'react-redux';
import { selectShowInfoPanel } from '../../store/UI/selectors';
import Header from './Header/Header';
import { useDispatch } from 'react-redux';
import { showInfoPanelToggled } from '../../store/UI/reducer';

const InfoPanel = () => {
    const dispatch = useDispatch();

    const showInfoPanel = useSelector(selectShowInfoPanel);

    if (!showInfoPanel) {
        return null;
    }

    return (
        <div className="absolute top-0 left-0 w-screen h-screen flex justify-center items-center z-20">
            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-90 z-0"></div>
            <div
                className="h-1/2 w-full px-10"
                style={{
                    maxWidth: 1600,
                }}
            >
                <Header
                    closeButtonOnClick={() => {
                        dispatch(showInfoPanelToggled(false));
                    }}
                />
                <LandcoverGraph />
            </div>
        </div>
    );
};

export default InfoPanel;
