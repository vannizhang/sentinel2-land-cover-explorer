import { dispatch } from 'd3';
import { RootState, StoreDispatch, StoreGetState } from '../configureStore';
import { TooltipData, tooltipDataChanged } from './reducer';

let updateTooltipDataDelay: NodeJS.Timeout;

export const updateTooltipData =
    (data: TooltipData) =>
    (dispatch: StoreDispatch, getState: StoreGetState) => {
        clearTimeout(updateTooltipDataDelay);

        updateTooltipDataDelay = setTimeout(() => {
            dispatch(tooltipDataChanged(data));
        }, 250);
    };
