import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../configureStore';

/**
 * Select years that will be used to get the Leading and Trailing layers in Swipe Widget
 *
 * @return `[year4LeadingLayer, year4TrailingLayer]`
 */
export const selectYearsForSwipeWidgetLayers = createSelector(
    (state: RootState) => state.Map.swipeWidget.year4LeadingLayer,
    (state: RootState) => state.Map.swipeWidget.year4TrailingLayer,
    (year4LeadingLayer, year4TrailingLayer) => [
        year4LeadingLayer,
        year4TrailingLayer,
    ]
);

/**
 * Select default values (zoom and center) that will be used to initiate map
 *
 * @return `{ zoom: number, cenetr: {lat: number, lon: number} }`
 */
export const selectDefaultMapLocation = createSelector(
    (state: RootState) => state.Map.zoom,
    (state: RootState) => state.Map.center,
    (zoom, center) => {
        return {
            zoom,
            center,
        };
    }
);

export const selectMapExtent = createSelector(
    (state: RootState) => state.Map.extent,
    (extent) => extent
);

export const selectMapResolution = createSelector(
    (state: RootState) => state.Map.resolution,
    (resolution) => resolution
);

export const selectShouldShowSentinel2Layer = createSelector(
    (state: RootState) => state.Map.shouldShowSentinel2Layer,
    (shouldShowSentinel2Layer) => shouldShowSentinel2Layer
);

export const selectSelectedLandCover = createSelector(
    (state: RootState) => state.Map.selectedLandCover,
    (selectedLandCover) => selectedLandCover
);

export const selectSwipePosition = createSelector(
    (state: RootState) => state.Map.swipeWidget.position,
    (position) => position
);
