import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Hovedknapp } from 'nav-frontend-knapper';
import { Normaltekst, Sidetittel } from 'nav-frontend-typografi';
import { Column, Container, Row } from 'nav-frontend-grid';
import './StartPage.less';
import { removeShortcuts } from '../common/shortcuts/Shortcuts';
import { FETCH_NEXT_AD } from '../ad/adReducer';


class StartPage extends React.Component {
    componentDidUpdate() {
        if (this.props.adUuid) {
            this.props.history.push(`/ads/${this.props.adUuid}`);
        }
    }

    componentWillUnmount() {
        removeShortcuts('forside');
    }

    onNextClick = () => {
        this.props.getNextAd();
    };

    render() {
        return (
            <Container className="StartPage">
                <Row>
                    <Column xs="12" md="4" />
                    <Column xs="12" md="4">
                        <Sidetittel className="StartPage-sidetittel">Annonsemottak</Sidetittel>
                        <Hovedknapp
                            onClick={this.onNextClick}
                            className="AdminStatusEdit__button"
                        >
                            Start med neste ledige annonse

                        </Hovedknapp>
                    </Column>
                </Row>
            </Container>
        );
    }
}

StartPage.defaultProps = {
    adUuid: undefined
};

StartPage.propTypes = {
    history: PropTypes.shape().isRequired,
    getNextAd: PropTypes.func.isRequired,
    adUuid: PropTypes.string
};

const mapStateToProps = (state) => ({
    adUuid: state.ad.data ? state.ad.data.uuid : undefined
});

const mapDispatchToProps = (dispatch) => ({
    getNextAd: () => dispatch({ type: FETCH_NEXT_AD })
});

export default connect(mapStateToProps, mapDispatchToProps)(StartPage);
