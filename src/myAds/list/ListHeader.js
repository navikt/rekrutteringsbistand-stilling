import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Element } from 'nav-frontend-typografi';
import { Column, Row } from 'nav-frontend-grid';
import './List.less';

class ListHeader extends React.Component {
    render() {
        return (
            <Row className="ListHeader">
                <Column md="1">
                    <Element>
                        Sist endret
                    </Element>
                </Column>
                <Column md="2" >
                    <Element>
                        Stillingstittel
                    </Element>
                </Column>
                <Column md="2">
                    <Element>
                        Arbeidsgiver
                    </Element>
                </Column>
                <Column md="1">
                    <Element>
                        Publisert
                    </Element>
                </Column>
                <Column md="2">
                    <Element>
                        Kandidatliste
                    </Element>
                </Column>
                <Column md="1" >
                    <Element>
                        Status
                    </Element>
                </Column>

                <Column md="3" className="Button__column">
                    <Element >
                        Kopier
                    </Element>
                    <Element>
                        Rediger
                    </Element>
                    <Element >
                        Stopp
                    </Element>
                    <Element >
                        Slett
                    </Element>
                </Column>
            </Row>
        );
    }
}

ListHeader.propTypes = {
    changeSorting: PropTypes.func.isRequired,
    sortDir: PropTypes.string.isRequired,
    sortField: PropTypes.string.isRequired
};

const mapStateToProps = (state) => ({
    sortDir: state.search.sortDir,
    sortField: state.search.sortField
});

const mapDispatchToProps = (dispatch) => ({
    changeSorting: (field, dir) => dispatch({ type: CHANGE_SORTING, field, dir })
});

export default connect(mapStateToProps, mapDispatchToProps)(ListHeader);
