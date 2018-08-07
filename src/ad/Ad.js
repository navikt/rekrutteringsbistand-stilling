import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Knapp } from 'nav-frontend-knapper';
import Preview from './preview/Preview';
import Administration from './administration/Administration';
import Categorize from './categorize/Categorize';
import Comments from './comments/Comments';
import { DISCARD_AD_CHANGES, FETCH_AD, SAVE_AD, SHOW_AD_FORM } from './adReducer';
import Error from './error/Error';
import DelayedSpinner from '../common/DelayedSpinner';
import './Ad.less';
import Faded from '../common/faded/Faded';
import { removeShortcuts } from '../common/shortcuts/Shortcuts';
import Edit from './edit/Edit';
import ValidationSummary from './validation/ValidationSummary';

class Ad extends React.Component {
    componentDidMount() {
        window.scrollTo(0, 0);
        this.props.getStilling(this.props.match.params.uuid);
    }

    componentWillUnmount() {
        removeShortcuts('annonseDetaljer');
    }

    onShowAdFormClick = () => {
        this.props.showAdForm();
    };

    onDiscardClick = () => {
        this.props.discardAdChanges();
    };

    onSaveAdClick = () => {
        this.props.saveAd();
    };

    render() {
        const {
            stilling, isFetchingStilling, shouldShowAdForm, isSavingAd
        } = this.props;

        return (
            <div className="Ad">
                {!isFetchingStilling && stilling ? (
                    <Faded>
                        <div className="Ad__flex">
                            <div className="Ad__flex__center">
                                <div className="Ad__flex__center__inner">
                                    <div className="Ad__flex__center__inner__content">
                                        {shouldShowAdForm ? (
                                            <div>
                                                <Knapp
                                                    className="Ad__hideAdFormButton"
                                                    onClick={this.onSaveAdClick}
                                                    spinner={isSavingAd}
                                                >
                                                    Lagre
                                                </Knapp>
                                                <Knapp
                                                    className="Ad__hideAdFormButton"
                                                    onClick={this.onDiscardClick}
                                                >
                                                    Avbryt
                                                </Knapp>
                                            </div>
                                        ) : (
                                            <div>
                                                <Knapp
                                                    className="Ad__showAdFormButton"
                                                    onClick={this.onShowAdFormClick}
                                                >
                                                    Rediger
                                                </Knapp>
                                            </div>
                                        )}
                                        <ValidationSummary />
                                        {shouldShowAdForm ? (
                                            <Edit />
                                        ) : (
                                            <Preview stilling={stilling} />
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="Ad__flex__right">
                                <div className="Ad__flex__right__inner">
                                    <Administration />
                                    <Categorize />
                                    <Comments />
                                </div>
                            </div>
                        </div>
                    </Faded>
                ) : (
                    <div className="Ad__spinner">
                        <DelayedSpinner />
                    </div>
                )}
                <Error />
            </div>
        );
    }
}


Ad.defaultProps = {
    stilling: undefined,
    isFetchingStilling: false
};

Ad.propTypes = {
    stilling: PropTypes.shape({
        title: PropTypes.string.isRequired,
        properties: PropTypes.shape({
            adtext: PropTypes.string
        }).isRequired
    }),
    getStilling: PropTypes.func.isRequired,
    showAdForm: PropTypes.func.isRequired,
    saveAd: PropTypes.func.isRequired,
    discardAdChanges: PropTypes.func.isRequired,
    shouldShowAdForm: PropTypes.bool.isRequired,
    isFetchingStilling: PropTypes.bool,
    isSavingAd: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
    isFetchingStilling: state.ad.isFetchingStilling,
    stilling: state.ad.data,
    shouldShowAdForm: state.ad.shouldShowAdForm,
    isSavingAd: state.ad.isSavingAd
});

const mapDispatchToProps = (dispatch) => ({
    getStilling: (uuid) => dispatch({ type: FETCH_AD, uuid }),
    showAdForm: () => dispatch({ type: SHOW_AD_FORM }),
    discardAdChanges: () => dispatch({ type: DISCARD_AD_CHANGES }),
    saveAd: () => dispatch({ type: SAVE_AD })
});


export default connect(mapStateToProps, mapDispatchToProps)(Ad);
