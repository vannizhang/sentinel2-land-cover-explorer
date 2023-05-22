import classNames from 'classnames';
import React, { FC } from 'react';
import {
    SENTINEL_2_10M_LAND_COVER_ITEM_URL,
    SENTINEL_2_ITEM_URL,
} from '../../../constants/map';
import { THEME_COLOR_LIGHT_BLUE } from '../../../constants/style';
import DownloadIcon from './DownloadIcon';
import OpenIcon from './OpenIcon';
import SaveWebMapIcon from './SaveWebMapIcon';

type LayerSelectorButtonProps = {
    /**
     * If true, the layer controlled by this button is deing displayed on the map
     */
    active?: boolean;
    onClickHandler: () => void;
    children?: React.ReactNode;
};

const BUTTON_CONATINER_CLASSNAMES = 'my-4 flex items-start';

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
    disabled?: boolean;
    landcoverButtonOnClick: () => void;
    downloadLandcoverButtonOnClick: () => void;
    imageryButtonOnClick: () => void;
    saveWebMapButtonOnClick: () => void;
};

const LayerSelector: FC<Props> = ({
    shouldShowSentinel2Layer,
    disabled,
    landcoverButtonOnClick,
    imageryButtonOnClick,
    downloadLandcoverButtonOnClick,
    saveWebMapButtonOnClick,
}: Props) => {
    return (
        <div
            className={classNames('hidden md:block mx-4 mt-0', {
                'disabled-when-animation-mode-is-on': disabled,
            })}
        >
            <div className={BUTTON_CONATINER_CLASSNAMES}>
                <LayerSelectorButton
                    onClickHandler={landcoverButtonOnClick}
                    active={!shouldShowSentinel2Layer}
                >
                    Land Cover
                </LayerSelectorButton>

                <div className="ml-2">
                    <div title="About Land Cover">
                        <OpenIcon
                            onClick={() => {
                                window.open(
                                    SENTINEL_2_10M_LAND_COVER_ITEM_URL,
                                    '_blank'
                                );
                            }}
                        />
                    </div>

                    <div
                        className="mt-2"
                        title="Launch download options for Land Cover"
                    >
                        <DownloadIcon
                            onClick={downloadLandcoverButtonOnClick}
                        />
                    </div>

                    <div
                        className="mt-2"
                        title="Launch download options for Land Cover"
                    >
                        <SaveWebMapIcon onClick={saveWebMapButtonOnClick} />
                    </div>
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
                    <div title="About Imagery">
                        <OpenIcon
                            onClick={() => {
                                window.open(SENTINEL_2_ITEM_URL, '_blank');
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LayerSelector;
