import React, { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getLandCoverClassifications } from '../../../services/sentinel-2-10m-landcover/rasterAttributeTable';
import { selectedLandCoverChanged } from '../../../store/Map/reducer';
import { selectSelectedLandCover } from '../../../store/Map/selectors';
import ClassificationsList from './ClassificationsList';

const ClassificationsListContainer = () => {
    const dispatch = useDispatch();

    const selectedLandCover = useSelector(selectSelectedLandCover);

    const data = useMemo(() => {
        return getLandCoverClassifications();
    }, []);

    return (
        <ClassificationsList
            selectedLandCover={selectedLandCover}
            activeLandCoverOnChange={(newVal) => {
                dispatch(selectedLandCoverChanged(newVal));
            }}
            data={data}
        />
    );
};

export default ClassificationsListContainer;
