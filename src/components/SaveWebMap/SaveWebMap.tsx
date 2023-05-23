import './style.css';
import React, { FC, useEffect, useRef, useState } from 'react';
import CloseBtn from '../CloseBtn/CloseBtn';
import classNames from 'classnames';
import { CreateWebMapResponse } from './createWebMap';
import { getPortalBaseUrl } from '../../utils/esriOAuth';

export type WebMapMetadata = {
    /**
     * title of the webmap
     */
    title?: string;
    /**
     * comma-saparated tags
     */
    tags?: string;
    /**
     * summary text
     */
    summary?: string;
};

type Props = {
    response?: CreateWebMapResponse;
    /**
     * if true, it is in process of saving the webmap
     */
    isSavingChanges?: boolean;
    saveButtonOnClick: (data: WebMapMetadata) => void;
    closeButtonOnClick: () => void;
};

type TextInputProps = {
    title: string;
    value: string;
    isRequired?: boolean;
    // shouldUseTextArea?: boolean;
    onChange: (val: string) => void;
};

const ButtonClassNames =
    'p-1 px-2 mx-2 border border-custom-light-blue-80 text-lg text-custom-light-blue cursor-pointer uppercase text-center';

const TextInput: FC<TextInputProps> = ({
    title,
    value,
    isRequired = false,
    // shouldUseTextArea=false,
    onChange,
}: TextInputProps) => {
    const calciteInputRef = useRef<any>();

    useEffect(() => {
        // const eventName = shouldUseTextArea
        //     ? 'calciteTextAreaInput'
        //     : 'calciteInputTextInput'

        calciteInputRef.current.addEventListener(
            'calciteInputTextInput',
            (evt: any) => {
                onChange(evt.target?.value);
            }
        );
    }, []);

    return (
        <div className="mb-4">
            <h4 className=" text-custom-light-blue">
                {title}
                {isRequired ? '*' : ''}
            </h4>

            <calcite-input-text value={value} ref={calciteInputRef} />
        </div>
    );
};

export const SaveWebMap: FC<Props> = ({
    response,
    isSavingChanges = false,
    saveButtonOnClick,
    closeButtonOnClick,
}: Props) => {
    const [title, setTitle] = useState<string>(
        'Sentinel-2 Land Cover Exlorer export map'
    );
    const [tags, setTags] = useState<string>(
        'Sentinel-2, Land Use, Land Cover, LULC, Living Atlas'
    );
    const [summary, setSummary] = useState<string>(
        'Sentinel-2 10m land use/land cover time series of the world.'
    );

    const getContent = () => {
        if (response) {
            return (
                <div className="max-w-sm mx-auto flex items-center justify-center">
                    <p className=" text-custom-light-blue-90 mr-2">
                        Your Web Map is Ready!
                    </p>

                    <div
                        className={ButtonClassNames}
                        onClick={() => {
                            const url = `${getPortalBaseUrl()}/home/item.html?id=${
                                response.id
                            }`;
                            window.open(url, '_blank');
                        }}
                    >
                        Open
                    </div>
                </div>
            );
        }

        return (
            <>
                <div
                    className={classNames({
                        'is-disabled ': isSavingChanges,
                    })}
                >
                    <TextInput
                        title={'Title'}
                        isRequired={true}
                        value={title}
                        onChange={setTitle}
                    />
                    <TextInput title={'Tags'} value={tags} onChange={setTags} />
                    <TextInput
                        title={'Summary'}
                        value={summary}
                        onChange={(val) => {
                            setSummary(val);
                        }}
                    />
                </div>

                <div className="flex justify-end">
                    <div
                        className={classNames(ButtonClassNames, {
                            'hidden ': isSavingChanges,
                        })}
                        onClick={closeButtonOnClick}
                    >
                        Cancel
                    </div>

                    <div
                        className={classNames(ButtonClassNames, {
                            'is-disabled ': !title || isSavingChanges,
                        })}
                        onClick={() => {
                            saveButtonOnClick({
                                title,
                                tags,
                                summary,
                            });
                        }}
                    >
                        {isSavingChanges
                            ? 'Creating Web Map...'
                            : 'Create Web Map'}
                    </div>
                </div>
            </>
        );
    };

    return (
        <div className="absolute top-0 left-0 w-screen h-screen flex justify-center items-center bg-custom-background-95 z-20">
            {isSavingChanges === false && (
                <CloseBtn onClick={closeButtonOnClick} />
            )}

            <div className="w-1/3 max-w-2xl px-10">{getContent()}</div>
        </div>
    );
};
