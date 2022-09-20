import {
    createSlice,
    // createSelector,
    PayloadAction,
    // createAsyncThunk
} from '@reduxjs/toolkit';

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

export type MapState = {
    /**
     * Represents the level of detail (LOD) at the center of the view.
     */
    zoom?: number;
    /**
     * Represents the view's center point
     */
    center?: {
        lon?: number;
        lat?: number;
    };
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
    };
};

export const initialMapState: MapState = {
    zoom: 10,
    center: {
        lon: -117.2,
        lat: 34.06,
    },
    resolution: null,
    extent: null,
    swipeWidget: {
        year4LeadingLayer: 2007,
        year4TrailingLayer: 2021,
    },
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
    },
});

const { reducer } = slice;

export const {
    year4LeadingLayerUpdated,
    year4TrailingLayerUpdated,
    resolutionUpdated,
    extentUpdated,
} = slice.actions;

export default reducer;
