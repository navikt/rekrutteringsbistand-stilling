import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Knapp } from 'nav-frontend-knapper';
import Preview from './preview/Preview';
import Administration from './administration/Administration';
import { FETCH_AD, HIDE_AD_FORM, SHOW_AD_FORM } from './adReducer';
import Error from './error/Error';
import DelayedSpinner from '../common/DelayedSpinner';
import './Ad.less';
import Faded from '../common/faded/Faded';
import { removeShortcuts } from '../common/shortcuts/Shortcuts';
import Edit from './edit/Edit';
import ValidationSummary from './validation/ValidationSummary';
import AdminStatusEnum from './administration/AdminStatusEnum';
import AdStatusEnum from './administration/AdStatusEnum';

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

    onHideAdFormClick = () => {
        this.props.hideAdForm();
    };

    render() {
        const {
            stilling, isFetchingStilling, shouldShowAdForm
        } = this.props;

        return (
            <div className="Ad">
                {!isFetchingStilling && stilling ? (
                    <Faded>
                        <div className="Ad__flex">
                            <div className="Ad__flex__center">
                                <div className="Ad__flex__center__inner">
                                    <div className="Ad__flex__center__inner__content">
                                        <ValidationSummary />
                                        {stilling.administration.status === AdminStatusEnum.PENDING ? (
                                            <div>
                                                {shouldShowAdForm ? (
                                                    <Knapp
                                                        className="Ad__hideAdFormButton"
                                                        onClick={this.onHideAdFormClick}
                                                    >
                                                        Forhåndsvis
                                                    </Knapp>
                                                ) : (
                                                    <Knapp
                                                        className="Ad__showAdFormButton"
                                                        onClick={this.onShowAdFormClick}
                                                    >
                                                        Rediger
                                                    </Knapp>
                                                )}
                                                {shouldShowAdForm ? (
                                                    <Edit />
                                                ) : (
                                                    <Preview stilling={stilling} />
                                                )}
                                            </div>
                                        ) : (
                                            <Preview stilling={stilling} />
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="Ad__flex__right">
                                <div className="Ad__flex__right__inner">
                                    <Administration />
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
    hideAdForm: PropTypes.func.isRequired,
    shouldShowAdForm: PropTypes.bool.isRequired,
    isFetchingStilling: PropTypes.bool
};

const mapStateToProps = (state) => ({
    isFetchingStilling: state.ad.isFetchingStilling,
    stilling: state.ad.data,
    shouldShowAdForm: state.ad.shouldShowAdForm
});

const mapDispatchToProps = (dispatch) => ({
    getStilling: (uuid) => dispatch({ type: FETCH_AD, uuid }),
    showAdForm: () => dispatch({ type: SHOW_AD_FORM }),
    hideAdForm: () => dispatch({ type: HIDE_AD_FORM })
});


export default connect(mapStateToProps, mapDispatchToProps)(Ad);
