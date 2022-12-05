import './style.css';
import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { selectAnimationMode } from '../../store/UI/selectors';
import { useDispatch } from 'react-redux';
import { showAboutThisAppToggled } from '../../store/UI/reducer';

const AppTitle = () => {
    const dispatch = useDispatch();

    const animationMode = useSelector(selectAnimationMode);

    const [hideTitle, setHideTitle] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setHideTitle(true);
        }, 10000);
    }, []);

    return (
        <div
            className={classNames('absolute z-10 text-custom-light-blue flex', {
                hidden: animationMode !== null,
            })}
            style={{
                top: 15,
                left: 15,
            }}
        >
            <div
                className="theme-background p-1"
                onMouseEnter={setHideTitle.bind(null, false)}
                onMouseLeave={setHideTitle.bind(null, true)}
                onClick={() => {
                    dispatch(showAboutThisAppToggled());
                }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    height="24"
                    width="24"
                    className="cursor-pointer"
                >
                    <path
                        fill="currentColor"
                        d="M12.5 7.5a1 1 0 1 1 1-1 1.002 1.002 0 0 1-1 1zM13 18V9h-2v1h1v8h-1v1h3v-1zm9.8-5.5A10.3 10.3 0 1 1 12.5 2.2a10.297 10.297 0 0 1 10.3 10.3zm-1 0a9.3 9.3 0 1 0-9.3 9.3 9.31 9.31 0 0 0 9.3-9.3z"
                    />
                    <path fill="none" d="M0 0h24v24H0z" />
                </svg>
            </div>

            <div
                className={classNames(
                    'app-title theme-background p-1 px-2 text-sm flex items-center',
                    {
                        hidden: hideTitle,
                    }
                )}
            >
                <span>Esri | Sentinel-2 Land Cover Explorer</span>
            </div>
        </div>
    );
};

export default AppTitle;
