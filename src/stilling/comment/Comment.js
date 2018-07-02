import React from 'react';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel'

export default class Comment extends React.Component {

    render() {
        return (
            <Ekspanderbartpanel
                border
                tittel='Kommentar til stillingen'
                tittelProps='undertittel'
            >
            </Ekspanderbartpanel>
        );
    }
}

