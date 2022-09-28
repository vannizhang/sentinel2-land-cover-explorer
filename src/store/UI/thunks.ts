import { dispatch } from 'd3';
import { RootState, StoreDispatch, StoreGetState } from '../configureStore';
import {
    showSwipeWidgetYearIndicatorToggled,
    TooltipData,
    tooltipDataChanged,
} from './reducer';

const DebounceDealy = 250;

let debounceTimeOut: NodeJS.Timeout;

export const updateTooltipData =
    (data: TooltipData) =>
    (dispatch: StoreDispatch, getState: StoreGetState) => {
        clearTimeout(debounceTimeOut);

        debounceTimeOut = setTimeout(() => {
            dispatch(tooltipDataChanged(data));
        }, DebounceDealy);
    };

export const toggleShowSwipeWidgetYearIndicator =
    (shouldShow: boolean) =>
    (dispatch: StoreDispatch, getState: StoreGetState) => {
        clearTimeout(debounceTimeOut);

        debounceTimeOut = setTimeout(() => {
            dispatch(showSwipeWidgetYearIndicatorToggled(shouldShow));
        }, DebounceDealy);
    };
