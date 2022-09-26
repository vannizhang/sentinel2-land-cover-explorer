import classNames from 'classnames';
import React, { FC } from 'react';
import { THEME_COLOR_LIGHT_BLUE } from '../../../constants/style';

type LayerSelectorButtonProps = {
    /**
     * If true, the layer controlled by this button is deing displayed on the map
     */
    active?: boolean;
    onClickHandler: () => void;
    children?: React.ReactNode;
};

const LayerSelectorButton: FC<LayerSelectorButtonProps> = ({
    active,
    onClickHandler,
    children,
}: LayerSelectorButtonProps) => {
    return (
        <div
            className={classNames(
                'p-2 px-4 border my-6 text-sm md:text-base border-custom-light-blue border-opacity-50 uppercase cursor-pointer',
                {
                    'bg-custom-light-blue': active,
                    'text-custom-background': active,
                    'bg-custom-background': !active,
                    'text-custom-light-blue': !active,
                }
            )}
            style={{
                filter: active
                    ? `drop-shadow(1px 1px 4px rgba(191,238,255, .5))`
                    : 'none',
            }}
            onClick={onClickHandler}
        >
            {children}
        </div>
    );
};

type Props = {
    shouldShowSentinel2Layer: boolean;
    landcoverButtonOnClick: () => void;
    imageryButtonOnClick: () => void;
};

const LayerSelector: FC<Props> = ({
    shouldShowSentinel2Layer,
    landcoverButtonOnClick,
    imageryButtonOnClick,
}: Props) => {
    return (
        <div className="mx-4 mt-5">
            <LayerSelectorButton
                onClickHandler={imageryButtonOnClick}
                active={shouldShowSentinel2Layer}
            >
                Imagery
            </LayerSelectorButton>

            <LayerSelectorButton
                onClickHandler={landcoverButtonOnClick}
                active={!shouldShowSentinel2Layer}
            >
                Land Cover
            </LayerSelectorButton>
        </div>
    );
};

export default LayerSelector;
