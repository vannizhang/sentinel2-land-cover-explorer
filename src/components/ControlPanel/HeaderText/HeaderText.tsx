import React, { FC } from 'react';

type Props = {
    text: string;
};

const HeaderText: FC<Props> = ({ text }: Props) => {
    return <h5 className="uppercase opacity-50 text-xs mb-2">{text}</h5>;
};

export default HeaderText;
