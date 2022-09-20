import {
    createSlice,
    // createSelector,
    PayloadAction,
    // createAsyncThunk
} from '@reduxjs/toolkit';

// import { RootState, StoreDispatch, StoreGetState } from '../configureStore';

export type MapState = {
    zoom?: number;
    center?: {
        lon?: number;
        lat?: number;
    };
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
    },
});

const { reducer } = slice;

export const { year4LeadingLayerUpdated, year4TrailingLayerUpdated } =
    slice.actions;

export default reducer;
