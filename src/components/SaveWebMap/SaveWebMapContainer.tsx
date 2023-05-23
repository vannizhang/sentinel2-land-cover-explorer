import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectShowSaveWebMap } from '../../store/UI/selectors';
import { SaveWebMap, WebMapMetadata } from './SaveWebMap';
import { useDispatch } from 'react-redux';
import { showSaveWebMapToggled } from '../../store/UI/reducer';
import { isAnonymouns, signIn } from '../../utils/esriOAuth';
import { saveShowSaveWebMapPanelToHashParams } from '../../utils/URLHashParams';
import { useCreateWebmap } from './useCreateWebmap';

export const SaveWebMapContainer = () => {
    const dispatch = useDispatch();

    const showSaveWebMap = useSelector(selectShowSaveWebMap);

    const [webmapMetadata, setWebMapMetadata] = useState<WebMapMetadata>();

    const { isSavingChanges, response } = useCreateWebmap(webmapMetadata);

    useEffect(() => {
        saveShowSaveWebMapPanelToHashParams(showSaveWebMap);

        if (showSaveWebMap && isAnonymouns()) {
            signIn();
            return;
        }

        if (!showSaveWebMap) {
            setWebMapMetadata(null);
        }
    }, [showSaveWebMap]);

    if (!showSaveWebMap) {
        return null;
    }

    return (
        <SaveWebMap
            isSavingChanges={isSavingChanges}
            response={response}
            saveButtonOnClick={setWebMapMetadata}
            closeButtonOnClick={() => {
                // close
                dispatch(showSaveWebMapToggled());
            }}
        />
    );
};
