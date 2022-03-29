import React, { FunctionComponent } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import './LenkeMedIkon.less';

type Props = {
    iconName?: string;
    classNameText: string;
    classNameLink: string;
    text: string;
    href: string;
    onClick?: () => void;
};

const LenkeMedIkon: FunctionComponent<Props> = ({
    iconName,
    classNameText,
    classNameLink,
    href,
    text = '',
    onClick = () => {},
}) => {
    return (
        <Link
            to={href}
            onClick={onClick}
            className={classNames('lenke-med-ikon', classNameLink, iconName)}
        >
            <span className={classNames('lenke-med-ikon__text lenke', classNameText)}>{text}</span>
        </Link>
    );
};

export default LenkeMedIkon;
