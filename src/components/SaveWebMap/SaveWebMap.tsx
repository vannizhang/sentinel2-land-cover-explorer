import React, { FC } from 'react';
import CloseBtn from '../CloseBtn/CloseBtn';

type WebMapData = {
    title?: string;
    tags?: string[];
    description?: string;
};

type Props = {
    data: WebMapData;
    saveButtonOnClick: () => void;
    closeButtonOnClick: () => void;
};

export const SaveWebMap: FC<Props> = ({
    data,
    saveButtonOnClick,
    closeButtonOnClick,
}: Props) => {
    return (
        <div className="absolute top-0 left-0 w-screen h-screen flex justify-center items-center bg-custom-background-95 z-20">
            <CloseBtn onClick={closeButtonOnClick} />

            <div
                className="h-full w-full max-w px-10 flex flex-col"
                style={{
                    maxHeight: '90%',
                    maxWidth: '90%',
                }}
            ></div>
        </div>
    );
};
