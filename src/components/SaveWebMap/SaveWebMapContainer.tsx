import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectShowSaveWebMap } from '../../store/UI/selectors';
import { SaveWebMap } from './SaveWebMap';
import { useDispatch } from 'react-redux';
import { showSaveWebMapToggled } from '../../store/UI/reducer';
import { isAnonymouns, signIn } from '../../utils/esriOAuth';
import { saveShowSaveWebMapPanelToHashParams } from '../../utils/URLHashParams';

export const SaveWebMapContainer = () => {
    const dispatch = useDispatch();

    const showSaveWebMap = useSelector(selectShowSaveWebMap);

    useEffect(() => {
        saveShowSaveWebMapPanelToHashParams(showSaveWebMap);

        if (showSaveWebMap && isAnonymouns()) {
            signIn();
        }
    }, [showSaveWebMap]);

    if (!showSaveWebMap) {
        return null;
    }

    return (
        <SaveWebMap
            saveButtonOnClick={(data) => {
                // save
            }}
            closeButtonOnClick={() => {
                // close
                dispatch(showSaveWebMapToggled());
            }}
        />
    );
};
