import React from 'react';
import PropTypes from 'prop-types';
import {Row} from 'nav-frontend-grid';
import {Link} from 'react-router-dom';
import {Ingress} from 'nav-frontend-typografi';
import './Menu.less';

const MenuBox = (props) => (
    <Link className="box-link" key={props.icon} to={props.href}>
        <div className="menu-item-border text-center">
            <Row>
                <i className="menu-icon">{props.icon}</i>
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
