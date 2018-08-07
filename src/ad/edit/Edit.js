import React from 'react';
import PropTypes from 'prop-types';
import { Column, Row } from 'nav-frontend-grid';
import { Input, SkjemaGruppe } from 'nav-frontend-skjema';
import { connect } from 'react-redux';
import { SET_AD_TITLE, SET_LOCATION_ADDRESS } from '../adReducer';
import PostalCode from './postalCode/PostalCode';
import './Edit.less';

class Edit extends React.Component {
    onTitleChange = (e) => {
        this.props.setAdTitle(e.target.value);
    };

    onAddressChange = (e) => {
        this.props.setAddress(e.target.value);
    };

    render() {
        const { ad, validation } = this.props;

        return (
            <div className="Edit">
                <Row>
                    <Column xs="12" md="8">
                        <div className="Edit__body">
                            <Input
                                label="Tittel"
                                value={ad.title}
                                onChange={this.onTitleChange}
                                className="typo-normal Edit__title"
                                feil={validation.title ? { feilmelding: validation.title } : undefined}
                            />
                        </div>
                    </Column>
                    <Column xs="12" md="8">
                    </Column>
                    <Column xs="12" md="4">
                        <div className="Edit__details">
                            <SkjemaGruppe title="Sted">
                                <Input
                                    label="Gateadresse"
                                    value={ad.location && ad.location.address ? ad.location.address : ''}
                                    onChange={this.onAddressChange}
                                    className="typo-normal"
                                />
                                <PostalCode />
                            </SkjemaGruppe>
                        </div>
                    </Column>
                </Row>
            </div>
        );
    }
}


Edit.propTypes = {
    ad: PropTypes.shape({
        title: PropTypes.string
    }).isRequired,
    setAdTitle: PropTypes.func.isRequired,
    setAddress: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    ad: state.ad.data,
    validation: state.ad.validation
});

const mapDispatchToProps = (dispatch) => ({
    setAdTitle: (title) => dispatch({ type: SET_AD_TITLE, title }),
    setAddress: (address) => dispatch({ type: SET_LOCATION_ADDRESS, address })
});


export default connect(mapStateToProps, mapDispatchToProps)(Edit);
