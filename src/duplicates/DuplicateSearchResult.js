import { Ingress, Undertekst } from 'nav-frontend-typografi';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Loading from '../common/loading/Loading';
import DuplicateRow from './DuplicateRow';
import DuplicateRowHeaders from './DuplicateRowHeaders';
import './DuplicateSearchResult.less';

class DuplicateSearchResult extends React.Component {
    render() {
        const {
            possibleDuplicates, isSearching, other, totalElements
        } = this.props;
        const found = !isSearching && possibleDuplicates && possibleDuplicates.length > 0;
        return (
            <div className="DuplicateSearchResult">
                {isSearching && (
                    <Loading />
                )}
                {!isSearching && !found && (
                    <div className="DuplicateSearchResult__not-found">
                        <Ingress>Ingen treff</Ingress>
                    </div>
                )}
                {found && (
                    <div>
                        <DuplicateRowHeaders />
                        {possibleDuplicates.map((duplicate) => (
                            <DuplicateRow
                                isActive={duplicate.uuid === other.uuid}
                                key={duplicate.uuid}
                                duplicate={duplicate}
                            />
                        ))}
                        {possibleDuplicates.length < totalElements && (
                            <div className="DuplicateSearchResult__end-of-list">
                                <Undertekst>
                                    Viser {possibleDuplicates.length} av {totalElements} annonser
                                </Undertekst>
                            </div>
                        )}
                    </div>
                )}
            </div>
        );
    }
}

DuplicateSearchResult.defaultProps = {
    other: undefined
};

DuplicateSearchResult.propTypes = {
    possibleDuplicates: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    other: PropTypes.shape({
        created: PropTypes.string,
        status: PropTypes.string,
        administration: PropTypes.shape({
            remarks: PropTypes.arrayOf(PropTypes.string),
            comments: PropTypes.string
        })
    }),
    isSearching: PropTypes.bool.isRequired,
    totalElements: PropTypes.number.isRequired
};


const mapStateToProps = (state) => ({
    possibleDuplicates: state.duplicates.possibleDuplicates,
    isSearching: state.duplicates.isSearching,
    other: state.duplicates.other,
    totalElements: state.duplicates.totalElements
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(DuplicateSearchResult);
