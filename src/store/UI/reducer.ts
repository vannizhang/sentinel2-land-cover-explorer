import {
    createSlice,
    // createSelector,
    PayloadAction,
    // createAsyncThunk
} from '@reduxjs/toolkit';

// import { RootState, StoreDispatch, StoreGetState } from '../configureStore';

export type TooltipData = {
    title?: string;
    content?: string;
};

export type UIState = {
    /**
     * If true, open info panel that shows detailed land cover info
     */
    showInfoPanel?: boolean;
    /**
     * The X Position (relative to page) of Tooltip for Control Panel
     */
    tooltipXPosition?: number;
    /**
     * The data that will be shown in the Tooltip
     */
    tooltipData?: TooltipData;
    /**
     * If true, show leading and trailing year in Swipe Widget Reference Info Component
     */
    showSwipeWidgetYearIndicator?: boolean;
};

export const initialUIState: UIState = {
    showInfoPanel: false,
    tooltipXPosition: 0,
    tooltipData: null,
    showSwipeWidgetYearIndicator: false,
};

const slice = createSlice({
    name: 'UI',
    initialState: initialUIState,
    reducers: {
        showInfoPanelToggled: (state, action: PayloadAction<boolean>) => {
            state.showInfoPanel = action.payload;
        },
        tooltipXPositionChanged: (state, action: PayloadAction<number>) => {
            state.tooltipXPosition = action.payload;
        },
        tooltipDataChanged: (state, action: PayloadAction<TooltipData>) => {
            state.tooltipData = action.payload;
        },
        showSwipeWidgetYearIndicatorToggled: (
            state,
            action: PayloadAction<boolean>
        ) => {
            state.showSwipeWidgetYearIndicator = action.payload;
        },
    },
});

const { reducer } = slice;

export const {
    showInfoPanelToggled,
    tooltipXPositionChanged,
    tooltipDataChanged,
    showSwipeWidgetYearIndicatorToggled,
} = slice.actions;

export default reducer;
