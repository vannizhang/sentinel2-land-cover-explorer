import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectShowSaveWebMap } from '../../store/UI/selectors';
import { SaveWebMap, WebMapMetadata } from './SaveWebMap';
import { useDispatch } from 'react-redux';
import { showSaveWebMapToggled } from '../../store/UI/reducer';
import { isAnonymouns, signIn } from '../../utils/esriOAuth';
import { saveShowSaveWebMapPanelToHashParams } from '../../utils/URLHashParams';
import { createWebMap } from './createWebMap';

export const SaveWebMapContainer = () => {
    const dispatch = useDispatch();

    const showSaveWebMap = useSelector(selectShowSaveWebMap);

    const saveButtonOnClickHandler = async (data: WebMapMetadata) => {
        try {
            await createWebMap({
                title: data?.title,
                tags: data?.tags,
            });
        } catch (err) {
            console.log(err);
        }
    };

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
            saveButtonOnClick={saveButtonOnClickHandler}
            closeButtonOnClick={() => {
                // close
                dispatch(showSaveWebMapToggled());
            }}
        />
    );
};
