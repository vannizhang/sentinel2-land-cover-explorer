import classNames from 'classnames';
import React, { FC } from 'react';
import {
    SENTINEL_2_10M_LAND_COVER_ITEM_URL,
    SENTINEL_2_ITEM_URL,
} from '../../../constants/map';
import { THEME_COLOR_LIGHT_BLUE } from '../../../constants/style';
import DownloadIcon from './DownloadIcon';
import OpenIcon from './OpenIcon';

type LayerSelectorButtonProps = {
    /**
     * If true, the layer controlled by this button is deing displayed on the map
     */
    active?: boolean;
    onClickHandler: () => void;
    children?: React.ReactNode;
};

const BUTTON_CONATINER_CLASSNAMES = 'my-6 flex';

const LayerSelectorButton: FC<LayerSelectorButtonProps> = ({
    active,
    onClickHandler,
    children,
}: LayerSelectorButtonProps) => {
    return (
        <div
            className={classNames(
                'p-2 px-4 border w-36 shrink-0 text-sm md:text-base border-custom-light-blue border-opacity-50 uppercase cursor-pointer text-center',
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
    downloadLandcoverButtonOnClick: () => void;
    imageryButtonOnClick: () => void;
};

const LayerSelector: FC<Props> = ({
    shouldShowSentinel2Layer,
    landcoverButtonOnClick,
    imageryButtonOnClick,
    downloadLandcoverButtonOnClick,
}: Props) => {
    return (
        <div className="mx-4 mt-5">
            <div className={BUTTON_CONATINER_CLASSNAMES}>
                <LayerSelectorButton
                    onClickHandler={landcoverButtonOnClick}
                    active={!shouldShowSentinel2Layer}
                >
                    Land Cover
                </LayerSelectorButton>

                <div className="ml-2">
                    <OpenIcon
                        onClick={() => {
                            window.open(
                                SENTINEL_2_10M_LAND_COVER_ITEM_URL,
                                '_blank'
                            );
                        }}
                    />

                    <DownloadIcon onClick={downloadLandcoverButtonOnClick} />
                </div>
            </div>

            <div className={BUTTON_CONATINER_CLASSNAMES}>
                <LayerSelectorButton
                    onClickHandler={imageryButtonOnClick}
                    active={shouldShowSentinel2Layer}
                >
                    Imagery
                </LayerSelectorButton>

                <div className="ml-2">
                    <OpenIcon
                        onClick={() => {
                            window.open(SENTINEL_2_ITEM_URL, '_blank');
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default LayerSelector;
