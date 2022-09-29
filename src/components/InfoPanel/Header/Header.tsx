import React, { FC } from 'react';

type Props = {
    closeButtonOnClick: () => void;
    donwloadButtonOnClick: () => void;
};

const Header: FC<Props> = ({
    closeButtonOnClick,
    donwloadButtonOnClick,
}: Props) => {
    return (
        <div className="relative text-custom-light-blue flex justify-between items-center mb-4 z-10">
            <div className="flex items-center">
                <h5 className="uppercase mr-4">Land Cover in Acres</h5>

                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    height="24"
                    width="24"
                    className="cursor-pointer"
                    onClick={donwloadButtonOnClick}
                >
                    <path
                        fill="currentColor"
                        d="M24 12a5 5 0 0 1-5 5h-2v-1h2a3.99 3.99 0 0 0 .623-7.934l-.79-.124-.052-.798a5.293 5.293 0 0 0-10.214-1.57L8.17 6.59l-.977-.483A2.277 2.277 0 0 0 6.19 5.87a2.18 2.18 0 0 0-1.167.339 2.206 2.206 0 0 0-.98 1.395l-.113.505-.476.2A4 4 0 0 0 5 16h3v1H5a5 5 0 0 1-1.934-9.611 3.21 3.21 0 0 1 1.422-2.025 3.17 3.17 0 0 1 1.702-.493 3.268 3.268 0 0 1 1.446.34 6.293 6.293 0 0 1 12.143 1.867A4.988 4.988 0 0 1 24 12zm-11-1h-1v10.292l-2.646-2.646-.707.707 3.854 3.854 3.853-3.852-.707-.707L13 21.294z"
                    />
                    <path fill="none" d="M0 0h24v24H0z" />
                </svg>
            </div>

            <div
                className=" cursor-pointer text-custom-light-blue "
                onClick={closeButtonOnClick}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 32 32"
                    height="32"
                    width="32"
                >
                    <path
                        fill="currentColor"
                        d="M22.864 10.843L17.207 16.5l5.657 5.657-.707.707-5.657-5.657-5.657 5.657-.707-.707 5.657-5.657-5.657-5.657.707-.707 5.657 5.657 5.657-5.657zM29.8 16.5A13.3 13.3 0 1 1 16.5 3.2a13.3 13.3 0 0 1 13.3 13.3zm-1 0a12.3 12.3 0 1 0-12.3 12.3 12.314 12.314 0 0 0 12.3-12.3z"
                    />
                    <path fill="none" d="M0 0h32v32H0z" />
                </svg>
            </div>
        </div>
    );
};

export default Header;
