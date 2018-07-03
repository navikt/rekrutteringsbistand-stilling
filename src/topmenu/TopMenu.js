import React from 'react';
import { Systemtittel } from 'nav-frontend-typografi';
import './TopMenu.less';

export default class TopMenu extends React.Component {
    render() {
        return (
            <div className="TopMenu">
                <Systemtittel className="TopMenu__title">NSS Admin</Systemtittel>
            </div>
        );
    }
}

