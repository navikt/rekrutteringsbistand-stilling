import React from 'react';
import PropTypes from 'prop-types';
import {Row} from 'nav-frontend-grid';
import {Link} from 'react-router-dom';
import {Ingress} from 'nav-frontend-typografi';
import './Menu.less';

const MenuBox = (props) => (
    <Link className="Menu__item__border__link" key={props.icon} to={props.href}>
        <div className="Menu__item__border text-center">
            <Row>
                <i className="Menu__icon">{props.icon}</i>
            </Row>
            <Row>
                <Ingress>
                    {props.text}
                </Ingress>
            </Row>
        </div>
    </Link>
);

MenuBox.propTypes = {
    icon: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired
};

export default MenuBox;
