import React from 'react';

const ErrorPage = () => {
    return (
        <div className="flex justify-center items-center w-screen h-screen theme-background text-custom-light-blue">
            <div className="max-w-2xl">
                <p>
                    This app is temporarily unavailable because we are having
                    problem fetching data from Sentinel-2 10m LandCover layer.
                </p>
            </div>
        </div>
    );
};

export default ErrorPage;
