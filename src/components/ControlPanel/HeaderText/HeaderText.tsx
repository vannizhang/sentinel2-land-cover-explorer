import React, { FC } from 'react';

type Props = {
    text: string;
    /**
     * Fires when click on the Open Icon
     */
    openButtonOnClick?: () => void;
};

const HeaderText: FC<Props> = ({ text, openButtonOnClick }: Props) => {
    return (
        <div className="flex items-center justify-center mb-2 opacity-50">
            <h5 className="uppercase text-xs">{text}</h5>

            {openButtonOnClick && (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-2 cursor-pointer"
                    viewBox="0 0 16 16"
                    height="16"
                    width="16"
                    onClick={openButtonOnClick}
                >
                    <path
                        fill="currentColor"
                        d="M1 1h8v1H2v12h12V7h1v8H1zm7.325 7.382L14 2.707V5h1V1h-4v1h2.293L7.618 7.675z"
                    />
                    <path fill="none" d="M0 0h16v16H0z" />
                </svg>
            )}
        </div>
    );
};

export default HeaderText;
