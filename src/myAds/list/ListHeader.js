import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Element } from 'nav-frontend-typografi';
import { Column, Row } from 'nav-frontend-grid';
import './List.less';

class ListHeader extends React.Component {
    render() {
        return (
            <thead className="ListHeader typo-element">
                <tr >
                    <th className="ColWidth-se">Sist endret</th>
                    <th className="ColWidth-st">Stillingstittel</th>
                    <th className="ColWidth-a">Arbeidsgiver</th>
                    <th className="ColWidth-p">Publisert</th>
                    <th className="ColWidth-c">Kandidatliste</th>
                    <th className="ColWidth-sta">Status</th>
                    <th className="ColWidth-br">Rediger</th>
                    <th className="ColWidth-bk">Kopier</th>
                    <th className="ColWidth-bst">Stopp</th>
                    <th className="ColWidth-bsl">Slett</th>
                </tr>
            </thead>
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
