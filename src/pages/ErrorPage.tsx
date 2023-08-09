import React from 'react';

const ErrorPage = () => {
    return (
        <div className="flex justify-center items-center w-screen h-screen theme-background text-custom-light-blue">
            <div className="max-w-2xl">
                <p>
                    This app is temporarily unavailable due to an issue fetching
                    data from one of the data services.
                </p>
            </div>
        </div>
    );
};

export default ErrorPage;
