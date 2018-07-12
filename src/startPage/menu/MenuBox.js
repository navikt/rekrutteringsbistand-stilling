import React from 'react';
import PropTypes from 'prop-types';
import {Row} from 'nav-frontend-grid';
import {Link} from 'react-router-dom';
import {Ingress} from 'nav-frontend-typografi';
import './Menu.less';

const MenuBox = (props) => (
    <div className="Menu__box">
        <Link className="Menu__box__link" key={props.icon} to={props.href}>
            <Row>
                <i className="Menu__box__icon">{props.icon}</i>
            </Row>
            <Row>
                <Ingress>
                    {props.text}
                </Ingress>
            </Row>
        </Link>
    </div>

);

MenuBox.propTypes = {
    icon: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired
};

export default MenuBox;
