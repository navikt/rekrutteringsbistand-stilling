import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Element } from 'nav-frontend-typografi';
import { CHANGE_SORTING } from '../searchReducer';
import useSorting from '../../common/sort/useSorting';
import './SearchResult.less';

function SearchResultHeaders({ changeSorting, sortDir, sortField }) {
    const [sort, toggleSorting, className] = useSorting({ field: sortField, dir: sortDir }, changeSorting);

    return (
        <thead className="SearchResultHeaders">
            <tr>
                <th>
                    <button
                        className={`Sort__button ${sort.field === 'published' ? className : 'Sort-unsorted'}`}
                        onClick={() => toggleSorting('published')}
                    >
                        <span className="Sort__text">
                            Publisert <br />
                            dato
                        </span>
                    </button>
                </th>
                <th>
                    <button
                        className={`Sort__button ${sort.field === 'title' ? className : 'Sort-unsorted'}`}
                        onClick={() => toggleSorting('title')}
                    >
                        <span className="Sort__text">
                            Annonseoverskrift
                        </span>
                    </button>
                </th>
                <th>
                    <button
                        className={`Sort__button ${sort.field === 'employerName' ? className : 'Sort-unsorted'}`}
                        onClick={() => toggleSorting('employerName')}
                    >
                        <span className="Sort__text">
                            Arbeidsgiver
                        </span>
                    </button>
                </th>
                <th>
                    <Element>
                        Sted
                    </Element>
                </th>
                <th >
                    <button
                        className={`Sort__button ${sort.field === 'privacy' ? className : 'Sort-unsorted'}`}
                        onClick={() => toggleSorting('privacy')}
                    >
                        <span className="Sort__text">
                            Publisert
                        </span>
                    </button>
                </th>
                <th>
                    <button
                        className={`Sort__button ${sort.field === 'expires' ? className : 'Sort-unsorted'}`}
                        onClick={() => toggleSorting('expires')}
                    >
                        <span className="Sort__text">
                            Utløpsdato
                        </span>
                    </button>
                </th>
                <th>
                    <Element>
                        Kandidatliste
                    </Element>
                </th>

            </tr>
        </thead>
    );

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
