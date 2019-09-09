import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import { EDIT_AD } from '../../adReducer';
import AdTitle from './AdTitle';
import CandidateActions from '../../candidateActions/CandidateActions';
import './PreviewHeader.less';


class PreviewMenu extends React.Component {

    onEditAdClick = () => {
        this.props.editAd();
    };

    onPrintClick = () => {
        window.print();
    };

    render() {
        const { stilling } = this.props;

        return (
            <div>
                <div className="Ad__actions">
                    <CandidateActions />
                    <div>
                        <Hovedknapp
                            className="Ad__actions-button"
                            onClick={this.onEditAdClick}
                            mini
                        >
                            Rediger stillingen
                        </Hovedknapp>
                        <Knapp
                            className="button-print"
                            onClick={this.onPrintClick}
                            mini
                        >
                            Skriv ut
                        </Knapp>
                    </div>
                </div>
                <AdTitle
                    title={stilling.title}
                    employer={stilling.properties.employer}
                    location={stilling.location}
                />
            </div>
        );
    }
}

PreviewMenu.defaultProps = {
    stilling: undefined,
};

PreviewMenu.propTypes = {
    stilling: PropTypes.shape({
        title: PropTypes.string,
        location: PropTypes.shape({
            address: PropTypes.string,
            municipal: PropTypes.string,
            country: PropTypes.string
        }),
        properties: PropTypes.shape({
            employer: PropTypes.string
        })
    }),
    editAd: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    stilling: state.adData,
    adminStatus: state.adData.administration.status,
});

const mapDispatchToProps = (dispatch) => ({
    editAd: () => dispatch({ type: EDIT_AD })
});

export default connect(mapStateToProps, mapDispatchToProps)(PreviewMenu);
