import { Flatknapp } from 'nav-frontend-knapper';
import Modal from 'nav-frontend-modal';
import { EtikettLiten, Ingress, Undertekst } from 'nav-frontend-typografi';
import Chevron from 'nav-frontend-chevron';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Preview from '../ad/preview/Preview';
import DelayedSpinner from '../common/DelayedSpinner';
import Loading from '../common/loading/Loading';
import { formatISOString } from '../utils';
import DuplicateRow from './DuplicateRow';
import DuplicateRowHeaders from './DuplicateRowHeaders';
import './Duplicates.less';
import DuplicateSearch from './DuplicateSearch';
import DuplicateAdStatus from './DuplicateAdStatus';
import {
    COLLAPSE_COMPARE_PANEL,
    FETCH_CURRENT,
    HIDE_DUPLICATES_MODAL,
    SEARCH_FOR_DUPLICATES
} from './duplicatesReducer';

class Duplicates extends React.Component {
    componentDidMount() {
        this.props.fetchCurrent('643c7150-54f8-44e8-99a0-ebb2ce36c78b');
    }

    onCollapseClick = () => {
        this.props.collapseComparePanel();
    };

    closeModal = () => {
        this.props.hideDuplicatesModal();
    };

    render() {
        const { possibleDuplicates, isSearching } = this.props;
        const found = !isSearching && possibleDuplicates && possibleDuplicates.length > 0;
        return (
            <Modal
                className="DuplicatesModal"
                contentClass="DuplicatesModalContent"
                isOpen={this.props.showDuplicatesModal}
                onRequestClose={this.closeModal}
                contentLabel="Duplikatsjekk"
                appElement={document.getElementById('app')}
            >
                <div className="Duplicates">
                    <div className="Duplicates__flex">

                        <DuplicateSearch />
                        <div className="Duplicates__search-results">
                            {isSearching && (
                                <Loading />
                            )}
                            {!isSearching && !found && (
                                <div className="Duplicates__search-results__not-found">
                                    <Ingress>Ingen treff</Ingress>
                                </div>
                            )}
                            {found && (
                                <div>
                                    <DuplicateRowHeaders />
                                    {possibleDuplicates.map((duplicate) => (
                                        <DuplicateRow key={duplicate.uuid} duplicate={duplicate} />
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className={this.props.showComparePanel ? 'Duplicates__compare-wrapper Duplicates__compare-wrapper--expanded' : 'Duplicates__compare-wrapper'}>
                            <div className="Duplicates__compare-header">
                                <EtikettLiten className="Duplicates__compare-header__column">
                                Stillingsannonse under arbeid
                                </EtikettLiten>
                                <EtikettLiten className="Duplicates__compare-header__column">Mulig duplikat</EtikettLiten>
                                <button className="Duplicates__compare-header__collapse-button" aria-label="Lukk panel" onClick={this.onCollapseClick}>
                                    <Chevron type="ned" onClick={this.onCollapseClick} /> Skjul
                                </button>
                            </div>
                            <div className="Duplicates__compare">
                                <div className="Duplicates__compare__flex">
                                    <div className="Duplicates__compare__current">
                                        {this.props.current && (
                                            <div>
                                                <DuplicateAdStatus
                                                    adStatus={this.props.current.status}
                                                    remarks={this.props.current.administration.remarks}
                                                    comments={this.props.current.administration.comments}
                                                />
                                                <Undertekst>
                                                Mottatt: {formatISOString(this.props.current.created, 'DD.MM.YY HH:MM')}
                                                </Undertekst>
                                                <Preview ad={this.props.current} />
                                            </div>
                                        )}
                                    </div>
                                    <div className="Duplicates__compare__other">
                                        {!this.props.isLoadingOther && this.props.other ? (
                                            <div>
                                                <DuplicateAdStatus
                                                    adStatus={this.props.other.status}
                                                    remarks={this.props.other.administration.remarks}
                                                    comments={this.props.other.administration.comments}
                                                />
                                                <Undertekst>
                                                Mottatt: {formatISOString(this.props.other.created, 'DD.MM.YY HH:MM')}
                                                </Undertekst>
                                                <Preview ad={this.props.other} />
                                            </div>
                                        ) : (
                                            <div className="Duplicates__compare__other__spinner">
                                                <DelayedSpinner />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        );
    }
}

Duplicates.defaultProps = {
    current: undefined,
    other: undefined
};

Duplicates.propTypes = {
    possibleDuplicates: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    other: PropTypes.shape({
        status: PropTypes.string,
        administration: PropTypes.shape({
            remarks: PropTypes.arrayOf(PropTypes.string),
            comments: PropTypes.string
        })
    }),
    current: PropTypes.shape({
        status: PropTypes.string,
        administration: PropTypes.shape({
            remarks: PropTypes.arrayOf(PropTypes.string),
            comments: PropTypes.string
        })
    }),
    isSearching: PropTypes.bool.isRequired,
    fetchCurrent: PropTypes.func.isRequired,
    showDuplicatesModal: PropTypes.bool.isRequired,
    isLoadingOther: PropTypes.bool.isRequired,
    showComparePanel: PropTypes.bool.isRequired,
    hideDuplicatesModal: PropTypes.func.isRequired,
    collapseComparePanel: PropTypes.func.isRequired
};


const mapStateToProps = (state) => ({
    possibleDuplicates: state.duplicates.possibleDuplicates,
    isSearching: state.duplicates.isSearching,
    current: state.adData,
    other: state.duplicates.other,
    showDuplicatesModal: state.duplicates.showDuplicatesModal,
    showComparePanel: state.duplicates.showComparePanel,
    isLoadingOther: state.duplicates.isLoadingOther
});

const mapDispatchToProps = (dispatch) => ({
    searchForDuplicates: () => dispatch({ type: SEARCH_FOR_DUPLICATES }),
    fetchCurrent: (uuid) => dispatch({ type: FETCH_CURRENT, uuid }),
    hideDuplicatesModal: () => dispatch({ type: HIDE_DUPLICATES_MODAL }),
    collapseComparePanel: () => dispatch({ type: COLLAPSE_COMPARE_PANEL })
});

export default connect(mapStateToProps, mapDispatchToProps)(Duplicates);
