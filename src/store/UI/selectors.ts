import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../configureStore';

export const selectShowInfoPanel = createSelector(
    (state: RootState) => state.UI.showInfoPanel,
    (showInfoPanel) => showInfoPanel
);
