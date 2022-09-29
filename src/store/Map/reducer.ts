import {
    createSlice,
    // createSelector,
    PayloadAction,
    // createAsyncThunk
} from '@reduxjs/toolkit';
import { LandCoverClassification } from '../../services/sentinel-2-10m-landcover/rasterAttributeTable';

// import { RootState, StoreDispatch, StoreGetState } from '../configureStore';

export type MapExtent = {
    spatialReference?: {
        latestWkid?: number;
        wkid?: number;
    };
    xmin?: number;
    xmax?: number;
    ymin?: number;
    ymax?: number;
};

export type MapCenter = {
    lon?: number;
    lat?: number;
};

export type MapState = {
    /**
     * If true, show Sentinel 2 Layer instead of Land Cover Layer
     */
    shouldShowSentinel2Layer?: boolean;
    /**
     * Represents the level of detail (LOD) at the center of the view.
     */
    zoom?: number;
    /**
     * Represents the view's center point
     */
    center?: MapCenter;
    /**
     * Represents the size of one pixel in map units.
     * The value of resolution can be found by dividing the extent width by the view's width.
     */
    resolution?: number;
    /**
     * The extent represents the visible portion of a map within the view as an instance of Extent.
     */
    extent?: MapExtent;
    swipeWidget?: {
        year4LeadingLayer?: number;
        year4TrailingLayer?: number;
        position?: number;
    };
    /**
     * The active Land Cover type selected by the user that will be used to
     * get the raster functions to filter the Land Cover layer
     */
    selectedLandCover?: LandCoverClassification;
    /**
     * If true, Map Reference Labels layer will be on
     */
    showMapLabel?: boolean;
    /**
     * If true, Terrain Layer will be on
     */
    showTerrain?: boolean;
};

export const initialMapState: MapState = {
    shouldShowSentinel2Layer: false,
    zoom: 10,
    center: null,
    resolution: null,
    extent: null,
    swipeWidget: null,
    selectedLandCover: null,
    showMapLabel: true,
    showTerrain: true,
};

const slice = createSlice({
    name: 'Map',
    initialState: initialMapState,
    reducers: {
        year4LeadingLayerUpdated: (state, action: PayloadAction<number>) => {
            state.swipeWidget.year4LeadingLayer = action.payload;
        },
        year4TrailingLayerUpdated: (state, action: PayloadAction<number>) => {
            state.swipeWidget.year4TrailingLayer = action.payload;
        },
        resolutionUpdated: (state, action: PayloadAction<number>) => {
            state.resolution = action.payload;
        },
        extentUpdated: (state, action: PayloadAction<MapExtent>) => {
            state.extent = action.payload;
        },
        shouldShowSentinel2LayerToggled: (
            state,
            action: PayloadAction<boolean>
        ) => {
            state.shouldShowSentinel2Layer = action.payload;
        },
        selectedLandCoverChanged: (
            state,
            action: PayloadAction<LandCoverClassification>
        ) => {
            state.selectedLandCover = action.payload;
        },
        swipePositionChanged: (state, action: PayloadAction<number>) => {
            state.swipeWidget.position = action.payload;
        },
        showMapLabelToggled: (state) => {
            state.showMapLabel = !state.showMapLabel;
        },
        showTerrainToggled: (state) => {
            state.showTerrain = !state.showTerrain;
        },
    },
});

const { reducer } = slice;

export const {
    year4LeadingLayerUpdated,
    year4TrailingLayerUpdated,
    resolutionUpdated,
    extentUpdated,
    shouldShowSentinel2LayerToggled,
    selectedLandCoverChanged,
    swipePositionChanged,
    showMapLabelToggled,
    showTerrainToggled,
} = slice.actions;

export default reducer;
