import React, { FC } from 'react';

type Props = {
    closeButtonOnClick: () => void;
};

const Header: FC<Props> = ({ closeButtonOnClick }: Props) => {
    return (
        <div className="relative text-custom-light-blue flex justify-between mb-4 z-10">
            <h5>Land Cover</h5>
            <div onClick={closeButtonOnClick}>Close</div>
        </div>
    );
};

export default Header;
