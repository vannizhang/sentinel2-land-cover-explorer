import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../configureStore';

export const selectShowInfoPanel = createSelector(
    (state: RootState) => state.UI.showInfoPanel,
    (showInfoPanel) => showInfoPanel
);

export const selectTooltipXPosition = createSelector(
    (state: RootState) => state.UI.tooltipXPosition,
    (tooltipXPosition) => tooltipXPosition
);

export const selectTooltipData = createSelector(
    (state: RootState) => state.UI.tooltipData,
    (tooltipData) => tooltipData
);

export const selectShowSwipeWidgetYearIndicator = createSelector(
    (state: RootState) => state.UI.showSwipeWidgetYearIndicator,
    (showSwipeWidgetYearIndicator) => showSwipeWidgetYearIndicator
);
