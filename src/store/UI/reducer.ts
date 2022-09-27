import {
    createSlice,
    // createSelector,
    PayloadAction,
    // createAsyncThunk
} from '@reduxjs/toolkit';

// import { RootState, StoreDispatch, StoreGetState } from '../configureStore';

export type UIState = {
    showInfoPanel?: boolean;
};

export const initialUIState: UIState = {
    showInfoPanel: false,
};

const slice = createSlice({
    name: 'UI',
    initialState: initialUIState,
    reducers: {
        showInfoPanelToggled: (state, action: PayloadAction<boolean>) => {
            state.showInfoPanel = action.payload;
        },
    },
});

const { reducer } = slice;

export const { showInfoPanelToggled } = slice.actions;

export default reducer;
