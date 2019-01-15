import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Element } from 'nav-frontend-typografi';
import { Column, Row } from 'nav-frontend-grid';
import { CHANGE_SORTING } from '../searchReducer';

import './SearchResult.less';

class SearchResultHeaders extends React.Component {
    onSortClick = (field) => {
        const { sortField, sortDir, changeSorting } = this.props;
        let order = 'asc';
        if ((sortField === field) && sortDir === 'asc') {
            order = 'desc'; // change to desc if field already sorted on asc. Otherwise, sort on asc.
        }
        changeSorting(field, order);
    };

    render() {
        const { sortField, sortDir } = this.props;

        let className = 'SearchResultHeader--unsorted';
        if (sortDir === 'asc') {
            className = 'SearchResultHeader--sorted-asc';
        } else if (sortDir === 'desc') {
            className = 'SearchResultHeader--sorted-desc';
        }

        return (
            <Row className="SearchResultHeaders">
                <Column md="1" onClick={() => this.onSortClick('published')}>
                    <Element>
                        Publisert <br />
                        dato
                        <i className={sortField === 'published' ? className : 'SearchResultHeader--unsorted'} />
                    </Element>
                </Column>
                <Column md="3" onClick={() => this.onSortClick('title')}>
                    <Element>
                        Annonseoverskrift
                        <i className={sortField === 'title' ? className : 'SearchResultHeader--unsorted'} />
                    </Element>
                </Column>
                <Column md="3" onClick={() => this.onSortClick('employerName')}>
                    <Element>
                        Arbeidsgiver
                        <i className={sortField === 'employerName' ? className : 'SearchResultHeader--unsorted'} />
                    </Element>
                </Column>
                <Column md="1">
                    <Element>
                        Sted
                    </Element>
                </Column>
                <Column md="1" onClick={() => this.onSortClick('privacy')}>
                    <Element>
                        Publisert
                        <i className={sortField === 'privacy' ? className : 'SearchResultHeader--unsorted'} />
                    </Element>
                </Column>
                <Column md="1" onClick={() => this.onSortClick('expires')}>
                    <Element>
                        Utløpsdato
                        <i className={sortField === 'expires' ? className : 'SearchResultHeader--unsorted'} />
                    </Element>
                </Column>
                <Column md="2">
                    <Element>
                        Kandidatliste
                    </Element>
                </Column>
            </Row>
        );
    }
}

SearchResultHeaders.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(SearchResultHeaders);
