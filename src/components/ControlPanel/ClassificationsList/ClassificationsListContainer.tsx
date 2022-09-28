import React, { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getLandCoverClassifications } from '../../../services/sentinel-2-10m-landcover/rasterAttributeTable';
import { selectedLandCoverChanged } from '../../../store/Map/reducer';
import { selectSelectedLandCover } from '../../../store/Map/selectors';
import { tooltipDataChanged } from '../../../store/UI/reducer';
import { updateTooltipData } from '../../../store/UI/thunks';
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
            itemOnHover={(data) => {
                dispatch(updateTooltipData(data));
            }}
        />
    );
};

export default ClassificationsListContainer;
