import React, { useMemo } from 'react';
import { getLandCoverClassifications } from '../../../services/sentinel-2-10m-landcover/rasterAttributeTable';
import ClassificationsList from './ClassificationsList';

const ClassificationsListContainer = () => {
    const data = useMemo(() => {
        return getLandCoverClassifications();
    }, []);

    return <ClassificationsList data={data} />;
};

export default ClassificationsListContainer;
