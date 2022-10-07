import React, { useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getLandCoverClassifications } from '../../../services/sentinel-2-10m-landcover/rasterAttributeTable';
import { activeLandCoverTypeChanged } from '../../../store/Map/reducer';
import { selectActiveLandCoverType } from '../../../store/Map/selectors';
import { tooltipDataChanged } from '../../../store/UI/reducer';
import { selectAnimationMode } from '../../../store/UI/selectors';
import { updateTooltipData } from '../../../store/UI/thunks';
import { saveActiveLandCoverTypeToHashParams } from '../../../utils/URLHashParams';
import ClassificationsList from './ClassificationsList';

const ClassificationsListContainer = () => {
    const dispatch = useDispatch();

    const activeLandCoverType = useSelector(selectActiveLandCoverType);

    const animationMode = useSelector(selectAnimationMode);

    const data = useMemo(() => {
        return getLandCoverClassifications();
    }, []);

    useEffect(() => {
        saveActiveLandCoverTypeToHashParams(activeLandCoverType);
    }, [activeLandCoverType]);

    return (
        <ClassificationsList
            selectedLandCover={activeLandCoverType}
            disabled={animationMode !== null}
            activeLandCoverOnChange={(newVal) => {
                dispatch(activeLandCoverTypeChanged(newVal));
            }}
            data={data}
            itemOnHover={(data) => {
                dispatch(updateTooltipData(data));
            }}
        />
    );
};

export default ClassificationsListContainer;
