import IExtent from 'esri/geometry/Extent';
import { Sentinel2RasterFunction } from '../ControlPanel/Sentinel2LayerRasterFunctionsList/Sentinel2LayerRasterFunctionsListContainer';
import {
    SENTINEL_2_IMAGE_SERVICE_FIELD_NAMES,
    SENTINEL_2_IMAGE_SERVICE_URL,
} from './config';

type ExportImageParams = {
    /**
     * Map Extent
     */
    extent: IExtent;
    /**
     * width of map container
     */
    width: number;
    /**
     * height of map container
     */
    height: number;
    /**
     * the year that will be used as time filter
     */
    year: number;
    /**
     * the year that will be used as time filter
     */
    month: number;
    /**
     * Sentinel 2 layer raster function name that will be used in the rendering rule
     */
    rasterFunctionName: Sentinel2RasterFunction;
};

export const exportImage = async ({
    extent,
    width,
    height,
    year,
    month,
    rasterFunctionName,
}: ExportImageParams) => {
    const { xmin, xmax, ymin, ymax } = extent;

    const params = new URLSearchParams({
        f: 'image',
        bbox: `${xmin},${ymin},${xmax},${ymax}`,
        bboxSR: '102100',
        imageSR: '102100',
        size: `${width},${height}`,
        format: 'jpgpng',
        mosaicRule: JSON.stringify({
            ascending: true,
            mosaicMethod: 'esriMosaicAttribute',
            sortField: SENTINEL_2_IMAGE_SERVICE_FIELD_NAMES.AcquisitionDate,
            sortValue: `${year}/${month}/15`,
            where: '(category = 2) OR (CloudCover < 0.1)',
        }),
        renderingRule: JSON.stringify({ rasterFunction: rasterFunctionName }),
    });

    const requestURL = `${SENTINEL_2_IMAGE_SERVICE_URL}/exportImage?${params.toString()}`;

    const res = await fetch(requestURL);

    const blob = await res.blob();

    return blob;
};
