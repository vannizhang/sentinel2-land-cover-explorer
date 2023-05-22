import React from 'react';
import { useSelector } from 'react-redux';
import { selectShowSaveWebMap } from '../../store/UI/selectors';
import { SaveWebMap } from './SaveWebMap';
import { useDispatch } from 'react-redux';
import { showSaveWebMapToggled } from '../../store/UI/reducer';

export const SaveWebMapContainer = () => {
    const dispatch = useDispatch();

    const showSaveWebMap = useSelector(selectShowSaveWebMap);

    if (!showSaveWebMap) {
        return null;
    }

    return (
        <SaveWebMap
            data={{
                title: '',
                tags: [],
                description: '',
            }}
            saveButtonOnClick={() => {
                // save
            }}
            closeButtonOnClick={() => {
                // close
                dispatch(showSaveWebMapToggled());
            }}
        />
    );
};
