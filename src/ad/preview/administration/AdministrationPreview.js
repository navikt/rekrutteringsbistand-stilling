import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Hovedknapp } from 'nav-frontend-knapper';
import AdStatus from '../../administration/adStatus/AdStatus';
import { EDIT_AD } from '../../adReducer';
import Inkludering from './inkludering/Inkludering';
import Publishing from './publishing/Publishing';
import ContactInfo from './contact/ContactInfo';
import Comment from './comment/Comment';

import './AdministrationPreview.less';

class AdministrationPreview extends React.Component {
    render() {
        const { createdBy } = this.props;
        const limitedAccess = createdBy!== 'pam-rekrutteringsbistand';
        return (
            <div className="Preview__Administration">
                <div className="Administration__flex">
                    <div className="Administration__flex__top">
                        <AdStatus />
                    </div>
                    <div className="Administration__flex__center">
                        <div className="Administration__panel">
                            <Publishing />
                        </div>
                        <div className="Administration__panel">
                            <ContactInfo />
                        </div>
                        <Inkludering />
                        <div className="Administration__panel">
                            <Comment />
                        </div>
                        {limitedAccess && (
                            <div className="Administration__panel">
                                <Hovedknapp
                                    className="Ad__actions-button"
                                    onClick={this.props.editAd}
                                    mini
                                >
                                    Rediger
                                </Hovedknapp>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

AdministrationPreview.defaultProps = {
    stilling: undefined
};

AdministrationPreview.propTypes = {
    stilling: PropTypes.shape({
        createdBy: PropTypes.string
    }),
    editAd: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    createdBy: state.adData.createdBy
});

const mapDispatchToProps = dispatch => ({
    editAd: () => dispatch({ type: EDIT_AD })
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdministrationPreview);
