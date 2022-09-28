import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { tooltipXPositionChanged } from '../store/UI/reducer';

const useGetTooltipPositionOnHover = (
    ref: React.MutableRefObject<HTMLDivElement>
) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const onEnter = (event: MouseEvent) => {
            const { x } = ref.current.getBoundingClientRect();
            dispatch(tooltipXPositionChanged(x));
        };

        const onLeave = (event: MouseEvent) => {
            dispatch(tooltipXPositionChanged(null));
        };

        ref.current.addEventListener('mouseenter', onEnter);
        ref.current.addEventListener('mouseleave', onLeave);
        // document.addEventListener('touchstart', listener);

        return () => {
            ref.current.removeEventListener('mousedown', onEnter);
            ref.current.removeEventListener('mouseleave', onLeave);
        };
    }, [ref]);
};

export default useGetTooltipPositionOnHover;
