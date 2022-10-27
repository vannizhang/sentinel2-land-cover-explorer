import React, { FC, useMemo, useRef, useState } from 'react';
import useOnClickOutside from '../../../hooks/useOnClickOutside';

export type SelectorListData = {
    value: string;
    label?: string;
};

type Props = {
    /**
     * Title of this Selector List
     */
    title: string;
    /**
     * array of SelectorListData that will be used to populate the list
     */
    data: SelectorListData[];
    /**
     * value of the selected item
     */
    valueOfSelectedItem: string;
    /**
     * place holder text to be displayed when no item is selected
     */
    placeholderText: string;
    /**
     * Fires when user selects a new item from the list
     */
    onChange: (value: string) => void;
};

const ChevronDownIcon = (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        height="24"
        width="24"
    >
        <path fill="currentColor" d="M5 8.793l7 7 7-7v1.414l-7 7-7-7z" />
        <path fill="none" d="M0 0h24v24H0z" />
    </svg>
);

const ChevronUpIcon = (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        height="24"
        width="24"
    >
        <path fill="currentColor" d="M5 13.793l7-7 7 7v1.414l-7-7-7 7z" />
        <path fill="none" d="M0 0h24v24H0z" />
    </svg>
);

const CloseIcon = (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        height="24"
        width="24"
    >
        <path
            fill="currentColor"
            d="M18.01 6.697L12.707 12l5.303 5.303-.707.707L12 12.707 6.697 18.01l-.707-.707L11.293 12 5.99 6.697l.707-.707L12 11.293l5.303-5.303z"
        />
        <path fill="none" d="M0 0h24v24H0z" />
    </svg>
);

const SelectorList: FC<Props> = ({
    title,
    data,
    valueOfSelectedItem,
    placeholderText,
    onChange,
}: Props) => {
    const containterRef = useRef<HTMLDivElement>();

    const [showList, setShowList] = useState<boolean>(false);

    const labelOfSelectedItem = useMemo(() => {
        if (!valueOfSelectedItem || !data.length) {
            return '';
        }

        const selectedItem = data.find((d) => d.value === valueOfSelectedItem);
        return selectedItem?.label || selectedItem?.value;
    }, [data, valueOfSelectedItem]);

    // close selection list
    useOnClickOutside(containterRef, setShowList.bind(null, false));

    const getSelectionList = () => {
        if (!showList) {
            return null;
        }

        return (
            <div className="absolute top-9 max-h-96 overflow-y-auto w-full">
                {data.map((d) => {
                    const { value, label } = d;
                    return (
                        <div
                            className="bg-custom-background-95 py-1 px-2 cursor-pointer text-sm"
                            key={value}
                            onClick={() => {
                                onChange(value);
                                setShowList(false);
                            }}
                        >
                            <span>{label || value}</span>
                        </div>
                    );
                })}
            </div>
        );
    };

    return (
        <div className="relative mr-4" ref={containterRef}>
            <h5 className="mb-2">{title}</h5>

            <div className="relative">
                <div
                    className="flex justify-between items-center border border-custom-light-blue-80 p-1 text-sm"
                    style={{
                        width: 300,
                    }}
                >
                    <span className="">
                        {labelOfSelectedItem || placeholderText}
                    </span>

                    <div className="flex items-center">
                        {valueOfSelectedItem && (
                            <div
                                className="cursor-pointer"
                                onClick={() => {
                                    onChange('');
                                }}
                            >
                                {CloseIcon}
                            </div>
                        )}

                        <div
                            className="cursor-pointer"
                            onClick={setShowList.bind(null, !showList)}
                        >
                            {showList ? ChevronUpIcon : ChevronDownIcon}
                        </div>
                    </div>
                </div>
                {getSelectionList()}
            </div>
        </div>
    );
};

export default SelectorList;
