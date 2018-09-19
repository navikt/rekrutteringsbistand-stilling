import { Column, Row } from 'nav-frontend-grid';
import { Element } from 'nav-frontend-typografi';
import React from 'react';
import { connect } from 'react-redux';

class DuplicateRowHeaders extends React.Component {

    render() {
        return (
            <div className="DuplicateRowHeaders">
                <Row>
                    <Column md="1">
                        <Element className="DuplicateRow__ellipsis">
                            Mottatt
                        </Element>
                    </Column>
                    <Column md="3">
                        <Element className="DuplicateRow__ellipsis">
                            Annonseoverskrift
                        </Element>
                    </Column>
                    <Column md="3">
                        <Element className="DuplicateRow__ellipsis">
                            Stillingstittel
                        </Element>
                    </Column>
                    <Column md="2">
                        <Element className="DuplicateRow__ellipsis">
                            Arbeidsgiver
                        </Element>
                    </Column>
                    <Column md="1">
                        <Element className="DuplicateRow__ellipsis">
                            Arbeidssted
                        </Element>
                    </Column>
                    <Column md="1">
                        <Element className="DuplicateRow__ellipsis">
                            Kilde
                        </Element>
                    </Column>
                    <Column md="1">
                        <Element className="DuplicateRow__ellipsis">
                            Status
                        </Element>
                    </Column>
                </Row>
            </div>
        );
    }
}

DuplicateRowHeaders.propTypes = {
};


const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(DuplicateRowHeaders);
