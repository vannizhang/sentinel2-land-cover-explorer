import React, { FC } from 'react';

type Props = {
    closeButtonOnClick: () => void;
    // donwloadButtonOnClick: () => void;
};

const Header: FC<Props> = ({
    closeButtonOnClick,
}: // donwloadButtonOnClick,
Props) => {
    return (
        <div className="relative text-custom-light-blue flex justify-between items-center mb-4 z-10">
            {/* <div className="flex items-center">
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
                        d="M13 3v12.294l2.647-2.647.707.707-3.853 3.854-3.854-3.854.707-.707L12 15.292V3zM6 21h13v-1H6z"
                    />
                    <path fill="none" d="M0 0h24v24H0z" />
                </svg>
            </div> */}

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
