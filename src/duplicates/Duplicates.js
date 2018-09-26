import Modal from 'nav-frontend-modal';
import AlertStripe from 'nav-frontend-alertstriper';
import { Element, Undertekst } from 'nav-frontend-typografi';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Preview from '../ad/preview/Preview';
import DelayedSpinner from '../common/DelayedSpinner';
import { formatISOString } from '../utils';
import DuplicateAdStatus from './DuplicateAdStatus';
import './Duplicates.less';
import DuplicateSearch from './DuplicateSearch';
import DuplicateSearchResult from './DuplicateSearchResult';
import {
    COLLAPSE_COMPARE_PANEL,
    EXPAND_COMPARE_PANEL,
    HIDE_DUPLICATES_MODAL,
    SEARCH_FOR_DUPLICATES
} from './duplicatesReducer';

class Duplicates extends React.Component {
    onCollapseClick = () => {
        if (this.props.showComparePanel) {
            this.props.collapseComparePanel();
        } else {
            this.props.expandComparePanel();
        }
    };

    closeModal = () => {
        this.props.hideDuplicatesModal();
    };

    render() {
        const {
            showComparePanel, current, other, isLoadingOther, error
        } = this.props;
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
                        {error && (
                            <AlertStripe solid type="advarsel">
                                Det oppsto en feil, lukk duplikatsjekken og forsøk igjen.
                            </AlertStripe>
                        )}
                        <DuplicateSearch />
                        <DuplicateSearchResult />
                        <div className={showComparePanel ?
                            'Duplicates__compare-wrapper Duplicates__compare-wrapper--expanded' :
                            'Duplicates__compare-wrapper'}
                        >
                            <div className="Duplicates__compare__header">
                                <div className="Duplicates__compare__header__flex">
                                    <div className="Duplicates__compare__header__column">
                                        <Element className="Duplicates__compare__header__column__inner">
                                            Stillingsannonse under arbeid
                                        </Element>
                                    </div>
                                    <div className="Duplicates__compare__header__column">
                                        <Element className="Duplicates__compare__header__column__inner">
                                            Mulig duplikat
                                        </Element>
                                    </div>
                                    <button
                                        className="Duplicates__compare__header__collapse-button"
                                        aria-label="Lukk panel"
                                        onClick={this.onCollapseClick}
                                    >
                                        <span className="lenke">
                                            {showComparePanel ? 'Skjul sammenligning' : 'Vis sammenligning'}
                                        </span>
                                    </button>
                                </div>
                            </div>
                            <div className="Duplicates__compare">
                                <div className="Duplicates__compare__flex">
                                    <div className="Duplicates__compare__current">
                                        {current && (
                                            <div>
                                                <DuplicateAdStatus
                                                    adStatus={current.status}
                                                    remarks={current.administration ? current.administration.remarks : []}
                                                    comments={current.administration ? current.administration.comments : ''}
                                                />
                                                <Undertekst>
                                                Mottatt: {formatISOString(current.created, 'DD.MM.YY HH:MM')}
                                                </Undertekst>
                                                <Preview ad={current} />
                                            </div>
                                        )}
                                    </div>
                                    <div className="Duplicates__compare__other">
                                        {!isLoadingOther && other && (
                                            <div>
                                                <DuplicateAdStatus
                                                    adStatus={other.status}
                                                    remarks={other.administration ? other.administration.remarks : []}
                                                    comments={other.administration ? other.administration.comments : ''}
                                                />
                                                <Undertekst>
                                                Mottatt: {formatISOString(other.created, 'DD.MM.YY HH:MM')}
                                                </Undertekst>
                                                <Preview ad={other} />
                                            </div>
                                        )}
                                        {isLoadingOther && (
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
    other: undefined,
    error: undefined
};

Duplicates.propTypes = {
    other: PropTypes.shape({
        created: PropTypes.string,
        status: PropTypes.string,
        administration: PropTypes.shape({
            remarks: PropTypes.arrayOf(PropTypes.string),
            comments: PropTypes.string
        })
    }),
    current: PropTypes.shape({
        created: PropTypes.string,
        status: PropTypes.string,
        administration: PropTypes.shape({
            remarks: PropTypes.arrayOf(PropTypes.string),
            comments: PropTypes.string
        })
    }),
    showDuplicatesModal: PropTypes.bool.isRequired,
    isLoadingOther: PropTypes.bool.isRequired,
    showComparePanel: PropTypes.bool.isRequired,
    hideDuplicatesModal: PropTypes.func.isRequired,
    collapseComparePanel: PropTypes.func.isRequired,
    expandComparePanel: PropTypes.func.isRequired,
    error: PropTypes.shape({})
};


const mapStateToProps = (state) => ({
    current: state.adData,
    error: state.duplicates.error,
    other: state.duplicates.other,
    showDuplicatesModal: state.duplicates.showDuplicatesModal,
    showComparePanel: state.duplicates.showComparePanel,
    isLoadingOther: state.duplicates.isLoadingOther
});

const mapDispatchToProps = (dispatch) => ({
    searchForDuplicates: () => dispatch({ type: SEARCH_FOR_DUPLICATES }),
    hideDuplicatesModal: () => dispatch({ type: HIDE_DUPLICATES_MODAL }),
    collapseComparePanel: () => dispatch({ type: COLLAPSE_COMPARE_PANEL }),
    expandComparePanel: () => dispatch({ type: EXPAND_COMPARE_PANEL })
});

export default connect(mapStateToProps, mapDispatchToProps)(Duplicates);
